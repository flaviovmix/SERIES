// Disco rígido (HD de 3,5 polegadas): onde os arquivos ficam quando o computador
// desliga. Medidas do formato real, 101,6 × 147 × 26,1 mm; 1 unidade da cena = 10 mm.
// O HD fica deitado na mesa: x na largura, z no comprimento (conectores no fundo),
// y pra cima.
//
// O que o modelo ensina: os bits moram na superfície dos pratos, que giram sem parar,
// e um braço leva as cabeças até a trilha certa. O botão "Lendo dados" mostra isso:
// o braço pula de trilha em trilha, espera o dado passar por baixo da cabeça, e os
// bits saem pelo braço até o cabo que desce pra placa.
import { THREE, montaVisualizador } from './_visualizador-pecas.js';

const MM = .1;
const u = valor => valor * MM;
const LARGURA_MM = 101.6, COMPRIMENTO_MM = 147, ALTURA_MM = 26.1;
const LARGURA = u(LARGURA_MM), COMPRIMENTO = u(COMPRIMENTO_MM), ALTURA = u(ALTURA_MM);
// A planta é desenhada em mm, olhando de cima: x da esquerda pra direita, y da frente
// pro fundo, onde ficam os conectores. `plano` dá o ponto de uma forma (que depois deita),
// `cx`/`cz` dão a posição na cena e `cy` a altura a partir do fundo do HD.
const plano = (x, y) => [u(x) - LARGURA / 2, u(y) - COMPRIMENTO / 2];
const cx = x => u(x) - LARGURA / 2, cz = y => COMPRIMENTO / 2 - u(y), cy = h => u(h) - ALTURA / 2;

// ---------- a planta, em mm ----------
const EIXO = { x: 50.8, y: 51.5 };                   // centro dos pratos
const PIVO = { x: 78, y: 114 };                      // eixo do braço
const PRATO = { raio: 47.5, furo: 12.5, espessura: 1.27 };
const PRATOS_H = [10, 14.5];                         // face de baixo de cada prato
const PAREDE = { lado: 3, fundo: 3, curva: 48.8 };   // por dentro, a parede acompanha a curva do prato
const PISO = { de: 3, ate: 5 };
const TAMPA = { de: 25.1, ate: 26.1 };
const BRACO_MM = 50;                                 // do eixo do braço até a cabeça
const BRACOS_H = [8.5, 12.9, 17.3];                  // centro de cada braço: embaixo, no meio e em cima
// Cada cabeça quase encosta numa face: a de baixo lê o prato 1 por baixo, o braço do
// meio leva duas, e a de cima lê o prato 2 por cima. Dois pratos, quatro faces.
const CABECAS = [{ braco: 0, h: 9.83 }, { braco: 1, h: 11.44 }, { braco: 1, h: 14.33 }, { braco: 2, h: 15.94 }];
const PARQUE_MM = 48.3;                              // raio em que a cabeça descansa na rampa
const TRILHAS_MM = [24, 43, 31, 38, 22, 45, 28, 35];
const CORTE = { x0: 8, x1: 58, altura: 9 };          // abertura no fundo por onde os conectores saem
const PLACA = { x0: 4, x1: 97.6, y0: 70, y1: 143.5, de: 1.2, ate: 2.8 };
const FUNDO_DOS_CONECTORES = 147.5;
// O circuito flexível: sai do lado do bloco em E, faz a curva e deita no piso, onde uma
// chapa prende o conector que atravessa a carcaça até a placa lógica.
const FLEX = {
  base: { x0: 38, x1: 57.5, y0: 110, y1: 126 },      // a ponta que deita no piso
  chapa: { x0: 44.5, x1: 53.5, y0: 111.5, y1: 124.5 },
  inicio: { baixo: 8.8, alto: 15 },                   // altura da fita saindo do bloco
  fim: { baixo: PISO.ate + .1, alto: 11.2 },          // e chegando no piso
};
const CAMINHO_DO_FLEX = [[69.8, 114.8], [66.5, 110], [61.5, 108.5], [58.6, 112], [57.5, 118]];
const PECINHAS_DO_FLEX = [[41.9, 113.7], [39.5, 113.7], [41.9, 116.5], [39.5, 116.5], [40.7, 121.3]];
// altura de baixo e de cima da fita em cada ponto do caminho (t de 0 a 1): sai alta do bloco e deita no piso
function alturaDoFlex(t) {
  const s = t * t * (3 - 2 * t);
  return [THREE.MathUtils.lerp(FLEX.inicio.baixo, FLEX.fim.baixo, s), THREE.MathUtils.lerp(FLEX.inicio.alto, FLEX.fim.alto, s)];
}

// Pra onde o braço aponta quando a cabeça está no raio r: é o encontro de dois círculos,
// um em volta do eixo dos pratos (raio r) e outro em volta do eixo do braço (o comprimento
// dele). Das duas soluções, fica a do lado da rampa.
function anguloDoBraco(r) {
  const dx = EIXO.x - PIVO.x, dy = EIXO.y - PIVO.y, d = Math.hypot(dx, dy);
  const ex = dx / d, ey = dy / d;
  const a = (BRACO_MM ** 2 - r ** 2 + d ** 2) / (2 * d), h = Math.sqrt(Math.max(0, BRACO_MM ** 2 - a ** 2));
  return Math.atan2(a * ey + h * ex, a * ex - h * ey);
}
const ANGULO_PARQUE = anguloDoBraco(PARQUE_MM);
const ANGULOS_DAS_TRILHAS = TRILHAS_MM.map(anguloDoBraco);

// ---------- o visualizador ----------
const v = montaVisualizador({
  global: '__discoRigido',
  arquivoDaImagem: 'disco-rigido.png',
  pecas: {
    // A tampa sai de lado, pra não cobrir nada de quem olha pela frente. Pratos e braço
    // ficam no lugar, lendo, que é o que vale ver com o HD aberto.
    tampa: { nome: 'Tampa', explosao: [10.8, 1.6, 0] },
    pratos: { nome: 'Pratos', explosao: 0 },
    braco: { nome: 'Braço e cabeças', explosao: 0 },
    ima: { nome: 'Ímã de cima', explosao: [0, 1.5, 0] },
    imaBaixo: { nome: 'Ímã de baixo', explosao: 0, parte: 'ima' },
    motor: { nome: 'Motor dos pratos', explosao: 0 },
    carcaca: { nome: 'Carcaça', explosao: 0 },
    placa: { nome: 'Placa lógica', explosao: [0, -1.5, 0] },
    conectores: { nome: 'Conectores SATA', explosao: [0, -1.5, 0] },
  },
  detalhes: {
    tampa: ['01', 'FECHADO SEM POEIRA', 'A tampa de aço.', 'O HD é montado numa sala limpa e fechado com esta tampa. A cabeça voa tão perto do prato que um grão de poeira ou de fumaça vira uma pedra no caminho. Por isso a etiqueta manda não abrir.'],
    pratos: ['02', 'ONDE MORAM OS BITS', 'Dois pratos espelhados.', 'Cada prato é um disco de alumínio ou vidro coberto por uma película magnética finíssima. Um bit é uma regiãozinha magnetizada pra um lado ou pro outro, e ela continua assim com o HD desligado. Os dois lados guardam dados: dois pratos, quatro faces, 4 TB.'],
    braco: ['03', 'LER SEM ENCOSTAR', 'O braço e as quatro cabeças.', 'Três braços empilhados levam quatro cabeças, uma pra cada face, que voam a poucos nanômetros do prato sem tocar nele. O sinal delas sai fraquinho: um pré-amplificador colado no bloco reforça, e a fita cor de cobre leva até o conector no piso. Com o HD parado, os braços descansam na rampa.'],
    ima: ['04', 'O MESMO MOTOR DO ALTO-FALANTE', 'Ímãs e bobina.', 'Na ponta de trás do braço fica uma bobina de cobre, presa entre dois ímãs fortíssimos. Passa corrente, a bobina é empurrada pro lado, como o cone de um alto-falante, e o braço gira no eixo. Atravessar o prato inteiro leva poucos milésimos de segundo.'],
    motor: ['05', '7.200 VOLTAS POR MINUTO', 'O motor dos pratos.', 'Os pratos encaixam no cubo deste motor e giram 120 vezes por segundo enquanto o HD trabalha. Pra ler um dado, a cabeça vai até a trilha certa e espera o pedaço certo passar por baixo dela. Essa espera é o que deixa o HD lento perto de um SSD.'],
    carcaca: ['06', 'UMA PEÇA SÓ DE ALUMÍNIO', 'A carcaça.', 'É um bloco de alumínio fundido. A parede em volta dos pratos segue a curva deles pra guiar o vento que o giro faz lá dentro, e o filtro branco na lateral pega qualquer partícula que se solte.'],
    placa: ['07', 'QUEM MANDA NO HD', 'A placa lógica.', 'Fica por baixo, do lado de fora. O controlador traduz o pedido do computador em trilha e setor, o chip de cache guarda o que acabou de passar pela cabeça e o driver comanda os dois motores: o dos pratos e o do braço.'],
    conectores: ['08', 'POR ONDE O DADO SAI', 'Os conectores SATA.', 'O maior, de 15 contatos, traz a energia de 5 e 12 volts. O menor, de 7, é o de dados: os bits entram e saem por ele a até 6 gigabits por segundo. O formato em L não deixa encaixar o cabo de cabeça pra baixo.'],
  },
  // A vista inicial é a das fotos de HD: pela traseira, com os conectores perto de quem
  // olha e o braço em primeiro plano. A de cima fica do mesmo lado, pra etiqueta ler direito.
  direcoes: { perspective: [-6, 11, -9.5], top: [0, 1, -.045], bottom: [0, -1, .045], back: [.35, .45, -1] },
  textos: { montado: 'HD MONTADO', desmontado: 'HD ABERTO', montar: 'Fechar o HD' },
  palco: { alvo: [0, 0, 0], camPos: [-6, 11, -9.5], meiaLarguraDesktop: 7.6, meiaLarguraMobile: 7.6, distMin: 12, orbitaMin: 2, maxPolar: Math.PI },
  // a luz principal vem do lado de quem olha: a sombra cai pra frente, escondida atrás do HD
  luz: {
    chao: -3.0, alcance: 11,
    principal: { cor: 0xf6f5ed, forca: 3.8, posicao: [-4, 10, -4] },
    // a terceira vem de baixo e só conta na vista de baixo: sem ela a placa lógica some no escuro
    apoio: [{ cor: 0xc8dbe1, forca: 2.2, posicao: [7, 4, 8] }, { cor: 0xe4f3ca, forca: 1.3, posicao: [-8, -1, 3] }, { cor: 0xe8efe9, forca: 2.6, posicao: [2, -10, 3] }],
  },
  alternadores: [{ id: 'leitura', chave: 'leitura', inicial: true, movimento: true }],
  aoAlternar(chave, valor) { if (chave === 'leitura') ligaLeitura(valor); },
  // Cada peça abre no enquadramento que melhor conta a história dela.
  aoSelecionar(chave, api) {
    const passos = {
      tampa: () => { api.expandir(0); api.vista('perspective'); },
      pratos: () => { api.expandir(1); api.vista('top'); },
      braco: () => { api.isolar(true); api.vista('perspective'); },
      ima: () => { api.isolar(true); api.vista('perspective'); },
      motor: () => { api.isolar(true); api.vista('perspective'); },
      carcaca: () => { api.isolar(true); api.vista('top'); },
      placa: () => { api.expandir(0); api.vista('bottom'); },
      conectores: () => { api.expandir(0); api.vista('back'); },
    };
    passos[chave]();
  },
});
const { grupos, caixa, inscricao, textura, metal, poligono } = v;
v.controls.zoomSpeed = .18;
v.canvas.setAttribute('aria-label', 'Disco rígido de 3,5 polegadas em três dimensões. Arraste para girar, botão direito move, role para aproximar. Os botões ao lado tiram a tampa, separam os pratos e mostram o braço lendo dados.');

// ---------- materiais ----------
const mats = {
  // a carcaça é de alumínio pintado de preto; prato, presilha e chapa do ímã são espelhos
  aluminio: metal(0x2e3136, .5, .45), tampa: metal(0xc9cdd2, .2, .92), prato: metal(0xe9ecef, .035, 1),
  cubo: metal(0xd5d9dd, .14, 1), estator: metal(0x4a4f55, .45, .7), parafuso: metal(0x8a9096, .3, .9),
  braco: metal(0xc4c9ce, .3, .9), mola: metal(0xd6dade, .26, .9), cabeca: metal(0x24272b, .5, .2),
  cobre: metal(0xbf7a3c, .32, .9), imaChapa: metal(0xdfe2e6, .28, 1), ima: metal(0x3d4146, .5, .5),
  escuro: new THREE.MeshStandardMaterial({ color: 0x0b0c0d, roughness: .9, metalness: 0 }),
  borracha: new THREE.MeshStandardMaterial({ color: 0x151618, roughness: .95, metalness: 0 }),
  rampa: new THREE.MeshStandardMaterial({ color: 0xd9902e, roughness: .5, metalness: .05 }),
  chapaFosca: metal(0xc3c7cb, .38, .9),
  plastico: new THREE.MeshStandardMaterial({ color: 0x1b1d20, roughness: .62, metalness: .05 }),
  flex: new THREE.MeshStandardMaterial({ color: 0xc58a2c, roughness: .45, metalness: .2, side: THREE.DoubleSide }),
  filtro: new THREE.MeshStandardMaterial({ color: 0xebebe4, roughness: .95, metalness: 0 }),
  borda: new THREE.MeshStandardMaterial({ color: 0x173a29, roughness: .6, metalness: .05 }),
  chip: metal(0x16181b, .5, .15), ceramica: metal(0x8b7d6a, .6, .1),
  furo: new THREE.MeshStandardMaterial({ color: 0x2a2d31, roughness: .8, metalness: .3 }),
};
// Estúdio escuro com painéis de luz, só pra refletir. Com o ambiente claro da casca o
// prato espelhado saía branco; o de verdade é um espelho escuro cortado por faixas de luz.
function ambienteDeEstudio() {
  const cena = new THREE.Scene();
  cena.add(new THREE.Mesh(new THREE.BoxGeometry(30, 18, 30), new THREE.MeshBasicMaterial({ color: 0x2b3035, side: THREE.BackSide })));
  const painel = (largura, altura, posicao, forca) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(largura, altura), new THREE.MeshBasicMaterial({ color: new THREE.Color().setScalar(forca), side: THREE.DoubleSide }));
    m.position.set(...posicao); m.lookAt(0, 0, 0);
    cena.add(m);
  };
  // O prato é um espelho: cada painel vira uma faixa de luz nele, conforme o ângulo. O de
  // cima fica deslocado pra vista de cima não refletir luz chapada (a trilha acesa sumia).
  painel(14, 2.5, [0, 8.5, 3.5], 3);                  // faixa em cima
  painel(4, 2.2, [3.2, 9, 8], 3);                     // o que a vista inicial vê no prato: uma faixa, não o prato todo
  painel(24, 24, [0, -9, 0], .7);                     // chão claro, que devolve um pouco de luz pra face de baixo
  painel(3, 12, [-13, 2, -5], 2.6);                   // faixa à esquerda
  painel(3, 12, [12, 2, 9], 2);                       // faixa à direita
  painel(12, 3, [2, 1, -14], 1.4);                    // rebatedor atrás
  const pmrem = new THREE.PMREMGenerator(v.renderer);
  const mapa = pmrem.fromScene(cena, .03).texture;
  pmrem.dispose();
  return mapa;
}
v.scene.environment = ambienteDeEstudio();

// ---------- helpers de forma, em mm ----------
// Uma forma da planta deitada, com espessura: de `de` até `ate` (mm de altura).
// Não usa a `extrusao` da casca porque os pratos pedem mais segmentos na curva.
function chapa(pai, forma, de, ate, material, { chanfro = 0, curvas = 12 } = {}) {
  const c = u(chanfro);
  const geometria = new THREE.ExtrudeGeometry(forma, { depth: Math.max(u(ate - de) - 2 * c, .001), bevelEnabled: c > 0, bevelSegments: 2, bevelSize: c, bevelThickness: c, curveSegments: curvas });
  const m = new THREE.Mesh(geometria, material);
  m.rotation.x = -Math.PI / 2;
  m.position.y = cy(de) + c;
  m.castShadow = true; m.receiveShadow = true;
  pai.add(m);
  return m;
}
// disco (ou anel, com furo) centrado na origem do grupo
function anel(raioFora, raioDentro = 0) {
  const forma = new THREE.Shape().absarc(0, 0, u(raioFora), 0, Math.PI * 2, false);
  if (raioDentro) forma.holes.push(new THREE.Path().absarc(0, 0, u(raioDentro), 0, Math.PI * 2, true));
  return forma;
}
// caixa pelos limites da planta (x0..x1, y0..y1) e da altura (h0..h1)
const bloco = (pai, x0, x1, y0, y1, h0, h1, material, raio = .3) =>
  caixa(pai, u(x1 - x0), u(h1 - h0), u(y1 - y0), material, cx((x0 + x1) / 2), cy((h0 + h1) / 2), cz((y0 + y1) / 2), u(raio));
// cilindro em pé, em coordenadas do grupo (x, z já na cena)
function tambor(pai, raio, h0, h1, material, x = 0, z = 0, lados = 48) {
  const m = v.cilindro(u(raio), u(h1 - h0), material, x, cy((h0 + h1) / 2), z, 'y', { lados });
  pai.add(m);
  return m;
}
// leque em volta do eixo do braço, pros ímãs: ângulos em radianos, raios em mm
function leque(a0, a1, r0, r1) {
  const [px, py] = plano(PIVO.x, PIVO.y), forma = new THREE.Shape();
  forma.moveTo(px + u(r1) * Math.cos(a0), py + u(r1) * Math.sin(a0));
  forma.absarc(px, py, u(r1), a0, a1, false);
  forma.lineTo(px + u(r0) * Math.cos(a1), py + u(r0) * Math.sin(a1));
  forma.absarc(px, py, u(r0), a1, a0, true);
  forma.closePath();
  return forma;
}

// ---------- texturas pintadas em mm ----------
const SERIGRAFIA = '#e8ece6', COBRE = 'rgba(92,160,112,.55)', ILHA = '#c9c3a8';
const COMPONENTES = {
  controlador: { x: 38, y: 104, w: 14, l: 14, t: 1.2, nome: 'U1', linhas: ['SEIRES', 'SR9 HDC', '2638'] },
  cache: { x: 64, y: 118, w: 12, l: 8, t: 1.0, nome: 'U2', linhas: ['DDR3', '256 MB'] },
  driver: { x: 72, y: 90, w: 10, l: 10, t: 1.0, nome: 'U3', linhas: ['MOTOR', 'VCM'] },
  flash: { x: 20, y: 124, w: 6, l: 5, t: .8, nome: 'U4', linhas: ['FLASH'] },
};
const CONECTORES = [{ x0: 10, x1: 32, contatos: 15 }, { x0: 35, x1: 47, contatos: 7 }];
const JUMPER = { x0: 50, x1: 56 };
const ETIQUETA = { x0: 7, x1: 94.6, y0: 58, y1: 141 };
const PARAFUSOS_DA_TAMPA = [[4.2, 4.2], [97.4, 4.2], [4.2, 142.8], [97.4, 142.8], [1.5, 100], [100.1, 100]];

// Pincéis da textura: mm da planta -> pixel do canvas (y cresce pro fundo do HD).
// `inverte` põe a letra de cabeça pra baixo, pra ler direito nas faces que só
// aparecem na vista de baixo, onde o fundo do HD fica embaixo na tela.
function pinceis(ctx, K, alturaPx) {
  const px = x => x * K, py = y => alturaPx - y * K;
  return {
    px, py,
    texto(conteudo, x, y, altura, { alinha = 'center', peso = 'bold', cor = SERIGRAFIA, inverte = false } = {}) {
      ctx.save();
      ctx.translate(px(x), py(y)); if (inverte) ctx.scale(1, -1);
      ctx.fillStyle = cor; ctx.font = `${peso} ${altura * K}px Arial`; ctx.textAlign = alinha; ctx.textBaseline = 'middle';
      ctx.fillText(conteudo, 0, 0);
      ctx.restore();
    },
    linha(pontos, largura, cor) {
      ctx.strokeStyle = cor; ctx.lineWidth = largura * K; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      ctx.beginPath();
      pontos.forEach(([x, y], i) => (i ? ctx.lineTo(px(x), py(y)) : ctx.moveTo(px(x), py(y))));
      ctx.stroke();
    },
    bola(x, y, raio, cor) { ctx.fillStyle = cor; ctx.beginPath(); ctx.arc(px(x), py(y), raio * K, 0, Math.PI * 2); ctx.fill(); },
  };
}
function granula(ctx, largura, altura, semente) {
  for (let i = 0; i < 12000; i += 1) {
    semente = (Math.imul(semente, 1664525) + 1013904223) >>> 0;
    const a = semente / 4294967296;
    semente = (Math.imul(semente, 1664525) + 1013904223) >>> 0;
    const b = semente / 4294967296;
    ctx.fillStyle = i % 2 ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.09)';
    ctx.fillRect(a * largura, b * altura, 2, 2);
  }
}

// Face de baixo da placa. O canvas cobre a planta inteira do HD (a forma da placa só
// usa a parte de trás dele), então cada coisa é pintada na posição de verdade.
function desenhaPlaca(ctx, largura, altura) {
  const K = largura / LARGURA_MM, p = pinceis(ctx, K, altura);
  ctx.fillStyle = '#16402c'; ctx.fillRect(0, 0, largura, altura);
  granula(ctx, largura, altura, 2638);
  const feixes = [
    [[38, 96], [38, 92], [66, 92]],                 // controlador -> driver
    [[46, 106], [57, 106], [57, 116]],              // controlador -> cache
    [[40, 112], [40, 136], [41, 143]],              // controlador -> conector de dados
    [[21, 143], [21, 132], [79, 132], [79, 96]],    // energia -> driver
    [[70, 84], [70, 77], [57, 73]],                 // driver -> motor dos pratos
    [[50, 116], [50, 110], [46, 110]],              // cabo do braço -> controlador
  ];
  for (const feixe of feixes) for (let k = -2; k <= 2; k += 1) p.linha(feixe.map(([x, y]) => [x + k * .8, y + k * .8]), .3, COBRE);
  for (const c of Object.values(COMPONENTES)) {
    ctx.strokeStyle = SERIGRAFIA; ctx.lineWidth = .22 * K;
    ctx.strokeRect(p.px(c.x - c.w / 2 - .7), p.py(c.y + c.l / 2 + .7), (c.w + 1.4) * K, (c.l + 1.4) * K);
    p.texto(c.nome, c.x - c.w / 2 - .7, c.y + c.l / 2 + 2.4, 1.8, { alinha: 'left', inverte: true });
  }
  // pontos de teste da fábrica e as três ilhas que alimentam o motor dos pratos
  for (let x = 9; x < 60; x += 3.2) for (const y of [77, 80]) p.bola(x, y, .55, ILHA);
  for (const x of [44, 50.8, 57.6]) p.bola(x, 72.6, 1.1, ILHA);
  ctx.strokeStyle = SERIGRAFIA; ctx.lineWidth = .22 * K;
  ctx.strokeRect(p.px(45), p.py(120), 10 * K, 4 * K);
  p.texto('J3', 50, 122.4, 1.5, { inverte: true });
  // etiqueta branca de fábrica, com código de barras
  ctx.fillStyle = '#f1efe8'; ctx.fillRect(p.px(74), p.py(112), 21 * K, 13 * K);
  ctx.fillStyle = '#1b1d1f';
  for (let i = 0; i < 40; i += 1) if ((i * 7) % 5 < 3) ctx.fillRect(p.px(76 + i * .42), p.py(104.5), .26 * K, 3.4 * K);
  p.texto('SR4000-2P', 84.5, 108.8, 2.1, { cor: '#1b1d1f', inverte: true });
  p.texto('SEIRES · SR4000', 80, 128.5, 2.4, { inverte: true });
  p.texto('PCB REV A · 2638', 80, 125, 1.6, { peso: '600', inverte: true });
}

// A etiqueta grande da tampa, em mm a partir do canto de cima. Ela lê de quem olha pela
// traseira, como nas fotos de HD: o alto dela aponta pros pratos.
function desenhaEtiqueta(ctx, largura, altura) {
  const K = largura / (ETIQUETA.x1 - ETIQUETA.x0), mm = v => v * K;
  const escreve = (conteudo, x, y, tamanho, peso = '600', cor = '#16181b', alinha = 'left') => {
    ctx.fillStyle = cor; ctx.textAlign = alinha; ctx.textBaseline = 'middle';
    ctx.font = `${peso} ${mm(tamanho)}px Arial`; ctx.fillText(conteudo, mm(x), mm(y));
  };
  ctx.fillStyle = '#e9ebe7'; ctx.fillRect(0, 0, largura, altura);
  ctx.fillStyle = '#c9ff6e'; ctx.fillRect(0, 0, largura, mm(5));
  escreve('SEIRES', 6, 14, 10, '800');
  escreve('LAB 3D', 81.6, 12.5, 3.2, '600', '#5a5f63', 'right');
  escreve('HD 3,5" · 4 TB', 6, 25, 5, '700');
  escreve('7200 RPM · SATA 6 Gb/s · 256 MB', 6, 32, 3, '600', '#3a3d40');
  ctx.fillStyle = '#b9bdb7'; ctx.fillRect(mm(6), mm(36.6), mm(75.6), mm(.35));
  escreve('MODELO  SR4000-2P', 6, 42, 2.8, '600', '#3a3d40');
  escreve('S/N  SR2638-0910', 6, 46.5, 2.8, '600', '#3a3d40');
  ctx.fillStyle = '#1b1d1f';
  for (let i = 0; i < 70; i += 1) if ((i * 11) % 7 < 4) ctx.fillRect(mm(30 + i * .62), mm(50), mm(.38), mm(8));
  escreve('+5 V  0,6 A   ·   +12 V  0,5 A', 6, 63, 2.8, '600', '#3a3d40');
  ctx.strokeStyle = '#16181b'; ctx.lineWidth = mm(.5); ctx.strokeRect(mm(6), mm(67), mm(75.6), mm(12));
  escreve('NÃO ABRA', 10, 71.4, 4, '800');
  escreve('Um grão de poeira arranha o prato.', 10, 76.2, 2.8, '600', '#3a3d40');
  // o furo por onde passa o parafuso do eixo do braço
  ctx.fillStyle = '#c4c7c2'; ctx.beginPath(); ctx.arc(mm(ETIQUETA.x1 - PIVO.x), mm(PIVO.y - ETIQUETA.y0), mm(3.4), 0, Math.PI * 2); ctx.fill();
}

// Adesivo redondo embaixo do motor (lido na vista de baixo).
function desenhaAdesivoDoMotor(ctx, largura, altura) {
  ctx.fillStyle = '#d9dcd6'; ctx.beginPath(); ctx.arc(largura / 2, altura / 2, largura / 2, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#1b1d1f'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.font = `800 ${largura * .13}px Arial`; ctx.fillText('SEIRES', largura / 2, altura * .38);
  ctx.font = `600 ${largura * .09}px Arial`; ctx.fillText('MOTOR 7200 RPM', largura / 2, altura * .55);
  ctx.fillStyle = '#5a5f63'; ctx.font = `600 ${largura * .07}px Arial`; ctx.fillText('NÃO REMOVER', largura / 2, altura * .69);
}

// A boca de um conector SATA vista de trás: abertura em L, a língua e os contatos.
function faceDoConector(larguraMM, contatos) {
  return (ctx, largura, altura) => {
    const K = largura / larguraMM, mm = v => v * K;
    ctx.fillStyle = '#1d1f22'; ctx.fillRect(0, 0, largura, altura);
    ctx.fillStyle = '#070809';
    ctx.fillRect(mm(.9), mm(1.0), mm(larguraMM - 1.8), mm(2.6));
    ctx.fillRect(mm(.9), mm(3.6), mm(1.7), mm(1.0));
    ctx.fillStyle = '#2b2d31'; ctx.fillRect(mm(2.8), mm(1.9), mm(larguraMM - 4.4), mm(.8));
    ctx.fillStyle = '#d9b24c';
    const passo = (larguraMM - 5.6) / (contatos - 1);
    for (let i = 0; i < contatos; i += 1) ctx.fillRect(mm(3.1 + i * passo), mm(2.7), mm(.55), mm(.5));
  };
}
function desenhaJumper(ctx, largura, altura) {
  const K = largura / (JUMPER.x1 - JUMPER.x0), mm = v => v * K;
  ctx.fillStyle = '#1d1f22'; ctx.fillRect(0, 0, largura, altura);
  ctx.fillStyle = '#d9b24c';
  for (let i = 0; i < 4; i += 1) for (let j = 0; j < 2; j += 1) ctx.fillRect(mm(.9 + i * 1.3), mm(1.5 + j * 1.6), mm(.6), mm(.6));
}

// O circuito flexível de perto: cobre-âmbar, trilhas mais claras, ilhas e letra branca.
const AMBAR = '#c7822b', TRILHA_DO_FLEX = '#eab45e';
function desenhaFitaDoFlex(ctx, largura, altura) {
  ctx.fillStyle = AMBAR; ctx.fillRect(0, 0, largura, altura);
  ctx.fillStyle = TRILHA_DO_FLEX;
  for (let i = 0; i < 7; i += 1) ctx.fillRect(0, altura * (.18 + i * .1), largura, altura * .035);
}
function desenhaLateralDoFlex(ctx, largura, altura) {
  ctx.fillStyle = AMBAR; ctx.fillRect(0, 0, largura, altura);
  ctx.fillStyle = TRILHA_DO_FLEX;
  for (let i = 0; i < 8; i += 1) ctx.fillRect(largura * (.08 + i * .11), 0, largura * .03, altura * .42);   // sobem pros braços
  for (let i = 0; i < 5; i += 1) ctx.fillRect(0, altura * (.78 + i * .04), largura * .45, altura * .018);  // descem pra fita
}
// A ponta que deita no piso. No canvas o mm corre da borda direita (x1) pra esquerda e da
// frente (y0) pro fundo, porque a peça deita virada pra ler de quem olha pela traseira.
function desenhaBaseDoFlex(ctx, largura, altura) {
  const b = FLEX.base, K = largura / (b.x1 - b.x0), mm = v => v * K;
  const noCanvas = (x, y) => [mm(b.x1 - x), mm(y - b.y0)];
  ctx.fillStyle = AMBAR; ctx.fillRect(0, 0, largura, altura);
  ctx.fillStyle = TRILHA_DO_FLEX;                     // chegam da fita pela direita e somem debaixo da chapa
  for (let i = 0; i < 6; i += 1) { const [u0, v0] = noCanvas(b.x1, 115.6 + i * .8); ctx.fillRect(u0, v0, mm(14), mm(.28)); }
  ctx.fillStyle = '#e3c98f';
  for (const [x, y] of PECINHAS_DO_FLEX) { const [cu, cv] = noCanvas(x, y); ctx.fillRect(cu - mm(.7), cv - mm(.45), mm(1.4), mm(.9)); }
  ctx.fillStyle = '#f3efe4'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const [tu, tv] = noCanvas(40.7, 118.9), [su, sv] = noCanvas(40.7, 124.3);
  ctx.font = `700 ${mm(1.3)}px Arial`; ctx.fillText('SEIRES', tu, tv);
  ctx.font = `600 ${mm(1.0)}px Arial`; ctx.fillText('HSA 4H', su, sv);
}

// A textura é pintada em mm da planta; aqui ela passa a valer pelas coordenadas da forma.
function texturaDaPlanta(desenha) {
  const largura = 1400, mapa = textura(desenha, largura, Math.round(largura * COMPRIMENTO_MM / LARGURA_MM));
  mapa.repeat.set(1 / LARGURA, 1 / COMPRIMENTO);
  mapa.offset.set(.5, .5);
  return mapa;
}

// ---------- parafuso: cabeça redonda com o sextavado escuro no meio ----------
function parafuso(pai, x, y, h, raio = 1.7) {
  tambor(pai, raio, h, h + .45, mats.parafuso, cx(x), cz(y), 20);
  const sextavado = new THREE.Mesh(new THREE.CircleGeometry(u(raio * .42), 6), mats.furo);
  sextavado.rotation.x = -Math.PI / 2;
  sextavado.position.set(cx(x), cy(h + .45) + .002, cz(y));
  pai.add(sextavado);
}

// ---------- a carcaça: parede que abraça o prato, piso, rampa e filtro ----------
// Por dentro, a parede segue a curva do prato na frente e fica reta dos lados e no fundo.
const LADO_ESQ = PAREDE.lado, LADO_DIR = LARGURA_MM - PAREDE.lado, FUNDO = COMPRIMENTO_MM - PAREDE.fundo;
const Y_CURVA = EIXO.y - Math.sqrt(PAREDE.curva ** 2 - (EIXO.x - LADO_ESQ) ** 2);
const A_ESQ = Math.atan2(Y_CURVA - EIXO.y, LADO_ESQ - EIXO.x), A_DIR = Math.atan2(Y_CURVA - EIXO.y, LADO_DIR - EIXO.x);

// o contorno de dentro: desce pela esquerda, contorna a frente do prato e sobe pela direita
function contornoDeDentro(caminho, comeca = true) {
  if (comeca) caminho.moveTo(...plano(LADO_ESQ, FUNDO)); else caminho.lineTo(...plano(LADO_ESQ, FUNDO));
  caminho.lineTo(...plano(LADO_ESQ, Y_CURVA));
  caminho.absarc(...plano(EIXO.x, EIXO.y), u(PAREDE.curva), A_ESQ, A_DIR, false);
  caminho.lineTo(...plano(LADO_DIR, FUNDO));
  return caminho;
}

function montaCarcaca() {
  const g = grupos.carcaca;
  const retanguloDeFora = caminho => {
    caminho.moveTo(...plano(0, 0)); caminho.lineTo(...plano(LARGURA_MM, 0));
    caminho.lineTo(...plano(LARGURA_MM, COMPRIMENTO_MM)); caminho.lineTo(...plano(0, COMPRIMENTO_MM));
    caminho.closePath();
    return caminho;
  };
  // parede de cima: anel inteiro
  const deCima = retanguloDeFora(new THREE.Shape());
  deCima.holes.push(contornoDeDentro(new THREE.Path()));
  chapa(g, deCima, CORTE.altura, TAMPA.de, mats.aluminio, { curvas: 24 });
  // parede de baixo: a mesma, com a abertura dos conectores no fundo (vira um C)
  const deBaixo = new THREE.Shape();
  deBaixo.moveTo(...plano(CORTE.x1, COMPRIMENTO_MM));
  deBaixo.lineTo(...plano(LARGURA_MM, COMPRIMENTO_MM)); deBaixo.lineTo(...plano(LARGURA_MM, 0));
  deBaixo.lineTo(...plano(0, 0)); deBaixo.lineTo(...plano(0, COMPRIMENTO_MM));
  deBaixo.lineTo(...plano(CORTE.x0, COMPRIMENTO_MM)); deBaixo.lineTo(...plano(CORTE.x0, FUNDO));
  contornoDeDentro(deBaixo, false);
  deBaixo.lineTo(...plano(CORTE.x1, FUNDO));
  deBaixo.closePath();
  chapa(g, deBaixo, 0, CORTE.altura, mats.aluminio, { curvas: 24 });
  // piso: por baixo dele fica o vão da placa lógica
  chapa(g, contornoDeDentro(new THREE.Shape()), PISO.de, PISO.ate, mats.aluminio, { curvas: 24 });
  // por dentro, uma parede fina fecha a abertura dos conectores acima do piso; ela entra
  // 2 mm na parede de cima pra quina arredondada não virar um risco na emenda
  bloco(g, CORTE.x0, CORTE.x1, FUNDO, FUNDO + 1, PISO.de, CORTE.altura + 2, mats.aluminio, .05);
  // rampa onde as cabeças estacionam e o filtro que pega a poeira de dentro
  bloco(g, 96.8, LADO_DIR, 64, 72, 7.5, 18.5, mats.rampa, .2);
  bloco(g, LADO_ESQ + .2, LADO_ESQ + 2, 72, 88, 6, 21, mats.filtro, .3);
  // roscas cromadas: três de fixação em cada lateral e as dos parafusos da tampa, no alto da parede
  const anelDaRosca = new THREE.RingGeometry(u(.85), u(1.4), 20), miolo = new THREE.CircleGeometry(u(.85), 16);
  const rosca = (posicao, rotacao) => {
    for (const [geometria, material] of [[anelDaRosca, mats.cubo], [miolo, mats.escuro]]) {
      const m = new THREE.Mesh(geometria, material);
      m.position.copy(posicao); m.rotation.set(...rotacao);
      g.add(m);
    }
  };
  for (const y of [28.5, 70.1, 130]) for (const lado of [-1, 1]) rosca(new THREE.Vector3(lado * (LARGURA / 2 + .002), cy(6.35), cz(y)), [0, lado * Math.PI / 2, 0]);
  for (const [x, y] of PARAFUSOS_DA_TAMPA) rosca(new THREE.Vector3(cx(x), cy(TAMPA.de) + .002, cz(y)), [-Math.PI / 2, 0, 0]);
  parafuso(g, 97.7, 68, 18.5, .8);                    // o parafuso que prende a rampa
}

// ---------- a tampa de aço, com a etiqueta e os parafusos ----------
function montaTampa() {
  const g = grupos.tampa;
  const forma = poligono([plano(0, 0), plano(LARGURA_MM, 0), plano(LARGURA_MM, COMPRIMENTO_MM), plano(0, COMPRIMENTO_MM)], u(1.2));
  chapa(g, forma, TAMPA.de, TAMPA.ate, mats.tampa, { chanfro: .25 });
  // a estampa rasa em cima do prato, como nas tampas de verdade
  const estampa = new THREE.Group();
  estampa.position.set(cx(EIXO.x), 0, cz(EIXO.y));
  g.add(estampa);
  // um friso baixo e arredondado: um degrau reto de 0,2 mm ficava fino demais na tela e
  // aparecia pontilhado
  const friso = new THREE.Mesh(new THREE.TorusGeometry(u(46.5), u(.45), 8, 160), mats.tampa);
  friso.rotation.x = -Math.PI / 2; friso.scale.z = .35;
  friso.position.y = cy(TAMPA.ate);
  estampa.add(friso);
  const largura = 1200, altura = Math.round(largura * (ETIQUETA.y1 - ETIQUETA.y0) / (ETIQUETA.x1 - ETIQUETA.x0));
  const etiqueta = new THREE.Mesh(
    new THREE.PlaneGeometry(u(ETIQUETA.x1 - ETIQUETA.x0), u(ETIQUETA.y1 - ETIQUETA.y0)),
    new THREE.MeshStandardMaterial({ map: textura(desenhaEtiqueta, largura, altura), roughness: .7, metalness: 0, polygonOffset: true, polygonOffsetFactor: -2 }));
  etiqueta.rotation.set(-Math.PI / 2, 0, Math.PI);            // meia volta: o alto do texto aponta pros pratos
  etiqueta.position.set(cx((ETIQUETA.x0 + ETIQUETA.x1) / 2), cy(TAMPA.ate + .25), cz((ETIQUETA.y0 + ETIQUETA.y1) / 2));
  etiqueta.receiveShadow = true;
  g.add(etiqueta);
  for (const [x, y] of PARAFUSOS_DA_TAMPA) parafuso(g, x, y, TAMPA.ate);
  parafuso(g, EIXO.x, EIXO.y, TAMPA.ate, 2.2);               // o do eixo dos pratos
  parafuso(g, PIVO.x, PIVO.y, TAMPA.ate + .25, 2.2);         // o do eixo do braço, pelo furo da etiqueta
}

// ---------- o motor dos pratos: estator parado, cubo girando ----------
let giroDoCubo;
function montaMotor() {
  const g = grupos.motor;
  tambor(g, 13.5, PISO.ate, 8.6, mats.estator, cx(EIXO.x), cz(EIXO.y), 48);
  // por baixo do piso aparece a barriga do motor, com o adesivo
  tambor(g, 16, 1.0, PISO.de, mats.estator, cx(EIXO.x), cz(EIXO.y), 48);
  const adesivo = new THREE.Mesh(new THREE.CircleGeometry(u(12), 48), new THREE.MeshStandardMaterial({ map: textura(desenhaAdesivoDoMotor, 512, 512), roughness: .7, metalness: 0 }));
  adesivo.rotation.x = Math.PI / 2;
  adesivo.position.set(cx(EIXO.x), cy(1.0) - .002, cz(EIXO.y));
  g.add(adesivo);
  giroDoCubo = new THREE.Group();
  giroDoCubo.position.set(cx(EIXO.x), 0, cz(EIXO.y));
  g.add(giroDoCubo);
  tambor(giroDoCubo, 15, 8.6, PRATOS_H[0], mats.cubo, 0, 0, 64);            // a aba onde o prato de baixo apoia
  tambor(giroDoCubo, PRATO.furo - .1, PRATOS_H[0], 15.6, mats.cubo, 0, 0, 64);
  // os seis furos de rosca da presilha, que mostram o cubo girando quando os pratos saem
  for (let i = 0; i < 6; i += 1) {
    const a = i * Math.PI / 3, furo = new THREE.Mesh(new THREE.CircleGeometry(u(.9), 12), mats.furo);
    furo.rotation.x = -Math.PI / 2;
    furo.position.set(u(9.5) * Math.cos(a), cy(15.6) + .002, u(9.5) * Math.sin(a));
    giroDoCubo.add(furo);
  }
}

// ---------- os pratos: dois discos, espaçador, presilha e as trilhas de "Lendo dados" ----------
let giroDosPratos;
const trilhas = [];
function montaPratos() {
  const g = grupos.pratos;
  giroDosPratos = new THREE.Group();
  giroDosPratos.position.set(cx(EIXO.x), 0, cz(EIXO.y));
  g.add(giroDosPratos);
  for (const h of PRATOS_H) chapa(giroDosPratos, anel(PRATO.raio, PRATO.furo), h, h + PRATO.espessura, mats.prato, { curvas: 72, chanfro: .12 });
  chapa(giroDosPratos, anel(16, PRATO.furo), PRATOS_H[0] + PRATO.espessura, PRATOS_H[1], mats.cubo, { curvas: 48 });
  // a presilha: um disco abaulado que aperta o prato de cima contra o cubo, com oito
  // parafusos em roda e a porca sextavada no centro
  const topo = PRATOS_H[1] + PRATO.espessura;
  const perfil = [[17, 0], [17.3, .35], [16.6, .9], [12.5, 1.25], [7, 1.45], [.01, 1.45]].map(([r, h]) => new THREE.Vector2(u(r), u(h)));
  const presilha = new THREE.Mesh(new THREE.LatheGeometry(perfil, 72), mats.cubo);
  presilha.position.y = cy(topo); presilha.castShadow = true; presilha.receiveShadow = true;
  giroDosPratos.add(presilha);
  for (let i = 0; i < 8; i += 1) {
    const a = i * Math.PI / 4, x = u(10.2) * Math.cos(a), z = u(10.2) * Math.sin(a);
    tambor(giroDosPratos, 1.15, topo + 1.3, topo + 1.75, mats.parafuso, x, z, 16);
    const sextavado = new THREE.Mesh(new THREE.CircleGeometry(u(.5), 6), mats.furo);
    sextavado.rotation.x = -Math.PI / 2; sextavado.position.set(x, cy(topo + 1.75) + .002, z);
    giroDosPratos.add(sextavado);
  }
  tambor(giroDosPratos, 4.6, topo + 1.45, topo + 2.1, mats.parafuso, 0, 0, 6);
  // a marca de balanceamento: um ponto escuro que deixa ver o giro
  tambor(giroDosPratos, 1.0, topo + .95, topo + 1.2, mats.furo, u(14.5), 0, 16);
  montaTrilhas();
}

// Uma trilha por raio de TRILHAS_MM: a faixa acesa e os bits dela, tracinhos onde o
// prato guarda 1 e vão onde guarda 0. Só a trilha que a cabeça está lendo aparece.
function montaTrilhas() {
  const materialDoBit = new THREE.MeshBasicMaterial({ color: 0xc9ff6e });
  const materialDaFaixa = new THREE.MeshBasicMaterial({ color: 0xc9ff6e, transparent: true, opacity: .3, depthWrite: false, side: THREE.DoubleSide });
  const materialDoSulco = new THREE.MeshBasicMaterial({ color: 0x0b0d0c, transparent: true, opacity: .5, depthWrite: false, side: THREE.DoubleSide });
  const bit = new THREE.BoxGeometry(u(1.8), u(.08), u(.8));
  const altura = cy(PRATOS_H[1] + PRATO.espessura) + u(.06), molde = new THREE.Object3D();
  for (const r of TRILHAS_MM) {
    const trilha = new THREE.Group();
    // um sulco escuro por baixo da faixa: sem ele, a trilha some onde o espelho reflete luz
    const sulco = new THREE.Mesh(new THREE.RingGeometry(u(r - 1.2), u(r + 1.2), 128), materialDoSulco);
    sulco.rotation.x = -Math.PI / 2; sulco.position.y = altura - u(.05); sulco.renderOrder = 1;
    trilha.add(sulco);
    const faixa = new THREE.Mesh(new THREE.RingGeometry(u(r - .6), u(r + .6), 128), materialDaFaixa);
    faixa.rotation.x = -Math.PI / 2; faixa.position.y = altura - u(.03); faixa.renderOrder = 2;
    trilha.add(faixa);
    const vagas = Math.floor(2 * Math.PI * r / 2.4), angulos = [];
    let semente = r * 7919;
    for (let i = 0; i < vagas; i += 1) {
      semente = (Math.imul(semente, 1664525) + 1013904223) >>> 0;
      if (semente / 4294967296 > .42) angulos.push(i / vagas * Math.PI * 2);
    }
    const bits = new THREE.InstancedMesh(bit, materialDoBit, angulos.length);
    angulos.forEach((a, i) => {
      molde.position.set(u(r) * Math.cos(a), altura, u(r) * Math.sin(a));
      molde.rotation.set(0, -a - Math.PI / 2, 0);
      molde.updateMatrix(); bits.setMatrixAt(i, molde.matrix);
    });
    trilha.add(bits);
    trilha.visible = false;
    giroDosPratos.add(trilha);
    trilhas.push(trilha);
  }
}

// ---------- os ímãs do motor do braço: um em cima e um embaixo da bobina ----------
// O leque cobre todo o caminho que a bobina faz, com folga dos dois lados.
function montaIma() {
  const angulos = [...ANGULOS_DAS_TRILHAS, ANGULO_PARQUE];
  const a0 = Math.min(...angulos) + Math.PI - .42, a1 = Math.max(...angulos) + Math.PI + .42;
  chapa(grupos.ima, leque(a0 + .04, a1 - .04, 9.5, 27), 13.6, 14.6, mats.ima, { curvas: 24 });
  chapa(grupos.ima, leque(a0, a1, 8.5, 28), 14.6, 16.4, mats.imaChapa, { curvas: 24, chanfro: .2 });
  for (const a of [a0 + .14, a1 - .14]) parafuso(grupos.ima, PIVO.x + 24 * Math.cos(a), PIVO.y + 24 * Math.sin(a), 16.4, 1.3);
  chapa(grupos.imaBaixo, leque(a0, a1, 8.5, 28), PISO.ate, 6.6, mats.imaChapa, { curvas: 24 });
  chapa(grupos.imaBaixo, leque(a0 + .04, a1 - .04, 9.5, 27), 6.6, 7.6, mats.ima, { curvas: 24 });
  // os batentes de borracha que param a bobina nas duas pontas do curso
  for (const a of [a0 - .12, a1 + .12]) tambor(grupos.imaBaixo, 1.1, 7.6, 13.6, mats.borracha, cx(PIVO.x + 22 * Math.cos(a)), cz(PIVO.y + 22 * Math.sin(a)), 16);
}

// ---------- o braço: eixo, três braços, quatro cabeças, bobina, cabo e suporte ----------
// O que gira fica em `pivo`, com a origem no eixo do braço e o x local apontando pra
// cabeça. O cabo flexível e o suporte ficam parados: são o caminho do sinal até a placa.
// Lâmina fina e afunilada entre dois pontos do braço ([x local, altura], em mm), como a
// mola que segura a cabeça: larga na raiz, estreita na ponta.
function lamina(pai, [x0, h0], [x1, h1], larguraRaiz, larguraPonta, material) {
  const comprimento = u(Math.hypot(x1 - x0, h1 - h0));
  const forma = new THREE.Shape([
    new THREE.Vector2(0, -u(larguraRaiz / 2)), new THREE.Vector2(comprimento, -u(larguraPonta / 2)),
    new THREE.Vector2(comprimento, u(larguraPonta / 2)), new THREE.Vector2(0, u(larguraRaiz / 2)),
  ]);
  const m = new THREE.Mesh(new THREE.ExtrudeGeometry(forma, { depth: u(.15), bevelEnabled: false }), material);
  m.rotation.x = -Math.PI / 2;
  m.castShadow = true;
  const suporte = new THREE.Group();
  suporte.position.set(u(x0), cy(h0), 0);
  suporte.rotation.z = Math.atan2(h1 - h0, x1 - x0);
  suporte.add(m);
  pai.add(suporte);
}

let pivo, curvaDoCabo;
function montaBraco() {
  const g = grupos.braco;
  pivo = new THREE.Group();
  pivo.position.set(cx(PIVO.x), 0, cz(PIVO.y));
  g.add(pivo);
  tambor(pivo, 4.2, PISO.ate, 18.6, mats.cubo, 0, 0, 32);           // o eixo, com o rolamento dentro
  // o bloco em E, de onde saem os braços (atrás ele não passa do raio dos ímãs), e a
  // tampa cromada do rolamento com o parafuso em cima
  const formaDoBloco = poligono([[-u(5.5), -u(6)], [u(3), -u(8.5)], [u(9), -u(6.5)], [u(9), u(6.5)], [u(3), u(8.5)], [-u(5.5), u(6)]], u(2));
  chapa(pivo, formaDoBloco, 7.6, 18.2, mats.braco, { chanfro: .3 });
  tambor(pivo, 5.6, 18.2, 19.0, mats.cubo, 0, 0, 40);
  tambor(pivo, 2.4, 19.0, 19.4, mats.parafuso, 0, 0, 20);
  const sextavado = new THREE.Mesh(new THREE.CircleGeometry(u(1.0), 6), mats.escuro);
  sextavado.rotation.x = -Math.PI / 2; sextavado.position.y = cy(19.4) + .002;
  pivo.add(sextavado);
  const formaDoBraco = poligono([[u(4), -u(7)], [u(31), -u(2.6)], [u(35), -u(1.8)], [u(35), u(1.8)], [u(31), u(2.6)], [u(4), u(7)]], u(1));
  formaDoBraco.holes.push(v.furo(poligono([[u(10), -u(3.2)], [u(21), -u(1.5)], [u(21), u(1.5)], [u(10), u(3.2)]], u(.8))));
  formaDoBraco.holes.push(v.furo(poligono([[u(24), -u(1.1)], [u(28.5), -u(.8)], [u(28.5), u(.8)], [u(24), u(1.1)]], u(.4))));
  for (const h of BRACOS_H) chapa(pivo, formaDoBraco, h - .5, h + .5, mats.braco, { chanfro: .1 });
  // na ponta de cada braço, a plaquinha que prende a mola; a mola afina até a cabeça
  for (const cabeca of CABECAS) {
    const h0 = BRACOS_H[cabeca.braco], lado = Math.sign(cabeca.h - h0);
    const [p0, p1] = [h0 + lado * .5, h0 + lado * .75].sort((a, b) => a - b);
    tambor(pivo, 1.9, p0, p1, mats.mola, u(33), 0, 20);
    lamina(pivo, [33, h0 + lado * .6], [BRACO_MM - .3, cabeca.h - lado * .15], 3.4, 1.2, mats.mola);
    caixa(pivo, u(1.3), u(.3), u(1.0), mats.cabeca, u(BRACO_MM), cy(cabeca.h), 0, u(.05));
  }
  // o fio das cabeças: uma fita cor de cobre em cada braço, do bloco até a mola
  for (const h of BRACOS_H) caixa(pivo, u(27), u(.12), u(.8), mats.flex, u(19.5), cy(h + .56), u(1.9), u(.03));
  // a bobina na ponta de trás, presa no bloco por um plástico preto
  const bobina = poligono([[-u(7), -u(5.5)], [-u(24.5), -u(11)], [-u(27.8), 0], [-u(24.5), u(11)], [-u(7), u(5.5)]], u(1.5));
  bobina.holes.push(v.furo(poligono([[-u(11), -u(3.6)], [-u(21.5), -u(7.2)], [-u(23.6), 0], [-u(21.5), u(7.2)], [-u(11), u(3.6)]], u(1))));
  chapa(pivo, bobina, 9.3, 12.3, mats.cobre, { chanfro: .3 });
  caixa(pivo, u(5), u(3.4), u(10), mats.plastico, -u(7.5), cy(10.8), 0, u(.4));
  // o suporte, que leva o sinal pela carcaça até a placa, e o cabo que vem do bloco
  montaCircuitoFlexivel(g);
}

// ---------- o circuito flexível: do bloco em E até o conector no piso ----------
// Leva o sinal das cabeças pra placa lógica. Um pedaço gira com o braço, colado no bloco,
// com o pré-amplificador; a fita faz a curva e deita no piso, onde uma chapa prende o
// conector que atravessa a carcaça.
function montaCircuitoFlexivel(g) {
  // no bloco em E, na face do lado da fita (x ao longo da face, z pra fora)
  const lateral = new THREE.Group();
  lateral.position.set(-u(1.38), 0, u(7.68));
  lateral.rotation.y = -Math.atan2(2.5, 8.5);
  pivo.add(lateral);
  caixa(lateral, u(8.6), u(9.4), u(.2), mats.flex, 0, cy(12.9), 0, u(.05));
  const face = new THREE.Mesh(new THREE.PlaneGeometry(u(8.6), u(9.4)),
    new THREE.MeshStandardMaterial({ map: textura(desenhaLateralDoFlex, 256, 280), roughness: .45, metalness: .2, polygonOffset: true, polygonOffsetFactor: -2 }));
  face.position.set(0, cy(12.9), u(.11));
  lateral.add(face);
  caixa(lateral, u(3.6), u(3.0), u(.7), mats.chip, -u(.8), cy(11.2), u(.45), u(.1));    // o pré-amplificador, que reforça o sinal fraquinho da cabeça
  for (const [x, h] of [[2.4, 10.2], [2.4, 11.6], [2.4, 13.0], [-3.4, 13.6]]) caixa(lateral, u(1.0), u(.5), u(.4), mats.ceramica, u(x), cy(h), u(.3), u(.05));
  // a fita, com as trilhas correndo pelo comprimento, descendo do bloco até o piso
  curvaDoCabo = new THREE.CatmullRomCurve3(CAMINHO_DO_FLEX.map(([x, y]) => new THREE.Vector3(cx(x), 0, cz(y))));
  const n = 48, posicoes = [], uvs = [], indices = [];
  for (let i = 0; i <= n; i += 1) {
    const t = i / n, p = curvaDoCabo.getPoint(t), [h0, h1] = alturaDoFlex(t);
    posicoes.push(p.x, cy(h0), p.z, p.x, cy(h1), p.z);
    uvs.push(t, 0, t, 1);
    if (i) { const a = 2 * i - 2; indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  }
  const fita = new THREE.BufferGeometry();
  fita.setAttribute('position', new THREE.Float32BufferAttribute(posicoes, 3));
  fita.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  fita.setIndex(indices); fita.computeVertexNormals();
  const cabo = new THREE.Mesh(fita, new THREE.MeshStandardMaterial({ map: textura(desenhaFitaDoFlex, 1024, 64), roughness: .45, metalness: .2, side: THREE.DoubleSide }));
  cabo.castShadow = true;
  g.add(cabo);
  // a ponta que deita no piso, com os componentes miúdos e a letra branca
  const b = FLEX.base, larguraMM = b.x1 - b.x0, fundoMM = b.y1 - b.y0;
  const base = new THREE.Mesh(new THREE.PlaneGeometry(u(larguraMM), u(fundoMM)),
    new THREE.MeshStandardMaterial({ map: textura(desenhaBaseDoFlex, 640, Math.round(640 * fundoMM / larguraMM)), roughness: .45, metalness: .2, polygonOffset: true, polygonOffsetFactor: -2 }));
  base.rotation.set(-Math.PI / 2, 0, Math.PI);                  // lê de quem olha pela traseira, como a etiqueta
  base.position.set(cx((b.x0 + b.x1) / 2), cy(PISO.ate) + .003, cz((b.y0 + b.y1) / 2));
  base.receiveShadow = true;
  g.add(base);
  for (const [x, y] of PECINHAS_DO_FLEX) bloco(g, x - .45, x + .45, y - .3, y + .3, PISO.ate, PISO.ate + .4, mats.ceramica, .05);
  // a chapa que prende o conector: furo do pino-guia no meio, dois parafusos e a gravação
  const c = FLEX.chapa;
  const forma = poligono([plano(c.x0, c.y0), plano(c.x1, c.y0), plano(c.x1, c.y1), plano(c.x0, c.y1)], u(1.2));
  forma.holes.push(new THREE.Path().absarc(...plano(49, 118), u(1.3), 0, Math.PI * 2, true));
  chapa(g, forma, PISO.ate + .1, PISO.ate + .9, mats.chapaFosca, { chanfro: .15, curvas: 16 });
  for (const y of [113.4, 122.6]) parafuso(g, 49, y, PISO.ate + .9, 1.1);
  for (const [texto, y] of [['SR20', 115.6], ['2638', 120.6]]) inscricao(g, texto, u(5), u(1.25), [cx(49), cy(PISO.ate + .9) + .003, cz(y)], [-Math.PI / 2, 0, Math.PI], '#3a3e42', 90);
}

// ---------- a placa lógica, do lado de fora, embaixo ----------
function montaPlaca() {
  const g = grupos.placa, p = PLACA;
  const forma = new THREE.Shape();
  forma.moveTo(...plano(p.x0, p.y0)); forma.lineTo(...plano(p.x1, p.y0)); forma.lineTo(...plano(p.x1, p.y1));
  forma.lineTo(...plano(CORTE.x1 - .5, p.y1)); forma.lineTo(...plano(CORTE.x1 - .5, 146.5));
  forma.lineTo(...plano(CORTE.x0 + .5, 146.5)); forma.lineTo(...plano(CORTE.x0 + .5, p.y1));
  forma.lineTo(...plano(p.x0, p.y1)); forma.closePath();
  chapa(g, forma, p.de, p.ate, mats.borda);
  const face = new THREE.Mesh(new THREE.ShapeGeometry(forma), new THREE.MeshStandardMaterial({ map: texturaDaPlanta(desenhaPlaca), roughness: .55, metalness: .08, side: THREE.BackSide }));
  face.rotation.x = -Math.PI / 2; face.position.y = cy(p.de) - .002;
  face.receiveShadow = true;
  g.add(face);
  // os chips ficam virados pra baixo; a letra sobe pra frente do HD, que é o alto da vista de baixo
  for (const c of Object.values(COMPONENTES)) {
    const baixo = p.de - c.t, largura = c.w * .8;
    bloco(g, c.x - c.w / 2, c.x + c.w / 2, c.y - c.l / 2, c.y + c.l / 2, baixo, p.de, mats.chip, .15);
    c.linhas.forEach((linha, i) => {
      const y = c.y + (i - (c.linhas.length - 1) / 2) * largura * .28;
      inscricao(g, linha, u(largura), u(largura / 4), [cx(c.x), cy(baixo) - .002, cz(y)], [Math.PI / 2, 0, 0], '#b9bcbf', 96);
    });
  }
  bloco(g, 47.5, 52.5, 124.4, 127.6, p.de - 1.0, p.de, mats.cubo, .5);    // o cristal que dá o ritmo do controlador
  const capacitores = [];
  for (let i = 0; i < 6; i += 1) capacitores.push([29.4, 98.5 + i * 2.2], [46.6, 98.5 + i * 2.2]);
  for (let i = 0; i < 5; i += 1) capacitores.push([65.5, 86 + i * 2]);
  for (let i = 0; i < 7; i += 1) capacitores.push([12 + i * 2.6, 138.5]);
  for (let i = 0; i < 4; i += 1) capacitores.push([58.5 + i * 2.2, 110.8]);
  const pecinhas = new THREE.InstancedMesh(new THREE.BoxGeometry(u(1.0), u(.5), u(.5)), mats.ceramica, capacitores.length), molde = new THREE.Object3D();
  capacitores.forEach(([x, y], i) => { molde.position.set(cx(x), cy(p.de - .25), cz(y)); molde.updateMatrix(); pecinhas.setMatrixAt(i, molde.matrix); });
  g.add(pecinhas);
  for (const [x, y] of [[8, 74], [93.6, 74], [93.6, 139.5]]) tambor(g, 1.7, p.de - .4, p.de, mats.parafuso, cx(x), cz(y), 20);
}

// ---------- os conectores SATA, na abertura do fundo ----------
function montaConectores() {
  const g = grupos.conectores, y0 = FUNDO + 1.2, y1 = FUNDO_DOS_CONECTORES, h0 = PLACA.ate, h1 = CORTE.altura - .1;
  const pecas = [...CONECTORES.map(c => [c, faceDoConector(c.x1 - c.x0, c.contatos)]), [JUMPER, desenhaJumper]];
  for (const [c, desenha] of pecas) {
    bloco(g, c.x0, c.x1, y0, y1, h0, h1, mats.plastico, .25);
    const larguraMM = c.x1 - c.x0, alturaMM = h1 - h0;
    const face = new THREE.Mesh(new THREE.PlaneGeometry(u(larguraMM), u(alturaMM)),
      new THREE.MeshStandardMaterial({ map: textura(desenha, 1024, Math.round(1024 * alturaMM / larguraMM)), roughness: .6, metalness: .1 }));
    face.rotation.y = Math.PI;                        // de frente pra quem olha a traseira
    face.position.set(cx((c.x0 + c.x1) / 2), cy((h0 + h1) / 2), cz(y1) - .002);
    g.add(face);
  }
}

// ---------- "Lendo dados": os bits saem pela cabeça, pelo braço e pelo cabo ----------
const pulsos = [];
function montaPulsos() {
  const material = new THREE.MeshBasicMaterial({ color: 0xc9ff6e });
  const bola = new THREE.SphereGeometry(u(1.0), 12, 8);
  const noBraco = [[BRACO_MM, 16.4], [34, 18.2], [8, 18.2], [4, 18.6]].map(([x, h]) => new THREE.Vector3(u(x), cy(h), 0));
  const noCabo = curvaDoCabo.getPoints(24).map((p, i, todos) => {
    const [h0, h1] = alturaDoFlex(i / (todos.length - 1));
    return new THREE.Vector3(p.x, cy((h0 + h1) / 2), p.z);        // no meio da fita, que vai descendo
  });
  for (const [pai, pontos] of [[pivo, noBraco], [grupos.braco, noCabo]]) {
    const caminho = new THREE.CurvePath();
    for (let i = 1; i < pontos.length; i += 1) caminho.add(new THREE.LineCurve3(pontos[i - 1], pontos[i]));
    for (let k = 0; k < 3; k += 1) {
      const malha = new THREE.Mesh(bola, material);
      malha.visible = false;
      pai.add(malha);
      pulsos.push({ malha, caminho, atraso: k / 3 });
    }
  }
}

// ---------- o leitor: gira os pratos, leva o braço de trilha em trilha, acende a lida ----------
// Em câmera lenta: 7.200 rpm seriam 120 voltas por segundo, e uma busca de verdade leva
// milésimos. Aqui o prato dá menos de uma volta por segundo e o braço anda em meio segundo.
const GIRO = 4.2;                                     // rad/s com o HD lendo
const leitor = { giro: 0, de: ANGULO_PARQUE, para: ANGULO_PARQUE, t: 1, duracao: .5, espera: 0, atual: 0, proxima: 0, fase: 0, lendo: false };
const suave = t => t * t * (3 - 2 * t);

function mostraLeitura(sim) {
  leitor.lendo = sim;
  v.estado.lendo = sim;                               // vai junto no estado() de QA: a miniatura espera a trilha acender
  trilhas.forEach((trilha, i) => { trilha.visible = sim && i === leitor.atual; });
  for (const pulso of pulsos) pulso.malha.visible = sim;
}
function vaiPara(angulo, duracao) {
  Object.assign(leitor, { de: pivo.rotation.y, para: angulo, t: 0, duracao });
  mostraLeitura(false);
}
function proximaTrilha() {
  leitor.atual = leitor.proxima;
  leitor.proxima = (leitor.proxima + 1) % TRILHAS_MM.length;
  vaiPara(ANGULOS_DAS_TRILHAS[leitor.atual], .55);
}
// desligou: o braço volta pra rampa antes do prato parar, como no HD de verdade
function ligaLeitura(sim) {
  if (sim) proximaTrilha(); else vaiPara(ANGULO_PARQUE, 1.1);
}
function posicionaPulsos() {
  for (const pulso of pulsos) pulso.caminho.getPointAt((leitor.fase + pulso.atraso) % 1, pulso.malha.position);
}
// a primeira imagem já mostra o HD lendo (ou estacionado, com movimento reduzido)
function iniciaLeitor() {
  if (v.estado.leitura) {
    Object.assign(leitor, { atual: 0, proxima: 1, giro: GIRO, espera: 1.8 });
    pivo.rotation.y = ANGULOS_DAS_TRILHAS[0];
    mostraLeitura(true);
  } else pivo.rotation.y = ANGULO_PARQUE;
  posicionaPulsos();
}

function tick(dt, estado) {
  leitor.giro = THREE.MathUtils.damp(leitor.giro, estado.leitura ? GIRO : 0, 1.4, dt);
  giroDosPratos.rotation.y += leitor.giro * dt;
  giroDoCubo.rotation.y = giroDosPratos.rotation.y;
  if (leitor.t < 1) {
    leitor.t = Math.min(1, leitor.t + dt / leitor.duracao);
    pivo.rotation.y = THREE.MathUtils.lerp(leitor.de, leitor.para, suave(leitor.t));
    if (leitor.t === 1 && estado.leitura) { mostraLeitura(true); leitor.espera = 1.8; }
  } else if (estado.leitura) {
    leitor.espera -= dt;
    if (leitor.espera <= 0) proximaTrilha();
  }
  if (leitor.lendo) {
    leitor.fase = (leitor.fase + dt * .8) % 1;
    posicionaPulsos();
  }
}


// Detalhes internos ilustrativos: suporte do flex, contatos e usinagem.
// Cada elemento pertence ao conjunto correspondente para respeitar isolamento.
function montaDetalhesInternos() {
  const g = new THREE.Group();
  grupos.braco.add(g);
  // Amplia a ilha do circuito em torno do seu centro, sem atingir os pratos.
  g.scale.set(1.25,1,1.1);
  g.position.set(cx(23)*(1-1.25),0,cz(123)*(1-1.1));
  const suporte = poligono([[10,111],[13,107],[34,107],[37,112],[37,135],[32,139],[13,139],[10,136]].map(p=>plano(...p)),u(1));
  for (const [x,y] of [[14,112],[33,112],[14,134],[33,134]]) suporte.holes.push(new THREE.Path().absarc(...plano(x,y),u(1.25),0,Math.PI*2,true));
  chapa(g,suporte,6.2,7.4,mats.chapaFosca,{chanfro:.18});
  // Colunas de apoio e parafusos rebaixados.
  for (const [x,y] of [[14,112],[33,112],[14,134],[33,134]]) {
    tambor(g,2.2,5,6.2,mats.aluminio,cx(x),cz(y));
    parafuso(g,x,y,7.4,1.3);
  }
  bloco(g,15,31,115,136,7.4,7.65,mats.flex,.6);
  bloco(g,18,27,120,127,7.65,8.6,mats.chip,.3);
  inscricao(g,'FLEX',u(6),u(1.5),[cx(22.5),cy(8.62),cz(123.5)],[-Math.PI/2,0,Math.PI],'#c6c4b8',96);
  // Terminais do encapsulamento e trilhas que chegam ao conector.
  for(let i=0;i<10;i++) {
    const y=120.35+i*.65;
    for(const [a,b] of [[17,18],[27,28]]) bloco(g,a,b,y,y+.28,7.7,7.9,mats.cubo,.03);
    bloco(g,28.2,30.2,y,y+.16,7.66,7.72,mats.cobre,.02);
  }
  for(let i=0;i<12;i++) {
    const x=16+i*1.15;
    bloco(g,x,x+.22,128,134.8,7.66,7.73,mats.cobre,.02);
    bloco(g,x-.1,x+.32,134.8,135.6,7.66,7.8,mats.cubo,.02);
  }
  // Ponte flexivel plana ate a base existente, longe do curso do atuador.
  bloco(g,31,44,116,121,5.04,5.2,mats.flex,.15);
  for(let i=0;i<7;i++) bloco(g,31,43.5,116.4+i*.6,116.6+i*.6,5.21,5.25,mats.cobre,.01);
  for(const [x,y] of [[16.5,117],[21,117],[26,117],[16.5,130],[30,130]]) {
    bloco(g,x-.75,x+.75,y-.4,y+.4,7.66,8.2,mats.ceramica,.08);
    for(const dx of [-.72,.5]) bloco(g,x+dx,x+dx+.22,y-.42,y+.42,7.66,8.23,mats.cubo,.02);
  }
  // Extensao do flex na lateral livre: bancos de componentes e barramentos.
  const extra=grupos.braco;
  bloco(extra,7,34,100,111,5.05,5.4,mats.flex,.7);
  for(let i=0;i<14;i++) {
    const x=8.2+i*1.75;
    bloco(extra,x,x+.28,100.8,110.3,5.41,5.48,mats.cobre,.02);
    tambor(extra,.28,5.48,5.55,mats.cubo,cx(x+.14),cz(101.3),12);
  }
  for(const [x,y,w,l] of [[13,102.8,5,3],[24,102.8,6,3]]) {
    bloco(extra,x-w/2,x+w/2,y-l/2,y+l/2,5.5,6.5,mats.chip,.2);
    for(let i=0;i<6;i++) for(const side of [-1,1]) {
      const px=x-w/2+.4+i*(w-.8)/5;
      bloco(extra,px,px+.3,y+side*l/2-.5,y+side*l/2+.5,5.5,5.8,mats.cubo,.03);
    }
  }
  // Capacitores maiores com terminais, alinhados ao circuito principal.
  for(let i=0;i<5;i++) {
    const y=113+i*4.4;
    bloco(extra,6,8.3,y,y+1.3,5.1,6.1,mats.ceramica,.12);
    for(const x of [5.8,8]) bloco(extra,x,x+.5,y-.05,y+1.35,5.1,6.15,mats.cubo,.03);
  }
  // Contatos e trilhas em relevo na base do flex ja existente.
  for(let i=0;i<9;i++) {
    const y=112+i*1.45;
    bloco(extra,54,56.8,y,y+.35,5.12,5.24,mats.cobre,.02);
    bloco(extra,55.8,57,y,y+.5,5.25,5.4,mats.cubo,.03);
  }
  // Nervuras e ilhas usinadas na area livre da fundicao.
  for(const x of [8,36]) bloco(grupos.carcaca,x,x+1.1,105,139,5,6,mats.aluminio,.25);
  for(const [x,y] of [[8,104],[39,136],[62,138],[94,109]]) {
    tambor(grupos.carcaca,2.1,5,7,mats.aluminio,cx(x),cz(y));
    tambor(grupos.carcaca,.8,7,7.05,mats.furo,cx(x),cz(y),16);
  }
  // Anel concentricos do rolamento, presos ao eixo movel.
  for(const r of [3.0,4.6]) chapa(pivo,anel(r+.12,r),19.01,19.07,mats.estator,{curvas:32});
  // Espiras visiveis no topo da bobina, acompanhando o movimento do braco.
  for(let i=0;i<9;i++) {
    const d=i*.25;
    const pts=[[-8-d,-5.4-d],[-24+d,-10+d],[-26.8+d,0],[-24+d,10-d],[-8-d,5.4+d],[-8-d,-5.4-d]].map(([x,z])=>new THREE.Vector3(u(x),cy(12.34),u(z)));
    const curve=new THREE.CurvePath();
    for(let j=1;j<pts.length;j++) curve.add(new THREE.LineCurve3(pts[j-1],pts[j]));
    pivo.add(new THREE.Mesh(new THREE.TubeGeometry(curve,40,u(.065),5,false),mats.cobre));
  }
  // Reforco estampado e pontos de solda na chapa superior do ima.
  const angles=[...ANGULOS_DAS_TRILHAS,ANGULO_PARQUE];
  const a0=Math.min(...angles)+Math.PI-.25,a1=Math.max(...angles)+Math.PI+.25;
  chapa(grupos.ima,leque(a0,a1,24.9,25.8),16.4,16.8,mats.chapaFosca,{curvas:32,chanfro:.08});
  for(let i=0;i<4;i++) {
    const a=a0+(a1-a0)*(i+.5)/4;
    tambor(grupos.ima,.65,16.4,16.48,mats.estator,cx(PIVO.x+21*Math.cos(a)),cz(PIVO.y+21*Math.sin(a)),16);
  }
}

montaCarcaca();
montaTampa();
montaMotor();
montaPratos();
montaIma();
montaBraco();
montaDetalhesInternos();
montaPlaca();
montaConectores();
montaPulsos();
iniciaLeitor();
v.inicia({ tick });
