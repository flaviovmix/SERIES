// RTX 5090 Founders Edition: estudo de geometria, com interior didático simplificado.
// Referência: https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/
import { THREE, montaPalco } from './_base-modelo-3d.js';

const $ = id => document.getElementById(id);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const state = { expanded: 0, targetExpanded: 0, fans: !reducedMotion.matches, rotating: false, part: 'frame', isolated: false, view: 'perspective' };
const stage = $('stage');
const palco = montaPalco({ alvo: [0, 0, 0], camPos: [-9, 6.8, 16], meiaLarguraDesktop: 7.4, meiaLarguraMobile: 7.4, distMin: 18, orbitaMin: 5, maxPolar: Math.PI });
const { scene, camera, renderer, controls, bloco, pixelDe } = palco;
scene.background = new THREE.Color(0x171d18);
scene.fog = null;
scene.children.filter(child => child.isLight || child.material?.isShadowMaterial).forEach(child => scene.remove(child));
renderer.toneMappingExposure = 1.15;
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
const canvas = renderer.domElement;
canvas.tabIndex = 0;
canvas.setAttribute('role', 'img');
canvas.setAttribute('aria-label', 'RTX 5090 em três dimensões. Arraste para girar; use as setas com o foco aqui, mais e menos para zoom, Home para restaurar. Os botões abaixo oferecem vistas prontas.');
controls.autoRotate = false;
controls.autoRotateSpeed = .6;
controls.enableDamping = !reducedMotion.matches;
controls.dampingFactor = .065;
controls.zoomSpeed = .32;
controls.rotateSpeed = .58;
controls.minPolarAngle = .03;
controls.maxPolarAngle = Math.PI - .03;

scene.add(new THREE.HemisphereLight(0xf2f3e7, 0x374434, 1.1));
function light(color, intensity, position) {
  const source = new THREE.DirectionalLight(color, intensity);
  source.position.set(...position); scene.add(source); return source;
}
const key = light(0xf6f5ed, 3.8, [-4, 9, 8]);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
Object.assign(key.shadow.camera, { left: -11, right: 11, top: 8, bottom: -8 });
key.shadow.bias = -.0003; key.shadow.normalBias = .03;
light(0xc8dbe1, 2.8, [7, 2, -4]);
light(0xe4f3ca, 1.3, [-8, -1, 3]);
const ground = new THREE.Mesh(new THREE.PlaneGeometry(160, 160), new THREE.ShadowMaterial({ opacity: .2 }));
ground.rotation.x = -Math.PI / 2; ground.position.y = -3.45; ground.receiveShadow = true; scene.add(ground);

const metal = (color, roughness = .32, metalness = .85) => new THREE.MeshStandardMaterial({ color, roughness, metalness, envMapIntensity: 1.3 });
const mats = {
  frame: metal(0x232927, .28), edge: metal(0x727c76, .24), dark: metal(0x141817, .42),
  blades: metal(0x1c2720, .34, .7), fins: metal(0x26312a, .43), silver: metal(0x88988d, .32),
  pcb: metal(0x172b23, .64, .15), chip: metal(0x121814, .48, .2), copper: metal(0x99784f, .32),
  gold: metal(0xc5a355, .25), silicon: metal(0x657781, .17, .94), black: metal(0x070b09, .65, .15),
};
const model = new THREE.Group(); scene.add(model);
const groups = {};
for (const name of ['frame', 'fans', 'cooler', 'board', 'ports', 'back', 'power', 'pcie']) {
  const group = new THREE.Group(); group.name = name; group.userData.part = name === 'back' ? 'frame' : name;
  groups[name] = group; model.add(group);
}
const explosion = { frame: 3.35, fans: 2.05, cooler: .35, board: -1.3, ports: -1.3, back: -3.6, power:-1.3, pcie:-1.3 };
function box(parent, w, h, d, material, x = 0, y = 0, z = 0, radius = .03) {
  const mesh = bloco(w, h, d, material, radius); mesh.position.set(x, y, z); parent.add(mesh); return mesh;
}
function polygon(points, radius = .18) {
  const shape = new THREE.Shape();
  const corners = points.map((p, i) => {
    const before = points[(i + points.length - 1) % points.length], after = points[(i + 1) % points.length];
    const p0 = new THREE.Vector2(...p), a = new THREE.Vector2(...before).sub(p0), b = new THREE.Vector2(...after).sub(p0);
    const r = Math.min(radius, a.length() * .35, b.length() * .35);
    return { p: p0, a: a.normalize().multiplyScalar(r).add(p0), b: b.normalize().multiplyScalar(r).add(p0) };
  });
  shape.moveTo(corners[0].a.x, corners[0].a.y);
  corners.forEach((c, i) => { if (i) shape.lineTo(c.a.x, c.a.y); shape.quadraticCurveTo(c.p.x, c.p.y, c.b.x, c.b.y); });
  shape.closePath(); return shape;
}
function rect(w, h, radius = .15) { return polygon([[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]], radius); }
function hole(shape) { return new THREE.Path(shape.getPoints(12).reverse()); }
function shiftShape(shape,x,y){return new THREE.Shape(shape.getPoints(12).map(p=>p.add(new THREE.Vector2(x,y))));}
function extrude(parent, shape, depth, z, material, bevel = .025) {
  const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: bevel > 0, bevelSegments: 2, steps: 1, bevelSize: bevel, bevelThickness: bevel, curveSegments: 10 });
  const mesh = new THREE.Mesh(geometry, material); mesh.position.z = z; mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
}
// Duas aberturas arredondadas, unidas pela cintura em X da Founders Edition.
const leftOpening = [[-5.77,-2.37],[-2.08,-2.37],[-.53,0],[-2.08,2.37],[-5.77,2.37]];
const rightOpening = leftOpening.map(([x,y]) => [-x,y]).reverse();
const openings = [leftOpening, rightOpening];
const outline = rect(12.16, 5.48, .42);
outline.holes.push(hole(rect(11.83, 5.15, .34)));
extrude(groups.frame, outline, 1.28, -.64, mats.frame, .045);
for (const [group, z] of [[groups.frame,.68],[groups.back,-.79]]) {
  const skin = rect(12.1, 5.42, .4);
  openings.forEach(points => skin.holes.push(hole(polygon(points, .4))));
  extrude(group, skin, .1, z, mats.frame, .026);
  for (const points of openings) {
    const centerX = points[0][0] < 0 ? -3.2 : 3.2;
    const rim = polygon(points.map(([x,y])=>[centerX+(x-centerX)*1.019,y*1.017]),.41);
    rim.holes.push(hole(polygon(points,.4)));
    extrude(group, rim, .018, z+.11, mats.edge, .004);
  }
}
// Laterais com bordas metálicas e duas fendas centrais.
for (const y of [-2.71, 2.71]) {
  box(groups.frame, 11.3, .075, 1.18, mats.frame, 0, y, 0, .035);
  for (const z of [-.28, .22]) box(groups.frame, 3.25, .018, .13, mats.black, 0, y+Math.sign(y)*.039, z, .016);
}
// Inscrições na superfície, presas à geometria durante a rotação.
function inscription(parent, text, width, height, position, rotation = [0,0,0], color = '#c1cac3', size = 70) {
  const textureCanvas = document.createElement('canvas'); textureCanvas.width = 1024; textureCanvas.height = 256;
  const ctx = textureCanvas.getContext('2d'); ctx.clearRect(0,0,1024,256); ctx.fillStyle = color;
  ctx.font = `600 ${size}px Arial`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text,512,133);
  const texture = new THREE.CanvasTexture(textureCanvas); texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(),8);
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width,height),new THREE.MeshStandardMaterial({ map:texture, transparent:true, roughness:.5, metalness:.4, depthWrite:false, polygonOffset:true, polygonOffsetFactor:-2 }));
  mesh.position.set(...position); mesh.rotation.set(...rotation); parent.add(mesh); return mesh;
}
inscription(groups.frame,'GEFORCE RTX',3.4,.85,[3.8,2.758,0],[-Math.PI/2,0,0],'#dbe2dc',77);
inscription(groups.frame,'RTX 5090',1.54,.39,[-.82,-1.40,.819],[0,0,-.995],'#bdc8bd',72);
inscription(groups.back,'RTX 5090',1.50,.42,[.73,1.37,-.802],[0,Math.PI,-.995],'#acb6ad',70);

// Sete pás curvas por ventoinha, com inclinação construída na malha.
function bladeGeometry() {
  const vertices = [], indices = [], radialSteps = 17, chordSteps = 6;
  for(let i=0;i<=radialSteps;i++) for(let j=0;j<=chordSteps;j++) {
    const t=i/radialSteps, v=j/chordSteps, radius=.51+t*1.55;
    const sweep=.68*t-.12*Math.sin(t*Math.PI), width=.60+.1*Math.sin(t*Math.PI);
    const angle=sweep+(v-.5)*width;
    const z=.03 + Math.sin(v*Math.PI)*.055 + (v-.5)*(.06+t*.22) - .05*t;
    vertices.push(Math.cos(angle)*radius,Math.sin(angle)*radius,z);
  }
  for(let i=0;i<radialSteps;i++) for(let j=0;j<chordSteps;j++) {
    const a=i*(chordSteps+1)+j,b=a+chordSteps+1;
    indices.push(a,b,a+1,a+1,b,b+1);
  }
  const geometry=new THREE.BufferGeometry(); geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3)); geometry.setIndex(indices); geometry.computeVertexNormals(); return geometry;
}
const bladeGeo=bladeGeometry(), bladeMat=mats.blades.clone(); bladeMat.side=THREE.DoubleSide;
const brushedCanvas=document.createElement('canvas');brushedCanvas.width=512;brushedCanvas.height=512;
const brushedContext=brushedCanvas.getContext('2d');brushedContext.fillStyle='#48504a';brushedContext.fillRect(0,0,512,512);
for(let i=0;i<720;i++){
  const angle=i*Math.PI/360,shade=Math.round(70+27*Math.cos(angle*2)+7*Math.sin(angle*71));
  brushedContext.strokeStyle=`rgb(${shade},${shade},${shade})`;brushedContext.lineWidth=1.4;
  brushedContext.beginPath();brushedContext.moveTo(256,256);brushedContext.lineTo(256+Math.cos(angle)*260,256+Math.sin(angle)*260);brushedContext.stroke();
}
const brushedTexture=new THREE.CanvasTexture(brushedCanvas);brushedTexture.colorSpace=THREE.SRGBColorSpace;
const hubMaterial=metal(0xadb8af,.30,.8);hubMaterial.map=brushedTexture;
const rotors=[];
for (const x of [-3.3,3.3]) {
  const fan=new THREE.Group(); fan.position.set(x,0,.43); groups.fans.add(fan); rotors.push(fan);
  for(let i=0;i<7;i++) { const blade=new THREE.Mesh(bladeGeo,bladeMat); blade.rotation.z=i*Math.PI*2/7; blade.castShadow=true; blade.receiveShadow=true; fan.add(blade); }
  const rim=new THREE.Mesh(new THREE.TorusGeometry(2.12,.047,8,100),mats.dark); rim.position.set(x,0,.47); groups.fans.add(rim);
  const rimEdge=new THREE.Mesh(new THREE.TorusGeometry(2.135,.014,6,100),mats.edge); rimEdge.position.set(x,0,.52); groups.fans.add(rimEdge);
  const hub=new THREE.Mesh(new THREE.CylinderGeometry(.57,.57,.19,64),mats.dark); hub.rotation.x=Math.PI/2; hub.position.z=.10; fan.add(hub);
  const face=new THREE.Mesh(new THREE.CircleGeometry(.545,64),hubMaterial); face.position.z=.202; fan.add(face);
  const hubEdge=new THREE.Mesh(new THREE.TorusGeometry(.548,.009,6,80),mats.silver);hubEdge.position.z=.203;fan.add(hubEdge);
  // Suportes atrás das pás.
  for(let i=0;i<3;i++){const strut=box(groups.fans,2.13,.10,.075,mats.dark,x,0,.08,.015);strut.geometry.translate(1.01,0,0);strut.rotation.z=i*Math.PI*2/3;}
}

// Aletas individuais deixam a passagem de ar visível nas duas faces.
const finPositions=[];
for(const side of [-1,1]) for(let x=1.15;x<=5.68;x+=.088){
  const height=Math.min(4.6,Math.max(.5,(x-.50)*2.93));
  finPositions.push({x:x*side,height});
}
const fins=new THREE.InstancedMesh(new THREE.BoxGeometry(.025,1,1.0),mats.fins,finPositions.length);
const transform=new THREE.Object3D();
finPositions.forEach((fin,i)=>{transform.position.set(fin.x,0,-.2);transform.scale.set(1,fin.height,1);transform.updateMatrix();fins.setMatrixAt(i,transform.matrix);});
fins.castShadow=true;fins.receiveShadow=true;groups.cooler.add(fins);
box(groups.cooler,2.7,3.28,.20,mats.dark,0,0,-.21,.16);
box(groups.cooler,2.36,2.92,.065,mats.silver,0,0,-.345,.1);
for(const y of [-.97,-.49,0,.49,.97]) {
  const path=new THREE.CatmullRomCurve3([new THREE.Vector3(-5.4,y*1.75,-.47),new THREE.Vector3(-3.2,y*1.65,-.5),new THREE.Vector3(-1.6,y,-.4),new THREE.Vector3(1.6,y,-.4),new THREE.Vector3(3.2,y*1.65,-.5),new THREE.Vector3(5.4,y*1.75,-.47)]);
  const tube=new THREE.Mesh(new THREE.TubeGeometry(path,38,.057,8,false),mats.fins);tube.castShadow=true;groups.cooler.add(tube);
}

// PCB central + extensões: organização visual simplificada, não uma planta de fabricação.
box(groups.board,10.75,5.02,.10,mats.pcb,-.12,-.02,-.58,.09);
box(groups.board,1.08,.48,.10,mats.pcb,4.70,2.55,-.58,.025);
box(groups.board,1.35,.32,.10,mats.pcb,-4.82,-2.57,-.58,.018);

// Encapsulamento da GPU, substrato e die central.
box(groups.board,2.18,2.28,.115,mats.chip,-.15,-.02,-.47,.045);
box(groups.board,1.58,1.68,.04,metal(0xd3cec0,.33,.12),-.15,-.02,-.388,.025);
box(groups.board,1.08,1.18,.035,mats.silicon,-.15,-.02,-.345,.018);
inscription(groups.board,'NVIDIA',.78,.20,[-.15,-.02,-.323],[0,0,0],'#d7e8ec',90);

// Memorias GDDR7 cercam o processador em quatro lados.
const memoryPositions=[];
for(const side of [-1,1])for(let i=0;i<4;i++)memoryPositions.push([side*1.52,-1.38+i*.92,.48,.68]);
for(const side of [-1,1])for(let i=0;i<4;i++)memoryPositions.push([-.93+i*.52,side*1.72,.42,.56]);
for(const [x,y,w,h] of memoryPositions){
  box(groups.board,w,h,.105,mats.chip,x-.15,y-.02,-.455,.025);
  inscription(groups.board,'GDDR7',w*.82,h*.22,[x-.15,y-.02,-.397],[0,0,0],'#aeb9ae',82);
}

// Duas zonas de VRM com MOSFETs, bobinas e bancos de capacitores.
for(const side of [-1,1]){
  const origin=side<0?-3.43:3.13;
  for(let i=0;i<8;i++){
    const y=-2.03+i*.58;
    box(groups.board,.48,.36,.14,mats.chip,origin,y,-.435,.035);
    box(groups.board,.48,.43,.17,metal(0x555952,.62,.08),origin+side*.62,y,-.42,.045);
    inscription(groups.board,'R22',.34,.13,[origin+side*.62,y,-.328],[0,0,0],'#b7b9ae',78);
    const capacitor=new THREE.Mesh(new THREE.CylinderGeometry(.105,.105,.19,18),metal(0xaab0a9,.45,.38));
    capacitor.rotation.x=Math.PI/2;capacitor.position.set(origin-side*.46,y,-.40);groups.board.add(capacitor);
    box(groups.board,.08,.18,.055,mats.silver,origin-side*.70,y,-.485,.012);
  }
}

for(const [x,y,w,h,label] of [[4.35,1.68,.62,.58,'PWM'],[4.28,-1.55,.72,.64,'BIOS'],[-4.45,1.65,.58,.54,'CTRL'],[-4.30,-1.58,.66,.58,'IO']]){
  box(groups.board,w,h,.11,mats.chip,x,y,-.452,.025);
  inscription(groups.board,label,w*.70,.13,[x,y,-.392],[0,0,0],'#9da99d',74);
}
// Componentes SMD distribuidos nas areas de controle.
for(let i=0;i<72;i++){
  const col=i%12,row=Math.floor(i/12),side=i%2?-1:1;
  const x=side*(2.12+col*.205),y=-2.15+row*.84+(col%2)*.10;
  box(groups.board,.055+(i%3)*.018,.14,.052,i%4===0?mats.silver:mats.chip,x,y,-.493,.008);
}
for(const x of [-4.72,-4.45,4.17,4.48])for(let i=0;i<5;i++){
  const capacitor=new THREE.Mesh(new THREE.CylinderGeometry(.075,.075,.13,14),metal(0x8d9690,.5,.32));
  capacitor.rotation.x=Math.PI/2;capacitor.position.set(x,-1.15+i*.56,-.43);groups.board.add(capacitor);
}

const trackMaterial=new THREE.LineBasicMaterial({color:0x6e8c70,transparent:true,opacity:.60});
for(let i=0;i<28;i++){
  const y=-1.48+i*.11,side=i%2?-1:1;
  const geometry=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(side*1.12,y*.72,-.521),new THREE.Vector3(side*2.05,y,-.521),new THREE.Vector3(side*(2.45+(i%4)*.18),y,-.521)]);
  groups.board.add(new THREE.Line(geometry,trackMaterial));
}
for(let i=0;i<8;i++){
  const y=-2.25+i*.64;
  const geometry=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-5.0,y,-.522),new THREE.Vector3(5.0,y,-.522)]);
  groups.board.add(new THREE.Line(geometry,trackMaterial));
}

// Face traseira do PCB: reforco da GPU, soldas, vias, trilhas e componentes SMD.
const boardBackDetails=new THREE.Group();boardBackDetails.visible=false;groups.board.add(boardBackDetails);
box(boardBackDetails,2.34,2.42,.045,metal(0x203b31,.58,.28),-.15,-.02,-.665,.055);
box(boardBackDetails,1.42,1.52,.055,mats.dark,-.15,-.02,-.715,.035);
inscription(boardBackDetails,'GPU BACKPLATE',1.06,.19,[-.15,-.02,-.746],[0,Math.PI,0],'#82958a',66);

const backCopper=metal(0xa97842,.34,.72);
for(let row=0;row<12;row++)for(let col=0;col<12;col++){
  const pad=new THREE.Mesh(new THREE.CylinderGeometry(.022,.022,.014,10),backCopper);
  pad.rotation.x=Math.PI/2;pad.position.set(-.15-.49+col*.089,-.02-.54+row*.098,-.750);boardBackDetails.add(pad);
}

// Pequenas redes de resistores e capacitores em ambos os lados da placa.
for(const side of [-1,1])for(let row=0;row<9;row++)for(let col=0;col<7;col++){
  const x=side*(2.04+col*.39),y=-1.92+row*.48+(col%2)*.055;
  box(boardBackDetails,.19,.075,.045,(row+col)%4===0?mats.silver:mats.chip,x,y,-.681,.012);
  if(col<6)box(boardBackDetails,.065,.12,.038,(row+col)%3===0?backCopper:mats.silver,x+side*.19,y+.15,-.678,.008);
}

// Vias metalizadas conectam as camadas internas do PCB.
for(let i=0;i<74;i++){
  const column=i%19,row=Math.floor(i/19);
  const x=-4.72+column*.52+(row%2)*.12,y=-2.06+row*1.34;
  const ring=new THREE.Mesh(new THREE.TorusGeometry(.035,.011,6,12),backCopper);
  ring.position.set(x,y,-.642);boardBackDetails.add(ring);
}
for(const x of [-4.52,4.28])for(const y of [-1.70,-.84,0,.84,1.70]){
  box(boardBackDetails,.46,.31,.07,mats.chip,x,y,-.690,.025);
  for(const side of [-1,1])for(let pin=0;pin<4;pin++)box(boardBackDetails,.065,.035,.025,mats.silver,x+side*.27,y-.105+pin*.07,-.700,.004);
}

const backTrackMaterial=new THREE.LineBasicMaterial({color:0xb07b42,transparent:true,opacity:.72});
for(let i=0;i<24;i++){
  const y=-2.22+i*.19,side=i%2?-1:1;
  const points=[new THREE.Vector3(side*.92,y*.55,-.637),new THREE.Vector3(side*1.72,y,-.637),new THREE.Vector3(side*(3.0+(i%5)*.34),y,-.637)];
  boardBackDetails.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),backTrackMaterial));
}
for(let i=0;i<7;i++){
  const x=-4.25+i*1.36;
  const points=[new THREE.Vector3(x,-2.34,-.638),new THREE.Vector3(x+.32,-1.98,-.638),new THREE.Vector3(x+.32,1.90,-.638),new THREE.Vector3(x+.65,2.25,-.638)];
  boardBackDetails.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),backTrackMaterial));
}
inscription(boardBackDetails,'GEFORCE RTX 5090  |  PCB REV A',3.15,.20,[2.72,-2.30,-.642],[0,Math.PI,0],'#8fa293',58);
// O encaixe ultrapassa a moldura; o recorte separa as duas fileiras de contatos.
box(groups.pcie,4.85,.28,.105,mats.pcb,-1.73,-2.76,-.58,.012);
box(groups.pcie,.82,.46,.105,mats.pcb,-3.70,-3.10,-.58,.012);
box(groups.pcie,3.74,.46,.105,mats.pcb,-1.20,-3.10,-.58,.012);
for(const z of [-.520,-.640]) for(let i=0;i<70;i++) {
  if(i>=12&&i<=15)continue;
  box(groups.pcie,.045,.38,.012,mats.gold,-4.06+i*.068,-3.11,z,.003);
}
inscription(groups.pcie,'PCIe',.7,.18,[-.1,-2.78,-.519],[0,0,0],'#c2d1bc',80);
for(const x of [-4.85,-2.15,2.15,4.85])for(const y of [-2.22,2.22]){
  const ring=new THREE.Mesh(new THREE.TorusGeometry(.063,.018,6,16),mats.gold);ring.position.set(x,y,-.519);groups.board.add(ring);
}

// Suporte metálico, três DisplayPort e uma HDMI, visíveis na vista Conexões.
const bracket=new THREE.Group();bracket.position.set(-6.21,-.08,-.08);bracket.rotation.y=-Math.PI/2;groups.ports.add(bracket);
const bracketShape=rect(1.58,5.62,.045);
for(let i=0;i<4;i++)bracketShape.holes.push(hole(shiftShape(rect(1.17,.75,.04),0,1.72-i*1.03)));
extrude(bracket,bracketShape,.075,-.035,metal(0x444d46,.4),.012);
for(let i=0;i<4;i++) {
  const y=1.64-i*1.03;
  const port=new THREE.Group();port.position.set(-6.27,y,-.04);port.rotation.y=-Math.PI/2;groups.ports.add(port);
  const isHDMI=i===3;
  const points=isHDMI?[[-.54,.29],[.54,.29],[.54,-.06],[.36,-.28],[-.36,-.28],[-.54,-.06]]:[[-.54,.29],[.54,.29],[.54,-.29],[-.34,-.29],[-.54,-.09]];
  const shell=polygon(points,.025);shell.holes.push(hole(polygon(points.map(([x,y])=>[x*.88,y*.77]),.016)));
  extrude(port,shell,.26,-.10,mats.silver,.009);
  box(port,1.02,.56,.018,mats.black,0,0,-.115,.012);
  box(port,.79,.075,.13,mats.dark,0,isHDMI?0:-.045,-.008,.014);
  const count=isHDMI?19:20;
  for(let pin=0;pin<count;pin++)box(port,.021,.012,.07,mats.gold,-.355+pin*(.71/(count-1)),isHDMI?.045:.002,.002,.002);
  for(const x of [-.42,.42])box(port,.045,.11,.08,mats.edge,x,.15,.03,.008);
  inscription(port,isHDMI?'HDMI':'DP '+(i+1),.78,.25,[0,.435,.055],[0,0,0],'#d5ddd4',160);
}
for(const y of [-2.45,2.44]) {
  const support=box(groups.ports,.36,.25,1.78,mats.silver,-6.11,y,-.08,.025);
  const screw=new THREE.Mesh(new THREE.CylinderGeometry(.075,.075,.105,16),mats.black);screw.rotation.z=Math.PI/2;screw.position.set(-6.28,y,-.05);groups.ports.add(screw);
}
const power=new THREE.Group();power.position.set(.74,2.62,-.38);power.rotation.x=-Math.PI/2;groups.power.add(power);
// Corpo alinhado com a borda, com cavidades profundas em vez de pontos pintados.
const powerFace=rect(1.68,.72,.045);
for(let row=0;row<2;row++)for(let col=0;col<6;col++){
  const x=-.665+col*.266,y=-.165+row*.33;
  const socket=polygon([[-.102,-.115],[.102,-.115],[.102,.06],[.047,.115],[-.047,.115],[-.102,.06]],.01);
  powerFace.holes.push(hole(shiftShape(socket,x,y)));
  box(power,.20,.22,.02,mats.black,x,y,.05,.01);
  const sleeve=rect(.081,.112,.012);sleeve.holes.push(hole(rect(.052,.079,.009)));
  const contact=extrude(power,sleeve,.105,.07,mats.gold,.003);contact.position.x=x;contact.position.y=y;
}
extrude(power,powerFace,.36,.055,mats.dark,.012);
box(power,1.66,.70,.13,mats.dark,0,0,0,.035);
box(power,.63,.20,.25,mats.dark,0,.43,.20,.018);
for(let i=0;i<4;i++){
  box(power,.09,.095,.018,mats.black,-.195+i*.13,.43,.335,.006);
  box(power,.042,.045,.014,mats.gold,-.195+i*.13,.43,.35,.004);
}
box(power,.42,.15,.20,mats.dark,0,-.42,.13,.018);
inscription(groups.power,'ENERGIA',1.18,.22,[.74,2.67,.001],[0,0,0],'#d1dccb',76);
// Parafusos visíveis em torno da moldura.
for(const x of [-5.85,5.85])for(const y of [-2.47,2.47]){
  const screw=new THREE.Mesh(new THREE.CylinderGeometry(.057,.057,.025,20),mats.dark);screw.rotation.x=Math.PI/2;screw.position.set(x,y,.802);groups.frame.add(screw);
  box(groups.frame,.071,.012,.006,mats.edge,x,y,.818,.002);
}

const details={
  frame:['01','A FORMA SEGUE O AR','Uma estrutura, dois caminhos.','A moldura envolve duas grandes áreas de ventilação. Gire a placa para ver o acabamento, as aletas e as inscrições no próprio metal.'],
  fans:['02','DUAS VENTOINHAS','O ar atravessa a placa.','As duas ventoinhas trabalham sobre áreas abertas do dissipador. Use o botão Ventoinhas para observar as pás paradas ou em movimento. A velocidade exibida é apenas ilustrativa.'],
  cooler:['03','DO CHIP PARA O AR','Mais superfície. Menos calor.','A câmara de vapor distribui calor para o dissipador. As aletas aumentam a área de contato com o ar. Nesta vista, tubos e camadas foram simplificados para mostrar esse caminho.'],
  board:['04','ARQUITETURA BLACKWELL','O centro do processamento.','A GPU aparece no centro da placa, cercada pela memória. A RTX 5090 tem 32 GB de GDDR7. A disposição interna deste estudo é esquemática.'],
  ports:['05','DA PLACA PARA A TELA','Quatro saídas de vídeo.','Três DisplayPort e uma HDMI ficam na extremidade metálica. Os contatos dourados encaixam no PCIe; o conector de energia fica na borda superior da placa.'],
};
details.power=['06','ALIMENTAÇÃO','Conector de energia.','Doze cavidades principais, quatro contatos menores e trava. O corpo foi ampliado e alinhado com a borda para facilitar a inspeção.'];
details.pcie=['07','CONEXÃO COM A PLACA-MÃE','Contatos PCIe.','Os contatos dourados ficam expostos abaixo da moldura, com o recorte separando os dois segmentos. Gire para observar os contatos nos dois lados.'];
const directions={perspective:new THREE.Vector3(-9,6.8,16),front:new THREE.Vector3(0,0,1),back:new THREE.Vector3(0,0,-1),ports:new THREE.Vector3(-1,0,0),power:new THREE.Vector3(0,1,.16),pcie:new THREE.Vector3(0,-.15,1)};
const hiddenParts=new Set();
const partNames={frame:'Moldura frontal',back:'Tampa traseira',fans:'Ventoinhas',cooler:'Dissipador',board:'GPU e memória',ports:'DisplayPort e HDMI',power:'Conector de energia',pcie:'Contatos PCIe'};
$('visibilityList').innerHTML=Object.entries(partNames).map(([key,label])=>`<label><input type="checkbox" data-visible="${key}" checked><span>${label}</span></label>`).join('');
function syncVisibility(){
  for(const [name,group] of Object.entries(groups))group.visible=state.isolated?group.userData.part===state.part:!hiddenParts.has(name);
  boardBackDetails.visible=groups.board.visible&&(state.isolated||!groups.cooler.visible);
  const remaining=Object.values(groups).filter(group=>group.visible).length;
  document.querySelectorAll('[data-visible]').forEach(input=>{input.checked=groups[input.dataset.visible].visible;input.disabled=remaining===1&&input.checked;});
  $('visibilityCount').textContent=remaining+' / 8';
}
const baseBounds={};model.updateMatrixWorld(true);
for(const [name,group] of Object.entries(groups))baseBounds[name]=new THREE.Box3().setFromObject(group);
function bounds(factor=state.targetExpanded){const result=new THREE.Box3();for(const [name,box] of Object.entries(baseBounds))if(groups[name].visible)result.union(box.clone().translate(new THREE.Vector3(0,0,explosion[name]*factor)));return result;}
function fitPosition(direction){
  const dir=direction.clone().normalize(),right=new THREE.Vector3().crossVectors(camera.up,dir).normalize(),up=new THREE.Vector3().crossVectors(dir,right).normalize();
  const bb=bounds(),center=bb.getCenter(new THREE.Vector3()),tan=Math.tan(THREE.MathUtils.degToRad(camera.fov/2));let distance=state.isolated?1.4:8;
  for(const x of [bb.min.x,bb.max.x])for(const y of [bb.min.y,bb.max.y])for(const z of [bb.min.z,bb.max.z]){
    const p=new THREE.Vector3(x,y,z).sub(center),depth=p.dot(dir);
    distance=Math.max(distance,depth+Math.abs(p.dot(right))*1.23/(tan*camera.aspect),depth+Math.abs(p.dot(up))*1.25/tan);
  }
  controls.minDistance=state.isolated?.65:5;controls.target.copy(center);controls.maxDistance=Math.max(35,distance*2.7);return dir.multiplyScalar(distance).add(center);
}
let cameraTarget=null;
function fit(instant=false){const next=fitPosition(camera.position.clone().sub(controls.target));if(instant||reducedMotion.matches){camera.position.copy(next);cameraTarget=null;}else cameraTarget=next;controls.update();}
function view(name,instant=false){state.view=name;cameraTarget=fitPosition(directions[name]);if(instant||reducedMotion.matches){camera.position.copy(cameraTarget);cameraTarget=null;}document.querySelectorAll('[data-view]').forEach(button=>button.setAttribute('aria-pressed',button.dataset.view===name));}
function updateMotionButtons(){$('fans').setAttribute('aria-pressed',state.fans);$('rotate').setAttribute('aria-pressed',state.rotating);}
function expand(value){
  if(state.isolated)isolate(false);
  state.targetExpanded=Math.max(0,Math.min(1,value));
  $('separation').value=Math.round(state.targetExpanded*100);$('separationValue').textContent=Math.round(state.targetExpanded*100)+'%';
  $('explode').setAttribute('aria-pressed',state.targetExpanded>0);$('explode').children[1].textContent=state.targetExpanded>0?'Montar a placa':'Explorar por dentro';
  $('assemblyLabel').textContent=state.targetExpanded>0?'VISTA DESMONTADA':'PLACA MONTADA';
  if(reducedMotion.matches)applyExplosion(state.targetExpanded);fit();
}
function applyExplosion(value){state.expanded=value;for(const [name,group]of Object.entries(groups))group.position.z=explosion[name]*value;}
function isolate(value){
  state.isolated=value;syncVisibility();
  $('isolate').setAttribute('aria-pressed',value);$('isolate').textContent=value?'Mostrar conjunto ↗':'Isolar componente ↗';
  $('assemblyLabel').textContent=value?'COMPONENTE ISOLADO':state.targetExpanded>0?'VISTA DESMONTADA':'PLACA MONTADA';fit();
}
function selectPart(name){
  const part=details[name];if(!part)return;const wasIsolated=state.isolated;state.part=name;
  document.querySelectorAll('[data-part]').forEach(button=>button.setAttribute('aria-pressed',button.dataset.part===name));
  document.querySelector('.panel-number').textContent=part[0]+' / 07';$('partKicker').textContent=part[1];$('partTitle').textContent=part[2];$('partText').textContent=part[3];
  if(name==='cooler'||name==='board') {expand(1);view('perspective');}
  if(['ports','power','pcie'].includes(name)){isolate(true);view(name);}
  if(name==='fans')view('front');
  if(wasIsolated&&!['ports','power','pcie'].includes(name))isolate(true);
}
$('explode').addEventListener('click',()=>expand(state.targetExpanded>0?0:1));
$('separation').addEventListener('input',event=>expand(Number(event.target.value)/100));
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{state.rotating=false;controls.autoRotate=false;updateMotionButtons();view(button.dataset.view);}));
document.querySelectorAll('[data-part]').forEach(button=>button.addEventListener('click',()=>selectPart(button.dataset.part)));
$('reset').addEventListener('click',()=>{state.rotating=false;controls.autoRotate=false;if(state.isolated)isolate(false);updateMotionButtons();view('perspective');});
$('isolate').addEventListener('click',()=>isolate(!state.isolated));
document.querySelectorAll('[data-visible]').forEach(input=>input.addEventListener('change',()=>{
  if(state.isolated)for(const [name,group] of Object.entries(groups)){if(group.visible)hiddenParts.delete(name);else hiddenParts.add(name);}
  if(!input.checked)hiddenParts.add(input.dataset.visible);else hiddenParts.delete(input.dataset.visible);
  isolate(false);
}));
$('showAll').addEventListener('click',()=>{hiddenParts.clear();isolate(false);view('perspective');});
$('rotate').addEventListener('click',()=>{state.rotating=!state.rotating;controls.autoRotate=state.rotating;cameraTarget=null;updateMotionButtons();});
$('fans').addEventListener('click',()=>{state.fans=!state.fans;updateMotionButtons();});
$('fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.querySelector('.viewer').requestFullscreen();}catch{$('fullscreen').setAttribute('aria-label','Tela cheia indisponível neste navegador');}});
document.addEventListener('fullscreenchange',()=>{$('fullscreen').setAttribute('aria-label',document.fullscreenElement?'Sair da tela cheia':'Abrir visualizador em tela cheia');});
$('snapshot').addEventListener('click',()=>{renderer.render(scene,camera);const link=document.createElement('a');link.download='rtx-5090.png';link.href=canvas.toDataURL('image/png');link.click();});
let down=null;
canvas.addEventListener('pointerdown',event=>{cameraTarget=null;state.rotating=false;controls.autoRotate=false;updateMotionButtons();down={x:event.clientX,y:event.clientY};});
canvas.addEventListener('pointercancel',()=>down=null);
canvas.addEventListener('pointerup',event=>{
  if(!down||Math.hypot(event.clientX-down.x,event.clientY-down.y)>5){down=null;return;}down=null;
  const r=canvas.getBoundingClientRect(),ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1),camera);
  const hit=ray.intersectObjects(Object.values(groups).filter(group=>group.visible),true)[0];let object=hit?.object;while(object&&!object.userData.part)object=object.parent;if(object)selectPart(object.userData.part);
});
canvas.addEventListener('keydown',event=>{
  if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-','Home'].includes(event.key))return;
  event.preventDefault();event.stopPropagation();cameraTarget=null;state.rotating=false;controls.autoRotate=false;updateMotionButtons();
  if(event.key==='Home'){view('perspective');return;}
  const spherical=new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target));
  if(event.key==='ArrowLeft')spherical.theta-=.12;if(event.key==='ArrowRight')spherical.theta+=.12;
  if(event.key==='ArrowUp')spherical.phi-=.1;if(event.key==='ArrowDown')spherical.phi+=.1;
  if(event.key==='+'||event.key==='=')spherical.radius*=.94;if(event.key==='-')spherical.radius*=1.06;
  spherical.phi=THREE.MathUtils.clamp(spherical.phi,.04,Math.PI-.04);spherical.radius=THREE.MathUtils.clamp(spherical.radius,controls.minDistance,controls.maxDistance);camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical));controls.update();
});
new ResizeObserver(()=>requestAnimationFrame(()=>fit(true))).observe($('cena'));
reducedMotion.addEventListener('change',()=>{controls.enableDamping=!reducedMotion.matches;if(reducedMotion.matches){state.fans=false;state.rotating=false;controls.autoRotate=false;cameraTarget=null;applyExplosion(state.targetExpanded);fit(true);updateMotionButtons();}});
canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();$('aviso').hidden=false;});
canvas.addEventListener('webglcontextrestored',()=>location.reload());
const clock=new THREE.Clock();
function frame(){
  requestAnimationFrame(frame);const dt=Math.min(clock.getDelta(),.05);if(document.hidden)return;
  if(Math.abs(state.expanded-state.targetExpanded)>.001)applyExplosion(THREE.MathUtils.damp(state.expanded,state.targetExpanded,6,dt));else if(state.expanded!==state.targetExpanded)applyExplosion(state.targetExpanded);
  if(cameraTarget){
    // Interpolar a órbita evita atravessar o objeto ao trocar frente e verso.
    const current=new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target));
    const target=new THREE.Spherical().setFromVector3(cameraTarget.clone().sub(controls.target));
    const alpha=1-Math.exp(-7*dt),angle=THREE.MathUtils.euclideanModulo(target.theta-current.theta+Math.PI,Math.PI*2)-Math.PI;
    current.theta+=angle*alpha;current.phi=THREE.MathUtils.lerp(current.phi,target.phi,alpha);current.radius=THREE.MathUtils.lerp(current.radius,target.radius,alpha);
    camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(current));
    if(camera.position.distanceTo(cameraTarget)<.015){camera.position.copy(cameraTarget);cameraTarget=null;}
  }
  if(state.fans)rotors.forEach((fan,i)=>fan.rotation.z+=(i===0?1:-1)*dt*2.4);
  controls.update();renderer.render(scene,camera);
}
function qaPixels(){
  model.updateMatrixWorld(true);const box=bounds(state.expanded),points=[];
  for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z])points.push(pixelDe(new THREE.Vector3(x,y,z)));
  return {corners:points,parts:Object.fromEntries(Object.entries(groups).map(([name,group])=>[name,pixelDe(new THREE.Box3().setFromObject(group).getCenter(new THREE.Vector3()))]))};
}
window.__rtx5090={estado:()=>({...state,hidden:[...hiddenParts],visible:Object.keys(groups).filter(name=>groups[name].visible),camera:camera.position.toArray(),rotors:rotors.map(fan=>fan.rotation.z),moving:!!cameraTarget,meshes:renderer.info.render.calls}),pixels:qaPixels};
view('perspective',true);updateMotionButtons();frame();
clearTimeout(window.rtxLoadTimer);$('loading').hidden=true;$('aviso').hidden=true;
