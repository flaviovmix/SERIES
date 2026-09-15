import { THREE, montaVisualizador } from './_visualizador-pecas.js';

// SSD NVMe M.2 2280 didático. 1 unidade = 10 mm.
const v=montaVisualizador({
  global:'__nvme',arquivoDaImagem:'nvme.png',
  pecas:{
    placa:{nome:'Placa M.2',explosao:0},
    nand:{nome:'Memórias NAND',explosao:1.25},
    controlador:{nome:'Controlador NVMe',explosao:1.55},
    dram:{nome:'Memória DRAM',explosao:1.3},
    energia:{nome:'Circuito de energia',explosao:.9},
    contatos:{nome:'Contatos M.2',explosao:0},
    verso:{nome:'Componentes do verso',explosao:-1.1},
    dissipador:{nome:'Dissipador térmico',explosao:[4.5,1.2,0]},
  },
  detalhes:{
    placa:['01','FORMATO 2280','Uma placa de 22 × 80 mm.','M.2 descreve o formato físico. O 2280 significa 22 mm de largura por 80 mm de comprimento. A placa estreita é presa por um único parafuso.'],
    nand:['02','ARMAZENAMENTO','Quatro memórias NAND.','As células flash guardam os arquivos sem energia. O controlador distribui as gravações entre os encapsulamentos para equilibrar desgaste e velocidade.'],
    controlador:['03','PROTOCOLO NVME','O controlador conversa por PCIe.','Ele organiza filas de comandos, corrige erros e traduz endereços lógicos para as células físicas. NVMe foi pensado para memória rápida, sem imitar um disco mecânico.'],
    dram:['04','MAPA DOS DADOS','Memória DRAM auxiliar.','A DRAM ajuda a manter tabelas de mapeamento e dados temporários. Este estudo representa um modelo com DRAM dedicada.'],
    energia:['05','TENSÕES INTERNAS','Reguladores, bobinas e capacitores.','A alimentação recebida pelo slot é convertida nas tensões menores usadas pelo controlador e pelas memórias NAND.'],
    contatos:['06','CHAVE M','O encaixe M.2.','Os contatos dourados levam alimentação e quatro pistas PCIe. O recorte da chave M impede encaixe incompatível.'],
    verso:['07','DUAS FACES','Componentes inferiores.','Vias atravessam a placa e ligam as duas faces. O verso recebe componentes baixos para caber sob a placa em instalações compatíveis.'],
    dissipador:['08','CALOR','Dissipador removível.','A chapa com aletas espalha o calor do controlador e das memórias. Uma camada térmica faz contato com os encapsulamentos.'],
  },
  direcoes:{perspective:[5,8,10],top:[0,1,.05],bottom:[0,-1,-.05],back:[0,.5,1]},
  textos:{montado:'NVME M.2 MONTADO',desmontado:'NVME ABERTO',montar:'Montar o NVMe'},
  palco:{alvo:[0,0,0],camPos:[5,8,10],meiaLarguraDesktop:4.8,meiaLarguraMobile:4.8,distMin:8,orbitaMin:1.4,maxPolar:Math.PI},
  luz:{chao:-2.2,alcance:8},
  aoSelecionar(k,api){if(k==='placa'){api.expandir(1);api.vista('top');}else{api.isolar(true);api.vista(k==='verso'?'bottom':k==='contatos'?'back':'perspective');}}
});
const {grupos:g,caixa:box,metal,inscricao:text}=v;
v.controls.zoomSpeed=.18;
v.canvas.setAttribute('aria-label','SSD NVMe M.2 2280 em 3D. Arraste para girar e use os controles para separar ou isolar oito partes.');
const m={pcb:metal(0x114c42,.62,.12),edge:metal(0x78a49a,.42,.22),chip:metal(0x171b20,.55,.15),gold:metal(0xd5ad50,.25,.92),silver:metal(0xbfc7c8,.3,.85),ceramic:metal(0xb4a18b,.68,.06),coil:metal(0x59616b,.48,.55),sink:metal(0x313942,.3,.88),pad:metal(0x53616a,.75,.15)};
const top=[-Math.PI/2,0,0];
const label=(p,s,w,h,x,y,z,c='#bdc9ca',size=100)=>text(p,s,w,h,[x,y,z],top,c,size);
function component(p,x,z,w,d,name,sub=''){
 box(p,w,.18,d,m.chip,x,.13,z,.035);label(p,name,w*.85,.25,x,.225,z-.13,'#d4dcda',95);
 if(sub)label(p,sub,w*.82,.16,x,.226,z+.17,'#758687',76);
 p.add(v.cilindro(.035,.01,m.silver,x-w/2+.11,.226,z-d/2+.11,'y',{lados:10}));
}
// Contorno 22 × 80 mm, furo semicircular na ponta e chave M nos contatos.
box(g.placa,2.2,.13,8,m.pcb,0,0,0,.09);
g.placa.add(v.cilindro(.19,.135,m.edge,0,0,-3.83,'y',{lados:32}));
g.placa.add(v.cilindro(.105,.145,m.chip,0,.002,-3.83,'y',{lados:28}));
// Textura de trilhas, vias e serigrafia nas duas faces.
function traces(ctx,w,h){
 const X=x=>(x/2.2+.5)*w,Z=z=>(z/8+.5)*h;ctx.clearRect(0,0,w,h);
 ctx.strokeStyle='#42a083';ctx.lineWidth=2;
 for(let i=0;i<30;i++){const x=-.95+(i%10)*.21,z=-3.3+Math.floor(i/10)*.32;ctx.beginPath();ctx.moveTo(X(x),Z(z));ctx.lineTo(X(x*.65),Z(z+.8));ctx.lineTo(X((i%6-2.5)*.12),Z(2.8));ctx.stroke();}
 ctx.strokeStyle='#b7b480';ctx.lineWidth=1.2;
 for(let i=0;i<96;i++){const x=-.94+(i%8)*.27,z=-3.45+Math.floor(i/8)*.57;ctx.beginPath();ctx.arc(X(x),Z(z),2.3,0,7);ctx.stroke();}
 ctx.fillStyle='#d7dfd5';ctx.font='22px Arial';ctx.fillText('M.2 2280  •  PCIe x4',X(-.88),Z(-3.48));
}
for(const side of [1,-1]){const q=new THREE.Mesh(new THREE.PlaneGeometry(2.2,8),new THREE.MeshStandardMaterial({map:v.textura(traces,550,2000),transparent:true,depthWrite:false,roughness:.55,metalness:.25}));q.rotation.x=-side*Math.PI/2;q.position.y=side*.066;g.placa.add(q);}
// Quatro NAND, controlador e DRAM.
for(const [i,z] of [-2.75,-1.35,.05,1.45].entries())component(g.nand,.35,z,1.15,1.05,'3D NAND',`N${i+1} / FLASH`);
component(g.controlador,.18,2.82,.92,.92,'NVMe','PCIe 4×4');
component(g.dram,-.62,1.55,.48,.72,'DRAM','CACHE');
// Alimentação, cristal e passivos visíveis.
for(const [x,z] of [[-.72,2.5],[-.72,3.0]]){box(g.energia,.34,.24,.36,m.coil,x,.14,z,.035);label(g.energia,'1R0',.29,.13,x,.266,z,'#d9dddd',72);}
component(g.energia,-.72,3.5,.42,.36,'PMIC');
for(let i=0;i<18;i++){const x=-.9+(i%3)*.24,z=2.05+Math.floor(i/3)*.32;box(g.energia,.13,.11,.08,m.ceramic,x,.11,z,.012);for(const dx of [-.055,.055])box(g.energia,.035,.115,.085,m.silver,x+dx,.11,z,.005);}
box(g.energia,.42,.17,.18,m.silver,-.23,.12,3.48,.03);label(g.energia,'25M',.34,.11,-.23,.211,3.48,'#263136',66);
// Edge connector: 67 contatos separados e o recorte da chave M.
const count=67,gapStart=27,gapEnd=33;
for(let i=0;i<count;i++){
 if(i>=gapStart&&i<=gapEnd)continue;
 const x=-1.02+(i+.5)*2.04/count;
 box(g.contatos,2.04/count*.68,.018,.58,m.gold,x,.079,3.7,.004);
 box(g.contatos,2.04/count*.68,.018,.58,m.gold,x,-.079,3.7,.004);
}
box(g.contatos,.28,.16,.31,m.chip,-.12,0,3.86,.018);
// Componentes inferiores e matriz de soldas BGA.
for(const [x,z,w,d] of [[.35,-2.1,.95,.7],[.35,.75,.9,.55],[-.55,-.55,.55,.38]]){
 box(g.verso,w,.15,d,m.chip,x,-.14,z,.028);
 const geo=new THREE.SphereGeometry(.025,6,4),balls=new THREE.InstancedMesh(geo,m.silver,30),o=new THREE.Object3D();
 for(let a=0;a<6;a++)for(let b=0;b<5;b++){o.position.set(x+(a-2.5)*w/7,-.225,z+(b-2)*d/6);o.updateMatrix();balls.setMatrixAt(a*5+b,o.matrix);}g.verso.add(balls);
}
for(let i=0;i<22;i++){const x=-.85+(i%4)*.25,z=-3+Math.floor(i/4)*.55;box(g.verso,.14,.09,.09,m.ceramic,x,-.12,z,.01);}
// Dissipador destacável com thermal pad e sete aletas longitudinais.
box(g.dissipador,1.72,.08,6.45,m.pad,.14,.34,-.35,.08);
box(g.dissipador,1.86,.1,6.7,m.sink,.14,.43,-.35,.07);
for(let i=0;i<7;i++)box(g.dissipador,.12,.23,6.35,m.sink,-.67+i*.27,.58,-.35,.035);
label(g.dissipador,'SEIRES  NVMe',1.45,.34,.14,.71,-.35,'#d9e1de',90);
v.inicia();

// No telefone em pé, a interface deita e o painel entra pela lateral.
const portrait=matchMedia('(max-width:820px) and (orientation:portrait) and (pointer:coarse)'),panel=document.getElementById('mobilePanel'),touches=new Map();
panel.addEventListener('click',()=>{const open=document.body.classList.toggle('panel-open');panel.setAttribute('aria-expanded',open);panel.textContent=open?'×':'☰';});
function orient(){v.controls.enableRotate=!portrait.matches;v.controls.enablePan=!portrait.matches;}portrait.addEventListener('change',orient);orient();
v.canvas.addEventListener('pointerdown',e=>{if(portrait.matches){touches.set(e.pointerId,{x:e.clientX,y:e.clientY});v.controls.dispatchEvent({type:'start'});}});
v.canvas.addEventListener('pointermove',e=>{const p=touches.get(e.pointerId);if(!p||!portrait.matches||touches.size!==1)return;const dx=e.clientY-p.y,dy=p.x-e.clientX;touches.set(e.pointerId,{x:e.clientX,y:e.clientY});const d=v.camera.position.clone().sub(v.controls.target);if(v.estado.navegacao==='mover'){const f=d.length()*.0018,r=new THREE.Vector3().setFromMatrixColumn(v.camera.matrix,0).multiplyScalar(-dx*f),u=new THREE.Vector3().setFromMatrixColumn(v.camera.matrix,1).multiplyScalar(dy*f);r.add(u);v.camera.position.add(r);v.controls.target.add(r);}else{const s=new THREE.Spherical().setFromVector3(d);s.theta-=dx*.006;s.phi=THREE.MathUtils.clamp(s.phi-dy*.006,.03,Math.PI-.03);v.camera.position.copy(v.controls.target).add(new THREE.Vector3().setFromSpherical(s));}v.controls.update();});
for(const event of ['pointerup','pointercancel'])v.canvas.addEventListener(event,e=>touches.delete(e.pointerId));
