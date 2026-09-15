// Visualizador de peças: a casca comum dos modelos "de laboratório" (placa de vídeo,
// processadores, Arduino). Cuida do que é igual em todos eles: luz e sombra, grupos de
// peças com explosão em camadas, mostrar/ocultar/isolar, vistas prontas, enquadramento
// automático, teclado, tela cheia, imagem PNG e os ganchos de QA. O modelo fica só com
// a geometria, os textos de cada peça e a escolha de câmera ao selecionar uma peça.
//
// Uso (ver arduino-uno.js):
//   const v = montaVisualizador({ global: '__arduinoUno', pecas: {...}, detalhes: {...}, direcoes: {...} });
//   ... monta a geometria dentro de v.grupos.<peca>, com v.caixa / v.inscricao / v.metal ...
//   v.inicia({ tick });
//
// Nasceu em 10/09/2026, extraída do rtx-5090.js quando o quarto modelo do tipo ia
// nascer. Os três anteriores (rtx-5090, processador, intel-8080) ainda carregam a
// casca própria e migram pra cá quando o dono decidir.
import { THREE, montaPalco, mergeGeometries } from './_base-modelo-3d.js';
export { THREE, mergeGeometries };

const $ = id => document.getElementById(id);
const todos = seletor => Array.from(document.querySelectorAll(seletor));
const movimentoReduzido = matchMedia('(prefers-reduced-motion: reduce)');

const TEXTOS = {
  montado: 'MODELO MONTADO', desmontado: 'VISTA DESMONTADA', isolado: 'COMPONENTE ISOLADO',
  explorar: 'Explorar por dentro', montar: 'Montar de volta',
  isolar: 'Isolar componente ↗', mostrarConjunto: 'Mostrar conjunto ↗',
  gestoOrbita: '↔ Arraste para girar <span>·</span> Botão direito move',
  gestoMover: '✥ Arraste para mover <span>·</span> Role para aproximar',
};
const LUZ = {
  fundo: 0x171d18, exposicao: 1.15, chao: -3.45, alcance: 8,
  hemisferio: [0xf2f3e7, 0x374434, 1.1],
  principal: { cor: 0xf6f5ed, forca: 3.8, posicao: [-4, 9, 8] },
  apoio: [{ cor: 0xc8dbe1, forca: 2.8, posicao: [7, 2, -4] }, { cor: 0xe4f3ca, forca: 1.3, posicao: [-8, -1, 3] }],
};
const PALCO = { alvo: [0, 0, 0], camPos: [-9, 6.8, 16], meiaLarguraDesktop: 7.4, meiaLarguraMobile: 7.4, distMin: 18, orbitaMin: 5, maxPolar: Math.PI };

export function montaVisualizador(config = {}) {
  const o = {
    global: '__modelo',
    pecas: {},                 // { chave: { nome, explosao, parte? } } na ordem da lista de mostrar/ocultar;
                               // explosao = número (anda em z) ou [x, y, z] (anda nessa direção)
    detalhes: {},              // { chave: [numero, chamada, titulo, texto] } do painel lateral
    direcoes: {},              // { perspective: [x, y, z], front, back, side, ... } de onde a câmera olha
    vistaInicial: 'perspective',
    arquivoDaImagem: 'modelo-3d.png',
    // Botões liga/desliga do modelo, um por item: { id do botão, chave no estado,
    // inicial (liga sozinho), movimento (desliga sozinho em movimento reduzido) }.
    // `alternador` no singular é a forma antiga, de quando só cabia um.
    alternadores: null,
    alternador: null,
    aoAlternar: null,          // (chave, valor, api) => o modelo reage ao botão
    aoSelecionar: null,        // (chave, api, estavaIsolado) => explosão/isolamento/vista daquela peça
    pontoDoPonteiro: null,     // (evento, canvas) => Vector2 normalizado, para palcos girados por CSS
    margem: { conjunto: 1.28, isolado: 1.48 },
    distanciaMinima: { conjunto: 4, isolado: 1.2 },
    zoomMaximo: { conjunto: 2.5, isolado: .5 },
    ...config,
    textos: { ...TEXTOS, ...config.textos },
    luz: { ...LUZ, ...config.luz },
    palco: { ...PALCO, ...config.palco },
  };

  const palco = montaPalco(o.palco);
  const { scene, camera, renderer, controls } = palco;
  const canvas = renderer.domElement;
  montaLuz(scene, renderer, o.luz);
  configuraOrbita(controls);
  canvas.tabIndex = 0;
  canvas.setAttribute('role', 'img');

  // ---------- peças ----------
  const modelo = new THREE.Group();
  scene.add(modelo);
  const grupos = {};
  const explosao = {};
  for (const [chave, peca] of Object.entries(o.pecas)) {
    const grupo = new THREE.Group();
    grupo.name = chave;
    grupo.userData.parte = peca.parte ?? chave;   // uma peça pode responder pelo botão de outra
    grupos[chave] = grupo;
    // número só em z, que é o caso da placa deitada; vetor quando a peça precisa sair
    // por cima ou de lado (o dissipador do pente de memória sobe pra mostrar os chips)
    explosao[chave] = Array.isArray(peca.explosao) ? new THREE.Vector3(...peca.explosao) : new THREE.Vector3(0, 0, peca.explosao ?? 0);
    modelo.add(grupo);
  }

  const estado = {
    explosao: 0, alvoExplosao: 0, girando: false, isolado: false, navegacao: 'orbita',
    vista: o.vistaInicial,
    peca: todos('[data-part][aria-pressed="true"]')[0]?.dataset.part ?? Object.keys(o.detalhes)[0],
  };
  const alternadores = (o.alternadores ?? (o.alternador ? [o.alternador] : []))
    .map(item => ({ inicial: true, movimento: true, ...item }));
  for (const item of alternadores) estado[item.chave] = item.inicial && !(item.movimento && movimentoReduzido.matches);
  const ocultas = new Set();
  let alvoDaCamera = null;
  let medido = false;

  // ---------- helpers de geometria e material ----------
  const metal = (cor, aspereza = .32, metalico = .85) =>
    new THREE.MeshStandardMaterial({ color: cor, roughness: aspereza, metalness: metalico, envMapIntensity: 1.3 });

  function caixa(pai, w, h, d, material, x = 0, y = 0, z = 0, raio = .03) {
    const m = palco.bloco(w, h, d, material, raio);
    m.position.set(x, y, z);
    pai.add(m);
    return m;
  }

  function texturaDeCanvas(cv) {
    const tx = new THREE.CanvasTexture(cv);
    tx.colorSpace = THREE.SRGBColorSpace;
    tx.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
    return tx;
  }

  // Desenha num canvas e devolve a textura pronta: desenha(ctx, largura, altura).
  function textura(desenha, largura = 2048, altura = largura) {
    const cv = document.createElement('canvas');
    cv.width = largura; cv.height = altura;
    desenha(cv.getContext('2d'), largura, altura);
    return texturaDeCanvas(cv);
  }

  // Texto impresso numa superfície, preso à geometria. O canvas é fixo em 1024: texto
  // mais comprido que ele saía cortado nas pontas (o "CERAMIC / 40 LEADS" do 8080),
  // então mede e encolhe a fonte até caber.
  function inscricao(pai, texto, w, h, posicao, rotacao = [0, 0, 0], cor = '#c1cac3', tamanho = 70, extra = {}) {
    const { fonte = 'Arial', peso = 600, semLuz = false } = extra;
    const cv = document.createElement('canvas');
    cv.width = 1024; cv.height = 256;
    const ctx = cv.getContext('2d');
    ctx.fillStyle = cor; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    let px = tamanho;
    ctx.font = `${peso} ${px}px ${fonte}`;
    const largura = ctx.measureText(texto).width, maximo = cv.width - 40;
    if (largura > maximo) {
      px = Math.floor(px * maximo / largura);
      ctx.font = `${peso} ${px}px ${fonte}`;
    }
    ctx.fillText(texto, 512, 133);
    const comum = { map: texturaDeCanvas(cv), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 };
    const material = semLuz
      ? new THREE.MeshBasicMaterial(comum)
      : new THREE.MeshStandardMaterial({ ...comum, roughness: .5, metalness: .4 });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), material);
    m.position.set(...posicao); m.rotation.set(...rotacao);
    pai.add(m);
    return m;
  }

  // Contorno com cantos arredondados a partir de uma lista de pontos [x, y].
  function poligono(pontos, raio = .18) {
    const forma = new THREE.Shape();
    const cantos = pontos.map((p, i) => {
      const antes = pontos[(i + pontos.length - 1) % pontos.length], depois = pontos[(i + 1) % pontos.length];
      const p0 = new THREE.Vector2(...p), a = new THREE.Vector2(...antes).sub(p0), b = new THREE.Vector2(...depois).sub(p0);
      const r = Math.min(raio, a.length() * .35, b.length() * .35);
      return { p: p0, a: a.normalize().multiplyScalar(r).add(p0), b: b.normalize().multiplyScalar(r).add(p0) };
    });
    forma.moveTo(cantos[0].a.x, cantos[0].a.y);
    cantos.forEach((c, i) => { if (i) forma.lineTo(c.a.x, c.a.y); forma.quadraticCurveTo(c.p.x, c.p.y, c.b.x, c.b.y); });
    forma.closePath();
    return forma;
  }
  const retangulo = (w, h, raio = .15) => poligono([[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]], raio);
  const furo = forma => new THREE.Path(forma.getPoints(12).reverse());
  const desloca = (forma, x, y) => new THREE.Shape(forma.getPoints(12).map(p => p.add(new THREE.Vector2(x, y))));
  const furoRedondo = (x, y, r) => new THREE.Path().absarc(x, y, r, 0, Math.PI * 2, true);

  function extrusao(pai, forma, profundidade, z, material, chanfro = .025) {
    const geometria = new THREE.ExtrudeGeometry(forma, { depth: profundidade, bevelEnabled: chanfro > 0, bevelSegments: 2, steps: 1, bevelSize: chanfro, bevelThickness: chanfro, curveSegments: 10 });
    const m = new THREE.Mesh(geometria, material);
    m.position.z = z; m.castShadow = true; m.receiveShadow = true;
    pai.add(m);
    return m;
  }

  // ---------- visibilidade ----------
  const listaDeVisibilidade = $('visibilityList');
  if (listaDeVisibilidade) {
    listaDeVisibilidade.innerHTML = Object.entries(o.pecas)
      .map(([chave, peca]) => `<label><input type="checkbox" data-visible="${chave}" checked><span>${peca.nome}</span></label>`).join('');
  }

  function sincronizaVisibilidade() {
    for (const [chave, grupo] of Object.entries(grupos)) {
      grupo.visible = estado.isolado ? grupo.userData.parte === estado.peca : !ocultas.has(chave);
    }
    const visiveis = Object.values(grupos).filter(g => g.visible).length;
    todos('[data-visible]').forEach(caixinha => {
      caixinha.checked = grupos[caixinha.dataset.visible].visible;
      caixinha.disabled = visiveis === 1 && caixinha.checked;   // a última peça não some
    });
    escreve('visibilityCount', `${visiveis} / ${Object.keys(grupos).length}`);
  }

  // ---------- enquadramento ----------
  const limitesBase = {};
  function mede() {
    modelo.updateMatrixWorld(true);
    for (const [chave, grupo] of Object.entries(grupos)) limitesBase[chave] = new THREE.Box3().setFromObject(grupo);
    medido = true;
  }

  function limites(fator = estado.alvoExplosao) {
    const caixaTotal = new THREE.Box3();
    for (const [chave, bb] of Object.entries(limitesBase)) {
      if (grupos[chave].visible) caixaTotal.union(bb.clone().translate(explosao[chave].clone().multiplyScalar(fator)));
    }
    return caixaTotal;
  }

  // Posição da câmera, na direção pedida, em que a caixa das peças visíveis cabe no palco.
  function posicaoQueEnquadra(direcao) {
    const dir = direcao.clone().normalize();
    const direita = new THREE.Vector3().crossVectors(camera.up, dir).normalize();
    const cima = new THREE.Vector3().crossVectors(dir, direita).normalize();
    const bb = limites(), centro = bb.getCenter(new THREE.Vector3());
    const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const margem = estado.isolado ? o.margem.isolado : o.margem.conjunto;
    let distancia = estado.isolado ? o.distanciaMinima.isolado : o.distanciaMinima.conjunto;
    for (const x of [bb.min.x, bb.max.x]) for (const y of [bb.min.y, bb.max.y]) for (const z of [bb.min.z, bb.max.z]) {
      const p = new THREE.Vector3(x, y, z).sub(centro), fundo = p.dot(dir);
      distancia = Math.max(distancia,
        fundo + Math.abs(p.dot(direita)) * margem / (tan * camera.aspect),
        fundo + Math.abs(p.dot(cima)) * margem / tan);
    }
    controls.minDistance = estado.isolado ? o.zoomMaximo.isolado : o.zoomMaximo.conjunto;
    controls.maxDistance = Math.max(24, distancia * 3);
    controls.target.copy(centro);
    return dir.multiplyScalar(distancia).add(centro);
  }

  function enquadra(instantaneo = false) {
    if (!medido) return;
    const proxima = posicaoQueEnquadra(camera.position.clone().sub(controls.target));
    if (instantaneo || movimentoReduzido.matches) { camera.position.copy(proxima); alvoDaCamera = null; }
    else alvoDaCamera = proxima;
    controls.update();
  }

  function vista(nome, instantaneo = false) {
    const direcao = o.direcoes[nome];
    if (!direcao) return;
    estado.vista = nome;
    alvoDaCamera = posicaoQueEnquadra(new THREE.Vector3(...direcao));
    if (instantaneo || movimentoReduzido.matches) { camera.position.copy(alvoDaCamera); alvoDaCamera = null; }
    todos('[data-view]').forEach(b => b.setAttribute('aria-pressed', b.dataset.view === nome));
    controls.update();
  }

  // ---------- explosão, isolamento, seleção ----------
  function aplicaExplosao(fator) {
    estado.explosao = fator;
    for (const [chave, grupo] of Object.entries(grupos)) grupo.position.copy(explosao[chave]).multiplyScalar(fator);
  }

  function expandir(fator) {
    if (estado.isolado) isolar(false);
    estado.alvoExplosao = Math.max(0, Math.min(1, fator));
    const aberto = estado.alvoExplosao > 0, porcento = Math.round(estado.alvoExplosao * 100);
    const barra = $('separation');
    if (barra) barra.value = porcento;
    escreve('separationValue', porcento + '%');
    const botao = $('explode');
    if (botao) { botao.setAttribute('aria-pressed', aberto); botao.children[1].textContent = aberto ? o.textos.montar : o.textos.explorar; }
    escreve('assemblyLabel', aberto ? o.textos.desmontado : o.textos.montado);
    if (movimentoReduzido.matches) aplicaExplosao(estado.alvoExplosao);
    enquadra();
  }

  function isolar(sim) {
    estado.isolado = sim;
    sincronizaVisibilidade();
    const botao = $('isolate');
    if (botao) { botao.setAttribute('aria-pressed', sim); botao.textContent = sim ? o.textos.mostrarConjunto : o.textos.isolar; }
    escreve('assemblyLabel', sim ? o.textos.isolado : estado.alvoExplosao > 0 ? o.textos.desmontado : o.textos.montado);
    enquadra();
  }

  function seleciona(chave) {
    const detalhe = o.detalhes[chave];
    if (!detalhe) return;
    const estavaIsolado = estado.isolado;
    estado.peca = chave;
    todos('[data-part]').forEach(b => b.setAttribute('aria-pressed', b.dataset.part === chave));
    const numero = document.querySelector('.panel-number');
    if (numero) numero.textContent = `${detalhe[0]} / ${String(todos('[data-part]').length).padStart(2, '0')}`;
    escreve('partKicker', detalhe[1]); escreve('partTitle', detalhe[2]); escreve('partText', detalhe[3]);
    if (o.aoSelecionar) o.aoSelecionar(chave, api, estavaIsolado);
    else if (estavaIsolado) isolar(true);
  }

  // ---------- navegação ----------
  function navegacao(modo) {
    estado.navegacao = modo;
    const movendo = modo === 'mover';
    controls.mouseButtons.LEFT = movendo ? THREE.MOUSE.PAN : THREE.MOUSE.ROTATE;
    controls.touches.ONE = movendo ? THREE.TOUCH.PAN : THREE.TOUCH.ROTATE;
    canvas.classList.toggle('camera-pan', movendo);
    canvas.classList.toggle('camera-orbit', !movendo);
    const botao = $('pan');
    if (botao) {
      botao.setAttribute('aria-pressed', movendo);
      botao.setAttribute('aria-label', movendo ? 'Desativar modo de mover a câmera' : 'Ativar modo de mover a câmera');
    }
    const dica = $('gestureHint');
    if (dica) dica.innerHTML = movendo ? o.textos.gestoMover : o.textos.gestoOrbita;
  }

  function paraDeGirar() {
    estado.girando = false;
    controls.autoRotate = false;
    alvoDaCamera = null;
    atualizaBotoesDeMovimento();
  }

  function atualizaBotoesDeMovimento() {
    $('rotate')?.setAttribute('aria-pressed', estado.girando);
    for (const item of alternadores) $(item.id)?.setAttribute('aria-pressed', estado[item.chave]);
  }

  // Liga ou desliga um botão do modelo. `alterna(chave)` sem valor inverte o que está lá.
  function alterna(chave, valor) {
    estado[chave] = valor === undefined ? !estado[chave] : !!valor;
    atualizaBotoesDeMovimento();
    if (o.aoAlternar) o.aoAlternar(chave, estado[chave], api);
  }

  function orbitaPeloTeclado(tecla) {
    const esferica = new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target));
    if (tecla === 'ArrowLeft') esferica.theta -= .12;
    if (tecla === 'ArrowRight') esferica.theta += .12;
    if (tecla === 'ArrowUp') esferica.phi -= .1;
    if (tecla === 'ArrowDown') esferica.phi += .1;
    if (tecla === '+' || tecla === '=') esferica.radius *= .94;
    if (tecla === '-') esferica.radius *= 1.06;
    esferica.phi = THREE.MathUtils.clamp(esferica.phi, .04, Math.PI - .04);
    esferica.radius = THREE.MathUtils.clamp(esferica.radius, controls.minDistance, controls.maxDistance);
    camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(esferica));
    controls.update();
  }

  function movePeloTeclado(tecla) {
    const passo = camera.position.distanceTo(controls.target) * .035;
    const direita = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 0);
    const cima = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 1);
    const delta = new THREE.Vector3();
    if (tecla === 'ArrowLeft') delta.addScaledVector(direita, passo);
    if (tecla === 'ArrowRight') delta.addScaledVector(direita, -passo);
    if (tecla === 'ArrowUp') delta.addScaledVector(cima, -passo);
    if (tecla === 'ArrowDown') delta.addScaledVector(cima, passo);
    camera.position.add(delta); controls.target.add(delta);
    controls.update();
  }

  // ---------- ligações da interface ----------
  function ligaInterface() {
    $('explode')?.addEventListener('click', () => expandir(estado.alvoExplosao > 0 ? 0 : 1));
    $('separation')?.addEventListener('input', e => expandir(Number(e.target.value) / 100));
    todos('[data-view]').forEach(b => b.addEventListener('click', () => { paraDeGirar(); vista(b.dataset.view); }));
    todos('[data-part]').forEach(b => b.addEventListener('click', () => seleciona(b.dataset.part)));
    $('reset')?.addEventListener('click', () => { paraDeGirar(); navegacao('orbita'); if (estado.isolado) isolar(false); vista(o.vistaInicial); });
    $('isolate')?.addEventListener('click', () => isolar(!estado.isolado));
    todos('[data-visible]').forEach(caixinha => caixinha.addEventListener('change', () => {
      // sair do isolamento preserva o que já estava oculto
      if (estado.isolado) for (const [chave, grupo] of Object.entries(grupos)) { if (grupo.visible) ocultas.delete(chave); else ocultas.add(chave); }
      if (caixinha.checked) ocultas.delete(caixinha.dataset.visible); else ocultas.add(caixinha.dataset.visible);
      isolar(false);
    }));
    $('showAll')?.addEventListener('click', () => { ocultas.clear(); isolar(false); vista(o.vistaInicial); });
    $('rotate')?.addEventListener('click', () => { estado.girando = !estado.girando; controls.autoRotate = estado.girando; alvoDaCamera = null; atualizaBotoesDeMovimento(); });
    $('pan')?.addEventListener('click', () => { paraDeGirar(); navegacao(estado.navegacao === 'mover' ? 'orbita' : 'mover'); });
    for (const item of alternadores) $(item.id)?.addEventListener('click', () => alterna(item.chave));
    $('fullscreen')?.addEventListener('click', async () => {
      try { if (document.fullscreenElement) await document.exitFullscreen(); else await document.querySelector('.viewer').requestFullscreen(); }
      catch { $('fullscreen').setAttribute('aria-label', 'Tela cheia indisponível neste navegador'); }
    });
    document.addEventListener('fullscreenchange', () => $('fullscreen')?.setAttribute('aria-label', document.fullscreenElement ? 'Sair da tela cheia' : 'Abrir visualizador em tela cheia'));
    $('snapshot')?.addEventListener('click', () => {
      renderer.render(scene, camera);
      const link = document.createElement('a');
      link.download = o.arquivoDaImagem; link.href = canvas.toDataURL('image/png'); link.click();
    });
    canvas.addEventListener('contextmenu', e => e.preventDefault());
    ligaCliqueNaPeca();
    canvas.addEventListener('keydown', e => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '+', '=', '-', 'Home'].includes(e.key)) return;
      e.preventDefault(); e.stopPropagation(); paraDeGirar();
      if (e.key === 'Home') { navegacao('orbita'); vista(o.vistaInicial); return; }
      if (estado.navegacao === 'mover' && e.key.startsWith('Arrow')) movePeloTeclado(e.key); else orbitaPeloTeclado(e.key);
    });
    new ResizeObserver(() => requestAnimationFrame(() => enquadra(true))).observe($('cena'));
    movimentoReduzido.addEventListener('change', () => {
      controls.enableDamping = !movimentoReduzido.matches;
      if (!movimentoReduzido.matches) return;
      for (const item of alternadores) if (item.movimento) alterna(item.chave, false);
      paraDeGirar(); aplicaExplosao(estado.alvoExplosao); enquadra(true);
    });
    canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); $('aviso').hidden = false; });
    canvas.addEventListener('webglcontextrestored', () => location.reload());
  }

  // Clique numa peça seleciona ela, sem roubar o arrasto da órbita.
  function ligaCliqueNaPeca() {
    let desceu = null;
    // Roda e gesto de pin?a tamb?m interrompem o enquadramento autom?tico.
    controls.addEventListener('start', paraDeGirar);
    canvas.addEventListener('pointerdown', e => { paraDeGirar(); desceu = { x: e.clientX, y: e.clientY }; });
    canvas.addEventListener('pointercancel', () => desceu = null);
    canvas.addEventListener('pointerup', e => {
      const andou = desceu ? Math.hypot(e.clientX - desceu.x, e.clientY - desceu.y) : Infinity;
      desceu = null;
      if (andou > 5) return;
      const r = canvas.getBoundingClientRect(), raio = new THREE.Raycaster();
      const ponto = o.pontoDoPonteiro
        ? o.pontoDoPonteiro(e, canvas)
        : new THREE.Vector2((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1);
      raio.setFromCamera(ponto, camera);
      const toque = raio.intersectObjects(Object.values(grupos).filter(g => g.visible), true)[0];
      let objeto = toque?.object;
      while (objeto && !objeto.userData.parte) objeto = objeto.parent;
      if (objeto) seleciona(objeto.userData.parte);
    });
  }

  // ---------- quadro a quadro ----------
  function aproximaCamera(dt) {
    // interpolar a órbita evita atravessar o objeto ao trocar frente e verso
    const atual = new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target));
    const alvo = new THREE.Spherical().setFromVector3(alvoDaCamera.clone().sub(controls.target));
    const alfa = 1 - Math.exp(-7 * dt);
    const volta = THREE.MathUtils.euclideanModulo(alvo.theta - atual.theta + Math.PI, Math.PI * 2) - Math.PI;
    atual.theta += volta * alfa;
    atual.phi = THREE.MathUtils.lerp(atual.phi, alvo.phi, alfa);
    atual.radius = THREE.MathUtils.lerp(atual.radius, alvo.radius, alfa);
    camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(atual));
    if (camera.position.distanceTo(alvoDaCamera) < .015) { camera.position.copy(alvoDaCamera); alvoDaCamera = null; }
  }

  function inicia({ tick } = {}) {
    ligaInterface();
    mede();
    sincronizaVisibilidade();
    aplicaExplosao(0);
    navegacao('orbita');
    vista(o.vistaInicial, true);
    atualizaBotoesDeMovimento();
    window[o.global] = { estado: estadoParaQA, pixels: pixelsParaQA };
    clearTimeout(window[o.global + 'LoadTimer']);
    $('loading').hidden = true;
    $('aviso').hidden = true;
    const relogio = new THREE.Clock();
    (function quadro() {
      requestAnimationFrame(quadro);
      const dt = Math.min(relogio.getDelta(), .05);
      if (document.hidden) return;
      if (Math.abs(estado.explosao - estado.alvoExplosao) > .001) aplicaExplosao(THREE.MathUtils.damp(estado.explosao, estado.alvoExplosao, 6, dt));
      else if (estado.explosao !== estado.alvoExplosao) aplicaExplosao(estado.alvoExplosao);
      if (alvoDaCamera) aproximaCamera(dt);
      if (tick) tick(dt, estado);
      controls.update();
      renderer.render(scene, camera);
    })();
  }

  // ---------- ganchos de QA ----------
  // Além do estado em português, repete as chaves em inglês que os scripts de QA dos
  // modelos anteriores já leem (moving, expanded, targetExpanded, visible, hidden, meshes).
  function estadoParaQA() {
    return {
      ...estado,
      hidden: [...ocultas], visible: Object.keys(grupos).filter(c => grupos[c].visible),
      moving: !!alvoDaCamera, expanded: estado.explosao, targetExpanded: estado.alvoExplosao,
      camera: camera.position.toArray(), meshes: renderer.info.render.calls,
    };
  }

  function pixelsParaQA() {
    modelo.updateMatrixWorld(true);
    camera.updateMatrixWorld();
    const bb = limites(estado.explosao), cantos = [];
    for (const x of [bb.min.x, bb.max.x]) for (const y of [bb.min.y, bb.max.y]) for (const z of [bb.min.z, bb.max.z]) cantos.push(palco.pixelDe(new THREE.Vector3(x, y, z)));
    const pecas = Object.fromEntries(Object.entries(grupos).filter(([, g]) => g.visible)
      .map(([chave, g]) => [chave, palco.pixelDe(new THREE.Box3().setFromObject(g).getCenter(new THREE.Vector3()))]));
    const r = canvas.getBoundingClientRect();
    return { corners: cantos, parts: pecas, rect: { left: r.left, top: r.top, right: r.right, bottom: r.bottom }, camera: camera.position.toArray(), target: controls.target.toArray(), fov: camera.fov, aspect: camera.aspect };
  }

  const api = { expandir, isolar, vista, seleciona, enquadra, alterna, estado, grupos };
  return {
    THREE, palco, scene, camera, renderer, controls, canvas, modelo, grupos, estado, movimentoReduzido,
    metal, caixa, cilindro: palco.cilindro, inscricao, textura, texturaDeCanvas, poligono, retangulo, furo, furoRedondo, desloca, extrusao,
    expandir, isolar, vista, seleciona, enquadra, alterna, inicia,
  };
}

// ---------- luz e órbita, iguais em todos os modelos ----------
function montaLuz(scene, renderer, luz) {
  scene.background = new THREE.Color(luz.fundo);
  scene.fog = null;
  // o palco comum vem com o sol quente das máquinas de madeira; aqui é estúdio frio
  scene.children.filter(f => f.isLight || f.material?.isShadowMaterial).forEach(f => scene.remove(f));
  renderer.toneMappingExposure = luz.exposicao;
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
  scene.add(new THREE.HemisphereLight(...luz.hemisferio));
  const principal = luzDirecional(scene, luz.principal);
  principal.castShadow = true;
  principal.shadow.mapSize.set(2048, 2048);
  Object.assign(principal.shadow.camera, { left: -luz.alcance, right: luz.alcance, top: luz.alcance, bottom: -luz.alcance });
  principal.shadow.bias = -.0003;
  principal.shadow.normalBias = .03;
  luz.apoio.forEach(a => luzDirecional(scene, a));
  // Onde a sombra cai: um chão embaixo (número = altura em y) serve pra peça que fica em pé,
  // como a placa de vídeo; uma placa vista de cima prefere um pano de fundo atrás dela
  // ({ eixo: 'z', em: -1 }), senão o chão vira uma mancha na vista de topo.
  const chao = new THREE.Mesh(new THREE.PlaneGeometry(160, 160), new THREE.ShadowMaterial({ opacity: .2 }));
  if (typeof luz.chao === 'object') chao.position.z = luz.chao.em;
  else { chao.rotation.x = -Math.PI / 2; chao.position.y = luz.chao; }
  chao.receiveShadow = true;
  scene.add(chao);
}

function luzDirecional(scene, { cor, forca, posicao }) {
  const fonte = new THREE.DirectionalLight(cor, forca);
  fonte.position.set(...posicao);
  scene.add(fonte);
  return fonte;
}

function configuraOrbita(controls) {
  controls.autoRotate = false;
  controls.autoRotateSpeed = .6;
  controls.enableDamping = !movimentoReduzido.matches;
  controls.dampingFactor = .065;
  controls.zoomSpeed = .32;
  controls.rotateSpeed = .58;
  controls.panSpeed = .72;
  controls.enablePan = true;
  controls.screenSpacePanning = true;
  controls.minPolarAngle = .03;
  controls.maxPolarAngle = Math.PI - .03;
  controls.mouseButtons.RIGHT = THREE.MOUSE.PAN;
  controls.touches.TWO = THREE.TOUCH.DOLLY_PAN;
}

function escreve(id, texto) {
  const el = document.getElementById(id);
  if (el) el.textContent = texto;
}
