// Base dos modelos 3D da serie — monta o "palco" comum e devolve os helpers.
// Cada maquina fica so com a geometria, a mecanica e o HUD dela.
// Uso: import { THREE, montaPalco } from './_base-modelo-3d.js'
// Precisa do importmap de three/three-addons no HTML (CDN jsdelivr).
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export { THREE, RoundedBoxGeometry, mergeGeometries };

// O modelo roda de dois jeitos: sozinho na propria pagina, ou embutido num iframe dentro
// da apresentacao do episodio. Algumas coisas so valem no segundo caso.
const EMBUTIDO = window.parent !== window;

// Embutido, o teclado fica preso aqui dentro assim que o usuario mexe no modelo: as setas
// de navegacao e o Esc nunca chegam na pagina de fora, e ela parece travada. Entao o modelo
// reenvia essas teclas por mensagem, e quem embutiu decide o que fazer com elas.
if (EMBUTIDO) {
  // a faixa de titulo do modelo repete o que a pagina de fora ja diz no topo dela:
  // embutido, ela so rouba altura do palco
  const faixa = document.querySelector('header');
  if (faixa) faixa.style.display = 'none';

  const recados = {
    ArrowRight: 'modelo-3d:proximo',
    ArrowLeft: 'modelo-3d:anterior',
    Escape: 'modelo-3d:fechar',
  };
  window.addEventListener('keydown', (e) => {
    const recado = recados[e.key];
    if (recado) window.parent.postMessage(recado, '*');
  });
}

export function montaPalco(opcoes = {}) {
  const o = Object.assign({
    alvo: [0, 2.5, 0],            // pra onde a camera olha
    camPos: [0, 4.2, 11.5],       // posicao inicial da camera
    meiaLarguraDesktop: 5.0,      // meia-largura da maquina que precisa caber na tela
    meiaLarguraMobile: 4.2,       //   (no estreito os rotulos somem e a camera afasta)
    distMin: 9.5,                 // distancia minima do enquadramento automatico
    orbitaMin: 5,                 // zoom maximo permitido ao usuario
    maxPolar: 1.5,                // trava pra camera nao passar por baixo do chao
    distMaxFixo: null,            // teto de zoom fora fixo (senao recalcula a cada resize)
  }, opcoes);

  const cont = document.getElementById('cena');
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xefe4cd);
  scene.fog = new THREE.Fog(0xefe4cd, 26, 60);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 90);
  camera.position.set(...o.camPos);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true });
  } catch (e) {
    document.getElementById('aviso').style.display = 'flex';
    throw e;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  cont.appendChild(renderer.domElement);

  // ambiente de reflexo: sem ele, material metalico fica escuro fora do angulo da luz
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(...o.alvo);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = o.orbitaMin;
  controls.maxDistance = 20;
  controls.maxPolarAngle = o.maxPolar;
  controls.autoRotate = true;               // gira sozinho ate o primeiro toque
  controls.autoRotateSpeed = 0.7;
  renderer.domElement.addEventListener('pointerdown', () => controls.autoRotate = false);

  // luz: sol quente da frente (com sombra), contra fria, e uma quente por tras (caixas abertas)
  scene.add(new THREE.AmbientLight(0xfff0da, 0.55));
  const sol = new THREE.DirectionalLight(0xffe8c4, 1.6);
  sol.position.set(6, 9, 7);
  sol.castShadow = true;
  sol.shadow.mapSize.set(2048, 2048);
  sol.shadow.camera.left = -8; sol.shadow.camera.right = 8;
  sol.shadow.camera.top = 9;   sol.shadow.camera.bottom = -2;
  sol.shadow.bias = -0.0004;
  scene.add(sol);
  const contra = new THREE.DirectionalLight(0xd8e2f0, 0.35);
  contra.position.set(-5, 4, -6);
  scene.add(contra);
  const tras = new THREE.DirectionalLight(0xffe8c4, 0.9);
  tras.position.set(2, 6, -9);
  scene.add(tras);

  const chao = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShadowMaterial({ opacity: 0.16 }));
  chao.rotation.x = -Math.PI / 2;
  chao.receiveShadow = true;
  scene.add(chao);

  const materiais = {
    madeira: new THREE.MeshStandardMaterial({ color: 0x7a5426, roughness: 0.62, envMapIntensity: 0.25 }),
    madeiraEscura: new THREE.MeshStandardMaterial({ color: 0x5e3f1c, roughness: 0.7, envMapIntensity: 0.25 }),
    latao: new THREE.MeshStandardMaterial({ color: 0xcfa85e, metalness: 0.75, roughness: 0.35, envMapIntensity: 0.6 }),
    metal: (cor, extra = {}) => new THREE.MeshStandardMaterial(
      Object.assign({ color: cor, metalness: 0.7, roughness: 0.42, envMapIntensity: 0.6 }, extra)),
  };

  // caixa de cantos arredondados com sombra — peca padrao de madeira/latao
  function bloco(w, h, d, mat, raio = 0.04) {
    const r = Math.min(raio, Math.min(w, h, d) * 0.45);
    const m = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, r), mat);
    m.castShadow = true; m.receiveShadow = true;
    return m;
  }

  // rotulo flutuante (some automaticamente no viewport estreito)
  const labelSprites = [];
  function criaRotulo(texto, escala = 1, alinha = 'center') {
    const cv = document.createElement('canvas');
    cv.width = 512; cv.height = 128;
    const cx = cv.getContext('2d');
    // O canvas e fixo em 512: texto mais comprido que isso era cortado no meio da
    // palavra (aparecia "aixa d'agua = pressa"). Mede e encolhe a fonte ate caber.
    const MARGEM = 24, corpoMax = cv.width - MARGEM * 2;
    let tamanho = 44;
    cx.font = `600 ${tamanho}px "IBM Plex Mono", monospace`;
    const largura = cx.measureText(texto).width;
    if (largura > corpoMax) {
      tamanho = Math.max(20, Math.floor(tamanho * corpoMax / largura));
      cx.font = `600 ${tamanho}px "IBM Plex Mono", monospace`;
    }
    cx.fillStyle = '#6d5b42';
    cx.textAlign = alinha; cx.textBaseline = 'middle';
    cx.fillText(texto, alinha === 'right' ? cv.width - MARGEM : cv.width / 2, 68);
    const tx = new THREE.CanvasTexture(cv);
    tx.anisotropy = 4;
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tx, transparent: true }));
    sp.scale.set(2.2 * escala, 0.55 * escala, 1);
    labelSprites.push(sp);
    return sp;
  }

  // Quanto a maquina precisa andar pra direita pra nao ficar atras do painel lateral.
  // Devolve 0 quando o painel esta no rodape (tela estreita) ou nao existe.
  function desvioDoPainel(w, estreito) {
    if (estreito) return 0;
    const painel = document.querySelector('.hud');
    if (!painel) return 0;
    const borda = painel.getBoundingClientRect().right;
    if (borda > w * 0.5) return 0;              // painel nao esta na lateral
    return (borda + 18) / 2;                    // centra a maquina no espaco que sobra
  }

  function redimensiona() {
    const w = cont.clientWidth, h = cont.clientHeight;
    const aspect = w / h;
    const estreito = aspect < 0.9;
    camera.fov = estreito ? 50 : 38;
    renderer.setSize(w, h);
    labelSprites.forEach((s) => s.visible = !estreito);

    // Desvio de projecao em vez de mexer no alvo: a orbita continua girando em volta
    // da maquina, mas ela e desenhada deslocada pra direita do painel. O truque e
    // renderizar a janela esquerda de um quadro virtual mais largo.
    const desvio = desvioDoPainel(w, estreito);
    if (desvio > 0) {
      camera.aspect = (w + 2 * desvio) / h;
      camera.setViewOffset(w + 2 * desvio, h, 0, 0, w, h);
    } else {
      camera.aspect = aspect;
      camera.clearViewOffset();                 // ja chama updateProjectionMatrix
      camera.updateProjectionMatrix();
    }

    const meia = estreito ? o.meiaLarguraMobile : o.meiaLarguraDesktop;
    // do lado direito sobra menos mundo por causa do desvio: e ele que tem que caber
    const aspectUtil = aspect * (1 - (2 * desvio) / w);
    const dist = Math.max(o.distMin, meia / (Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * aspectUtil));
    const dir = camera.position.clone().sub(controls.target).normalize();
    camera.position.copy(controls.target).add(dir.multiplyScalar(dist));
    controls.maxDistance = o.distMaxFixo ?? (dist + 6);
  }
  new ResizeObserver(redimensiona).observe(cont);
  redimensiona();

  // loop: a maquina passa so o tick(dt) com a mecanica dela
  function inicia(tick) {
    const relogio = new THREE.Clock();
    (function quadro() {
      requestAnimationFrame(quadro);
      const dt = Math.min(relogio.getDelta(), 0.05);
      if (tick) tick(dt);
      controls.update();
      renderer.render(scene, camera);
    })();
  }

  // clique por raycast sem roubar o drag da orbita (so dispara se o ponteiro andou pouco)
  function aoClicar(alvos, trata) {
    const ray = new THREE.Raycaster();
    const p2 = new THREE.Vector2();
    let desceu = null;
    renderer.domElement.addEventListener('pointerdown', (e) => { desceu = { x: e.clientX, y: e.clientY }; });
    renderer.domElement.addEventListener('pointerup', (e) => {
      if (!desceu) return;
      const andou = Math.hypot(e.clientX - desceu.x, e.clientY - desceu.y);
      desceu = null;
      if (andou > 8) return;
      const r = renderer.domElement.getBoundingClientRect();
      p2.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      p2.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      ray.setFromCamera(p2, camera);
      const hit = ray.intersectObjects(alvos)[0];
      if (hit) trata(hit);
    });
  }

  return { scene, camera, renderer, controls, materiais, bloco, criaRotulo, labelSprites, redimensiona, inicia, aoClicar };
}
