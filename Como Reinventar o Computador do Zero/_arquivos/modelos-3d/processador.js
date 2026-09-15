// Processador desktop moderno: estudo didatico das camadas do encapsulamento.
import { THREE, montaPalco } from './_base-modelo-3d.js';

const $=id=>document.getElementById(id);
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const state={expanded:0,targetExpanded:0,rotating:false,fans:!reducedMotion.matches,part:'lid',isolated:false,view:'perspective'};
const palco=montaPalco({alvo:[0,0,.15],camPos:[7,-7,6.8],meiaLarguraDesktop:3.8,meiaLarguraMobile:4.1,distMin:8,orbitaMin:2.5,maxPolar:Math.PI});
const {scene,camera,renderer,controls,bloco}=palco;
scene.background=new THREE.Color(0x171d18);scene.fog=null;
scene.children.filter(child=>child.isLight||child.material?.isShadowMaterial).forEach(child=>scene.remove(child));
renderer.toneMappingExposure=1.18;renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));
const canvas=renderer.domElement;canvas.tabIndex=0;canvas.setAttribute('role','img');
canvas.setAttribute('aria-label','Processador moderno em tres dimensoes. Arraste para girar, role para aproximar e use os controles para separar ou isolar as camadas.');
controls.enableDamping=!reducedMotion.matches;controls.dampingFactor=.065;controls.zoomSpeed=.34;controls.rotateSpeed=.58;controls.minPolarAngle=.03;controls.maxPolarAngle=Math.PI-.03;

scene.add(new THREE.HemisphereLight(0xf3f4ea,0x304137,1.15));
function light(color,intensity,position){const item=new THREE.DirectionalLight(color,intensity);item.position.set(...position);scene.add(item);return item;}
const key=light(0xfff7df,4.2,[-4,-2,9]);key.castShadow=true;key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-7,right:7,top:7,bottom:-7});
light(0xb9d9ff,2.7,[7,4,3]);light(0xcaff9a,1.4,[-6,5,2]);
light(0xd7e4ef,2.1,[-3,4,-7]);
const ground=new THREE.Mesh(new THREE.PlaneGeometry(80,80),new THREE.ShadowMaterial({opacity:.23}));ground.rotation.x=-Math.PI/2;ground.position.y=-3.4;ground.receiveShadow=true;scene.add(ground);

const metal=(color,roughness=.32,metalness=.82)=>new THREE.MeshStandardMaterial({color,roughness,metalness,envMapIntensity:1.25});
const mats={steel:metal(0xa6ada8,.25,.92),edge:metal(0xd4d8d2,.2,.96),dark:metal(0x181d1b,.46,.42),substrate:metal(0x17352b,.63,.10),silicon:metal(0x416b80,.18,.9),gold:metal(0xcaa34c,.23,.9),copper:metal(0xaa6d39,.3,.76),solder:metal(0xb7b2a8,.42,.72),black:metal(0x080b0a,.62,.16)};
const model=new THREE.Group();scene.add(model);const groups={};
for(const name of ['coolerFan','cooler','lid','seal','die','cores','substrate','contacts']){const group=new THREE.Group();group.name=name;group.userData.part=name;groups[name]=group;model.add(group);}
const explosion={coolerFan:6.3,cooler:4.45,lid:2.9,seal:1.75,die:.92,cores:.92,substrate:0,contacts:-1.35};
function box(parent,w,h,d,material,x=0,y=0,z=0,radius=.03){const mesh=bloco(w,h,d,material,radius);mesh.position.set(x,y,z);parent.add(mesh);return mesh;}
function inscription(parent,text,w,h,position,rotation=[0,0,0],color='#d7ddd7',size=70){
  const c=document.createElement('canvas');c.width=1024;c.height=256;const x=c.getContext('2d');x.fillStyle=color;x.font=`600 ${size}px Arial`;x.textAlign='center';x.textBaseline='middle';x.fillText(text,512,132);
  const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),8);
  const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshStandardMaterial({map:texture,transparent:true,roughness:.45,metalness:.5,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2}));mesh.position.set(...position);mesh.rotation.set(...rotation);parent.add(mesh);return mesh;
}

// Substrato organico e bordas de cobre.
box(groups.substrate,5.35,5.35,.22,mats.substrate,0,0,0,.23);
box(groups.substrate,5.12,5.12,.035,metal(0x24473a,.58,.18),0,0,.128,.18);
for(const side of [-1,1])for(let i=0;i<18;i++){
  const p=-2.15+i*.253;
  box(groups.substrate,.12,.045,.035,mats.copper,p,side*2.48,.155,.008);
  box(groups.substrate,.045,.12,.035,mats.copper,side*2.48,p,.155,.008);
}

// Componentes de desacoplamento ao redor do silicio.
for(let i=0;i<96;i++){
  const side=Math.floor(i/24),step=i%24,t=-2.18+step*(4.36/23);let x,y,w=.13,h=.055;
  if(side===0){x=t;y=-1.80;}else if(side===1){x=t;y=1.80;}else if(side===2){x=-1.82;y=t;[w,h]=[h,w];}else{x=1.82;y=t;[w,h]=[h,w];}
  box(groups.substrate,w,h,.052,i%5===0?mats.solder:(i%3===0?mats.copper:mats.dark),x,y,.174,.009);
}
for(const [x,y] of [[-2.28,-2.28],[2.28,-2.28],[-2.28,2.28],[2.28,2.28]]){
  const ring=new THREE.Mesh(new THREE.TorusGeometry(.13,.035,8,24),mats.copper);ring.position.set(x,y,.16);groups.substrate.add(ring);
}

// Pastilha, interposer e mapa arquitetural de 16 nucleos.
box(groups.die,2.82,2.82,.10,mats.dark,0,0,.23,.07);
box(groups.die,2.54,2.54,.075,mats.silicon,0,0,.315,.055);
for(let i=0;i<70;i++){
  const p=-1.16+i*.033;
  const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-1.2,p,.358),new THREE.Vector3(1.2,p,.358)]),new THREE.LineBasicMaterial({color:i%4?0x5f8da0:0x91b6c0,transparent:true,opacity:.34}));groups.die.add(line);
}
for(let row=0;row<4;row++)for(let col=0;col<4;col++){
  const x=-.90+col*.60,y=-.90+row*.60;
  box(groups.cores,.49,.49,.035,metal((row+col)%2?0x315d72:0x477d8d,.24,.75),x,y,.375,.035);
  inscription(groups.cores,String(row*4+col+1).padStart(2,'0'),.27,.12,[x,y,.397],[0,0,0],'#b9d6dc',58);
}
box(groups.cores,2.34,.23,.038,metal(0x826746,.28,.78),0,1.11,.377,.025);
inscription(groups.cores,'CACHE',1.18,.13,[0,1.11,.399],[0,0,0],'#e0cc9f',62);

// Material de interface termica e moldura de vedacao.
box(groups.seal,3.18,3.18,.075,mats.solder,0,0,.43,.12);
box(groups.seal,2.82,2.82,.085,mats.silicon,0,0,.43,.07);
for(const side of [-1,1]){
  box(groups.seal,4.20,.10,.065,mats.black,0,side*2.05,.28,.04);
  box(groups.seal,.10,4.20,.065,mats.black,side*2.05,0,.28,.04);
}

// Saia oca: a cavidade inferior e o ressalto de cobre ficam dentro da tampa.
const lidSkirt=new THREE.Shape();lidSkirt.moveTo(-2.36,-2.36);lidSkirt.lineTo(2.36,-2.36);lidSkirt.lineTo(2.36,2.36);lidSkirt.lineTo(-2.36,2.36);lidSkirt.closePath();
const lidCavity=new THREE.Path();lidCavity.moveTo(-2.10,-2.10);lidCavity.lineTo(-2.10,2.10);lidCavity.lineTo(2.10,2.10);lidCavity.lineTo(2.10,-2.10);lidCavity.closePath();lidSkirt.holes.push(lidCavity);
const skirt=new THREE.Mesh(new THREE.ExtrudeGeometry(lidSkirt,{depth:.26,bevelEnabled:true,bevelSize:.025,bevelThickness:.02,bevelSegments:3,steps:1}),mats.steel);skirt.position.z=.49;groups.lid.add(skirt);
box(groups.lid,4.26,4.26,.14,mats.edge,0,0,.83,.22);
box(groups.lid,3.96,3.96,.065,metal(0x8f9691,.22,.95),0,0,.945,.18);
for(const [x,y] of [[-2.25,-1.38],[2.25,-1.38],[-2.25,1.38],[2.25,1.38]])box(groups.lid,.46,.82,.32,mats.steel,x,y,.60,.09);
inscription(groups.lid,'SEIRES',2.55,.62,[0,.48,.982],[0,0,0],'#202622',98);
inscription(groups.lid,'PROCESSADOR 16 CORE',2.62,.28,[0,-.18,.984],[0,0,0],'#313934',54);
inscription(groups.lid,'3D LAB  /  SILICON',2.10,.18,[0,-.62,.984],[0,0,0],'#48514b',48);

// Matriz LGA com janela central livre para os capacitores do substrato.
const contactGeo=new THREE.CylinderGeometry(.035,.045,.028,10);contactGeo.rotateX(Math.PI/2);
const pads=new THREE.InstancedMesh(contactGeo,mats.gold,880);const temp=new THREE.Object3D();let padIndex=0;
for(let row=0;row<32;row++)for(let col=0;col<32;col++){
  if(row>=10&&row<22&&col>=10&&col<22)continue;
  temp.position.set(-2.18+col*(4.36/31),-2.18+row*(4.36/31),-.135);temp.updateMatrix();pads.setMatrixAt(padIndex++,temp.matrix);
}
pads.castShadow=true;groups.contacts.add(pads);

// Texturas desenhadas no plano da superficie; acompanham a rotacao da peca.
function rearSurface(parent,w,h,z,draw,roughness=.62){
  const c=document.createElement('canvas');c.width=c.height=2048;const ctx=c.getContext('2d');draw(ctx,2048);
  const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),8);
  const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshStandardMaterial({map:texture,roughness,metalness:.25}));
  mesh.rotation.y=Math.PI;mesh.position.z=z;parent.add(mesh);return mesh;
}
// Ilhas de contato, vias e trilhas sob a mascara verde. Sem relevo sobre os pads.
rearSurface(groups.substrate,5.10,5.10,-.111,(ctx,n)=>{
  ctx.fillStyle='#16372c';ctx.fillRect(0,0,n,n);
  const px=x=>(x/5.10+.5)*n;
  ctx.strokeStyle='#426955';ctx.lineWidth=2;
  for(let side of [-1,1])for(let i=0;i<64;i++){
    const t=-2.2+i*4.4/63;
    ctx.beginPath();ctx.moveTo(px(side*.78),px(t*.3));ctx.lineTo(px(side*(.92+(i%8)*.035)),px(t*.52));ctx.lineTo(px(side*(1.15+(i%8)*.07)),px(t));ctx.lineTo(px(side*2.35),px(t));ctx.stroke();
  }
  for(let row=0;row<32;row++)for(let col=0;col<32;col++){
    if(row>=10&&row<22&&col>=10&&col<22)continue;
    const x=px(-2.18+col*4.36/31),y=px(-2.18+row*4.36/31);
    ctx.strokeStyle='#8d824f';ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,y,n*.0092,0,Math.PI*2);ctx.stroke();
    ctx.fillStyle='#060e0b';ctx.beginPath();ctx.arc(x+13,y+13,3.5,0,Math.PI*2);ctx.fill();
  }
  ctx.strokeStyle='#b4c5a5';ctx.lineWidth=3;ctx.strokeRect(px(-.81),px(-.81),n*1.62/5.10,n*1.62/5.10);
  ctx.fillStyle='#d4c786';ctx.beginPath();ctx.moveTo(55,55);ctx.lineTo(130,55);ctx.lineTo(55,130);ctx.closePath();ctx.fill();
  ctx.fillStyle='#a8b99e';ctx.font='24px monospace';ctx.fillText('SEIRES  /  SUBSTRATO  /  REV. 01',140,95);ctx.fillText('A1',62,n-75);ctx.fillText('ESTUDO 3D  -  FACE INFERIOR',420,n-75);
});
// Capacitores centrais com terminais de solda, presos ao substrato.
const ceramic=metal(0x827151,.63,.1);
for(let row=0;row<7;row++)for(let col=0;col<6;col++){
  const x=-.61+col*.244,y=-.62+row*.206;
  box(groups.substrate,.145,.083,.030,row%3===0?mats.dark:ceramic,x,y,-.136,.007);
  for(const side of [-1,1])box(groups.substrate,.032,.087,.033,mats.solder,x+side*.064,y,-.136,.005);
}
// Interior da tampa: cobre usinado, vedacao perimetral e pontos de apoio.
box(groups.lid,3.25,3.25,.26,mats.copper,0,0,.63,.06);
rearSurface(groups.lid,3.18,3.18,.499,(ctx,n)=>{
  ctx.fillStyle='#ae774c';ctx.fillRect(0,0,n,n);
  for(let i=0;i<650;i++){const y=i*n/650;ctx.strokeStyle=i%3?'#b98154':'#9e6b44';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(n,y);ctx.stroke();}
  ctx.strokeStyle='#d1a77d';ctx.lineWidth=8;ctx.strokeRect(90,90,n-180,n-180);
  ctx.fillStyle='#724928';ctx.font='40px monospace';ctx.fillText('Cu / CONTATO TERMICO',160,180);
},.4);
for(const side of [-1,1]){
  box(groups.lid,4.10,.055,.018,mats.dark,0,side*2.23,.46,.008);
  box(groups.lid,.055,4.10,.018,mats.dark,side*2.23,0,.46,.008);
}
// Matriz de microconexoes na face inferior da pastilha.
rearSurface(groups.die,2.72,2.72,.179,(ctx,n)=>{
  ctx.fillStyle='#152a31';ctx.fillRect(0,0,n,n);ctx.strokeStyle='#4e737f';ctx.lineWidth=2;
  for(let i=0;i<32;i++){const p=80+i*(n-160)/31;ctx.beginPath();ctx.moveTo(p,45);ctx.lineTo(p,n-45);ctx.moveTo(45,p);ctx.lineTo(n-45,p);ctx.stroke();}
  ctx.strokeStyle='#a6b8be';ctx.lineWidth=6;ctx.strokeRect(40,40,n-80,n-80);
});
const bumpGeometry=new THREE.SphereGeometry(.021,8,6),bumps=new THREE.InstancedMesh(bumpGeometry,mats.solder,24*24);
for(let row=0;row<24;row++)for(let col=0;col<24;col++){temp.position.set(-1.18+col*2.36/23,-1.18+row*2.36/23,.169);temp.scale.set(1,1,.6);temp.updateMatrix();bumps.setMatrixAt(row*24+col,temp.matrix);}groups.die.add(bumps);
// Interface termica: impressao de contato e microtextura na face inferior.
rearSurface(groups.seal,2.76,2.76,.386,(ctx,n)=>{
  ctx.fillStyle='#969c99';ctx.fillRect(0,0,n,n);
  for(let i=0;i<3200;i++){const x=(i*571)%n,y=(i*937)%n;ctx.fillStyle=i%2?'#abb0ac':'#848d88';ctx.fillRect(x,y,3+i%9,2+i%5);}
  ctx.strokeStyle='#bbc0bc';ctx.lineWidth=12;ctx.strokeRect(90,90,n-180,n-180);
},.75);
// O mapa didatico dos nucleos tem barramentos tambem na face inferior.
for(let row=0;row<4;row++)for(let col=0;col<4;col++){
  const face=rearSurface(groups.cores,.46,.46,.357,(ctx,n)=>{
    ctx.fillStyle='#244856';ctx.fillRect(0,0,n,n);ctx.strokeStyle='#779898';ctx.lineWidth=9;
    for(let i=0;i<16;i++){const p=80+i*120;ctx.beginPath();ctx.moveTo(p,40);ctx.lineTo(p,n-40);ctx.stroke();}
  });face.position.x=-.90+col*.60;face.position.y=-.90+row*.60;
}

// Cooler circular inspirado na fotografia fornecida pelo usuario.
const coolerAluminum=metal(0xb9c1c6,.37,.83),coolerEdge=metal(0xd6dce0,.27,.85);
const fanPlastic=metal(0x131416,.55,.05),whitePlastic=metal(0xe9eaed,.43,.02);
function axialCylinder(parent,radius,height,material,x,y,z){
  const mesh=new THREE.Mesh(new THREE.CylinderGeometry(radius,radius,height,48),material);
  mesh.rotation.x=Math.PI/2;mesh.position.set(x,y,z);mesh.castShadow=true;parent.add(mesh);return mesh;
}
axialCylinder(groups.cooler,1.40,.15,coolerAluminum,0,0,1.055);
axialCylinder(groups.cooler,.85,1.63,coolerAluminum,0,0,1.91);
// Aletas verticais radiais, ligadas ao nucleo central e abertas na periferia.
for(let i=0;i<96;i++){
  const angle=i*Math.PI*2/96;
  const fin=box(groups.cooler,1.83,.035,1.56,coolerAluminum,Math.cos(angle)*1.735,Math.sin(angle)*1.735,1.94,.008);
  fin.rotation.z=angle;
}
// Quatro apoios continuos e pinos com molas e cabecas estriadas.
for(const angle of [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4]){
  const x=Math.cos(angle)*3.12,y=Math.sin(angle)*3.12;
  const arm=box(groups.cooler,1.02,.37,.14,coolerAluminum,Math.cos(angle)*2.70,Math.sin(angle)*2.70,1.72,.035);arm.rotation.z=angle;
  axialCylinder(groups.cooler,.11,1.14,coolerEdge,x,y,1.45);
  axialCylinder(groups.cooler,.16,.34,whitePlastic,x,y,1.07);
  axialCylinder(groups.cooler,.24,.16,fanPlastic,x,y,2.08);
  axialCylinder(groups.cooler,.18,.10,fanPlastic,x,y,1.79);
  for(let k=0;k<20;k++){
    const a=k*Math.PI/10;
    box(groups.cooler,.026,.026,.13,fanPlastic,x+.235*Math.cos(a),y+.235*Math.sin(a),2.08,.006);
  }
  const coilPoints=[];
  for(let k=0;k<=180;k++){const a=k/180*Math.PI*10;coilPoints.push(new THREE.Vector3(x+.145*Math.cos(a),y+.145*Math.sin(a),1.27+k/180*.48));}
  groups.cooler.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(coilPoints),180,.025,6,false),mats.dark));
}
// Carenagem preta fechada nas laterais, aberta no centro.
const shroudShape=new THREE.Shape();shroudShape.absarc(0,0,2.76,0,Math.PI*2,false);
const shroudHole=new THREE.Path();shroudHole.absarc(0,0,2.62,0,Math.PI*2,true);shroudShape.holes.push(shroudHole);
const shroud=new THREE.Mesh(new THREE.ExtrudeGeometry(shroudShape,{depth:.66,bevelEnabled:true,bevelSize:.035,bevelThickness:.025,bevelSegments:3,curveSegments:96,steps:1}),fanPlastic);
shroud.position.z=2.72;shroud.castShadow=true;groups.coolerFan.add(shroud);
for(const angle of [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4]){
  const ear=box(groups.coolerFan,.55,.48,.14,fanPlastic,Math.cos(angle)*2.85,Math.sin(angle)*2.85,2.79,.045);ear.rotation.z=angle;
  const x=Math.cos(angle)*3.0,y=Math.sin(angle)*3.0;
  axialCylinder(groups.coolerFan,.095,.07,coolerEdge,x,y,2.90);
  box(groups.coolerFan,.10,.018,.008,mats.dark,x,y,2.94,.003);
  box(groups.coolerFan,.018,.10,.008,mats.dark,x,y,2.94,.003);
}
// Travessas fixas sob o rotor.
for(let i=0;i<4;i++){
  const a=i*Math.PI/2+.4;
  const strut=box(groups.coolerFan,2.15,.13,.09,fanPlastic,Math.cos(a)*1.55,Math.sin(a)*1.55,2.77,.025);strut.rotation.z=a;
}
axialCylinder(groups.coolerFan,.64,.15,fanPlastic,0,0,2.77);
const fanRotor=new THREE.Group();fanRotor.position.z=2.94;groups.coolerFan.add(fanRotor);
// Sete pas brancas com curvatura e torcao ao longo do raio.
const bladeVertices=[],bladeIndices=[],nr=24,nc=12;
for(let i=0;i<=nr;i++)for(let j=0;j<=nc;j++){
  const t=i/nr,v=j/nc,r=.68+1.87*t;
  const sweep=-.38*t+.13*Math.sin(t*Math.PI),width=.72*Math.sin(.42+t*1.12);
  const a=sweep+(v-.5)*width;
  bladeVertices.push(Math.cos(a)*r,Math.sin(a)*r,.13+(v-.5)*(.14+.38*t)+.07*Math.sin(v*Math.PI));
}
for(let i=0;i<nr;i++)for(let j=0;j<nc;j++){const a=i*(nc+1)+j,b=a+nc+1;bladeIndices.push(a,b,a+1,a+1,b,b+1);}
const bladeGeometry=new THREE.BufferGeometry();bladeGeometry.setAttribute('position',new THREE.Float32BufferAttribute(bladeVertices,3));bladeGeometry.setIndex(bladeIndices);bladeGeometry.computeVertexNormals();
const bladeMaterial=whitePlastic.clone();bladeMaterial.side=THREE.DoubleSide;
for(let i=0;i<7;i++){const blade=new THREE.Mesh(bladeGeometry,bladeMaterial);blade.rotation.z=i*Math.PI*2/7;blade.castShadow=true;fanRotor.add(blade);}
axialCylinder(fanRotor,.77,.47,whitePlastic,0,0,.08);
axialCylinder(fanRotor,.61,.012,fanPlastic,0,0,.322);
inscription(fanRotor,'SEIRES',1.05,.32,[0,.045,.332],[0,0,0],'#f0a742',115);
inscription(fanRotor,'AIR COOLER',.85,.17,[0,-.20,.333],[0,0,0],'#eeeeee',80);
// Cabo de alimentacao e conector acompanham a moldura fixa.
const cablePath=new THREE.CatmullRomCurve3([new THREE.Vector3(2.6,0,2.76),new THREE.Vector3(2.95,.12,2.5),new THREE.Vector3(3.05,.46,1.95),new THREE.Vector3(3.03,.88,1.83)]);
groups.coolerFan.add(new THREE.Mesh(new THREE.TubeGeometry(cablePath,32,.05,8,false),fanPlastic));
box(groups.coolerFan,.28,.30,.18,fanPlastic,3.03,.88,1.83,.025);

const details={
  coolerFan:['01','FLUXO DE AR','A ventoinha do cooler.','Sete pás brancas empurram o ar através dos espaços entre as aletas. Use o controle Ventoinha para parar e observar sua forma.'],
  cooler:['02','RETIRANDO O CALOR','Núcleo e aletas de alumínio.','O núcleo conduz o calor para as aletas verticais de alumínio. Os quatro pinos com molas representam a fixação do conjunto.'],
  lid:['03','PROTECAO E CALOR','A tampa que voce toca.','O espalhador metalico protege o silicio e distribui o calor para o sistema de refrigeracao.'],
  seal:['04','INTERFACE TERMICA','O caminho para o metal.','Uma fina camada termica preenche as irregularidades entre a pastilha e a tampa para conduzir calor.'],
  die:['05','SILICIO','A pastilha onde tudo acontece.','O die concentra os circuitos gravados em silicio. As linhas representam a enorme rede de interconexoes.'],
  cores:['06','ARQUITETURA INTERNA','Nucleos e memoria cache.','Dezesseis blocos representam nucleos de processamento; a faixa dourada mostra uma area compartilhada de cache.'],
  substrate:['07','DISTRIBUICAO ELETRICA','A base verde do encapsulamento.','O substrato liga o pequeno die aos contatos externos e carrega componentes que estabilizam a alimentacao.'],
  contacts:['08','CONTATO COM A PLACA-MAE','A matriz inferior.','Os contatos dourados levam energia, dados e sinais de controle entre o processador e o soquete.']
};
const names={coolerFan:'Ventoinha do cooler',cooler:'Dissipador e base',lid:'Tampa metalica',seal:'Solda termica',die:'Pastilha de silicio',cores:'Nucleos e cache',substrate:'Substrato e componentes',contacts:'Contatos inferiores'};
const hidden=new Set();
$('visibilityList').innerHTML=Object.entries(names).map(([key,label])=>`<label><input type="checkbox" data-visible="${key}" checked><span>${label}</span></label>`).join('');
function syncVisibility(){for(const [name,group] of Object.entries(groups))group.visible=state.isolated?name===state.part:!hidden.has(name);const count=Object.values(groups).filter(g=>g.visible).length;document.querySelectorAll('[data-visible]').forEach(input=>{input.checked=groups[input.dataset.visible].visible;input.disabled=count===1&&input.checked;});$('visibilityCount').textContent=count+' / 8';}
const baseBounds={};model.updateMatrixWorld(true);for(const [name,group] of Object.entries(groups))baseBounds[name]=new THREE.Box3().setFromObject(group);
function bounds(factor=state.targetExpanded){const result=new THREE.Box3();for(const [name,bb] of Object.entries(baseBounds))if(groups[name].visible)result.union(bb.clone().translate(new THREE.Vector3(0,0,explosion[name]*factor)));return result;}
const directions={perspective:new THREE.Vector3(6,-8,10),front:new THREE.Vector3(0,0,1),back:new THREE.Vector3(0,0,-1),side:new THREE.Vector3(1,-.10,.08)};
function fitPosition(direction){const dir=direction.clone().normalize(),right=new THREE.Vector3().crossVectors(camera.up,dir).normalize(),up=new THREE.Vector3().crossVectors(dir,right).normalize(),bb=bounds(),center=bb.getCenter(new THREE.Vector3()),tan=Math.tan(THREE.MathUtils.degToRad(camera.fov/2)),margin=state.isolated?1.48:1.28;let distance=state.isolated?1.2:4;for(const x of [bb.min.x,bb.max.x])for(const y of [bb.min.y,bb.max.y])for(const z of [bb.min.z,bb.max.z]){const p=new THREE.Vector3(x,y,z).sub(center),depth=p.dot(dir);distance=Math.max(distance,depth+Math.abs(p.dot(right))*margin/(tan*camera.aspect),depth+Math.abs(p.dot(up))*margin/tan);}controls.minDistance=state.isolated?.5:2.5;controls.target.copy(center);controls.maxDistance=Math.max(24,distance*3);return dir.multiplyScalar(distance).add(center);}
let cameraTarget=null;function fit(){camera.position.copy(fitPosition(camera.position.clone().sub(controls.target)));cameraTarget=null;controls.update();}
function view(name){state.view=name;camera.position.copy(fitPosition(directions[name]));cameraTarget=null;controls.update();document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.view===name));}
// A base recalcula a camera no resize; enquadrar depois dela evita cortar o modelo.
new ResizeObserver(()=>requestAnimationFrame(()=>fit())).observe($('cena'));
function applyExplosion(value){state.expanded=value;for(const [name,group] of Object.entries(groups))group.position.z=explosion[name]*value;}
function expand(value){if(state.isolated)isolate(false);state.targetExpanded=Math.max(0,Math.min(1,value));$('separation').value=Math.round(state.targetExpanded*100);$('separationValue').textContent=Math.round(state.targetExpanded*100)+'%';$('explode').setAttribute('aria-pressed',state.targetExpanded>0);$('explode').children[1].textContent=state.targetExpanded>0?'Montar processador':'Explorar por dentro';$('assemblyLabel').textContent=state.targetExpanded>0?'VISTA DESMONTADA':'PROCESSADOR MONTADO';if(reducedMotion.matches)applyExplosion(state.targetExpanded);fit();}
function isolate(value){state.isolated=value;syncVisibility();$('isolate').setAttribute('aria-pressed',value);$('isolate').textContent=value?'Mostrar conjunto ↗':'Isolar componente ↗';$('assemblyLabel').textContent=value?'COMPONENTE ISOLADO':state.targetExpanded>0?'VISTA DESMONTADA':'PROCESSADOR MONTADO';fit();}
function selectPart(name){state.part=name;const d=details[name];document.querySelectorAll('[data-part]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.part===name));document.querySelector('.panel-number').textContent=d[0]+' / 08';$('partKicker').textContent=d[1];$('partTitle').textContent=d[2];$('partText').textContent=d[3];if(name==='contacts'){isolate(true);view('back');}else if(name==='cores'||name==='die'){expand(1);view('front');}else if(name==='cooler'||name==='coolerFan'){isolate(true);view('perspective');}else if(state.isolated)isolate(true);}
$('explode').addEventListener('click',()=>expand(state.targetExpanded>0?0:1));$('separation').addEventListener('input',e=>expand(Number(e.target.value)/100));
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{state.rotating=false;controls.autoRotate=false;view(b.dataset.view);}));document.querySelectorAll('[data-part]').forEach(b=>b.addEventListener('click',()=>selectPart(b.dataset.part)));
$('reset').addEventListener('click',()=>{state.rotating=false;controls.autoRotate=false;if(state.isolated)isolate(false);view('perspective');});$('isolate').addEventListener('click',()=>isolate(!state.isolated));
document.querySelectorAll('[data-visible]').forEach(input=>input.addEventListener('change',()=>{if(state.isolated)for(const [name,group] of Object.entries(groups)){if(group.visible)hidden.delete(name);else hidden.add(name);}if(input.checked)hidden.delete(input.dataset.visible);else hidden.add(input.dataset.visible);isolate(false);}));
$('showAll').addEventListener('click',()=>{hidden.clear();isolate(false);view('perspective');});$('rotate').addEventListener('click',()=>{state.rotating=!state.rotating;controls.autoRotate=state.rotating;$('rotate').setAttribute('aria-pressed',state.rotating);cameraTarget=null;});
$('fans').addEventListener('click',()=>{state.fans=!state.fans;$('fans').setAttribute('aria-pressed',state.fans);});
$('fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.querySelector('.viewer').requestFullscreen();}catch{}});$('snapshot').addEventListener('click',()=>{renderer.render(scene,camera);const a=document.createElement('a');a.download='processador-3d.png';a.href=canvas.toDataURL('image/png');a.click();});
let down=null;canvas.addEventListener('pointerdown',e=>{cameraTarget=null;state.rotating=false;controls.autoRotate=false;$('rotate').setAttribute('aria-pressed','false');down={x:e.clientX,y:e.clientY};});canvas.addEventListener('pointerup',e=>{if(!down||Math.hypot(e.clientX-down.x,e.clientY-down.y)>7)return;down=null;});
canvas.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-','Home'].includes(e.key))return;e.preventDefault();if(e.key==='Home'){view('perspective');return;}const offset=camera.position.clone().sub(controls.target),spherical=new THREE.Spherical().setFromVector3(offset);if(e.key==='ArrowLeft')spherical.theta-=.10;if(e.key==='ArrowRight')spherical.theta+=.10;if(e.key==='ArrowUp')spherical.phi-=.08;if(e.key==='ArrowDown')spherical.phi+=.08;if(e.key==='+'||e.key==='=')spherical.radius*=.90;if(e.key==='-')spherical.radius*=1.1;spherical.phi=THREE.MathUtils.clamp(spherical.phi,.04,Math.PI-.04);spherical.radius=THREE.MathUtils.clamp(spherical.radius,controls.minDistance,controls.maxDistance);camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical));controls.update();});
const clock=new THREE.Clock();function animate(){requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.04);if(Math.abs(state.expanded-state.targetExpanded)>.001)applyExplosion(THREE.MathUtils.damp(state.expanded,state.targetExpanded,6,dt));else if(state.expanded!==state.targetExpanded)applyExplosion(state.targetExpanded);if(state.fans&&!reducedMotion.matches)fanRotor.rotation.z-=dt*4.8;if(cameraTarget){camera.position.lerp(cameraTarget,1-Math.exp(-7*dt));if(camera.position.distanceTo(cameraTarget)<.01){camera.position.copy(cameraTarget);cameraTarget=null;}}controls.autoRotate=state.rotating;controls.update();renderer.render(scene,camera);}syncVisibility();applyExplosion(0);view('perspective',true);$('loading').hidden=true;clearTimeout(window.cpuLoadTimer);animate();
window.__processador={estado:()=>({...state,hidden:[...hidden],visible:Object.keys(groups).filter(n=>groups[n].visible),moving:!!cameraTarget,fanAngle:fanRotor.rotation.z,meshes:renderer.info.render.calls}),pixels:()=>{const bb=bounds(state.expanded),r=canvas.getBoundingClientRect(),corners=[];camera.updateMatrixWorld();for(const x of [bb.min.x,bb.max.x])for(const y of [bb.min.y,bb.max.y])for(const z of [bb.min.z,bb.max.z])corners.push(palco.pixelDe(new THREE.Vector3(x,y,z)));return {corners,rect:{left:r.left,top:r.top,right:r.right,bottom:r.bottom},camera:camera.position.toArray(),target:controls.target.toArray(),fov:camera.fov,aspect:camera.aspect};}};
