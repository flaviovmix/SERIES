import { THREE, mergeGeometries, montaVisualizador } from './_visualizador-pecas.js';

// Estudo visual das fotos: painel modular em -Z, entrada da rede em +Z.
// Os encaixes representam a face da fonte; não são um mapa de pinagem elétrica.
const v = montaVisualizador({
  global: '__fonteAlimentacao', arquivoDaImagem: 'fonte-alimentacao.png',
  pecas: {
    carcaca: { nome: 'Carcaça', explosao: [6.2, 1, 0] },
    placa: { nome: 'Placa principal', explosao: 0 },
    transformador: { nome: 'Transformador', explosao: [0, 1.5, .4] },
    capacitores: { nome: 'Capacitores', explosao: [0, 1.3, 1.6] },
    dissipadores: { nome: 'Dissipadores', explosao: [1, 1.6, 0] },
    ventoinha: { nome: 'Ventoinha e grade', explosao: [0, 3, 0] },
    entrada: { nome: 'Entrada AC e chave', explosao: [0, 0, 2] },
    cabos: { nome: 'Painel modular', explosao: [0, 0, -2] },
  },
  detalhes: {
    carcaca: ['01', 'PROTEÇÃO', 'Carcaça de aço.', 'Chapas dobradas, parafusos e abertura circular para a ventoinha formam a caixa da fonte.'],
    placa: ['02', 'CONVERSÃO', 'Placa da fonte.', 'Filtros, circuitos de controle e componentes de potência transformam a energia recebida da tomada.'],
    transformador: ['03', 'ISOLAÇÃO', 'Transformador de alta frequência.', 'Ele transfere energia entre os lados de entrada e saída com isolamento elétrico.'],
    capacitores: ['04', 'RESERVA', 'Capacitores.', 'Eles filtram oscilações e armazenam energia por instantes.'],
    dissipadores: ['05', 'CALOR', 'Dissipadores de alumínio.', 'Transistores e retificadores transferem calor para estas aletas.'],
    ventoinha: ['06', 'AR', 'Ventoinha e grade circular.', 'As pás giram sob os anéis de proteção. Use o botão Ventoinha para parar e observar o conjunto.'],
    entrada: ['07', 'REDE', 'Entrada de três pinos e chave.', 'O encaixe do cabo de energia fica na face perfurada, junto da chave liga/desliga marcada com I e O.'],
    cabos: ['08', 'CONEXÕES MODULARES', 'Um encaixe para cada cabo.', 'Duas fileiras com MB para placa-mãe, CPU, VGA para placa de vídeo, SATA e PERIF. Cavidades, contatos e travas acompanham o painel.'],
  },
  direcoes: { perspective: [-8, 6.5, -11], top: [.02, 1, -.04], bottom: [0, -1, -.04], modular: [0, .025, -1], back: [0, .025, 1] },
  textos: { montado: 'FONTE ATX MONTADA', desmontado: 'FONTE ATX ABERTA', montar: 'Fechar fonte' },
  palco: { alvo: [0, 0, 0], camPos: [-8, 6.5, -11], meiaLarguraDesktop: 5.6, meiaLarguraMobile: 5.6, distMin: 10, orbitaMin: 2, maxPolar: Math.PI },
  luz: { chao: -1.65, alcance: 13, principal: { cor: 0xf1f4f7, forca: 3.8, posicao: [-5, 9, -7] } },
  alternadores: [{ id: 'ventilar', chave: 'ventilar', inicial: true, movimento: true }],
  aoSelecionar(chave, api) {
    if (chave === 'placa') { api.expandir(1); api.vista('top'); }
    else { api.isolar(true); api.vista(chave === 'entrada' ? 'back' : chave === 'cabos' ? 'modular' : 'perspective'); }
  },
});
const { grupos: g, caixa: box, metal } = v;
v.controls.zoomSpeed = .18;
v.canvas.setAttribute('aria-label', 'Fonte ATX modular em 3D. Gire para ver os encaixes dos cabos e a entrada de energia, ou separe e isole as peças.');
const m = {
  case: metal(0x111417, .78, .18), edge: metal(0x191d22, .65, .20),
  socket: metal(0x080a0d, .75, .01), rim: metal(0x1b1f24, .55, .05),
  dark: metal(0x020304, .9, 0), pcb: metal(0x185447, .65, .12),
  silver: metal(0xbcc7cc, .27, .83), copper: metal(0xbb7e41, .36, .82),
  yellow: metal(0xd6b456, .6, .08), chip: metal(0x20242a, .58, .1),
  blade: metal(0x12161c, .65, .03), wire: metal(0x171b20, .85, .02),
};
for (const key of ['case', 'edge', 'socket', 'rim', 'dark', 'blade', 'wire']) m[key].envMapIntensity = .18;
const coating = v.textura((ctx, w, h) => {
  const pixels = ctx.createImageData(w, h); let seed = 750;
  for (let i = 0; i < pixels.data.length; i += 4) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    pixels.data[i] = pixels.data[i + 1] = pixels.data[i + 2] = 90 + (seed % 70); pixels.data[i + 3] = 255;
  }
  ctx.putImageData(pixels, 0, 0);
}, 256, 256);
coating.wrapS = coating.wrapT = THREE.RepeatWrapping; coating.repeat.set(5, 5);
m.case.bumpMap = coating; m.case.bumpScale = .006;
const UP = [-Math.PI / 2, 0, 0];
function label(parent, text, w, h, pos, rot = [0, 0, 0], color = '#d4dadd', size = 175) {
  return v.inscricao(parent, text, w, h, pos, rot, color, size);
}
function cyl(parent, r, h, material, pos, axis = 'y', sides = 24) {
  const mesh = v.cilindro(r, h, material, ...pos, axis, { lados: sides }); parent.add(mesh); return mesh;
}
function ring(parent, r, thickness, material, pos, rot = [0, 0, 0]) {
  const mesh = new THREE.Mesh(new THREE.TorusGeometry(r, thickness, 8, 80), material);
  mesh.position.set(...pos); mesh.rotation.set(...rot); mesh.castShadow = true; parent.add(mesh); return mesh;
}
function tube(parent, points, radius, material) {
  const path = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(path, 28, radius, 8, false), material);
  mesh.castShadow = true; parent.add(mesh); return mesh;
}
function screw(parent, pos, top = false) {
  const holder = new THREE.Group(); holder.position.set(...pos); if (top) holder.rotation.x = -Math.PI / 2; parent.add(holder);
  cyl(holder, .073, .025, m.edge, [0, 0, 0], 'z', 16); cyl(holder, .047, .032, m.silver, [0, 0, .01], 'z', 16);
  box(holder, .058, .011, .006, m.dark, 0, 0, .029, .002); box(holder, .011, .058, .006, m.dark, 0, 0, .029, .002);
}

// Caixa com abertura real: a tampa não encobre a ventoinha nem os conectores.
box(g.carcaca, 5.6, .10, 5, m.case, 0, -1.50, 0, .035);
for (const x of [-2.75, 2.75]) {
  box(g.carcaca, .10, 2.98, 5, m.case, x, 0, 0, .04);
  box(g.carcaca, .15, .045, 4.90, m.edge, x, -1.31, 0, .012);
}
const topShape = v.retangulo(5.6, 5, .10); topShape.holes.push(v.furoRedondo(0, 0, 2.19));
const top = v.extrusao(g.carcaca, topShape, .09, 0, m.case, .01); top.rotation.x = -Math.PI / 2; top.position.y = 1.46;
for (const x of [-2.57, 2.57]) for (const z of [-2.28, 2.28]) screw(g.carcaca, [x, 1.565, z], true);
for (const x of [-2.60, 2.60]) box(g.carcaca, .21, .10, 4.8, m.edge, x, 1.34, 0, .018);
label(g.carcaca, '750', .76, .28, [-2.40, 1.563, -.20], UP, '#c7d0d2', 200);
const sideBadge = new THREE.Group(); sideBadge.position.set(-2.807, .05, .1); sideBadge.rotation.y = -Math.PI / 2; g.carcaca.add(sideBadge);
box(sideBadge, 3.75, 1.57, .014, m.dark, 0, 0, 0, .055);
label(sideBadge, 'SEIRES', 2.65, .43, [0, .38, .013], [0, 0, 0], '#e0e5e7', 205);
label(sideBadge, '750 W  /  MODULAR', 2.9, .25, [0, -.06, .013]);
label(sideBadge, 'ATX POWER SUPPLY', 2.35, .18, [0, -.47, .013], [0, 0, 0], '#889598');

// Placa e componentes internos, abaixo do espaço reservado à ventoinha.
box(g.placa, 5.04, .11, 4.30, m.pcb, 0, -1.24, 0, .07);
for (const x of [-2.32, 2.32]) for (const z of [-1.95, 1.95]) { cyl(g.placa, .095, .20, m.copper, [x, -1.39, z]); screw(g.placa, [x, -1.16, z], true); }
const traces = v.textura((ctx, w, h) => {
  ctx.strokeStyle = '#49917a'; ctx.lineWidth = 2;
  for (let i = 0; i < 40; i++) {
    const x = 25 + i * 24, y = 45 + (i % 6) * 40;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 170); ctx.lineTo(x + 30, y + 200); ctx.lineTo(x + 30, h - 35); ctx.stroke();
  }
}, 1024, 1024);
const circuit = new THREE.Mesh(new THREE.PlaneGeometry(4.95, 4.2), new THREE.MeshStandardMaterial({ map: traces, transparent: true, depthWrite: false, roughness: .65 }));
circuit.rotation.x = -Math.PI / 2; circuit.position.y = -1.177; g.placa.add(circuit);
box(g.transformador, 1.25, 1.15, 1.13, m.chip, -.65, -.56, .18, .10);
box(g.transformador, 1.37, .69, .91, m.yellow, -.65, -.54, .18, .09);
for (const x of [-1.17, -.13]) box(g.transformador, .12, 1.03, 1.03, m.chip, x, -.56, .18, .035);
label(g.transformador, 'SEIRES / T1', .94, .19, [-.65, .026, .18], UP, '#b7c2bd', 160);
for (const z of [-.32, .68]) for (let i = 0; i < 5; i++) box(g.transformador, .055, .19, .06, m.silver, -1.05 + i * .2, -1.12, z, .005);
for (const [x, z, r, h] of [[-1.72, 1.05, .34, 1.35], [-.84, 1.32, .34, 1.35], [1.83, -.85, .25, .78], [1.83, -1.47, .25, .78], [.98, -1.53, .22, .65]]) {
  const y = -1.17 + h / 2; cyl(g.capacitores, r, h, m.chip, [x, y, z]); cyl(g.capacitores, r * .87, .023, m.silver, [x, y + h / 2 + .006, z]);
  box(g.capacitores, r * 1.18, .01, .017, m.dark, x, y + h / 2 + .021, z, .001);
  box(g.capacitores, .017, .01, r * 1.18, m.dark, x, y + h / 2 + .021, z, .001);
  box(g.capacitores, .045, h * .73, .018, m.silver, x, y, z + r, .003);
}
for (const x of [.6, 1.22]) {
  box(g.dissipadores, .12, 1.14, 2.35, m.silver, x, -.53, .30, .02);
  for (let i = 0; i < 11; i++) box(g.dissipadores, .46, .72, .045, m.silver, x, -.30, -.76 + i * .21, .009);
  for (const z of [-.53, .24, 1.04]) {
    box(g.dissipadores, .14, .39, .26, m.chip, x - .14, -.80, z, .02);
    for (let i = 0; i < 3; i++) box(g.dissipadores, .028, .21, .026, m.silver, x - .14, -1.07, z - .08 + i * .08, .004);
  }
}
for (let i = 0; i < 26; i++) {
  const x = -2.18 + (i % 13) * .34, z = -1.92 + Math.floor(i / 13) * .34;
  box(g.placa, .19, .10, .095, i % 3 ? m.chip : m.yellow, x, -1.13, z, .012);
  for (const dx of [-.10, .10]) box(g.placa, .043, .07, .10, m.silver, x + dx, -1.13, z, .006);
}
box(g.placa, .45, .37, .55, m.yellow, -2.04, -.97, .01, .035);
ring(g.placa, .30, .10, m.copper, [-1.75, -.86, -.76], UP);

// Ventoinha vazada, sete pás curvas e grade concêntrica como nas referências.
const fanFrame = new THREE.Group(); fanFrame.position.y = 1.02; fanFrame.rotation.x = -Math.PI / 2; g.ventoinha.add(fanFrame);
const frameShape = v.retangulo(4.45, 4.45, .18); frameShape.holes.push(v.furoRedondo(0, 0, 2.07));
v.extrusao(fanFrame, frameShape, .30, -.17, m.socket, .018);
ring(fanFrame, 2.05, .055, m.edge, [0, 0, -.09]);
const rotor = new THREE.Group(); fanFrame.add(rotor);
const bladeShape = new THREE.Shape(); bladeShape.moveTo(.38, -.13);
bladeShape.bezierCurveTo(.78, -.57, 1.60, -.82, 1.94, -.40); bladeShape.quadraticCurveTo(2.01, -.15, 1.84, .12);
bladeShape.bezierCurveTo(1.22, -.04, .79, .27, .38, .19); bladeShape.closePath();
const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, { depth: .055, bevelEnabled: true, bevelSize: .022, bevelThickness: .015, bevelSegments: 2, curveSegments: 14 });
for (let i = 0; i < 7; i++) { const blade = new THREE.Mesh(bladeGeo, m.blade); blade.rotation.z = i * Math.PI * 2 / 7; blade.castShadow = true; rotor.add(blade); }
cyl(rotor, .49, .20, m.socket, [0, 0, .06], 'z', 48); cyl(rotor, .34, .012, m.edge, [0, 0, .169], 'z', 40);
label(rotor, 'S', .38, .32, [0, 0, .18], [0, 0, 0], '#d3dbdd', 215);
for (const a of [0, Math.PI / 2, Math.PI, Math.PI * 1.5]) {
  const arm = box(fanFrame, 1.61, .09, .10, m.socket, 1.18 * Math.cos(a), 1.18 * Math.sin(a), -.11, .015); arm.rotation.z = a;
}
for (let r = .48; r < 2.16; r += .205) ring(g.ventoinha, r, .026, m.edge, [0, 1.595, 0], UP);
for (const a of [Math.PI / 4, -Math.PI / 4]) { const arm = box(g.ventoinha, 5.35, .048, .045, m.edge, 0, 1.60, 0, .018); arm.rotation.y = a; }
for (const x of [-1.94, 1.94]) for (const z of [-1.94, 1.94]) screw(g.ventoinha, [x, 1.626, z], true);
for (const dx of [0, .07]) tube(g.ventoinha, [[1.85 + dx, .99, 1.8], [2.12 + dx, .72, 1.87], [2.07 + dx, -.77, 1.48]], .023, dx ? m.yellow : m.wire);

// Face da tomada: chapa perfurada, entrada oca e chave I/O.
const rear = new THREE.Group(); rear.position.z = 2.43; g.entrada.add(rear);
const rearShape = v.retangulo(5.38, 2.89, .07);
for (let row = 0; row < 12; row++) for (let col = 0; col < 22; col++) {
  const x = -2.43 + col * .224 + (row % 2) * .112, y = -1.23 + row * .221;
  if (x > 2.47 || (x > .20 && y < .61)) continue;
  const hex = Array.from({ length: 6 }, (_, i) => [x + .112 * Math.cos(Math.PI / 6 + i * Math.PI / 3), y + .112 * Math.sin(Math.PI / 6 + i * Math.PI / 3)]);
  rearShape.holes.push(v.furo(v.poligono(hex, .012)));
}
rearShape.holes.push(v.furo(v.desloca(v.retangulo(1.31, .82, .06), 1.35, -.12)));
rearShape.holes.push(v.furo(v.desloca(v.retangulo(.62, .45, .04), 1.35, -.99)));
v.extrusao(rear, rearShape, .09, 0, m.case, 0);
for (const x of [-2.52, 2.52]) for (const y of [-1.28, 1.28]) screw(rear, [x, y, .102]);
const inlet = new THREE.Group(); inlet.position.set(1.35, -.12, .08); rear.add(inlet);
const inletOutline = v.poligono([[-.95, -.38], [-.74, -.57], [.74, -.57], [.95, -.38], [.95, .35], [.73, .55], [-.73, .55], [-.95, .35]], .07);
const mouthPoints = [[-.59, -.32], [.59, -.32], [.59, .15], [.39, .34], [-.39, .34], [-.59, .15]];
inletOutline.holes.push(v.furo(v.poligono(mouthPoints, .035))); v.extrusao(inlet, inletOutline, .13, 0, m.socket, .015);
const inletWall = v.retangulo(1.37, .91, .075); inletWall.holes.push(v.furo(v.poligono(mouthPoints, .035)));
v.extrusao(inlet, inletWall, .40, -.31, m.socket, .006); box(inlet, 1.29, .84, .04, m.dark, 0, 0, -.33, .04);
for (const [x, y, length] of [[-.34, -.15, .27], [.34, -.15, .27], [0, .16, .33]]) box(inlet, .085, .165, length, m.silver, x, y, -.20 + length / 2, .016);
for (const x of [-.78, .78]) screw(inlet, [x, 0, .153]);
box(rear, .78, .59, .15, m.socket, 1.35, -.99, .11, .055);
const rocker = box(rear, .61, .42, .15, m.edge, 1.35, -.99, .205, .035); rocker.rotation.x = -.14;
label(rear, 'I    O', .52, .18, [1.35, -.985, .306], [0, 0, 0], '#eeeeee', 220);
label(rear, 'AC INPUT', 1.55, .19, [1.35, .60, .108]);
for (const dx of [-.16, .16]) tube(rear, [[1.35 + dx, -.22, -.34], [1.0 + dx, -.8, -.55], [-.2 + dx, -1.05, -.65]], .039, m.wire);

// Painel modular: cavidades chanfradas, terminais recuados e trava em cada bloco.
const modular = new THREE.Group(); modular.position.z = -2.44; modular.rotation.y = Math.PI; g.cabos.add(modular);
const panelShape = v.retangulo(5.38, 2.89, .07), sockets = [];
const pitch = .17, gap = .035;
function socket(name, columns, x, y) {
  const w = columns * pitch + .12, h = .44;
  const holder = new THREE.Group(); holder.position.set(x, y, .09); modular.add(holder);
  holder.name = name; sockets.push({ name, pins: columns * 2 });
  panelShape.holes.push(v.furo(v.desloca(v.retangulo(w - .025, h - .025, .015), x, y)));
  const housing = v.retangulo(w, h, .025), face = v.retangulo(w, h, .025);
  for (let row = 0; row < 2; row++) for (let col = 0; col < columns; col++) {
    const px = (col - (columns - 1) / 2) * pitch, py = (.5 - row) * pitch, a = .066;
    const points = (col + row) % 3 !== 0 ? [[-a, -a], [a, -a], [a, .022], [.024, a], [-.024, a], [-a, .022]] : [[-a, -a], [a, -a], [a, a], [-a, a]];
    const opening = v.desloca(v.poligono(points, .006), px, py); housing.holes.push(v.furo(opening)); face.holes.push(v.furo(opening));
    const contactShape = v.retangulo(.068, .072, .008); contactShape.holes.push(v.furo(v.retangulo(.041, .045, .006)));
    const contact = v.extrusao(holder, contactShape, .13, -.14, m.silver, 0); contact.position.x = px; contact.position.y = py;
  }
  v.extrusao(holder, housing, .31, -.25, m.socket, 0); v.extrusao(holder, face, .012, .06, m.rim, 0);
  box(holder, w, h, .026, m.dark, 0, 0, -.275, .02);
  box(holder, .16, .12, .11, m.socket, 0, h / 2 + .046, .015, .009);
  box(holder, .19, .035, .04, m.edge, 0, h / 2 + .11, .06, .007);
  label(modular, name, Math.min(w, .92), .17, [x, y + .47, .097], [0, 0, 0], '#d8dfe1', 190);
}
function row(items, y) {
  const width = items.reduce((sum, [, cols]) => sum + cols * pitch + .12, 0) + gap * (items.length - 1); let x = -width / 2;
  for (const [name, cols] of items) { const w = cols * pitch + .12; socket(name, cols, x + w / 2, y); x += w + gap; }
}
row([['VGA1', 4], ['VGA2', 4], ['CPU2', 4], ['PERIF', 3], ['SATA1', 3], ['SATA2', 3], ['SATA3', 3]], .27);
row([['VGA3', 4], ['VGA4', 4], ['CPU1', 4], ['MB / 18', 9], ['MB / 10', 5]], -.65);
v.extrusao(modular, panelShape, .09, 0, m.case, 0);
for (const x of [-2.50, 2.50]) for (const y of [-1.24, 1.22]) screw(modular, [x, y, .101]);
label(modular, 'SEIRES  /  750 W', 2.7, .24, [0, 1.14, .104], [0, 0, 0], '#e3e7e7', 195);
label(modular, 'FULL MODULAR', 2.5, .18, [0, -1.21, .104], [0, 0, 0], '#a0adb1', 175);
box(modular, 5.10, 2.60, .075, m.pcb, 0, 0, -.36, .035);
for (let i = 0; i < 16; i++) box(modular, .18, .10, .07, i % 3 ? m.chip : m.silver, -2.25 + (i % 8) * .64, -.98 + Math.floor(i / 8) * 1.96, -.43, .01);

// Unir detalhes estáticos por material reduz o custo das grades e dos contatos.
// As oito peças e o rotor continuam separados para a interação.
function mergeStatic(parent) {
  parent.updateMatrixWorld(true);
  const inverse = parent.matrixWorld.clone().invert(), batches = new Map();
  parent.traverse(mesh => {
    if (!mesh.isMesh || mesh.material.map || Array.isArray(mesh.material)) return;
    if (!batches.has(mesh.material)) batches.set(mesh.material, []); batches.get(mesh.material).push(mesh);
  });
  for (const [material, meshes] of batches) {
    if (meshes.length < 2) continue;
    const geometries = meshes.map(mesh => {
      const geometry = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone();
      geometry.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inverse, mesh.matrixWorld)); return geometry;
    });
    const merged = mergeGeometries(geometries, false); geometries.forEach(geometry => geometry.dispose()); if (!merged) continue;
    for (const mesh of meshes) mesh.removeFromParent();
    const mesh = new THREE.Mesh(merged, material); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh);
  }
}
for (const [key, group] of Object.entries(g)) if (key !== 'ventoinha') mergeStatic(group);
mergeStatic(rotor);
function tick(dt, state) { if (state.ventilar && !v.movimentoReduzido.matches) rotor.rotation.z -= dt * 8; }
v.inicia({ tick });
window.__fonteAlimentacao.conectores = () => ({ sockets, acPins: 3, rotor: rotor.rotation.z });

// Arraste no sistema de coordenadas do aplicativo deitado no telefone.
const portrait = matchMedia('(max-width:820px) and (orientation:portrait) and (pointer:coarse)');
const panel = document.getElementById('mobilePanel'), pointers = new Map();
panel.addEventListener('click', () => {
  const open = document.body.classList.toggle('panel-open');
  panel.setAttribute('aria-expanded', open); panel.setAttribute('aria-label', open ? 'Fechar controles' : 'Abrir controles'); panel.textContent = open ? '×' : '☰';
});
function orient() { v.controls.enableRotate = !portrait.matches; v.controls.enablePan = !portrait.matches; pointers.clear(); }
portrait.addEventListener('change', orient); orient();
v.canvas.addEventListener('pointerdown', e => {
  if (portrait.matches) { pointers.set(e.pointerId, { x: e.clientX, y: e.clientY }); v.controls.dispatchEvent({ type: 'start' }); }
});
v.canvas.addEventListener('pointermove', e => {
  const previous = pointers.get(e.pointerId); if (!previous || !portrait.matches) return;
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY }); if (pointers.size !== 1) return;
  const dx = e.clientY - previous.y, dy = previous.x - e.clientX, delta = v.camera.position.clone().sub(v.controls.target);
  if (v.estado.navegacao === 'mover') {
    const scale = delta.length() * .0016, shift = new THREE.Vector3().setFromMatrixColumn(v.camera.matrix, 0).multiplyScalar(-dx * scale);
    shift.add(new THREE.Vector3().setFromMatrixColumn(v.camera.matrix, 1).multiplyScalar(dy * scale));
    v.camera.position.add(shift); v.controls.target.add(shift);
  } else {
    const orbit = new THREE.Spherical().setFromVector3(delta); orbit.theta -= dx * .006;
    orbit.phi = THREE.MathUtils.clamp(orbit.phi - dy * .006, .03, Math.PI - .03);
    v.camera.position.copy(v.controls.target).add(new THREE.Vector3().setFromSpherical(orbit));
  }
  v.controls.update();
});
for (const event of ['pointerup', 'pointercancel']) v.canvas.addEventListener(event, e => pointers.delete(e.pointerId));
