// Protoboard (matriz de contatos) de 830 pontos: a placa branca em que se monta
// circuito sem soldar nada. Medidas da placa real — 165 × 55 mm, furos de 2,54 em
// 2,54 mm; 1 unidade da cena = 10 mm.
//
// O que o modelo tem pra ensinar, e que o objeto real esconde: por fora são 830
// furos iguais, mas por dentro eles já vêm ligados de cinco em cinco por uma mola
// de metal. O botão Raio-X deixa o plástico translúcido e mostra essas molas; com
// o circuito ligado, as molas que conduzem a corrente acendem e bolinhas de luz
// percorrem o caminho do + ao −, passando por dentro da placa.
import { THREE, montaVisualizador, mergeGeometries } from './_visualizador-pecas.js';

const MM = .1;
const u = valor => valor * MM;
const LARGURA_MM = 165, ALTURA_MM = 55;
const LARGURA = u(LARGURA_MM), ALTURA = u(ALTURA_MM);
// mm a partir do canto inferior esquerdo da placa -> unidades a partir do centro
const mm = (x, y) => [u(x) - LARGURA / 2, u(y) - ALTURA / 2];

// ---------- a planta da placa, em mm ----------
const PASSO = 2.54, FURO = 1.55;
const Z = { baseTopo: .8, cavidade: 7.2, topo: 9.4 };       // alturas a partir do fundo
const FUNDO_DO_FURO = 6.6, NIVEL_DA_MOLA = 5.0;             // onde a perna para e onde a mola conduz
const CANAL = [24.96, 30.04];                               // o vão do meio, em y

const COLUNAS = 63, X_COLUNA_1 = 3.85;
const colunaX = coluna => X_COLUNA_1 + (coluna - 1) * PASSO;
const XS_COLUNAS = Array.from({ length: COLUNAS }, (_, i) => colunaX(i + 1));

// Os trilhos têm 50 furos em dez grupos de cinco, com uma folga maior entre grupos.
const XS_TRILHO = [];
for (let grupo = 0; grupo < 10; grupo += 1) for (let furo = 0; furo < 5; furo += 1) XS_TRILHO.push(8.84 + grupo * 15.24 + furo * PASSO);

const LINHAS = { A: 13.53, B: 16.07, C: 18.61, D: 21.15, E: 23.69, F: 31.31, G: 33.85, H: 36.39, I: 38.93, J: 41.47 };
const furoDe = (coluna, linha) => [colunaX(coluna), LINHAS[linha]];
// A linha mais perto da borda é a positiva, com o traço vermelho por fora dela.
const TRILHOS = [
  { y: 5.46, sinal: '+', traco: 3.55 }, { y: 8.00, sinal: '−', traco: 9.91 },
  { y: 47.00, sinal: '−', traco: 45.09 }, { y: 49.54, sinal: '+', traco: 51.45 },
];

// ---------- o circuito de exemplo ----------
// + do trilho → coluna 5 → resistor → coluna 9 → LED → coluna 10 → − do trilho.
// Duas pernas se encontram porque estão na MESMA coluna e na mesma metade da placa:
// quem fecha a ligação é a mola de cinco furos, e é isso que o modelo mostra.
const CIRCUITO = {
  entrada: [13.92, 49.54], saida: [26.62, 47.00],
  jumperVermelho: [5, 'J'], jumperPreto: [10, 'I'],
  resistor: [[5, 'I'], [9, 'I']],
  led: [[9, 'G'], [10, 'G']],                               // anodo, catodo
  molasVivas: ['5:cima', '9:cima', '10:cima'],
  trilhosVivos: [2, 3],                                     // índices em TRILHOS: − e + de cima
};

// ---------- o visualizador ----------
const v = montaVisualizador({
  global: '__protoboard',
  arquivoDaImagem: 'protoboard.png',
  pecas: {
    corpo: { nome: 'Corpo e furos', explosao: 2.2 },
    contatos: { nome: 'Molas de contato', explosao: 0 },
    trilhos: { nome: 'Trilhos de alimentação', explosao: 0 },
    canal: { nome: 'O canal do meio', explosao: 2.2 },
    circuito: { nome: 'Circuito de exemplo', explosao: 3.5 },
    base: { nome: 'Base adesiva', explosao: -1.1 },
  },
  detalhes: {
    corpo: ['01', 'TODOS OS FUROS IGUAIS', 'O que a placa mostra por fora.', 'Sessenta e três colunas numeradas, dez linhas com letra e dois trilhos em cada borda. Os números e as letras são só um mapa para você achar o furo de novo.'],
    contatos: ['02', 'CINCO FUROS, UMA MOLA', 'O segredo mora embaixo do plástico.', 'Cada mola de metal atende cinco furos da mesma coluna. Duas pernas enfiadas nessa coluna encostam na mesma mola, e é assim que elas ficam ligadas sem solda nenhuma.'],
    trilhos: ['03', 'ENERGIA DE PONTA A PONTA', 'Os quatro trilhos das bordas.', 'Aqui a mola é uma só, comprida, com cinquenta furos. Serve para levar o mais e o menos até qualquer ponto da placa, sem puxar fio da fonte toda hora.'],
    canal: ['04', 'POR QUE TEM UM VÃO', 'O canal separa as duas metades.', 'O vão do meio tem a largura exata de um chip: cada fileira de pernas cai numa metade diferente da placa. Sem ele, os dois lados do chip encostariam na mesma mola e ficariam em curto.'],
    circuito: ['05', 'UM CIRCUITO INTEIRO', 'Do mais ao menos, sem soldar.', 'Jumper do trilho positivo, resistor, LED e jumper para o negativo. Com o raio-x ligado, as molas que conduzem a corrente acendem e mostram o caminho por dentro da placa.'],
    base: ['06', 'O QUE FECHA A CAIXA', 'A base adesiva.', 'A chapa de baixo prende as molas no lugar e fecha a carcaça. A fita dupla-face nela é o que cola a placa na bancada ou em outra placa.'],
  },
  direcoes: { perspective: [-3, -9, 8.5], front: [0, 0, 1], back: [0, 0, -1], side: [0, -1, .16] },
  textos: { montado: 'PLACA MONTADA', montar: 'Montar a placa' },
  palco: { alvo: [0, 0, 0], camPos: [-3, -9, 8.5], meiaLarguraDesktop: 9, meiaLarguraMobile: 9, distMin: 14, orbitaMin: 2, maxPolar: Math.PI },
  luz: { chao: { eixo: 'z', em: -1.9 }, alcance: 10, principal: { cor: 0xf6f5ed, forca: 3.4, posicao: [-3, 5, 12] } },
  zoomMaximo: { conjunto: 3, isolado: .6 },
  alternadores: [
    { id: 'raiox', chave: 'raiox', inicial: false, movimento: false },
    { id: 'corrente', chave: 'corrente', inicial: true, movimento: false },
  ],
  aoAlternar(chave, valor) {
    if (chave === 'raiox') aplicaRaioX(valor);
    if (chave === 'corrente') aplicaCorrente(valor);
  },
  // Cada peça abre no enquadramento que melhor conta a história dela.
  aoSelecionar(chave, api) {
    const passos = {
      corpo: () => { api.alterna('raiox', false); api.expandir(0); api.vista('front'); },
      contatos: () => { api.alterna('raiox', true); api.expandir(1); api.vista('perspective'); },
      trilhos: () => { api.isolar(true); api.vista('perspective'); },
      // o canal é do mesmo plástico do corpo: com o raio-x ligado ele isolado vira fantasma
      canal: () => { api.alterna('raiox', false); api.isolar(true); api.vista('perspective'); },
      circuito: () => { api.alterna('raiox', true); api.expandir(0); api.vista('front'); },
      base: () => { api.isolar(true); api.vista('back'); },
    };
    passos[chave]();
  },
});
const { grupos, caixa, cilindro, inscricao, textura, metal, retangulo, furo, extrusao } = v;
v.canvas.setAttribute('aria-label', 'Protoboard de 830 pontos em três dimensões. Arraste para girar, botão direito move, role para aproximar. Os botões ao lado separam as camadas e ligam o raio-x, que mostra as molas de metal por dentro.');

// ---------- materiais ----------
const plasticoBranco = new THREE.MeshStandardMaterial({ color: 0xe9e7de, roughness: .62, metalness: .02 });
const plasticoFuro = new THREE.MeshStandardMaterial({ color: 0x2f3335, roughness: .78, metalness: .05, side: THREE.DoubleSide });
const mats = {
  bronze: metal(0xb98a4e, .34, .86), chapa: metal(0x6f767a, .42, .82),
  preto: metal(0x14161a, .55, .12), perna: metal(0xb9bdba, .3, .9), corpoResistor: metal(0xc3ab84, .55, .06),
  vermelho: metal(0xcf2f2f, .45, .05), pretoFio: metal(0x1a1c1e, .5, .05),
};
// As molas do caminho da corrente usam um bronze próprio, que acende com o circuito.
// Amarelo quente e forte: com o raio-x todas as molas já brilham douradas, e um
// laranja parecido com o delas se perdia no meio.
const bronzeVivo = mats.bronze.clone();
bronzeVivo.emissive = new THREE.Color(0xffd54f);
bronzeVivo.emissiveIntensity = 0;
// O raio-x mexe nestes: são o plástico que esconde o metal.
const materiaisOpacos = [plasticoBranco, plasticoFuro];

// ---------- a serigrafia impressa na face de cima ----------
const LADO = 2048, K = LADO / LARGURA_MM, ALTO = Math.round(ALTURA_MM * K);
const px = x => x * K, py = y => ALTO - y * K;
const TINTA = '#3d4145';

function texto(ctx, conteudo, x, y, altura, opcoes = {}) {
  const { alinha = 'center', peso = 'bold', cor = TINTA } = opcoes;
  ctx.save();
  ctx.translate(px(x), py(y));
  ctx.fillStyle = cor; ctx.font = `${peso} ${altura * K}px Arial`; ctx.textAlign = alinha; ctx.textBaseline = 'middle';
  ctx.fillText(conteudo, 0, 0);
  ctx.restore();
}
function traco(ctx, x1, y1, x2, y2, largura, cor) {
  ctx.strokeStyle = cor; ctx.lineWidth = largura * K; ctx.lineCap = 'butt';
  ctx.beginPath(); ctx.moveTo(px(x1), py(y1)); ctx.lineTo(px(x2), py(y2)); ctx.stroke();
}
function geradorDeAcaso(semente) {
  return () => { semente = (Math.imul(semente, 1664525) + 1013904223) >>> 0; return semente / 4294967296; };
}
// grão do plástico injetado ou do papel: ruído leve pra superfície não ficar chapada
function granula(ctx, largura, altura, semente, quantos, claro, escuro, tamanho) {
  const acaso = geradorDeAcaso(semente);
  for (let i = 0; i < quantos; i += 1) {
    ctx.fillStyle = acaso() > .5 ? claro : escuro;
    ctx.fillRect(acaso() * largura, acaso() * altura, tamanho, tamanho);
  }
}

function desenhaFaceDeCima(ctx, largura, altura) {
  ctx.fillStyle = '#eae8df'; ctx.fillRect(0, 0, largura, altura);
  granula(ctx, largura, altura, 4321, 14000, 'rgba(255,255,255,.5)', 'rgba(155,152,142,.22)', 2);
  for (const trilho of TRILHOS) {
    const cor = trilho.sinal === '+' ? '#c0392b' : '#2f5fa8';
    traco(ctx, 2.5, trilho.traco, LARGURA_MM - 2.5, trilho.traco, .55, cor);
    for (const x of [5.6, LARGURA_MM - 5.6]) texto(ctx, trilho.sinal, x, trilho.traco, 3.1, { cor, peso: '700' });
  }
  // números das colunas, acima da linha J e abaixo da linha A
  for (let coluna = 1; coluna <= COLUNAS; coluna += 1) {
    if (coluna !== 1 && coluna % 5 !== 0) continue;
    for (const y of [43.5, 11.5]) texto(ctx, String(coluna), colunaX(coluna), y, 1.85);
  }
  // letras das linhas, nas duas margens
  for (const [linha, y] of Object.entries(LINHAS)) {
    for (const x of [1.85, LARGURA_MM - 1.85]) texto(ctx, linha, x, y, 1.9);
  }
}

function desenhaFaceDeBaixo(ctx, largura, altura) {
  ctx.fillStyle = '#b9a47a'; ctx.fillRect(0, 0, largura, altura);
  granula(ctx, largura, altura, 777, 9000, 'rgba(255,250,235,.18)', 'rgba(90,80,58,.2)', 3);
  ctx.strokeStyle = 'rgba(60,52,36,.55)'; ctx.lineWidth = .4 * K;
  ctx.strokeRect(px(4), py(ALTURA_MM - 4), px(LARGURA_MM - 8), (ALTURA_MM - 8) * K);
  // O plano gira 180° pra olhar pra baixo, e a câmera de baixo também inverte o lado:
  // as duas viradas se anulam, então o texto vai direto, sem espelhar.
  texto(ctx, 'PUXE A FITA PARA COLAR', LARGURA_MM / 2, 31, 3.4, { cor: '#4b422e' });
  texto(ctx, 'SEIRES · ESTUDO 3D', LARGURA_MM / 2, 22.5, 2.2, { cor: '#5d5238', peso: '600' });
}

// A textura é pintada em milímetros; aqui ela passa a valer pelas coordenadas da forma.
function texturaDaFace(desenha) {
  const mapa = textura(desenha, LADO, ALTO);
  mapa.repeat.set(1 / LARGURA, 1 / ALTURA);
  mapa.offset.set(.5, .5);
  return mapa;
}

// ---------- o corpo: a face de cima com os 830 furos de verdade ----------
// Uma única ShapeGeometry com 830 buracos é lenta de triangular. Em vez disso, a
// face nasce em faixas horizontais — uma por fileira de furos, mais as faixas lisas
// entre elas — e as faixas viram uma malha só no fim.
function faixasDaFace() {
  const fileiras = [
    ...TRILHOS.map(trilho => ({ y: trilho.y, xs: XS_TRILHO })),
    ...Object.values(LINHAS).map(y => ({ y, xs: XS_COLUNAS })),
  ].sort((a, b) => a.y - b.y);

  const faixas = [];
  let anterior = 0;
  for (const fileira of fileiras) {
    const y0 = fileira.y - PASSO / 2, y1 = fileira.y + PASSO / 2;
    if (y0 > anterior + .01) faixas.push({ y0: anterior, y1: y0, furos: [] });
    faixas.push({ y0, y1, furos: fileira.xs.map(x => [x, fileira.y]) });
    anterior = y1;
  }
  if (anterior < ALTURA_MM - .01) faixas.push({ y0: anterior, y1: ALTURA_MM, furos: [] });
  // a faixa lisa entre as linhas E e F não existe: ali é o canal
  return faixas.filter(faixa => !(!faixa.furos.length && faixa.y0 > CANAL[0] - .1 && faixa.y1 < CANAL[1] + .1));
}

function geometriaDaFace() {
  return mergeGeometries(faixasDaFace().map(faixa => {
    const forma = new THREE.Shape();
    const [x0, y0] = mm(0, faixa.y0), [x1, y1] = mm(LARGURA_MM, faixa.y1);
    forma.moveTo(x0, y0); forma.lineTo(x1, y0); forma.lineTo(x1, y1); forma.lineTo(x0, y1); forma.closePath();
    for (const [fx, fy] of faixa.furos) {
      const [cx, cy] = mm(fx, fy), r = u(FURO / 2);
      const buraco = new THREE.Path();
      buraco.moveTo(cx - r, cy - r); buraco.lineTo(cx - r, cy + r); buraco.lineTo(cx + r, cy + r); buraco.lineTo(cx + r, cy - r); buraco.closePath();
      forma.holes.push(buraco);
    }
    return new THREE.ShapeGeometry(forma);
  }));
}

function todosOsFuros() {
  const furos = [];
  for (const trilho of TRILHOS) for (const x of XS_TRILHO) furos.push([x, trilho.y]);
  for (const y of Object.values(LINHAS)) for (const x of XS_COLUNAS) furos.push([x, y]);
  return furos;
}

function montaCorpo() {
  const g = grupos.corpo;
  const face = new THREE.Mesh(geometriaDaFace(), new THREE.MeshStandardMaterial({
    map: texturaDaFace(desenhaFaceDeCima), roughness: .6, metalness: .03, side: THREE.DoubleSide,
  }));
  face.position.z = u(Z.topo);
  face.receiveShadow = true;
  g.add(face);
  materiaisOpacos.push(face.material);

  // parede de cada furo: um tubo de seção quadrada, que dá a profundidade real
  const lado = u(FURO), raio = lado / Math.SQRT2;
  const tubo = new THREE.CylinderGeometry(raio, raio, u(Z.topo - Z.cavidade), 4, 1, true);
  tubo.rotateY(Math.PI / 4); tubo.rotateX(Math.PI / 2);
  const furos = todosOsFuros();
  const paredes = new THREE.InstancedMesh(tubo, plasticoFuro, furos.length);
  const molde = new THREE.Object3D();
  furos.forEach(([x, y], i) => {
    molde.position.set(...mm(x, y), u((Z.topo + Z.cavidade) / 2));
    molde.updateMatrix();
    paredes.setMatrixAt(i, molde.matrix);
  });
  g.add(paredes);

  // carcaça: moldura fechada em volta, com a cavidade oca por dentro
  const moldura = retangulo(LARGURA, ALTURA, u(1.4));
  moldura.holes.push(furo(retangulo(LARGURA - u(3.4), ALTURA - u(3.4), u(1.1))));
  extrusao(g, moldura, u(Z.topo - Z.baseTopo), u(Z.baseTopo), plasticoBranco, u(.12));
}

// ---------- o canal do meio, com um chip montado em cima dele ----------
function montaCanal() {
  const g = grupos.canal;
  const meio = (CANAL[0] + CANAL[1]) / 2, largura = CANAL[1] - CANAL[0];
  // o bloco maciço embaixo do vão: é ele que separa as duas metades
  caixa(g, LARGURA - u(2.6), u(largura), u(Z.cavidade - Z.baseTopo), plasticoBranco,
    0, u(meio) - ALTURA / 2, u((Z.cavidade + Z.baseTopo) / 2), u(.1));
  // as duas paredes que sobem do fundo do canal até a face de cima
  for (const [borda, sentido] of [[CANAL[0], -1], [CANAL[1], 1]]) {
    caixa(g, LARGURA - u(2.6), u(.34), u(Z.topo - Z.cavidade), plasticoBranco,
      0, u(borda + sentido * .17) - ALTURA / 2, u((Z.topo + Z.cavidade) / 2), u(.05));
  }
  montaChip(g);
}

// Um chip de 8 pernas montado em cima do canal: quatro pernas na linha E, quatro na F.
function montaChip(g) {
  const colunas = [30, 31, 32, 33];
  const centroX = (colunaX(colunas[0]) + colunaX(colunas[3])) / 2;
  const [cx, cy] = mm(centroX, (CANAL[0] + CANAL[1]) / 2);
  const baseZ = u(Z.topo + 1.4);
  caixa(g, u(9.8), u(6.4), u(3.4), mats.preto, cx, cy, baseZ + u(1.7), u(.14));
  const marca = new THREE.Mesh(new THREE.CircleGeometry(u(.9), 20), metal(0x2b2f34, .6, .1));
  marca.position.set(cx - u(3.6), cy, baseZ + u(3.41));
  g.add(marca);
  inscricao(g, 'NE555', u(5.2), u(1.1), [cx + u(.6), cy + u(.8), baseZ + u(3.42)], [0, 0, 0], '#c9ccce', 92);
  inscricao(g, 'SEIRES', u(4.2), u(.9), [cx + u(.6), cy - u(.9), baseZ + u(3.42)], [0, 0, 0], '#8b9094', 84);
  for (const coluna of colunas) for (const linha of ['E', 'F']) {
    const [wx, wy] = mm(...furoDe(coluna, linha));
    const lado = linha === 'E' ? -1 : 1;
    caixa(g, u(.5), u(1.1), u(.3), mats.perna, wx, cy + lado * u(3.3), baseZ + u(1.1), u(.04));   // ombro
    caixa(g, u(.5), u(.3), u(2.0), mats.perna, wx, wy, baseZ - u(.1), u(.04));                    // perna descendo
    caixa(g, u(.5), u(.3), u(2.6), mats.perna, wx, wy, u(Z.topo - 1.3), u(.04));                  // dentro do furo
  }
}

// ---------- as molas: cinco furos, uma peça de metal ----------
// Uma tira com um par de linguetas em V embaixo de cada furo. A de coluna deita
// ao longo das cinco linhas; a de trilho, ao longo dos cinquenta furos.
function geometriaDaMola(comprimento, passos, eixo) {
  const aoLongoDeY = eixo === 'y';
  const tira = aoLongoDeY
    ? new THREE.BoxGeometry(u(1.9), u(comprimento), u(.35))
    : new THREE.BoxGeometry(u(comprimento), u(1.9), u(.35));
  const pecas = [tira];
  for (const passo of passos) for (const lado of [-1, 1]) {
    const chapa = aoLongoDeY ? new THREE.BoxGeometry(u(.3), u(1.9), u(6.0)) : new THREE.BoxGeometry(u(1.9), u(.3), u(6.0));
    chapa.translate(0, 0, u(3.18));
    if (aoLongoDeY) chapa.rotateY(lado * .075); else chapa.rotateX(-lado * .075);
    chapa.translate(aoLongoDeY ? lado * u(.62) : u(passo), aoLongoDeY ? u(passo) : lado * u(.62), u(.175));
    pecas.push(chapa);
  }
  return mergeGeometries(pecas);
}

// Coloca as molas: as comuns numa InstancedMesh só; as que conduzem o circuito como
// malhas separadas com o bronze que acende (a instância não tem brilho próprio).
function espalhaMolas(grupo, geometria, posicoes, vivas) {
  const comuns = posicoes.filter(p => !vivas.has(p.chave));
  const malha = new THREE.InstancedMesh(geometria, mats.bronze, comuns.length);
  const molde = new THREE.Object3D();
  comuns.forEach((p, i) => { molde.position.copy(p.posicao); molde.updateMatrix(); malha.setMatrixAt(i, molde.matrix); });
  malha.castShadow = true;
  grupo.add(malha);
  for (const p of posicoes.filter(p => vivas.has(p.chave))) {
    const viva = new THREE.Mesh(geometria, bronzeVivo);
    viva.position.copy(p.posicao);
    viva.castShadow = true;
    grupo.add(viva);
  }
}

function montaContatos() {
  const primeira = LINHAS.A, ultima = LINHAS.E;
  const geometria = geometriaDaMola(ultima - primeira + 2.2, [-5.08, -2.54, 0, 2.54, 5.08], 'y');
  const centros = { baixo: (primeira + ultima) / 2, cima: (LINHAS.F + LINHAS.J) / 2 };
  const posicoes = [];
  for (let coluna = 1; coluna <= COLUNAS; coluna += 1) for (const metade of ['baixo', 'cima']) {
    posicoes.push({ chave: `${coluna}:${metade}`, posicao: new THREE.Vector3(...mm(colunaX(coluna), centros[metade]), u(Z.baseTopo + .4)) });
  }
  espalhaMolas(grupos.contatos, geometria, posicoes, new Set(CIRCUITO.molasVivas));
}

function montaTrilhos() {
  const centro = (XS_TRILHO[0] + XS_TRILHO[XS_TRILHO.length - 1]) / 2;
  const comprimento = XS_TRILHO[XS_TRILHO.length - 1] - XS_TRILHO[0] + 3;
  const geometria = geometriaDaMola(comprimento, XS_TRILHO.map(x => x - centro), 'x');
  const posicoes = TRILHOS.map((trilho, i) => ({ chave: String(i), posicao: new THREE.Vector3(...mm(centro, trilho.y), u(Z.baseTopo + .4)) }));
  espalhaMolas(grupos.trilhos, geometria, posicoes, new Set(CIRCUITO.trilhosVivos.map(String)));
}

function montaBase() {
  const g = grupos.base;
  extrusao(g, retangulo(LARGURA, ALTURA, u(1.4)), u(Z.baseTopo), 0, mats.chapa, u(.08));
  // A fita fica abaixo do chanfro da chapa (que desce 0,08 mm além do zero), senão
  // a chapa cobre a fita e a vista por baixo sai toda cinza. É um plano de uv 0..1,
  // então a textura vai crua: o truque de repeat/offset só vale pra ShapeGeometry.
  const fita = new THREE.Mesh(new THREE.PlaneGeometry(LARGURA - u(1.2), ALTURA - u(1.2)), new THREE.MeshStandardMaterial({
    map: textura(desenhaFaceDeBaixo, LADO, ALTO), roughness: .88, metalness: .02,
  }));
  fita.rotation.y = Math.PI;
  fita.position.z = -u(.16);
  g.add(fita);
}

// ---------- o circuito de exemplo ----------
function ponto(x, y, z) { return new THREE.Vector3(...mm(x, y), u(z)); }
const alvo = (x, y) => ({ x, y, dentro: ponto(x, y, FUNDO_DO_FURO), topo: ponto(x, y, Z.topo) });
const alvoDoFuro = (coluna, linha) => alvo(...furoDe(coluna, linha));

function fio(g, pontos, material, raio = .3) {
  const curva = new THREE.CatmullRomCurve3(pontos, false, 'centripetal');
  const malha = new THREE.Mesh(new THREE.TubeGeometry(curva, pontos.length * 9, u(raio), 8, false), material);
  malha.castShadow = true;
  g.add(malha);
  return curva;
}

// Jumper rígido: desce no furo, sobe, cruza por cima e desce no outro furo.
function jumper(g, de, para, material, altura) {
  const alto = Z.topo + altura;
  const meio = new THREE.Vector3().addVectors(de.topo, para.topo).multiplyScalar(.5);
  return fio(g, [
    de.dentro, de.topo, new THREE.Vector3(de.topo.x, de.topo.y, u(alto)),
    new THREE.Vector3(meio.x, meio.y, u(alto + 1.1)),
    new THREE.Vector3(para.topo.x, para.topo.y, u(alto)), para.topo, para.dentro,
  ], material);
}

// Resistor deitado, com as faixas de cor de 220 Ω. Devolve as duas pernas
// (cada uma do corpo pro furo), que o caminho da corrente percorre.
function montaResistor(g, a, b) {
  const centroX = (a.x + b.x) / 2, y = a.y, z = Z.topo + 2.6;
  g.add(cilindro(u(1.15), u(6.4), mats.corpoResistor, ...mm(centroX, y), u(z), 'x'));
  for (const lado of [-1, 1]) g.add(cilindro(u(1.32), u(1.0), mats.corpoResistor, ...mm(centroX + lado * 2.8, y), u(z), 'x'));
  for (const [cor, dx] of [[0x8d2b1f, -1.9], [0x8d2b1f, -1.0], [0x6a4326, -.1], [0xb08d3e, 1.9]]) {
    g.add(cilindro(u(1.22), u(.55), metal(cor, .5, .15), ...mm(centroX + dx, y), u(z), 'x'));
  }
  return [a, b].map(ponta => {
    const sinal = Math.sign(ponta.x - centroX);
    return fio(g, [ponto(centroX + sinal * 3.3, y, z), ponto(ponta.x - sinal * .3, y, z), ponta.topo, ponta.dentro], mats.perna, .22);
  });
}

// LED de 5 mm em pé. Devolve as pernas e o meio do corpo, por onde a corrente passa.
const led = {};
function montaLed(g, anodo, catodo) {
  const centroX = (anodo.x + catodo.x) / 2, y = anodo.y, baseZ = Z.topo + 2.0;
  const [cx, cy] = mm(centroX, y);
  const vidro = new THREE.MeshStandardMaterial({ color: 0xd8382f, emissive: 0xff3b1e, emissiveIntensity: 0, roughness: .22, metalness: .05, transparent: true, opacity: .9 });
  g.add(cilindro(u(2.9), u(1.0), vidro, cx, cy, u(baseZ + .5), 'z'));                     // aba da base
  g.add(cilindro(u(2.5), u(5.6), vidro, cx, cy, u(baseZ + 3.8), 'z'));                    // corpo
  const cupula = new THREE.Mesh(new THREE.SphereGeometry(u(2.5), 28, 16, 0, Math.PI * 2, 0, Math.PI / 2), vidro);
  cupula.rotation.x = Math.PI / 2; cupula.position.set(cx, cy, u(baseZ + 6.6));
  g.add(cupula);
  const brilho = new THREE.PointLight(0xff5a30, 0, u(40), 1.2);
  brilho.position.set(cx, cy, u(baseZ + 4.5));
  g.add(brilho);
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturaDeHalo(), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
  halo.scale.set(u(14), u(14), 1);
  halo.position.set(cx, cy, u(baseZ + 4.5));
  g.add(halo);
  Object.assign(led, { vidro, brilho, halo });
  const pernas = [anodo, catodo].map(ponta => fio(g, [ponto(ponta.x, ponta.y, baseZ + .2), ponta.topo, ponta.dentro], mats.perna, .22));
  return { pernas, meio: new THREE.Vector3(cx, cy, u(baseZ + 3.8)) };
}

function texturaDeHalo() {
  return textura((ctx, lado) => {
    const brilho = ctx.createRadialGradient(lado / 2, lado / 2, 0, lado / 2, lado / 2, lado / 2);
    brilho.addColorStop(0, 'rgba(255,150,90,.95)');
    brilho.addColorStop(.3, 'rgba(255,80,40,.4)');
    brilho.addColorStop(1, 'rgba(255,40,10,0)');
    ctx.fillStyle = brilho; ctx.fillRect(0, 0, lado, lado);
  }, 256, 256);
}

// O caminho da corrente é montado junto com as peças, na ordem em que ela passa:
// cada fio entra com a curva que foi desenhada, e os saltos por dentro da placa
// (onde quem conduz é a mola) entram como trechos retos no nível da mola.
const trajeto = [];
function anota(curva, invertida = false) {
  const pontos = curva.getSpacedPoints(20);
  trajeto.push(...(invertida ? pontos.reverse() : pontos));
}
function pelaMola(de, para) {
  trajeto.push(ponto(de.x, de.y, NIVEL_DA_MOLA), ponto(para.x, para.y, NIVEL_DA_MOLA));
}

function montaCircuito() {
  const g = grupos.circuito;
  const entrada = alvo(...CIRCUITO.entrada), saida = alvo(...CIRCUITO.saida);
  const vermelho = alvoDoFuro(...CIRCUITO.jumperVermelho), preto = alvoDoFuro(...CIRCUITO.jumperPreto);
  const [rA, rB] = CIRCUITO.resistor.map(furo => alvoDoFuro(...furo));
  const [anodo, catodo] = CIRCUITO.led.map(furo => alvoDoFuro(...furo));

  trajeto.push(ponto(entrada.x, entrada.y, NIVEL_DA_MOLA));
  anota(jumper(g, entrada, vermelho, mats.vermelho, 4.5));
  pelaMola(vermelho, rA);
  const [pernaA, pernaB] = montaResistor(g, rA, rB);
  anota(pernaA, true); anota(pernaB);
  pelaMola(rB, anodo);
  const diodo = montaLed(g, anodo, catodo);
  anota(diodo.pernas[0], true); trajeto.push(diodo.meio); anota(diodo.pernas[1]);
  pelaMola(catodo, preto);
  anota(jumper(g, preto, saida, mats.pretoFio, 6.5));
  trajeto.push(ponto(saida.x, saida.y, NIVEL_DA_MOLA));
  montaCorrente(g);
}

// Bolinhas de luz andando pelo trajeto. Trechos retos em vez de uma curva única:
// a curva suave cortava caminho nos cantos e as bolinhas saíam de dentro do fio.
const corrente = { caminho: null, bolinhas: [] };
function montaCorrente(g) {
  const caminho = new THREE.CurvePath();
  for (let i = 1; i < trajeto.length; i += 1) {
    if (trajeto[i].distanceTo(trajeto[i - 1]) > 1e-5) caminho.add(new THREE.LineCurve3(trajeto[i - 1], trajeto[i]));
  }
  corrente.caminho = caminho;
  const material = new THREE.MeshBasicMaterial({ color: 0xffe08a });
  const bola = new THREE.SphereGeometry(u(.85), 12, 10);
  for (let i = 0; i < 8; i += 1) {
    const bolinha = new THREE.Mesh(bola, material);
    corrente.bolinhas.push(bolinha);
    g.add(bolinha);
  }
  posicionaBolinhas(0);
}

function posicionaBolinhas(fase) {
  corrente.bolinhas.forEach((bolinha, i) => {
    corrente.caminho.getPointAt((fase + i / corrente.bolinhas.length) % 1, bolinha.position);
  });
}

// ---------- os dois botões ----------
function aplicaRaioX(ligado) {
  for (const material of materiaisOpacos) {
    material.transparent = ligado;
    material.opacity = ligado ? .18 : 1;
    material.depthWrite = !ligado;
    material.needsUpdate = true;
  }
}

function aplicaCorrente(ligado) {
  bronzeVivo.emissiveIntensity = ligado ? 2.2 : 0;
  led.vidro.emissiveIntensity = ligado ? 2.6 : 0;
  led.brilho.intensity = ligado ? 3 : 0;
  led.halo.visible = ligado;
  for (const bolinha of corrente.bolinhas) bolinha.visible = ligado;
}

let fase = 0;
function tick(dt, estado) {
  if (!estado.corrente || v.movimentoReduzido.matches) return;
  fase = (fase + dt * .09) % 1;
  posicionaBolinhas(fase);
}

montaCorpo();
montaContatos();
montaTrilhos();
montaCanal();
montaBase();
montaCircuito();
aplicaRaioX(false);
aplicaCorrente(true);
v.inicia({ tick });
