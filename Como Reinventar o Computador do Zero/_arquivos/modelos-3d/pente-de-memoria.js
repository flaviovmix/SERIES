// Pente de memória DDR5 (UDIMM de 32 GB): a placa comprida que entra no slot da
// placa-mãe. Medidas do módulo real — 133,35 × 31,25 mm, placa de 1,27 mm, 288
// contatos a 0,85 mm; 1 unidade da cena = 10 mm. O pente fica em pé, como no slot:
// x ao comprido, y pra cima (contatos embaixo), z a espessura.
//
// O que o modelo ensina: o dissipador não guarda nada; quem guarda são os oito
// chips, e os bits saem deles pelas trilhas até os contatos dourados. O botão
// "Lendo dados" mostra isso: pulsos descendo dos oito chips ao mesmo tempo.
import { THREE, montaVisualizador, mergeGeometries } from './_visualizador-pecas.js';

const MM = .1;
const u = valor => valor * MM;
const LARGURA_MM = 133.35, ALTURA_MM = 31.25, ESPESSURA_MM = 1.27;
const LARGURA = u(LARGURA_MM), ALTURA = u(ALTURA_MM), FACE = u(ESPESSURA_MM / 2);
// mm a partir do canto de baixo à esquerda (vista de frente) -> unidades a partir do centro
const mm = (x, y) => [u(x) - LARGURA / 2, u(y) - ALTURA / 2];

// ---------- a planta, em mm ----------
// 144 contatos por face: 76 à esquerda do entalhe e 68 à direita. O entalhe fora do
// centro é o que impede de encaixar o pente virado (posição ilustrativa).
const PASSO_CONTATO = .85, CONTATOS_ESQUERDA = 76, CONTATOS_POR_FACE = 144, VAO_DO_ENTALHE = 3.0;
const X_CONTATO_1 = 5.1;
const xDoContato = i => X_CONTATO_1 + i * PASSO_CONTATO + (i >= CONTATOS_ESQUERDA ? VAO_DO_ENTALHE - PASSO_CONTATO : 0);
const XS_CONTATOS = Array.from({ length: CONTATOS_POR_FACE }, (_, i) => xDoContato(i));
const ENTALHE = { x: xDoContato(CONTATOS_ESQUERDA - 1) + VAO_DO_ENTALHE / 2, largura: 1.8, altura: 4.2 };
const CONTATO = { largura: .6, altura: 3.3, base: .2 };
const TRAVA = { y: 16, raio: 1.6 };                          // meia-lua das laterais, onde a trava do slot prende

const CHIPS_X = [12.5, 25.5, 38.5, 51.5, 81.85, 94.85, 107.85, 120.85];
const CHIP = { y: 19.5, largura: 8.6, altura: 11.5, espessura: 1.0 };
const PMIC = { x: 66.7, y: 22.2 }, SPD = { x: 66.7, y: 11.6 };
const DISSIPADOR = { x0: 1.4, x1: LARGURA_MM - 1.4, y0: 5.4, y1: 33.8, espessura: 1.0, almofada: .3 };

const contatoMaisPerto = x => XS_CONTATOS.reduce((melhor, xc) => (Math.abs(xc - x) < Math.abs(melhor - x) ? xc : melhor));

// Trilhas de um chip até os contatos: descem retas, entortam e chegam cada uma num dedo.
// São as mesmas linhas que a textura desenha e que os pulsos de "Lendo dados" percorrem.
function trilhasDoChip(xc) {
  const trilhas = [];
  for (let k = 0; k < 10; k += 1) {
    const xi = xc - 3.2 + k * .71, xf = contatoMaisPerto(xc - 4.1 + k * .92);
    trilhas.push([[xi, CHIP.y - CHIP.altura / 2 - .3], [xi, 9.4], [xf, 6.0], [xf, CONTATO.base + CONTATO.altura]]);
  }
  return trilhas;
}

// ---------- o visualizador ----------
const v = montaVisualizador({
  global: '__penteDeMemoria',
  arquivoDaImagem: 'pente-de-memoria.png',
  pecas: {
    dissipador: { nome: 'Dissipador (frente)', explosao: [0, 3.4, 2.4] },
    dissipadorVerso: { nome: 'Dissipador (verso)', explosao: [0, 3.4, -2.4], parte: 'dissipador' },
    chips: { nome: 'Chips de memória', explosao: [0, 0, 1.3] },
    energia: { nome: 'Energia e SPD', explosao: [0, 0, 1.3] },
    placa: { nome: 'Placa de circuito', explosao: 0 },
    contatos: { nome: '288 contatos', explosao: 0 },
  },
  detalhes: {
    dissipador: ['01', 'CALOR PRA FORA', 'A capa de alumínio.', 'Os chips esquentam enquanto trabalham. As duas chapas encostam neles por uma almofada térmica e espalham o calor no ar. Não guardam nada: só protegem e resfriam.'],
    chips: ['02', 'ONDE MORAM OS BITS', 'Oito chips, 32 gigabytes.', 'Cada chip guarda 4 GB em bilhões de células, e cada célula é um capacitor minúsculo: carregado é 1, vazio é 0. A carga vaza sozinha, então o pente regrava tudo dezenas de vezes por segundo. Desligou, ninguém regrava: por isso a RAM esquece.'],
    energia: ['03', 'ENERGIA NO PRÓPRIO PENTE', 'O PMIC e o SPD.', 'No DDR5, quem ajusta a tensão dos chips saiu da placa-mãe e veio pro pente: é o PMIC, com as bobinas em volta. O chip pequeno embaixo, o SPD, guarda a ficha do pente, com tamanho, velocidade e tempos, e a placa-mãe lê essa ficha quando liga.'],
    placa: ['04', 'O CAMINHO DOS SINAIS', 'Várias camadas de cobre.', 'Por baixo do verde correm as trilhas que ligam cada chip aos contatos. A placa tem várias camadas de cobre empilhadas, e daqui só dá pra ver a de cima. As grades de pontos são onde as esferas de solda dos chips se prendem.'],
    contatos: ['05', 'SÓ ENTRA DE UM JEITO', '288 contatos dourados.', 'São 144 de cada lado, a menos de um milímetro um do outro. O entalhe fora do centro faz o pente entrar só na posição certa, e o DDR4 tem o entalhe em outro lugar: um não cabe no slot do outro.'],
  },
  direcoes: { perspective: [-5.5, 3.2, 13], front: [0, 0, 1], back: [0, 0, -1], side: [1, .15, .3] },
  textos: { montado: 'PENTE MONTADO', montar: 'Montar o pente' },
  palco: { alvo: [0, 0, 0], camPos: [-5.5, 3.2, 13], meiaLarguraDesktop: 7.6, meiaLarguraMobile: 7.6, distMin: 12, orbitaMin: 2, maxPolar: Math.PI },
  luz: { chao: -2.2, alcance: 9 },
  alternadores: [{ id: 'leitura', chave: 'leitura', inicial: true, movimento: true }],
  aoAlternar(chave, valor) { if (chave === 'leitura') for (const pulso of pulsos) pulso.malha.visible = valor; },
  // Cada peça abre no enquadramento que melhor conta a história dela.
  aoSelecionar(chave, api) {
    const passos = {
      dissipador: () => { api.expandir(0); api.vista('perspective'); },
      chips: () => { api.expandir(1); api.vista('front'); },
      energia: () => { api.isolar(true); api.vista('front'); },
      placa: () => { api.isolar(true); api.vista('front'); },
      contatos: () => { api.isolar(true); api.vista('front'); },
    };
    passos[chave]();
  },
});
const { grupos, caixa, inscricao, textura, metal, poligono, retangulo, extrusao } = v;
v.canvas.setAttribute('aria-label', 'Pente de memória DDR5 em três dimensões. Arraste para girar, botão direito move, role para aproximar. Os botões ao lado tiram o dissipador, separam os chips e mostram os dados saindo pelos contatos.');

// ---------- materiais ----------
const mats = {
  borda: new THREE.MeshStandardMaterial({ color: 0x173a29, roughness: .6, metalness: .05 }),
  ouro: metal(0xd9b24c, .24, .95), chip: metal(0x16181b, .5, .15), bobina: metal(0x3b3e42, .55, .35),
  ceramica: metal(0x8b7d6a, .6, .1), estanho: metal(0xb8b5ad, .45, .7),
  aluminio: metal(0x3c4148, .36, .82), almofada: new THREE.MeshStandardMaterial({ color: 0x8d99a3, roughness: .9, metalness: 0 }),
};

// ---------- as texturas da placa, pintadas em mm ----------
const LADO = 2048, K = LADO / LARGURA_MM, ALTO = Math.round(ALTURA_MM * K);
const px = x => x * K, py = y => ALTO - y * K;
const SERIGRAFIA = '#e8ece6', COBRE = 'rgba(92,160,112,.55)';

function texto(ctx, conteudo, x, y, altura, opcoes = {}) {
  const { alinha = 'center', peso = 'bold', cor = SERIGRAFIA, espelha = false } = opcoes;
  ctx.save();
  ctx.translate(px(x), py(y)); if (espelha) ctx.scale(-1, 1);
  ctx.fillStyle = cor; ctx.font = `${peso} ${altura * K}px Arial`; ctx.textAlign = alinha; ctx.textBaseline = 'middle';
  ctx.fillText(conteudo, 0, 0);
  ctx.restore();
}
function linhaPartida(ctx, pontos, largura, cor) {
  ctx.strokeStyle = cor; ctx.lineWidth = largura * K; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath();
  pontos.forEach(([x, y], i) => (i ? ctx.lineTo(px(x), py(y)) : ctx.moveTo(px(x), py(y))));
  ctx.stroke();
}
function granula(ctx, largura, altura, semente) {
  for (let i = 0; i < 9000; i += 1) {
    semente = (Math.imul(semente, 1664525) + 1013904223) >>> 0;
    const a = semente / 4294967296;
    semente = (Math.imul(semente, 1664525) + 1013904223) >>> 0;
    const b = semente / 4294967296;
    ctx.fillStyle = i % 2 ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.09)';
    ctx.fillRect(a * largura, b * altura, 2, 2);
  }
}
function contornoDoChip(ctx, xc) {
  ctx.strokeStyle = SERIGRAFIA; ctx.lineWidth = .18 * K;
  ctx.strokeRect(px(xc - CHIP.largura / 2 - .4), py(CHIP.y + CHIP.altura / 2 + .4), (CHIP.largura + .8) * K, (CHIP.altura + .8) * K);
}
// grade de ilhas embaixo do chip, onde as esferas de solda se prendem
function ilhasDoChip(ctx, xc) {
  ctx.fillStyle = '#c9c3a8';
  for (let coluna = 0; coluna < 6; coluna += 1) for (let linha = 0; linha < 13; linha += 1) {
    if (coluna === 2 || coluna === 3) continue;              // a coluna do meio fica vazia, como no encapsulamento real
    ctx.beginPath();
    ctx.arc(px(xc - 3.0 + coluna * 1.2), py(CHIP.y - 5.1 + linha * .85), .24 * K, 0, Math.PI * 2);
    ctx.fill();
  }
}

function desenhaPlacaFrente(ctx, largura, altura) {
  ctx.fillStyle = '#16402c'; ctx.fillRect(0, 0, largura, altura);
  granula(ctx, largura, altura, 5150);
  CHIPS_X.forEach((xc, i) => {
    for (const trilha of trilhasDoChip(xc)) linhaPartida(ctx, trilha, .13, COBRE);
    ilhasDoChip(ctx, xc);
    contornoDoChip(ctx, xc);
    texto(ctx, 'U' + (i + 1), xc, CHIP.y + CHIP.altura / 2 + 1.6, 1.3);
  });
  // capacitores de desacoplamento: uma fileira de ilhas entre os chips e os contatos
  ctx.fillStyle = '#c9c3a8';
  for (let x = 8; x < LARGURA_MM - 6; x += 3.2) if (Math.abs(x - PMIC.x) > 6) ctx.fillRect(px(x), py(8.3), .5 * K, .9 * K);
  texto(ctx, 'PMIC', PMIC.x, PMIC.y + 4.4, 1.2);
  texto(ctx, 'SPD', SPD.x, SPD.y - 2.0, 1.1);
  texto(ctx, 'SEIRES DDR5 UDIMM · REV 1.0', 30, 29.6, 1.25, { peso: '600' });
  texto(ctx, '1', X_CONTATO_1, 4.6, 1.0);
  texto(ctx, '288', XS_CONTATOS[CONTATOS_POR_FACE - 1], 4.6, 1.0);
}

// Vista de trás: o desenho segue as coordenadas do mundo (as trilhas ficam atrás
// dos contatos certos), mas o texto sai espelhado pra ler direito de trás.
function desenhaPlacaVerso(ctx, largura, altura) {
  ctx.fillStyle = '#16402c'; ctx.fillRect(0, 0, largura, altura);
  granula(ctx, largura, altura, 9091);
  for (const xc of CHIPS_X) for (const trilha of trilhasDoChip(xc).filter((_, k) => k % 2)) linhaPartida(ctx, trilha, .13, COBRE);
  ctx.fillStyle = '#f1efe8'; ctx.fillRect(px(40), py(27), 53 * K, 13 * K);
  ctx.fillStyle = '#1b1d1f';
  for (let i = 0; i < 46; i += 1) if ((i * 7) % 5 < 3) ctx.fillRect(px(44 + i * .5), py(18.2), .3 * K, 3.2 * K);
  texto(ctx, 'SEIRES · 32GB 1Rx8', 66.5, 24.4, 1.9, { espelha: true, cor: '#1b1d1f' });
  texto(ctx, 'PC5-6000 · 1,1 V', 66.5, 21.2, 1.4, { espelha: true, cor: '#3a3d40', peso: '600' });
}

function desenhaEtiqueta(ctx, largura, altura) {
  ctx.fillStyle = '#e9ebe7'; ctx.fillRect(0, 0, largura, altura);
  ctx.fillStyle = '#c9ff6e'; ctx.fillRect(0, 0, largura, altura * .12);
  ctx.fillStyle = '#16181b'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
  ctx.font = `800 ${altura * .34}px Arial`; ctx.fillText('SEIRES', largura * .05, altura * .45);
  ctx.font = `600 ${altura * .15}px Arial`; ctx.fillText('DDR5 · 32 GB · 6000 MT/s', largura * .05, altura * .75);
  ctx.textAlign = 'right'; ctx.font = `600 ${altura * .13}px Arial`; ctx.fillStyle = '#5a5f63';
  ctx.fillText('LAB 3D', largura * .95, altura * .45);
  ctx.fillText('1,1 V', largura * .95, altura * .75);
}

// A textura é pintada em mm; aqui ela passa a valer pelas coordenadas da forma.
function texturaDaFace(desenha) {
  const mapa = textura(desenha, LADO, ALTO);
  mapa.repeat.set(1 / LARGURA, 1 / ALTURA);
  mapa.offset.set(.5, .5);
  return mapa;
}

// ---------- a placa: contorno com o entalhe e as duas travas laterais ----------
function contornoDaPlaca() {
  const forma = new THREE.Shape(), chanfro = .8;
  const e0 = ENTALHE.x - ENTALHE.largura / 2, e1 = ENTALHE.x + ENTALHE.largura / 2;
  forma.moveTo(...mm(chanfro, 0));
  forma.lineTo(...mm(e0, 0)); forma.lineTo(...mm(e0, ENTALHE.altura));
  forma.absarc(...mm(ENTALHE.x, ENTALHE.altura), u(ENTALHE.largura / 2), Math.PI, 0, true);   // topo redondo do entalhe
  forma.lineTo(...mm(e1, 0));
  forma.lineTo(...mm(LARGURA_MM - chanfro, 0)); forma.lineTo(...mm(LARGURA_MM, chanfro));
  forma.lineTo(...mm(LARGURA_MM, TRAVA.y - TRAVA.raio));
  forma.absarc(...mm(LARGURA_MM, TRAVA.y), u(TRAVA.raio), -Math.PI / 2, Math.PI / 2, true);
  forma.lineTo(...mm(LARGURA_MM, ALTURA_MM)); forma.lineTo(...mm(0, ALTURA_MM));
  forma.lineTo(...mm(0, TRAVA.y + TRAVA.raio));
  forma.absarc(...mm(0, TRAVA.y), u(TRAVA.raio), Math.PI / 2, -Math.PI / 2, true);
  forma.lineTo(...mm(0, chanfro));
  forma.closePath();
  return forma;
}

function montaPlaca() {
  const g = grupos.placa, contorno = contornoDaPlaca();
  extrusao(g, contorno, u(ESPESSURA_MM), -FACE, mats.borda, 0);
  const face = (desenha, z, lado) => {
    const malha = new THREE.Mesh(new THREE.ShapeGeometry(contorno, 16), new THREE.MeshStandardMaterial({ map: texturaDaFace(desenha), roughness: .55, metalness: .08, side: lado }));
    malha.position.z = z; malha.receiveShadow = true;
    g.add(malha);
  };
  face(desenhaPlacaFrente, FACE + u(.02), THREE.FrontSide);
  face(desenhaPlacaVerso, -FACE - u(.02), THREE.BackSide);
  // capacitores de desacoplamento sobre as ilhas que a textura desenhou
  const xs = [];
  for (let x = 8; x < LARGURA_MM - 6; x += 3.2) if (Math.abs(x - PMIC.x) > 6) xs.push(x);
  const capacitores = new THREE.InstancedMesh(new THREE.BoxGeometry(u(.5), u(.9), u(.45)), mats.ceramica, xs.length);
  const molde = new THREE.Object3D();
  xs.forEach((x, i) => { molde.position.set(...mm(x + .25, 7.85), FACE + u(.25)); molde.updateMatrix(); capacitores.setMatrixAt(i, molde.matrix); });
  g.add(capacitores);
}

// ---------- os 288 contatos: 144 na frente, 144 atrás ----------
function montaContatos() {
  const dedo = new THREE.ExtrudeGeometry(retangulo(u(CONTATO.largura), u(CONTATO.altura), u(.22)), { depth: u(.035), bevelEnabled: false });
  const malha = new THREE.InstancedMesh(dedo, mats.ouro, CONTATOS_POR_FACE * 2);
  const molde = new THREE.Object3D();
  let i = 0;
  for (const x of XS_CONTATOS) for (const lado of [1, -1]) {
    const z = lado > 0 ? FACE + u(.02) : -FACE - u(.02) - u(.035);
    molde.position.set(...mm(x, CONTATO.base + CONTATO.altura / 2), z);
    molde.updateMatrix(); malha.setMatrixAt(i, molde.matrix); i += 1;
  }
  malha.castShadow = true;
  grupos.contatos.add(malha);
}

// ---------- os oito chips de memória ----------
function montaChips() {
  const g = grupos.chips, z = FACE + u(CHIP.espessura / 2), topo = FACE + u(CHIP.espessura) + u(.01);
  for (const xc of CHIPS_X) {
    const [cx, cy] = mm(xc, CHIP.y);
    caixa(g, u(CHIP.largura), u(CHIP.altura), u(CHIP.espessura), mats.chip, cx, cy, z, u(.12));
    inscricao(g, 'SEIRES', u(6.2), u(1.6), [cx, cy + u(2.2), topo], [0, 0, 0], '#b9bcbf', 96);
    inscricao(g, 'D5 32Gb', u(6.0), u(1.3), [cx, cy, topo], [0, 0, 0], '#9a9ea2', 88);
    inscricao(g, '2638 · x8', u(5.6), u(1.2), [cx, cy - u(2.0), topo], [0, 0, 0], '#7c8084', 80);
    const marca = new THREE.Mesh(new THREE.CircleGeometry(u(.45), 16), metal(0x2c3035, .6, .1));
    marca.position.set(cx - u(3.2), cy + u(4.7), topo);
    g.add(marca);
  }
}

// ---------- PMIC, bobinas e SPD: a parte de energia que o DDR5 trouxe pro pente ----------
function montaEnergia() {
  const g = grupos.energia, sobre = altura => FACE + u(altura / 2);
  const [pmx, pmy] = mm(PMIC.x, PMIC.y);
  caixa(g, u(4), u(4), u(.9), mats.chip, pmx, pmy, sobre(.9), u(.08));
  inscricao(g, 'PMIC', u(3.2), u(.9), [pmx, pmy, FACE + u(.92)], [0, 0, 0], '#b9bcbf', 96);
  for (const [dx, dy] of [[-5.2, 0], [5.2, 0], [-5.2, 5.2], [5.2, 5.2]]) {
    const [bx, by] = mm(PMIC.x + dx, PMIC.y + dy);
    caixa(g, u(3.2), u(3.2), u(1.4), mats.bobina, bx, by, sobre(1.4), u(.25));
    inscricao(g, 'R47', u(2.2), u(.7), [bx, by, FACE + u(1.42)], [0, 0, 0], '#c6c9cc', 90);
  }
  for (const [dx, dy] of [[-2.6, -2.6], [2.6, -2.6], [-2.6, 3.0], [2.6, 3.0], [0, -3.2]]) {
    const [cx, cy] = mm(PMIC.x + dx, PMIC.y + dy);
    caixa(g, u(1.0), u(.5), u(.5), mats.ceramica, cx, cy, sobre(.5), u(.05));
  }
  const [sx, sy] = mm(SPD.x, SPD.y);
  caixa(g, u(2.2), u(2.2), u(.7), mats.chip, sx, sy, sobre(.7), u(.06));
}

// ---------- o dissipador: duas chapas com almofada térmica por dentro ----------
function montaDissipador() {
  const d = DISSIPADOR, canto = 5.5;
  const forma = poligono([mm(d.x0, d.y0), mm(d.x1, d.y0), mm(d.x1, d.y1 - canto), mm(d.x1 - canto * 1.6, d.y1), mm(d.x0 + canto * 1.6, d.y1), mm(d.x0, d.y1 - canto)], u(1.1));
  const frente = FACE + u(CHIP.espessura + d.almofada), verso = -FACE - u(CHIP.espessura + d.almofada);
  extrusao(grupos.dissipador, forma, u(d.espessura), frente, mats.aluminio, u(.12));
  extrusao(grupos.dissipadorVerso, forma, u(d.espessura), verso - u(d.espessura), mats.aluminio, u(.12));
  // na frente a almofada encosta nos chips; atrás ela preenche o vão até a placa
  const largura = u(d.x1 - d.x0 - 6), meioY = mm(0, CHIP.y)[1];
  caixa(grupos.dissipador, largura, u(CHIP.altura), u(d.almofada), mats.almofada, 0, meioY, frente - u(d.almofada / 2), u(.05));
  caixa(grupos.dissipadorVerso, largura, u(CHIP.altura), u(CHIP.espessura + d.almofada), mats.almofada, 0, meioY, verso + u((CHIP.espessura + d.almofada) / 2), u(.05));
  const etiqueta = new THREE.Mesh(new THREE.PlaneGeometry(u(74), u(12.5)), new THREE.MeshStandardMaterial({ map: textura(desenhaEtiqueta, 1024, 173), roughness: .7, metalness: 0 }));
  etiqueta.position.set(0, mm(0, 21)[1], frente + u(d.espessura) + u(.15));
  grupos.dissipador.add(etiqueta);
}

// ---------- "Lendo dados": pulsos descendo dos oito chips ao mesmo tempo ----------
// Todos na mesma fase de propósito: os oito chips respondem juntos, cada um com a
// sua parte dos bits, e é essa leitura em paralelo que o modelo quer mostrar.
const pulsos = [];
function montaPulsos() {
  const material = new THREE.MeshBasicMaterial({ color: 0xc9ff6e });
  const bola = new THREE.SphereGeometry(u(.42), 10, 8);
  const z = FACE + u(.12);
  for (const xc of CHIPS_X) {
    trilhasDoChip(xc).filter((_, k) => k === 2 || k === 7).forEach((trilha, t) => {
      const pontos = trilha.map(([x, y]) => new THREE.Vector3(...mm(x, y), z));
      const caminho = new THREE.CurvePath();
      for (let i = 1; i < pontos.length; i += 1) caminho.add(new THREE.LineCurve3(pontos[i - 1], pontos[i]));
      const malha = new THREE.Mesh(bola, material);
      grupos.placa.add(malha);
      pulsos.push({ malha, caminho, atraso: t * .5 });
    });
  }
  posicionaPulsos(0);
  for (const pulso of pulsos) pulso.malha.visible = v.estado.leitura;   // movimento reduzido já nasce desligado
}

function posicionaPulsos(fase) {
  for (const pulso of pulsos) pulso.caminho.getPointAt((fase + pulso.atraso) % 1, pulso.malha.position);
}

let fase = 0;
function tick(dt, estado) {
  if (!estado.leitura) return;
  fase = (fase + dt * .55) % 1;
  posicionaPulsos(fase);
}

montaPlaca();
montaContatos();
montaChips();
montaEnergia();
montaDissipador();
montaPulsos();
v.inicia({ tick });
