// Arduino UNO R3: a placa da foto em 3D, com as peças em camadas.
// Medidas em milímetros tiradas da placa real (68,6 × 53,4 mm); 1 unidade da cena = 10 mm.
// As posições vêm da foto de referência; trilhas e componentes miúdos são ilustrativos.
import { THREE, montaVisualizador } from './_visualizador-pecas.js';

const MM = .1;
const LARGURA = 68.58 * MM, ALTURA = 53.34 * MM, ESPESSURA = .16, TOPO = ESPESSURA / 2;
// mm a partir do canto inferior esquerdo da placa -> unidades a partir do centro
const mm = (x, y) => [x * MM - LARGURA / 2, y * MM - ALTURA / 2];

// ---------- onde cada coisa fica (mm) ----------
const HEADERS = [
  { x0: 16.8, y: 50.4, n: 10, rotulos: ['SCL', 'SDA', 'AREF', 'GND', '13', '12', '~11', '~10', '~9', '8'] },
  { x0: 43.9, y: 50.4, n: 8, rotulos: ['7', '~6', '~5', '4', '~3', '2', 'TX→1', 'RX←0'] },
  { x0: 26.9, y: 2.4, n: 8, rotulos: ['', 'IOREF', 'RESET', '3.3V', '5V', 'GND', 'GND', 'Vin'] },
  { x0: 50.5, y: 2.4, n: 6, rotulos: ['A0', 'A1', 'A2', 'A3', 'A4', 'A5'] },
];
const CHIP = { x: 46.5, y: 16.5 };                 // ATmega328P, DIP de 28 pinos
const PONTE = { x: 19.4, y: 34.7 };                // ATmega16U2, o tradutor de USB
const ICSP = [{ x: 65.05, y: 27.6 }, { x: 18.2, y: 45.7 }];
const CAPACITORES = [[18, 9.1], [25.2, 9.1]];
const CRISTAL = { x: 18.2, y: 26.9 };
const RESET = { x: 5.6, y: 49 };
const USB = { x: 1.5, y: 37.3 };
const JACK = { x: 4.5, y: 8 };
const REGULADOR = { x: 6.8, y: 18.3 };
const LEDS = { L: [27.3, 41], TX: [27.3, 36.4], RX: [27.3, 33.7], ON: [58.7, 36.4] };
const FUROS = [[14, 2.54], [15.24, 50.8], [65.4, 7.62], [66.04, 35.56]];
const JP2 = [[18.4, 41.5], [20.9, 41.5], [18.4, 39.1], [20.9, 39.1]];
// componentes de superfície: [x, y, largura, altura, tipo]
const SMD = [
  [13, 47, 1.6, 3.2, 'rede'], [13, 43.7, 1.6, 3.2, 'rede'], [13, 40.4, 1.6, 3.2, 'rede'],
  [30.2, 41, 2, 1.25, 'r'], [30.2, 36.4, 2, 1.25, 'r'], [30.2, 33.7, 2, 1.25, 'r'], [55.6, 36.4, 2, 1.25, 'r'],
  [13.5, 29, 2, 1.25, 'c'], [24.7, 32.6, 2, 1.25, 'c'], [16, 31.2, 1.25, 2, 'c'], [44.5, 24.6, 2, 1.25, 'c'],
  [37.5, 26.8, 2, 1.25, 'c'], [61, 21.5, 1.25, 2, 'c'], [61, 25, 1.25, 2, 'c'], [11, 18, 1.25, 2, 'c'],
  [11, 21.5, 1.25, 2, 'c'], [26.5, 45.5, 2, 1.25, 'c'], [31, 45.5, 2, 1.25, 'c'], [40, 20, 2, 1.25, 'c'],
  [9.3, 32, 2.9, 1.6, 'sot'], [21.5, 4.2, 4.3, 2.6, 'diodo'], [3.6, 26.3, 3.4, 7.2, 'fusivel'],
];

// Onde cada pino atravessa a placa. Serve pros anéis das duas faces e pros cones de solda.
function pontosDeSolda() {
  const pontos = [];
  for (const h of HEADERS) for (let i = 0; i < h.n; i++) pontos.push([h.x0 + i * 2.54, h.y]);
  for (let i = 0; i < 14; i++) for (const lado of [-1, 1]) pontos.push([CHIP.x - 16.51 + i * 2.54, CHIP.y + lado * 3.81]);
  for (const c of ICSP) for (const dx of [-1.27, 1.27]) for (const dy of [-2.54, 0, 2.54]) pontos.push([c.x + dx, c.y + dy]);
  pontos.push([8.2, 36.05], [8.2, 38.55], [6.2, 35.3], [6.2, 39.3], [3, 31.2], [3, 43.4]);   // USB: 4 sinais + 2 abas
  pontos.push([3.5, 8], [9.5, 5.2], [9.5, 10.8]);                                          // jack
  for (const [x, y] of CAPACITORES) pontos.push([x - 1.25, y], [x + 1.25, y]);
  for (const dx of [-3.25, 3.25]) for (const dy of [-2.25, 2.25]) pontos.push([RESET.x + dx, RESET.y + dy]);
  pontos.push([CRISTAL.x - 2.44, CRISTAL.y], [CRISTAL.x + 2.44, CRISTAL.y]);
  return pontos;
}

// ---------- o visualizador ----------
const v = montaVisualizador({
  global: '__arduinoUno',
  arquivoDaImagem: 'arduino-uno.png',
  pecas: {
    placa: { nome: 'Placa e serigrafia', explosao: 0 },
    chip: { nome: 'ATmega328P', explosao: 1.9 },
    cristal: { nome: 'Cristal de 16 MHz', explosao: .9 },
    ponte: { nome: 'Ponte USB (16U2)', explosao: .9 },
    headers: { nome: 'Pinos e headers', explosao: 1.4 },
    alimentacao: { nome: 'Alimentação', explosao: 1.0 },
    usb: { nome: 'Conector USB', explosao: 1.2 },
    soldas: { nome: 'Soldas de baixo', explosao: -.7 },
  },
  detalhes: {
    placa: ['01', 'A BASE DE TUDO', 'Uma placa, duas camadas de cobre.', 'O azul é a máscara que cobre o cobre. Por baixo dela correm as trilhas que ligam cada peça, e a serigrafia branca diz o nome de cada pino.'],
    chip: ['02', 'O COMPUTADOR INTEIRO', 'ATmega328P: 8 bits, 32 KB, 16 MHz.', 'Dentro desse plástico preto moram o processador, a memória do programa e a memória de trabalho. É o mesmo ciclo do microprocessador: busca, entende, faz, avança.'],
    cristal: ['03', 'O RELÓGIO', '16 milhões de batidas por segundo.', 'O cristal de quartzo vibra numa frequência fixa e dá o compasso: cada instrução do chip anda no ritmo dele.'],
    ponte: ['04', 'TRADUTOR DE USB', 'Um segundo chip só pra conversar.', 'O ATmega16U2 fala USB com o computador de um lado e serial com o chip principal do outro. É por ele que o programa entra na placa.'],
    headers: ['05', 'ENTRADAS E SAÍDAS', 'Catorze digitais, seis analógicos.', 'As barras pretas são os pinos: encaixe um fio e a placa lê um botão ou acende um LED. O espaçamento estranho entre o 7 e o 8 foi um erro de desenho que virou padrão.'],
    alimentacao: ['06', 'ENERGIA', 'De 7 a 12 volts viram 5.', 'O plugue redondo recebe a fonte. O regulador abaixa a tensão pra 5 volts e os dois capacitores seguram a linha estável.'],
    usb: ['07', 'CONEXÃO COM O COMPUTADOR', 'O conector quadrado da impressora.', 'USB tipo B: alimenta a placa e carrega o programa. Do lado de dentro, quatro pinos e a blindagem soldados na placa.'],
    soldas: ['08', 'FACE DE BAIXO', 'Onde as peças se prendem.', 'Cada pino atravessa a placa e é soldado por baixo. Os cones de estanho são o único lugar em que o metal das peças toca o cobre.'],
  },
  direcoes: { perspective: [2.4, -8, 8.5], front: [0, 0, 1], back: [0, 0, -1], side: [-1, -.2, .3] },
  textos: { montado: 'PLACA MONTADA', montar: 'Montar a placa' },
  palco: { alvo: [0, 0, 0], camPos: [2.4, -8, 8.5], meiaLarguraDesktop: 4.3, meiaLarguraMobile: 4.3, distMin: 8, orbitaMin: 1.5, maxPolar: Math.PI },
  // luz mais de cima e a sombra num pano atrás da placa: assim a vista de topo ganha uma sombra
  // projetada em vez da mancha do chão
  luz: { chao: { eixo: 'z', em: -1 }, alcance: 6, principal: { cor: 0xf6f5ed, forca: 3.6, posicao: [-3, 5, 11] } },
  alternador: { id: 'leds', chave: 'leds' },
  aoSelecionar(chave, api, estavaIsolado) {
    if (chave === 'placa') { if (estavaIsolado) api.isolar(true); api.vista('front'); return; }
    if (chave === 'headers') { api.expandir(1); api.vista('perspective'); return; }
    api.isolar(true);
    api.vista({ usb: 'side', soldas: 'back' }[chave] ?? 'perspective');
  },
});
const { grupos, caixa, cilindro, inscricao, textura, metal, poligono, retangulo, furo, furoRedondo, extrusao } = v;
v.canvas.setAttribute('aria-label', 'Arduino UNO em três dimensões. Arraste para girar, botão direito move, role para aproximar. Os botões ao lado separam, isolam e enquadram cada peça.');

const mats = {
  mascara: new THREE.MeshStandardMaterial({ color: 0x0d5391, roughness: .55, metalness: .05 }),
  plasticoPreto: metal(0x0c0e0f, .62, .08), chip: metal(0x15171a, .5, .15), cinza: metal(0x2a2d31, .6, .1),
  prata: metal(0xb9c0c2, .3, .9), aco: metal(0x9aa19f, .38, .85), ouro: metal(0xc9a34d, .28, .9), estanho: metal(0xb8b5ad, .45, .7),
  ceramica: metal(0x8b7d6a, .6, .1), capacitor: metal(0x1b2330, .5, .3), quartzo: metal(0xc4c9ca, .28, .92),
  fusivel: metal(0xd8d17a, .6, .05), botao: metal(0x6b3a2e, .5, .1),
};

// ---------- as texturas das duas faces ----------
const LADO = 2048, K = LADO / 68.58, ALTO = Math.round(53.34 * K);   // pixels por mm
const px = x => x * K, py = y => ALTO - y * K;
const BRANCO = '#f3f6f7', PRATA = '#c9ccc8', TRILHA_CIMA = 'rgba(58,142,204,.6)', TRILHA_BAIXO = 'rgba(48,128,190,.6)';

function texto(ctx, t, x, y, altura, opcoes = {}) {
  const { alinha = 'center', rotacao = 0, peso = 'bold', cor = BRANCO, espelha = false, espaco = 0 } = opcoes;
  ctx.save();
  ctx.translate(px(x), py(y)); ctx.rotate(rotacao); if (espelha) ctx.scale(-1, 1);
  ctx.fillStyle = cor; ctx.font = `${peso} ${altura * K}px Arial`; ctx.textAlign = alinha; ctx.textBaseline = 'middle';
  if (espaco) ctx.letterSpacing = espaco * K + 'px';
  ctx.fillText(t, 0, 0);
  ctx.restore();
}
function linha(ctx, x1, y1, x2, y2, largura = .35, cor = BRANCO) {
  ctx.strokeStyle = cor; ctx.lineWidth = largura * K; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(px(x1), py(y1)); ctx.lineTo(px(x2), py(y2)); ctx.stroke();
}
function disco(ctx, x, y, r, cor) {
  ctx.fillStyle = cor; ctx.beginPath(); ctx.arc(px(x), py(y), r * K, 0, Math.PI * 2); ctx.fill();
}
function anel(ctx, x, y, rFora, rDentro, cor = PRATA, centro = '#243036') {
  disco(ctx, x, y, rFora, cor); disco(ctx, x, y, rDentro, centro);
}
function retanguloCheio(ctx, x, y, w, h, cor) {
  ctx.fillStyle = cor; ctx.fillRect(px(x - w / 2), py(y + h / 2), w * K, h * K);
}
function caixaArredondada(ctx, x1, y1, x2, y2, raio, largura) {
  ctx.strokeStyle = BRANCO; ctx.lineWidth = largura * K;
  ctx.beginPath(); ctx.roundRect(px(x1), py(y2), (x2 - x1) * K, (y2 - y1) * K, raio * K); ctx.stroke();
}
function geradorDeAcaso(semente) {
  return () => { semente = (Math.imul(semente, 1664525) + 1013904223) >>> 0; return semente / 4294967296; };
}
const limita = (n, a, b) => Math.min(b, Math.max(a, n));

// Trilhas do jeito que placa de circuito tem: um trecho reto e o final em 45 graus, com uma via em cada ponta.
function trilhas(ctx, semente, cor, quantas) {
  const acaso = geradorDeAcaso(semente);
  ctx.strokeStyle = cor; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (let i = 0; i < quantas; i++) {
    const x1 = 3 + acaso() * 62, y1 = 5 + acaso() * 43, comprimento = 5 + acaso() * 22, angulo = Math.floor(acaso() * 8) * Math.PI / 4;
    const x2 = limita(x1 + Math.cos(angulo) * comprimento, 2, 66), y2 = limita(y1 + Math.sin(angulo) * comprimento, 2, 51.5);
    const dx = x2 - x1, dy = y2 - y1, d = Math.min(Math.abs(dx), Math.abs(dy));
    const meio = Math.abs(dx) > Math.abs(dy) ? [x1 + Math.sign(dx) * (Math.abs(dx) - d), y1] : [x1, y1 + Math.sign(dy) * (Math.abs(dy) - d)];
    ctx.lineWidth = (.22 + acaso() * .2) * K;
    ctx.beginPath(); ctx.moveTo(px(x1), py(y1)); ctx.lineTo(px(meio[0]), py(meio[1])); ctx.lineTo(px(x2), py(y2)); ctx.stroke();
    anel(ctx, x1, y1, .42, .18, '#9fb4c4'); anel(ctx, x2, y2, .42, .18, '#9fb4c4');
  }
}
function aneisDosFuros(ctx) {
  for (const [x, y] of FUROS) anel(ctx, x, y, 2.6, 1.6, PRATA, '#1e2c33');
  for (const [x, y] of JP2) anel(ctx, x, y, .9, .45);
}
function rotulosDosHeaders(ctx, h, yTexto, altura) {
  for (let i = 0; i < h.n; i++) if (h.rotulos[i]) texto(ctx, h.rotulos[i], h.x0 + i * 2.54, yTexto, altura, { alinha: 'left', rotacao: -Math.PI / 2 });
}

function desenhaFaceDeCima(ctx, W, H) {
  ctx.fillStyle = '#0e5796'; ctx.fillRect(0, 0, W, H);
  trilhas(ctx, 2026, TRILHA_CIMA, 46);
  for (const [x, y] of pontosDeSolda()) anel(ctx, x, y, .85, .4);
  aneisDosFuros(ctx);
  // ilhas dos componentes de superfície e do 16U2
  for (const [x, y, w, h] of SMD) for (const lado of [-1, 1]) {
    if (w >= h) retanguloCheio(ctx, x + lado * (w / 2 + .2), y, .6, h, PRATA);
    else retanguloCheio(ctx, x, y + lado * (h / 2 + .2), w, .6, PRATA);
  }
  for (let i = 0; i < 8; i++) {
    const passo = -1.75 + i * .5;
    retanguloCheio(ctx, PONTE.x - 2.9, PONTE.y + passo, .8, .3, PRATA); retanguloCheio(ctx, PONTE.x + 2.9, PONTE.y + passo, .8, .3, PRATA);
    retanguloCheio(ctx, PONTE.x + passo, PONTE.y - 2.9, .3, .8, PRATA); retanguloCheio(ctx, PONTE.x + passo, PONTE.y + 2.9, .3, .8, PRATA);
  }
  // serigrafia
  texto(ctx, 'ARDUINO', 39.2, 34.4, 2.6, { espaco: .3 });
  for (const cx of [34.6, 41.0]) { ctx.strokeStyle = BRANCO; ctx.lineWidth = 1.3 * K; ctx.beginPath(); ctx.arc(px(cx), py(39.6), 3.1 * K, 0, Math.PI * 2); ctx.stroke(); }
  linha(ctx, 33.4, 39.6, 35.8, 39.6, .7); linha(ctx, 39.8, 39.6, 42.2, 39.6, .7); linha(ctx, 41.0, 38.4, 41.0, 40.8, .7);
  texto(ctx, 'TM', 44.9, 42.2, .9);
  caixaArredondada(ctx, 45.2, 36.6, 56.6, 41.4, 1.6, .45);
  texto(ctx, 'UNO', 50.9, 39.0, 3.5, { peso: '600', espaco: .2 });
  texto(ctx, 'DIGITAL (PWM~)', 52.2, 44.0, 1.7);
  linha(ctx, 44.4, 42.9, 60.2, 42.9);
  rotulosDosHeaders(ctx, HEADERS[0], 44.6, 1.35); rotulosDosHeaders(ctx, HEADERS[1], 44.6, 1.35);
  texto(ctx, 'POWER', 38.5, 9.4, 1.6); linha(ctx, 29.5, 10.7, 48.5, 10.7);
  texto(ctx, 'ANALOG IN', 57.8, 9.4, 1.6); linha(ctx, 50, 10.7, 65.5, 10.7);
  rotulosDosHeaders(ctx, HEADERS[2], 4.5, 1.15); rotulosDosHeaders(ctx, HEADERS[3], 4.5, 1.25);
  texto(ctx, 'L', 25.8, 41.1, 1.5, { alinha: 'right' }); texto(ctx, 'TX', 25.8, 36.4, 1.5, { alinha: 'right' }); texto(ctx, 'RX', 25.8, 33.7, 1.5, { alinha: 'right' });
  texto(ctx, 'ON', 60.3, 36.4, 1.5, { alinha: 'left' });
  texto(ctx, 'ICSP', 65.05, 32.3, 1.4); texto(ctx, 'RESET', 5.6, 45.1, 1.3);
  texto(ctx, 'JP2', 14.9, 40.3, 1.1, { rotacao: -Math.PI / 2 });
  texto(ctx, 'ICSP1', 18.2, 42.9, 1.0);
}

function desenhaFaceDeBaixo(ctx, W, H) {
  ctx.fillStyle = '#0a4a7f'; ctx.fillRect(0, 0, W, H);
  trilhas(ctx, 9090, TRILHA_BAIXO, 54);
  for (const [x, y] of pontosDeSolda()) anel(ctx, x, y, 1.0, .42);
  aneisDosFuros(ctx);
  // vista por baixo, o texto tem que estar espelhado no canvas pra ler certo
  texto(ctx, 'MADE IN ITALY', 34.3, 27.5, 2.6, { espelha: true, espaco: .3 });
  texto(ctx, 'www.arduino.cc', 34.3, 23.2, 2.0, { espelha: true, peso: '600' });
  texto(ctx, 'UNO R3', 34.3, 31.6, 1.6, { espelha: true });
  texto(ctx, 'SEIRES · ESTUDO 3D', 42, 46, 1.2, { espelha: true, peso: '600', cor: '#b8cbd8' });
}

// ---------- a placa ----------
function contornoDaPlaca() {
  const pontos = [[0, 0], [65, 0], [66.3, 1.3], [66.3, 22.9], [68.58, 25.2], [68.58, 50.8], [66.04, 53.34], [0, 53.34]];
  const forma = poligono(pontos.map(([x, y]) => mm(x, y)), .06);
  for (const [x, y] of FUROS) forma.holes.push(furoRedondo(...mm(x, y), .16));
  return forma;
}

function montaPlaca() {
  const g = grupos.placa;
  const contorno = contornoDaPlaca();
  extrusao(g, contorno, ESPESSURA, -TOPO, mats.mascara, 0);
  const face = (desenha, z, lado) => {
    const tx = textura(desenha, LADO, ALTO);
    tx.repeat.set(1 / LARGURA, 1 / ALTURA); tx.offset.set(.5, .5);   // a ShapeGeometry usa x,y como uv
    const m = new THREE.Mesh(new THREE.ShapeGeometry(contorno, 12), new THREE.MeshStandardMaterial({ map: tx, roughness: .5, metalness: .08, side: lado }));
    m.position.z = z; m.receiveShadow = true;
    g.add(m);
  };
  face(desenhaFaceDeCima, TOPO + .002, THREE.FrontSide);
  face(desenhaFaceDeBaixo, -TOPO - .002, THREE.BackSide);
  montaSoquete(g);
  montaMiudezas(g);
  montaReset(g);
  montaLeds(g);
}

function montaSoquete(g) {
  const [x, y] = mm(CHIP.x, CHIP.y);
  const moldura = retangulo(3.62, 1.0, .03);
  moldura.holes.push(furo(retangulo(3.3, .52, .02)));
  const soquete = extrusao(g, moldura, .35, TOPO, mats.plasticoPreto, .01);
  soquete.position.x = x; soquete.position.y = y;
}

function montaMiudezas(g) {
  const altura = { r: .06, c: .06, rede: .07, sot: .1, diodo: .12, fusivel: .11 };
  const material = { r: mats.chip, c: mats.ceramica, rede: mats.chip, sot: mats.chip, diodo: mats.chip, fusivel: mats.fusivel };
  for (const [x, y, w, h, tipo] of SMD) {
    const [cx, cy] = mm(x, y), z = altura[tipo];
    caixa(g, w * MM, h * MM, z, material[tipo], cx, cy, TOPO + z / 2, .006);
    if (tipo === 'r' || tipo === 'c' || tipo === 'diodo') for (const lado of [-1, 1]) {
      if (w >= h) caixa(g, .035, h * MM, z + .004, mats.estanho, cx + lado * (w * MM / 2 - .02), cy, TOPO + z / 2, .003);
      else caixa(g, w * MM, .035, z + .004, mats.estanho, cx, cy + lado * (h * MM / 2 - .02), TOPO + z / 2, .003);
    }
  }
  const [fx, fy] = mm(3.6, 26.3);
  inscricao(g, '501K', .3, .12, [fx, fy, TOPO + .111], [0, 0, -Math.PI / 2], '#4a4630', 90);
}

function montaReset(g) {
  const [x, y] = mm(RESET.x, RESET.y);
  caixa(g, .6, .6, .3, mats.aco, x, y, TOPO + .15, .03);
  g.add(cilindro(.17, .16, mats.botao, x, y, TOPO + .37, 'z'));
}

const leds = {};
function montaLeds(g) {
  for (const [nome, [x, y]] of Object.entries(LEDS)) {
    const cor = nome === 'ON' ? 0x63ff7c : 0xffc93a;
    const material = new THREE.MeshStandardMaterial({ color: 0x3a3a2a, emissive: cor, emissiveIntensity: 0, roughness: .4, metalness: .1 });
    caixa(g, .2, .125, .07, material, ...mm(x, y), TOPO + .035, .01);
    leds[nome] = material;
  }
}

// ---------- as peças que saem da placa ----------
function montaChip() {
  const g = grupos.chip;
  const [x, y] = mm(CHIP.x, CHIP.y), base = TOPO + .38;   // o chip senta no soquete
  caixa(g, 3.5, .76, .36, mats.chip, x, y, base + .18, .03);
  // na placa real o entalhe do pino 1 aponta pro lado do ICSP, e o texto fica de cabeça pra baixo
  g.add(cilindro(.09, .1, mats.cinza, x + 1.75, y, base + .36, 'z'));
  g.add(cilindro(.05, .012, mats.cinza, x + 1.5, y - .25, base + .366, 'z'));
  inscricao(g, 'ATMEGA328P-PU', 2.2, .3, [x + .1, y + .1, base + .367], [0, 0, Math.PI], '#b9bcbf', 96);
  inscricao(g, '1121', 1.0, .22, [x + .3, y - .17, base + .367], [0, 0, Math.PI], '#a3a6a9', 90);
  inscricao(g, 'ATMEL', .7, .2, [x - 1.25, y - .15, base + .367], [0, 0, Math.PI], '#c5c8cb', 100);
  for (let i = 0; i < 14; i++) for (const lado of [-1, 1]) {
    const [px1] = mm(CHIP.x - 16.51 + i * 2.54, 0);
    caixa(g, .05, .1, .02, mats.estanho, px1, y + lado * .42, base + .17, .005);      // ombro
    caixa(g, .05, .02, .4, mats.estanho, px1, y + lado * .46, base - .02, .005);      // perna
  }
}

function montaCristal() {
  const g = grupos.cristal;
  const [x, y] = mm(CRISTAL.x, CRISTAL.y);
  caixa(g, 1.15, .47, .36, mats.quartzo, x, y, TOPO + .2, .17);   // HC-49S deitado, pontas redondas
  inscricao(g, 'SPK16.000G', .95, .18, [x, y, TOPO + .382], [0, 0, 0], '#3a4144', 90);
  for (const dx of [-.244, .244]) g.add(cilindro(.02, .1, mats.estanho, x + dx, y, TOPO + .04, 'z'));
}

function montaPonte() {
  const g = grupos.ponte;
  const [x, y] = mm(PONTE.x, PONTE.y);
  caixa(g, .5, .5, .09, mats.chip, x, y, TOPO + .045, .01);
  inscricao(g, 'MEGA16U2', .42, .1, [x, y, TOPO + .092], [0, 0, -Math.PI / 2], '#b9bcbf', 90);
  g.add(cilindro(.03, .006, mats.cinza, x - .18, y + .18, TOPO + .092, 'z'));
  caixa(g, .13, .32, .1, mats.ceramica, ...mm(23.8, 35), TOPO + .05, .01);           // o ressonador dele
}

const cacheDeFuros = {};
function texturaDeFuros(n) {
  return cacheDeFuros[n] ??= textura((ctx, w, h) => {
    for (let i = 0; i < n; i++) {
      const cx = (i + .5) * h;
      ctx.fillStyle = '#050607'; ctx.fillRect(cx - h * .28, h * .22, h * .56, h * .56);
      ctx.fillStyle = '#8a7a3a'; ctx.fillRect(cx - h * .12, h * .38, h * .24, h * .24);
    }
  }, n * 64, 64);
}

function headerFemea(g, h) {
  const comprimento = h.n * .254, [x0, y] = mm(h.x0, h.y), x = x0 + (h.n - 1) * .127;
  caixa(g, comprimento, .27, .85, mats.plasticoPreto, x, y, TOPO + .425, .015);
  const tampa = new THREE.Mesh(new THREE.PlaneGeometry(comprimento, .27), new THREE.MeshStandardMaterial({ map: texturaDeFuros(h.n), transparent: true, roughness: .6, metalness: .3, polygonOffset: true, polygonOffsetFactor: -2 }));
  tampa.position.set(x, y, TOPO + .851);
  g.add(tampa);
  for (let i = 0; i < h.n; i++) caixa(g, .06, .06, .2, mats.ouro, x0 + i * .254, y, TOPO - .1, .004);   // o pino que atravessa
}

function headerMacho(g, c) {
  const [x, y] = mm(c.x, c.y);
  caixa(g, .51, .76, .22, mats.plasticoPreto, x, y, TOPO + .11, .01);
  for (const dx of [-.127, .127]) for (const dy of [-.254, 0, .254]) g.add(cilindro(.028, .62, mats.ouro, x + dx, y + dy, TOPO + .31, 'z'));
}

function montaHeaders() {
  for (const h of HEADERS) headerFemea(grupos.headers, h);
  for (const c of ICSP) headerMacho(grupos.headers, c);
}

function montaAlimentacao() {
  const g = grupos.alimentacao;
  const [jx, jy] = mm(JACK.x, JACK.y);
  caixa(g, 1.4, .9, 1.1, mats.plasticoPreto, jx, jy, TOPO + .55, .05);
  g.add(cilindro(.3, .2, mats.plasticoPreto, jx - .8, jy, TOPO + .55, 'x'));
  g.add(cilindro(.19, .02, metal(0x050606, .8, 0), jx - .905, jy, TOPO + .55, 'x'));
  for (const [x, y] of CAPACITORES) {
    const [cx, cy] = mm(x, y);
    g.add(cilindro(.315, .55, mats.capacitor, cx, cy, TOPO + .275, 'z'));
    g.add(cilindro(.3, .02, mats.prata, cx, cy, TOPO + .56, 'z'));
    inscricao(g, '47 16V', .45, .16, [cx, cy, TOPO + .572], [0, 0, 0], '#e4e6e6', 90, { semLuz: true });
  }
  const [rx, ry] = mm(REGULADOR.x, REGULADOR.y);
  caixa(g, .36, .62, .16, mats.chip, rx, ry, TOPO + .08, .01);
  caixa(g, .32, .26, .05, mats.aco, rx, ry + .38, TOPO + .025, .005);                  // aba que dissipa o calor
  for (const dy of [-.23, 0, .23]) caixa(g, .14, .08, .03, mats.aco, rx - .25, ry + dy, TOPO + .015, .004);
  inscricao(g, 'NCP1117', .5, .12, [rx, ry - .04, TOPO + .162], [0, 0, Math.PI / 2], '#c1c4c6', 90);
}

// A boca do USB tipo B: um quadrado com o topo chanfrado. O plano fica virado pro -x,
// então o "cima" do desenho é a direita do canvas.
function texturaDaBocaUsb() {
  return textura((ctx, w) => {
    ctx.fillStyle = '#0b0d0e';
    ctx.beginPath(); ctx.moveTo(30, 38); ctx.lineTo(176, 38); ctx.lineTo(226, 88); ctx.lineTo(226, 168); ctx.lineTo(176, 218); ctx.lineTo(30, 218); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#d0d4d2'; ctx.fillRect(58, 72, 132, 112);
    ctx.fillStyle = '#2b3033'; ctx.fillRect(92, 96, 86, 64);
  }, 256, 256);
}

function montaUsb() {
  const g = grupos.usb;
  const [x, y] = mm(USB.x, USB.y);
  caixa(g, 1.6, 1.2, 1.05, mats.prata, x, y, TOPO + .525, .08);
  const boca = new THREE.Mesh(new THREE.PlaneGeometry(.9, .8), new THREE.MeshStandardMaterial({ map: texturaDaBocaUsb(), transparent: true, roughness: .6, metalness: .3, polygonOffset: true, polygonOffsetFactor: -2 }));
  boca.rotation.y = -Math.PI / 2; boca.position.set(x - .801, y, TOPO + .55);
  g.add(boca);
  for (const dy of [-.62, .62]) caixa(g, .5, .05, .3, mats.aco, x + .15, y + dy, TOPO - .05, .01);   // abas presas na placa
}

function montaSoldas() {
  const g = grupos.soldas;
  const pontos = pontosDeSolda();
  const cone = new THREE.ConeGeometry(.075, .075, 12); cone.rotateX(-Math.PI / 2);    // ponta pra baixo
  const ponta = new THREE.CylinderGeometry(.022, .022, .1, 8); ponta.rotateX(Math.PI / 2);
  const cones = new THREE.InstancedMesh(cone, mats.estanho, pontos.length);
  const pontas = new THREE.InstancedMesh(ponta, mats.aco, pontos.length);
  const tmp = new THREE.Object3D();
  pontos.forEach(([x, y], i) => {
    const [cx, cy] = mm(x, y);
    tmp.position.set(cx, cy, -TOPO - .0375); tmp.updateMatrix(); cones.setMatrixAt(i, tmp.matrix);
    tmp.position.set(cx, cy, -TOPO - .06); tmp.updateMatrix(); pontas.setMatrixAt(i, tmp.matrix);
  });
  cones.castShadow = true;
  g.add(cones); g.add(pontas);
}

// ---------- os LEDs ----------
// O L pisca como o programa Blink: um segundo aceso, um apagado. TX e RX tremelicam
// como se o computador estivesse conversando com a placa. O ON fica sempre aceso.
let relogio = 0;
function tremelica(t, ritmo, duracao) {
  const ciclo = Math.floor(t * ritmo), fase = t * ritmo - ciclo;
  const sorteio = Math.abs(Math.sin(ciclo * 12.9898) * 43758.5453) % 1;
  return sorteio > .45 && fase < duracao ? 1 : 0;
}
function acende(material, forca) {
  material.emissiveIntensity = forca * 2.2;
  material.color.copy(material.emissive).multiplyScalar(.18 + .82 * forca);
}
function tick(dt, estado) {
  relogio += dt;
  const ligado = estado.leds;
  acende(leds.ON, 1);
  acende(leds.L, ligado ? (relogio % 2 < 1 ? 1 : 0) : 0);
  acende(leds.TX, ligado ? tremelica(relogio, 7, .35) : 0);
  acende(leds.RX, ligado ? tremelica(relogio + .11, 9, .3) : 0);
}

montaPlaca();
montaChip();
montaCristal();
montaPonte();
montaHeaders();
montaAlimentacao();
montaUsb();
montaSoldas();
v.inicia({ tick });
