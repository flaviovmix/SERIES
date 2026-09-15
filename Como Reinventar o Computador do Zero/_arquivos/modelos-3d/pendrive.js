import { THREE, mergeGeometries, montaVisualizador } from './_visualizador-pecas.js';

// Pendrive USB-A ilustrativo. Dimensões, componentes e trilhas não são um projeto elétrico.
const v = montaVisualizador({
  global: '__pendrive', arquivoDaImagem: 'pendrive.png',
  pecas: {
    tampa: { nome: 'Carcaça superior', explosao: [3.5, 1.25, -.2] },
    base: { nome: 'Carcaça inferior', explosao: [0, -1.45, 0] },
    placa: { nome: 'Placa e trilhas', explosao: 0 },
    flash: { nome: 'Memória flash', explosao: [0, 1.35, -.45] },
    controlador: { nome: 'Controlador USB', explosao: [0, 1.1, .55] },
    cristal: { nome: 'Cristal e regulador', explosao: [-1.55, .65, .3] },
    conector: { nome: 'Conector USB-A', explosao: [0, 0, 1.1] },
    led: { nome: 'LED e difusor', explosao: [-1.25, .9, -.4] },
  },
  detalhes: {
    tampa: ['01', 'POR FORA', 'Metal, encaixes e acabamento.', 'A carcaça superior tem bordas arredondadas, uma janela para a luz de atividade e uma abertura para prender uma alça. As inscrições acompanham o metal.'],
    base: ['02', 'SUPORTE', 'A base que segura a placa.', 'Nervuras, apoios e pontos de fixação mantêm a placa alinhada com a saída USB. A união das duas metades forma a linha lateral do corpo.'],
    placa: ['03', 'CONEXÕES', 'Circuitos nas duas faces.', 'Trilhas, vias, ilhas de solda e pontos de teste conectam a memória, o controlador e a porta USB. Gire a placa para explorar também o verso.'],
    flash: ['04', 'ARQUIVOS', 'Memória NAND flash.', 'O encapsulamento guarda os dados mesmo sem energia. Na face inferior, uma matriz de pequenas conexões liga a memória à placa.'],
    controlador: ['05', 'TRADUTOR', 'Controlador USB.', 'Ele conversa com o computador e organiza a leitura e a gravação na memória. Terminais nas quatro bordas fazem a ligação com as trilhas.'],
    cristal: ['06', 'RITMO E ENERGIA', 'Cristal, regulador e passivos.', 'O cristal fornece uma referência de tempo. O regulador e os pequenos componentes ao redor ajudam a estabilizar a alimentação dos circuitos.'],
    conector: ['07', 'A PORTA', 'Um plugue USB-A por dentro.', 'A blindagem é oca e tem janelas de retenção. Dentro dela, uma lâmina isolante sustenta quatro contatos dourados: dois para energia e dois para dados.'],
    led: ['08', 'SINAL', 'LED e caminho da luz.', 'O pequeno LED da placa ilumina um difusor que chega à janela da carcaça. Use o botão LED de atividade para ligar ou apagar a indicação.'],
  },
  direcoes: { perspective: [8, 8, 10], top: [.02, 1, .04], bottom: [.02, -1, -.04], back: [0, .04, 1] },
  textos: { montado: 'PENDRIVE MONTADO', desmontado: 'PENDRIVE ABERTO', montar: 'Fechar pendrive' },
  palco: { alvo: [0, 0, 0], camPos: [8, 8, 10], meiaLarguraDesktop: 5, meiaLarguraMobile: 5, distMin: 9, orbitaMin: 1.5, maxPolar: Math.PI },
  luz: { chao: -2.2, alcance: 10, exposicao: 1.05 },
  alternadores: [{ id: 'atividade', chave: 'atividade', inicial: true, movimento: true }],
  pontoDoPonteiro(event, canvas) {
    const r = canvas.getBoundingClientRect();
    return portrait.matches
      ? new THREE.Vector2((event.clientY - r.top) / r.height * 2 - 1, 1 - (r.right - event.clientX) / r.width * 2)
      : new THREE.Vector2((event.clientX - r.left) / r.width * 2 - 1, 1 - (event.clientY - r.top) / r.height * 2);
  },
  aoSelecionar(key, api) {
    if (key === 'placa') { api.expandir(1); api.isolar(true); api.vista('top'); }
    else { api.isolar(true); api.vista(key === 'conector' ? 'back' : 'perspective'); }
  },
});
const { grupos: g, caixa: box, metal } = v;
v.controls.zoomSpeed = .18;
v.canvas.setAttribute('aria-label', 'Pendrive USB-A detalhado em 3D. Arraste para girar, examine a abertura USB e separe ou isole as oito partes.');
const m = {
  body: metal(0x29323c, .46, .72), edge: metal(0x606d78, .32, .8),
  accent: metal(0x246e6b, .49, .45), pcb: metal(0x144738, .69, .12),
  chip: metal(0x151a20, .72, .04), silver: metal(0xc2c8cd, .34, .83),
  gold: metal(0xcfaa50, .31, .8), ceramic: metal(0xc1ad87, .72, .04),
  plastic: metal(0x101419, .82, .01), trace: metal(0x2f7a59, .70, .18),
  solder: metal(0x8e9d9c, .38, .70), lens: new THREE.MeshPhysicalMaterial({ color: 0x87d8ad, roughness: .28, transparent: true, opacity: .78, metalness: .02, emissive: 0x3cbe71, emissiveIntensity: .6 }),
  diode: new THREE.MeshStandardMaterial({ color: 0xb8ffba, emissive: 0x58e47e, emissiveIntensity: .7, roughness: .35 }),
};
for (const key of ['body', 'accent', 'chip', 'plastic']) m[key].envMapIntensity = .5;
m.pcb.envMapIntensity = .35;
const brushing = v.textura((ctx, w, h) => {
  ctx.fillStyle = '#808080'; ctx.fillRect(0, 0, w, h); let seed = 64;
  for (let x = 0; x < w; x++) { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; const shade = 86 + seed % 84; ctx.fillStyle = `rgb(${shade},${shade},${shade})`; ctx.fillRect(x, 0, 1, h); }
}, 512, 128);
for (const key of ['body', 'silver']) { m[key].bumpMap = brushing; m[key].bumpScale = .003; }
const UP = [-Math.PI / 2, 0, 0], DOWN = [Math.PI / 2, 0, 0];
function label(parent, text, w, h, pos, rot = UP, color = '#d4dfde', size = 190) {
  return v.inscricao(parent, text, w, h, pos, rot, color, size);
}
function cyl(parent, r, h, material, pos, axis = 'y', sides = 20) {
  const mesh = v.cilindro(r, h, material, ...pos, axis, { lados: sides }); parent.add(mesh); return mesh;
}
function plate(parent, shape, thickness, y, material, bevel = .015) {
  const mesh = v.extrusao(parent, shape, thickness, 0, material, bevel); mesh.rotation.x = -Math.PI / 2; mesh.position.y = y; return mesh;
}
function slot(shape, w, d, x, z, radius = .04) { shape.holes.push(v.furo(v.desloca(v.retangulo(w, d, radius), x, -z))); }
function screw(parent, x, y, z, bottom = false) {
  cyl(parent, .07, .025, m.edge, [x, y, z]); cyl(parent, .047, .032, m.silver, [x, y, z]);
  box(parent, .056, .006, .010, m.plastic, x, y + (bottom ? -.019 : .019), z, .002);
  box(parent, .010, .006, .056, m.plastic, x, y + (bottom ? -.019 : .019), z, .002);
}
function passive(parent, x, y, z, rotation = 0, length = .16) {
  const part = new THREE.Group(); part.position.set(x, y, z); part.rotation.y = rotation; parent.add(part);
  box(part, length, .08, .09, m.ceramic, 0, 0, 0, .012);
  for (const sign of [-1, 1]) box(part, .04, .084, .095, m.solder, sign * (length / 2 - .012), 0, 0, .006);
}
function pinChip(parent, x, y, z, w, d, text) {
  box(parent, w, .18, d, m.chip, x, y, z, .035);
  for (const sign of [-1, 1]) {
    for (let i = 0; i < 8; i++) box(parent, .115, .045, .045, m.silver, x + sign * (w / 2 + .027), y - .063, z + (i - 3.5) * d / 9, .005);
    for (let i = 0; i < 8; i++) box(parent, .045, .045, .115, m.silver, x + (i - 3.5) * w / 9, y - .063, z + sign * (d / 2 + .027), .005);
  }
  label(parent, text, w * .85, .18, [x, y + .096, z - .08], UP, '#adb9bb', 165);
  cyl(parent, .033, .006, m.edge, [x - w * .34, y + .097, z - d * .33]);
}

// Duas metades ocas, abertura frontal para o plugue e olhal atravessado na cauda.
function outerShape() { return v.desloca(v.retangulo(2.40, 6.0, .32), 0, .65); }
const roof = outerShape(); slot(roof, .92, .25, 0, -3.28, .10); slot(roof, .22, .42, .70, -2.50, .075);
plate(g.tampa, roof, .10, .43, m.body, .028);
const floor = outerShape(); slot(floor, .92, .25, 0, -3.28, .10); plate(g.base, floor, .09, -.52, m.body, .028);
// Paredes em U deixam a passagem do conector livre entre os dois ombros.
for (const [parent, y, h] of [[g.base, -.205, .43], [g.tampa, .22, .40]]) {
  for (const x of [-1.10, 1.10]) box(parent, .16, h, 5.32, m.body, x, y, -.52, .055);
  box(parent, 2.07, h, .30, m.body, 0, y, -2.92, .07);
  for (const x of [-.985, .985]) box(parent, .32, h, .20, m.body, x, y, 2.22, .04);
}
// Apenas o trecho do olhal fica maciço; o circuito ocupa a cavidade central.
const loop = v.desloca(v.retangulo(2.13, .61, .23), 0, 3.27); slot(loop, .92, .25, 0, -3.28, .10);
plate(g.base, loop, .82, -.42, m.accent, .018);
for (const x of [-1.185, 1.185]) box(g.base, .026, .038, 5.30, m.accent, x, .018, -.51, .008);
for (const x of [-.93, .93]) for (const z of [-2.48, 1.78]) {
  cyl(g.base, .09, .19, m.plastic, [x, -.33, z]); screw(g.base, x, -.55, z, true);
  box(g.tampa, .13, .16, .22, m.plastic, x, .31, z, .02);
}
for (const x of [-1.0, 1.0]) for (const z of [-1.80, -.65, .60]) box(g.base, .17, .12, .20, m.plastic, x, -.30, z, .015);
// Faixa estreita e inscrições gravadas sobre o corpo.
box(g.tampa, .13, .018, 4.35, m.accent, -.87, .57, -.50, .02);
label(g.tampa, 'SEIRES', 1.61, .31, [.12, .566, -1.75], UP, '#dbe4e5', 205);
label(g.tampa, 'FLASH DRIVE', 1.52, .18, [.12, .566, -1.25], UP, '#8d9eaa', 165);
label(g.tampa, '64', 1.34, .79, [.12, .566, .10], UP, '#d9e6e2', 235);
label(g.tampa, 'GB', .77, .25, [.12, .566, .74], UP, '#75b9aa', 210);
label(g.tampa, 'USB-A', 1.1, .18, [.12, .566, 1.50], UP, '#adb9c1', 175);
label(g.base, 'SEIRES / FLASH MEMORY', 1.65, .19, [0, -.552, -.75], DOWN, '#9fadb4', 175);
label(g.base, '64 GB', 1.25, .28, [0, -.552, .1], DOWN, '#bac8cb', 180);
for (let i = 0; i < 23; i++) box(g.base, i % 3 ? .017 : .033, .005, .28, m.edge, -.63 + i * .057, -.552, .76, .001);

// PCB com contorno próprio e passagem contínua até a base do conector.
const boardShape = v.poligono([[-.91, -2.34], [-.73, -2.57], [.73, -2.57], [.91, -2.34], [.91, 1.77], [.71, 1.98], [.71, 2.23], [-.71, 2.23], [-.71, 1.98], [-.91, 1.77]].map(([x, z]) => [x, -z]), .065);
plate(g.placa, boardShape, .11, -.215, m.pcb, .009);
for (const x of [-.77, .77]) for (const z of [-2.30, 1.61]) { cyl(g.placa, .075, .015, m.gold, [x, -.094, z]); cyl(g.placa, .035, .018, m.plastic, [x, -.09, z]); }
const boardW = 1.74, boardD = 4.3;
function traces(ctx, w, h, back = false) {
  const X = x => (x / boardW + .5) * w, Z = z => (z / boardD + .5) * h;
  ctx.lineJoin = 'round';
  for (let side of [-1, 1]) for (let i = 0; i < 13; i++) {
    const x = side * (.18 + i * .037), z = -1.75 + i * .095;
    ctx.strokeStyle = i % 4 ? '#398163' : '#78a16d'; ctx.lineWidth = i % 4 ? 2 : 3;
    ctx.beginPath(); ctx.moveTo(X(x), Z(z)); ctx.lineTo(X(side * (.63 + i % 4 * .045)), Z(z + .18));
    ctx.lineTo(X(side * (.63 + i % 4 * .045)), Z(.56 + i * .048)); ctx.lineTo(X(side * .38), Z(.80 + i * .048)); ctx.stroke();
  }
  ctx.strokeStyle = '#65a67b'; ctx.lineWidth = 3;
  for (let i = 0; i < 4; i++) { const x = (i - 1.5) * .23; ctx.beginPath(); ctx.moveTo(X(x), Z(2.1)); ctx.lineTo(X(x), Z(1.66)); ctx.lineTo(X(x * .65), Z(1.34)); ctx.stroke(); }
  ctx.fillStyle = '#b9d3ba'; ctx.font = '18px monospace'; ctx.fillText(back ? 'SEIRES / REV B' : 'U1    NAND', 26, 75);
  ctx.font = '14px monospace'; ctx.fillText(back ? 'TP1  TP2  TP3' : 'R1  C2  Y1', 24, h - 64);
}
for (const side of [1, -1]) {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(boardW, boardD), new THREE.MeshStandardMaterial({ map: v.textura((ctx, w, h) => traces(ctx, w, h, side < 0), 640, 1536), transparent: true, depthWrite: false, roughness: .7, metalness: .15 }));
  mesh.rotation.x = -side * Math.PI / 2; mesh.position.set(0, side > 0 ? -.093 : -.226, -.26); g.placa.add(mesh);
}
for (let i = 0; i < 56; i++) {
  const x = (i % 2 ? -1 : 1) * (.70 + (i % 4) * .026), z = -2.13 + Math.floor(i / 2) * .133;
  for (const side of [1, -1]) { cyl(g.placa, .023, .007, m.gold, [x, side > 0 ? -.098 : -.223, z], 'y', 10); cyl(g.placa, .011, .010, m.plastic, [x, side > 0 ? -.097 : -.224, z], 'y', 8); }
}
for (let i = 0; i < 6; i++) cyl(g.placa, .072, .014, m.gold, [-.54 + (i % 3) * .54, -.224, -.74 + Math.floor(i / 3) * 1.13]);
for (const [x, z] of [[-.45, -1.70], [0, -1.70], [.45, -1.70], [-.5, 1.0], [0, .98], [.5, 1.0]]) passive(g.placa, x, -.273, z, 0, .22);
// Ilhas sob a memória e o controlador permanecem na placa ao separar as peças.
for (let row = 0; row < 10; row++) for (let col = 0; col < 8; col++) cyl(g.placa, .029, .012, m.gold, [(col - 3.5) * .135, -.097, -1.15 + (row - 4.5) * .14], 'y', 10);
for (const x of [-.53, .53]) for (let i = 0; i < 8; i++) box(g.placa, .14, .015, .05, m.gold, x, -.099, .92 + (i - 3.5) * .10, .003);

// NAND com marca de orientação, identificação e conexões BGA no verso.
box(g.flash, 1.36, .22, 1.78, m.chip, 0, .10, -1.15, .055);
label(g.flash, 'SEIRES', 1.07, .18, [0, .216, -1.58], UP, '#acb8b8', 175);
label(g.flash, 'NAND FLASH', 1.15, .19, [0, .216, -1.17], UP, '#d4dcd6', 180);
label(g.flash, '64 GB / U1', 1.00, .16, [0, .216, -.75], UP, '#879794', 160);
cyl(g.flash, .044, .006, m.edge, [-.52, .215, -1.84]);
for (let row = 0; row < 10; row++) for (let col = 0; col < 8; col++) cyl(g.flash, .037, .070, m.solder, [(col - 3.5) * .135, -.050, -1.15 + (row - 4.5) * .14], 'y', 12);
label(g.flash, 'U1', .52, .16, [0, -.014, -1.15], DOWN, '#8b9996', 160);
pinChip(g.controlador, 0, .045, .92, .98, .89, 'USB CTRL');
label(g.controlador, 'U2', .50, .13, [0, .141, 1.16], UP, '#7d8f8a', 155);
box(g.controlador, .58, .035, .49, m.silver, 0, -.068, .92, .02);

// Cristal, regulador e pequenos componentes com terminais de solda.
box(g.cristal, .45, .13, .23, m.silver, -.51, .014, .20, .06);
box(g.cristal, .49, .035, .27, m.plastic, -.51, -.05, .20, .035);
label(g.cristal, '12.000', .39, .12, [-.51, .084, .20], UP, '#465153', 190);
box(g.cristal, .28, .12, .34, m.chip, .49, .003, .18, .025);
for (const x of [.31, .67]) for (const z of [.07, .18, .29]) box(g.cristal, .10, .044, .045, m.silver, x, -.042, z, .006);
for (const [x, z, r] of [[-.73, -.13, 0], [-.34, -.11, 0], [.08, -.11, 0], [.70, -.20, 0], [-.72, .58, Math.PI / 2], [.74, .65, Math.PI / 2], [-.47, 1.54, 0], [0, 1.57, 0], [.47, 1.54, 0]]) passive(g.cristal, x, -.045, z, r);
for (const x of [-.34, .34]) passive(g.cristal, x, -.047, -2.27, 0, .21);

// O difusor e o emissor respondem ao mesmo controle de atividade.
box(g.led, .25, .095, .31, m.plastic, .70, -.047, -2.40, .04);
for (const z of [-2.57, -2.23]) box(g.led, .19, .025, .075, m.silver, .70, -.082, z, .008);
box(g.led, .14, .065, .18, m.diode, .70, .036, -2.40, .033);
box(g.led, .185, .39, .36, m.lens, .70, .33, -2.49, .05);
const bezel = v.desloca(v.retangulo(.29, .48, .09), .70, 2.50); slot(bezel, .22, .42, .70, -2.50, .075); plate(g.tampa, bezel, .017, .539, m.edge, .004);

// USB-A aberto: quatro chapas, janelas superiores/inferiores e lábio chanfrado.
const usbBack = 1.91, usbFront = 4.08, usbCenter = (usbBack + usbFront) / 2;
for (const [y, side] of [[.325, 1], [-.29, -1]]) {
  const face = v.desloca(v.retangulo(1.58, usbFront - usbBack, .045), 0, -usbCenter);
  for (const x of [-.42, .42]) slot(face, .26, .39, x, 3.30, .025);
  plate(g.conector, face, .045, y, m.silver, .008);
  for (const x of [-.42, .42]) {
    const spring = box(g.conector, .20, .027, .25, m.edge, x, y + (side > 0 ? -.014 : .058), 3.07, .008); spring.rotation.x = side * .07;
  }
}
for (const x of [-.773, .773]) box(g.conector, .045, .61, usbFront - usbBack, m.silver, x, .031, usbCenter, .012);
const lip = v.retangulo(1.60, .675, .07); lip.holes.push(v.furo(v.retangulo(1.49, .563, .042)));
v.extrusao(g.conector, lip, .045, 4.065, m.edge, .006).position.y = .045;
box(g.conector, 1.43, .47, .21, m.plastic, 0, -.005, 2.12, .025);
box(g.conector, 1.40, .135, 1.66, m.plastic, 0, -.126, 3.06, .025);
const contactCenters = [-.48, -.16, .16, .48];
for (let i = 0; i < 4; i++) {
  const x = contactCenters[i], reach = (i === 0 || i === 3) ? 3.92 : 3.82;
  box(g.conector, .175, .027, reach - 2.40, m.gold, x, -.047, (reach + 2.40) / 2, .011);
  box(g.conector, .16, .15, .065, m.gold, x, -.10, 2.29, .008);
  box(g.conector, .17, .026, .47, m.solder, x, -.090, 2.07, .008);
}
for (const x of [-.72, .72]) for (const z of [1.93]) {
  box(g.conector, .16, .12, .22, m.silver, x, -.22, z, .018);
  box(g.placa, .22, .018, .26, m.solder, x, -.093, z, .025);
}
// Dobra de fechamento e marcas discretas no metal do plugue.
box(g.conector, .020, .007, 1.35, m.edge, 0, -.297, 3.06, .002);
label(g.conector, 'USB', .64, .16, [0, .379, 2.47], UP, '#556068', 195);

// Detalhes repetidos são unidos por material; cada uma das oito peças continua independente.
function mergeStatic(parent) {
  parent.updateMatrixWorld(true); const inverse = parent.matrixWorld.clone().invert(), batches = new Map();
  parent.traverse(mesh => { if (!mesh.isMesh || mesh.material.map || Array.isArray(mesh.material)) return; if (!batches.has(mesh.material)) batches.set(mesh.material, []); batches.get(mesh.material).push(mesh); });
  for (const [material, meshes] of batches) {
    if (meshes.length < 2) continue;
    const geometries = meshes.map(mesh => { const geometry = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone(); geometry.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inverse, mesh.matrixWorld)); return geometry; });
    const merged = mergeGeometries(geometries, false); geometries.forEach(geometry => geometry.dispose()); if (!merged) continue;
    meshes.forEach(mesh => mesh.removeFromParent()); const mesh = new THREE.Mesh(merged, material); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh);
  }
}
Object.values(g).forEach(mergeStatic);
let elapsed = 0;
function tick(dt, state) {
  if (!v.movimentoReduzido.matches) elapsed += dt;
  const intensity = state.atividade ? (v.movimentoReduzido.matches ? .65 : .35 + .75 * (.5 + .5 * Math.sin(elapsed * 5))) : 0;
  m.diode.emissiveIntensity = intensity; m.lens.emissiveIntensity = intensity * .75;
  m.diode.color.set(state.atividade ? 0xb8ffba : 0x294c37); m.lens.color.set(state.atividade ? 0x87d8ad : 0x294c37);
}
v.inicia({ tick });
window.__pendrive.detalhes = () => ({ led: m.diode.emissiveIntensity, diffuser: m.lens.emissiveIntensity, contacts: 4 });

// Coordenadas corrigidas para o aplicativo deitado: arraste, movimento e toque nas peças.
const portrait = matchMedia('(max-width:820px) and (orientation:portrait) and (pointer:coarse)');
const panel = document.getElementById('mobilePanel'), touches = new Map();
panel.addEventListener('click', () => {
  const open = document.body.classList.toggle('panel-open'); panel.setAttribute('aria-expanded', open);
  panel.setAttribute('aria-label', open ? 'Fechar controles' : 'Abrir controles'); panel.textContent = open ? '×' : '☰';
});
function orient() { v.controls.enableRotate = !portrait.matches; v.controls.enablePan = !portrait.matches; touches.clear(); }
portrait.addEventListener('change', orient); orient();
v.canvas.addEventListener('pointerdown', e => {
  if (!portrait.matches) return;
  touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
  v.controls.dispatchEvent({ type: 'start' });
});
v.canvas.addEventListener('pointermove', e => {
  const previous = touches.get(e.pointerId); if (!previous || !portrait.matches) return;
  touches.set(e.pointerId, { x: e.clientX, y: e.clientY }); if (touches.size !== 1) return;
  const dx = e.clientY - previous.y, dy = previous.x - e.clientX, delta = v.camera.position.clone().sub(v.controls.target);
  if (v.estado.navegacao === 'mover') {
    const scale = delta.length() * .0018, shift = new THREE.Vector3().setFromMatrixColumn(v.camera.matrix, 0).multiplyScalar(-dx * scale);
    shift.add(new THREE.Vector3().setFromMatrixColumn(v.camera.matrix, 1).multiplyScalar(dy * scale)); v.camera.position.add(shift); v.controls.target.add(shift);
  } else {
    const orbit = new THREE.Spherical().setFromVector3(delta); orbit.theta -= dx * .006; orbit.phi = THREE.MathUtils.clamp(orbit.phi - dy * .006, .03, Math.PI - .03);
    v.camera.position.copy(v.controls.target).add(new THREE.Vector3().setFromSpherical(orbit));
  }
  v.controls.update();
});
for (const event of ['pointerup', 'pointercancel']) v.canvas.addEventListener(event, e => touches.delete(e.pointerId));
// A projeção de QA também precisa devolver coordenadas na tela girada.
const basePixels = window.__pendrive.pixels;
window.__pendrive.pixels = () => {
  const result = basePixels(); if (!portrait.matches) return result;
  const rect = result.rect, convert = p => ({ x: rect.right - (p.y - rect.top) / (rect.bottom - rect.top) * (rect.right - rect.left), y: rect.top + (p.x - rect.left) / (rect.right - rect.left) * (rect.bottom - rect.top) });
  return { ...result, corners: result.corners.map(convert), parts: Object.fromEntries(Object.entries(result.parts).map(([key, p]) => [key, convert(p)])) };
};
