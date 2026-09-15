import { THREE, montaVisualizador } from './_visualizador-pecas.js';

// SSD SATA didático: layout ilustrativo com NAND e DRAM, não um produto comercial.
const v = montaVisualizador({
  global: '__ssd', arquivoDaImagem: 'ssd.png',
  pecas: {
    tampa: { nome: 'Tampa', explosao: [8, 1.4, 0] },
    base: { nome: 'Carcaça inferior', explosao: [0,-1.4,0] },
    placa: { nome: 'Placa e trilhas', explosao: 0 },
    nand: { nome: 'Memórias NAND', explosao: 1.2 },
    controlador: { nome: 'Controlador', explosao: 1.5 },
    dram: { nome: 'Memória DRAM', explosao: 1.3 },
    energia: { nome: 'Circuito de energia', explosao: .8 },
    conectores: { nome: 'Conectores SATA', explosao: 0 },
  },
  detalhes: {
    tampa: ['01','PROTEÇÃO','A tampa de alumínio.','A carcaça protege a placa e ajuda a distribuir o calor. As inscrições acompanham a superfície do metal.'],
    base: ['02','ESTRUTURA','A base do SSD.','Paredes finas, apoios e parafusos mantêm a placa presa. A abertura na extremidade deixa os conectores acessíveis.'],
    placa: ['03','CAMINHOS ELÉTRICOS','Uma placa, muitas conexões.','Trilhas, vias metalizadas e pontos de solda ligam os componentes. Aqui os caminhos foram destacados para facilitar a exploração.'],
    nand: ['04','ARQUIVOS PERSISTENTES','Memórias NAND flash.','Os encapsulamentos guardam as células de memória que conservam os dados sem energia. Neste estudo há oito encapsulamentos na face superior.'],
    controlador: ['05','ORGANIZAÇÃO','O controlador do SSD.','Coordena leituras e gravações, correção de erros e distribuição das gravações pelas células de memória.'],
    dram: ['06','MEMÓRIA DE TRABALHO','DRAM auxiliar.','Este exemplo inclui DRAM para auxiliar o controlador, inclusive com tabelas de mapeamento. Existem também SSDs sem DRAM dedicada.'],
    energia: ['07','ALIMENTAÇÃO','Reguladores e capacitores.','O circuito converte e filtra a alimentação para os chips. Bobinas, capacitores e pequenos reguladores aparecem perto dos conectores.'],
    conectores: ['08','INTERFACE','Dados e energia SATA.','Os dois conectores têm chaves em L: o menor leva dados e o maior recebe energia. Os contatos dourados se conectam aos cabos.'],
  },
  direcoes: { perspective: [-7,11,10], top: [0,1,.035], bottom:[0,-1,-.035], back:[0,.45,1] },
  textos: { montado:'SSD MONTADO', desmontado:'SSD ABERTO', montar:'Fechar o SSD' },
  palco: { alvo:[0,0,0],camPos:[-7,11,10],meiaLarguraDesktop:5.5,meiaLarguraMobile:5.5,distMin:10,orbitaMin:2,maxPolar:Math.PI },
  luz: { chao:-2.3,alcance:10 },
  aoSelecionar(key,api) {
    if(key==='tampa') { api.expandir(0);api.vista('perspective'); }
    else if(key==='placa') { api.expandir(1);api.vista('top'); }
    else { api.isolar(true);api.vista(key==='conectores'?'back':'perspective'); }
  },
});
const { grupos:g, caixa:box, metal, inscricao:text }=v;
v.controls.zoomSpeed=.18;
v.canvas.setAttribute('aria-label','SSD SATA 3D. Arraste para girar, use dois dedos para aproximar. Explore e isole as peças no painel.');
const m={shell:metal(0x252b32,.48,.7),edge:metal(0x65707b,.3,.85),silver:metal(0xc9d1d5,.26,.85),pcb:metal(0x104b45,.65,.12),chip:metal(0x161c24,.65,.1),gold:metal(0xd4af58,.3,.8),ceramic:metal(0xb4a185,.7,.05),plastic:metal(0x13171b,.75,.02)};
const topRot=[-Math.PI/2,0,0];
function label(parent,str,w,h,x,y,z,color='#cbd4d5'){text(parent,str,w,h,[x,y,z],topRot,color,110);}
function screw(parent,x,y,z){
  const mesh=v.cilindro(.10,.065,m.silver,x,y,z,'y',{lados:24});parent.add(mesh);
  box(parent,.11,.006,.026,m.chip,x,y+.034,z,.004);
  box(parent,.026,.006,.11,m.chip,x,y+.034,z,.004);
}
// Boîtier mince, rebord ouvert pour les connecteurs.
box(g.base,7,.13,10,m.shell,0,-.37,0,.12);
for(const x of [-3.43,3.43])box(g.base,.14,.5,9.8,m.shell,x,-.07,0,.04);
box(g.base,6.8,.5,.14,m.shell,0,-.07,-4.92,.04);
box(g.base,1.1,.5,.14,m.shell,-2.85,-.07,4.92,.04);
for(const x of [-3.13,3.13])for(const z of [-4.4,4.25]){
  g.base.add(v.cilindro(.18,.22,m.edge,x,-.19,z,'y',{lados:24}));
  screw(g.base,x,-.045,z);
}
box(g.tampa,7,.13,10,m.shell,0,.335,0,.13);
for(const x of [-3.13,3.13])for(const z of [-4.4,4.25])screw(g.tampa,x,.43,z);
box(g.tampa,5.5,.014,6.8,m.plastic,0,.41,-.35,.08);
box(g.tampa,.14,.02,5.7,m.gold,-2.35,.43,-.35,.02);
label(g.tampa,'SEIRES',3.7,.9,0,.432,-2.5,'#eef1e9');
label(g.tampa,'SOLID STATE DRIVE',4,.5,0,.432,-1.55);
label(g.tampa,'SSD',3.8,1.7,0,.435,-.1,'#c9f785');
label(g.tampa,'SATA  /  2.5',3.6,.6,0,.433,1.25);
label(g.tampa,'LAB SERIES  •  FLASH STORAGE',4,.35,0,.433,2.3);
// Placa quase integral com borda visível e ambas as faces detalhadas.
box(g.placa,6.5,.12,9.2,m.pcb,0,-.1,-.1,.13);
const chipPositions=[];
for(const x of [-1.55,1.55])for(const z of [-3.45,-1.8,-.15,1.5])chipPositions.push([x,z]);
function chip(parent,x,z,w,d,name,sub){
  box(parent,w,.055,d,m.chip,x,.005,z,.035);
  box(parent,w-.035,.16,d-.035,m.chip,x,.11,z,.04);
  label(parent,name,w*.88,.28,x,.194,z-.19);
  label(parent,sub,w*.88,.2,x,.194,z+.2,'#87979a');
  parent.add(v.cilindro(.045,.007,m.silver,x-w/2+.13,.195,z-d/2+.13,'y',{lados:12}));
  // Matriz BGA inferior, visível ao separar os encapsulamentos.
  const geo=new THREE.SphereGeometry(.026,6,4),count=8*6;
  const balls=new THREE.InstancedMesh(geo,m.silver,count),obj=new THREE.Object3D();
  for(let a=0;a<8;a++)for(let b=0;b<6;b++) {obj.position.set(x+(a-3.5)*w/9,-.036,z+(b-2.5)*d/7);obj.updateMatrix();balls.setMatrixAt(a*6+b,obj.matrix);}
  parent.add(balls);
}
chipPositions.forEach(([x,z],i)=>chip(g.nand,x,z,1.95,1.25,'3D NAND',`FLASH  /  N${i+1}`));
chip(g.controlador,-1.5,3.25,1.3,1.3,'CONTROLLER','SATA / FLASH');
chip(g.dram,.25,3.28,1.15,.85,'DRAM','BUFFER');
// Cobre e serigrafia: uma única textura por face para manter a navegação leve.
function boardTexture(ctx,w,h){
 ctx.clearRect(0,0,w,h);const X=x=>(x/6.5+.5)*w,Z=z=>(z/9.2+.5)*h;
 ctx.lineWidth=1.7;ctx.strokeStyle='#459c87';
 for(const [x,z] of chipPositions)for(let i=0;i<12;i++){
   const offset=(i-5.5)*.055;
   ctx.beginPath();ctx.moveTo(X(x),Z(z+offset));ctx.lineTo(X(x*.4),Z(z+offset));ctx.lineTo(X(offset),Z(z+.35+offset));ctx.lineTo(X(offset),Z(2.5));ctx.lineTo(X(-1.4+offset),Z(2.7));ctx.stroke();
 }
 ctx.strokeStyle='#8caf9c';ctx.lineWidth=1;
 chipPositions.forEach(([x,z],i)=>{ctx.strokeRect(X(x-1.07),Z(z-.7),2.14/6.5*w,1.4/9.2*h);ctx.fillStyle='#d7ded0';ctx.font='18px Arial';ctx.fillText('U'+(i+1),X(x-.98),Z(z-.75));});
 for(let i=0;i<110;i++){const x=-2.9+(i%11)*.58,z=-4.2+Math.floor(i/11)*.88;ctx.beginPath();ctx.arc(X(x),Z(z),3,0,7);ctx.strokeStyle='#bcb684';ctx.stroke();}
}
for(const side of [1,-1]){
 const surface=new THREE.Mesh(new THREE.PlaneGeometry(6.5,9.2),new THREE.MeshStandardMaterial({map:v.textura(boardTexture,1024,1448),transparent:true,roughness:.58,metalness:.3,depthWrite:false}));
 surface.rotation.x=-side*Math.PI/2;surface.position.set(0,-.1+side*.061,-.1);g.placa.add(surface);
}
// Réseaux SMD sur les deux côtés, terminaison métallique et vias.
for(let i=0;i<44;i++){
 const x=i<22?-2.82:2.82,z=-4.05+(i%22)*.31;
 for(const side of [1,-1]){
  box(g.placa,.21,.07,.12,m.ceramic,x,-.1+side*.10,z,.018);
  for(const dx of [-.095,.095])box(g.placa,.055,.074,.125,m.silver,x+dx,-.1+side*.10,z,.008);
 }
}
for(const x of [-3,3])for(const z of [-4.25,4.1])screw(g.placa,x,-.008,z);
// Régulation proche de l'entrée d'alimentation.
for(const [x,z] of [[1.5,2.8],[2.3,2.8]]){
 box(g.energia,.6,.24,.56,m.edge,x,.08,z,.04);label(g.energia,'2R2',.5,.22,x,.204,z);
}
for(let i=0;i<9;i++){
 const x=1.15+(i%3)*.55,z=3.38+Math.floor(i/3)*.31;
 box(g.energia,.33,.14,.19,m.ceramic,x,.04,z,.02);
 for(const dx of [-.14,.14])box(g.energia,.07,.15,.2,m.silver,x+dx,.04,z,.01);
}
chip(g.energia,1.9,2.12,.58,.38,'PMIC','');
// Connecteurs avec contacts séparés et détrompeurs en L.
for(const [x,w,n] of [[-.9,1.55,7],[1.4,2.5,15]]){
 box(g.conectores,w,.4,.68,m.plastic,x,-.08,4.67,.045);
 box(g.conectores,w-.14,.09,.63,m.pcb,x,-.01,4.84,.018);
 box(g.conectores,.12,.25,.62,m.plastic,x-w/2+.03,.1,4.82,.016);
 for(let i=0;i<n;i++)box(g.conectores,(w-.28)/n*.58,.024,.48,m.gold,x-w/2+.14+(i+.5)*(w-.28)/n,.05,4.93,.009);
}
v.inicia();
// Tela deitada no telefone, com painel lateral e arraste no eixo da tela.
const portrait=matchMedia('(max-width:820px) and (orientation:portrait) and (pointer:coarse)');
const panel=document.getElementById('mobilePanel');
panel.addEventListener('click',()=>{
 const open=document.body.classList.toggle('panel-open');
 panel.setAttribute('aria-expanded',open);panel.textContent=open?'×':'☰';
 panel.setAttribute('aria-label',open?'Fechar controles':'Abrir controles');
});
function orient(){v.controls.enableRotate=!portrait.matches;v.controls.enablePan=!portrait.matches;}
portrait.addEventListener('change',orient);orient();
const touches=new Map();
v.canvas.addEventListener('pointerdown',e=>{if(portrait.matches){touches.set(e.pointerId,{x:e.clientX,y:e.clientY});v.controls.dispatchEvent({type:'start'});}});
v.canvas.addEventListener('pointermove',e=>{
 const prev=touches.get(e.pointerId);if(!prev||!portrait.matches)return;
 const dx=e.clientY-prev.y,dy=prev.x-e.clientX;touches.set(e.pointerId,{x:e.clientX,y:e.clientY});
 if(touches.size!==1)return;
 const delta=v.camera.position.clone().sub(v.controls.target);
 if(v.estado.navegacao==='mover'){
   const factor=delta.length()*.0018;
   const right=new THREE.Vector3().setFromMatrixColumn(v.camera.matrix,0).multiplyScalar(-dx*factor);
   const up=new THREE.Vector3().setFromMatrixColumn(v.camera.matrix,1).multiplyScalar(dy*factor);
   right.add(up);v.camera.position.add(right);v.controls.target.add(right);
 }else{
   const s=new THREE.Spherical().setFromVector3(delta);s.theta-=dx*.006;s.phi=THREE.MathUtils.clamp(s.phi-dy*.006,.03,Math.PI-.03);
   v.camera.position.copy(v.controls.target).add(new THREE.Vector3().setFromSpherical(s));
 }
 v.controls.update();
});
for(const evt of ['pointerup','pointercancel'])v.canvas.addEventListener(evt,e=>touches.delete(e.pointerId));
