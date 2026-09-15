// Intel 8080: encapsulamento ceramico da foto; interior didatico.
import { THREE, montaPalco } from './_base-modelo-3d.js';

const $=id=>document.getElementById(id);
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const state={expanded:0,targetExpanded:0,rotating:false,part:'lid',isolated:false,view:'perspective',navigation:'orbit'};
const palco=montaPalco({alvo:[0,0,.15],camPos:[7,-7,6.8],meiaLarguraDesktop:3.8,meiaLarguraMobile:4.1,distMin:8,orbitaMin:2.5,maxPolar:Math.PI});
const {scene,camera,renderer,controls,bloco}=palco;
scene.background=new THREE.Color(0x171d18);scene.fog=null;
scene.children.filter(child=>child.isLight||child.material?.isShadowMaterial).forEach(child=>scene.remove(child));
renderer.toneMappingExposure=.88;renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));
const canvas=renderer.domElement;canvas.tabIndex=0;canvas.setAttribute('role','img');
canvas.setAttribute('aria-label','Intel 8080 em tres dimensoes. Arraste para girar, ative Mover camera para reposicionar, e role para aproximar.');
controls.enableDamping=!reducedMotion.matches;controls.dampingFactor=.065;controls.zoomSpeed=.34;controls.rotateSpeed=.58;controls.panSpeed=.72;controls.enablePan=true;controls.screenSpacePanning=true;controls.minPolarAngle=.03;controls.maxPolarAngle=Math.PI-.03;
controls.mouseButtons.RIGHT=THREE.MOUSE.PAN;controls.touches.TWO=THREE.TOUCH.DOLLY_PAN;
function navigation(mode){
  state.navigation=mode;
  const moving=mode==='pan';
  controls.mouseButtons.LEFT=moving?THREE.MOUSE.PAN:THREE.MOUSE.ROTATE;
  controls.touches.ONE=moving?THREE.TOUCH.PAN:THREE.TOUCH.ROTATE;
  canvas.classList.toggle('camera-pan',moving);canvas.classList.toggle('camera-orbit',!moving);
  $('pan').setAttribute('aria-pressed',moving);$('pan').setAttribute('aria-label',moving?'Desativar modo de mover a camera':'Ativar modo de mover a camera');
  $('gestureHint').innerHTML=moving?'✥ Arraste para mover <span>·</span> Role para aproximar':'↔ Arraste para girar <span>·</span> Botão direito move';
}

scene.add(new THREE.HemisphereLight(0xf3f4ea,0x304137,1.15));
function light(color,intensity,position){const item=new THREE.DirectionalLight(color,intensity);item.position.set(...position);scene.add(item);return item;}
const key=light(0xfff7df,2.3,[-4,-2,9]);key.castShadow=true;key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-7,right:7,top:7,bottom:-7});
light(0xb9d9ff,2.7,[7,4,3]);light(0xcaff9a,1.4,[-6,5,2]);
light(0xd7e4ef,2.1,[-3,4,-7]);
const ground=new THREE.Mesh(new THREE.PlaneGeometry(80,80),new THREE.ShadowMaterial({opacity:.23}));ground.rotation.x=-Math.PI/2;ground.position.y=-3.4;ground.receiveShadow=true;scene.add(ground);

const metal=(color,roughness=.32,metalness=.82)=>new THREE.MeshStandardMaterial({color,roughness,metalness,envMapIntensity:1.25});
const mats={steel:metal(0xa6ada8,.25,.92),edge:metal(0xd4d8d2,.2,.96),dark:metal(0x181d1b,.46,.42),substrate:metal(0x17352b,.63,.10),silicon:metal(0x416b80,.18,.9),gold:metal(0xb99338,.52,.80),copper:metal(0xaa6d39,.3,.76),solder:metal(0xb7b2a8,.42,.72),black:metal(0x080b0a,.62,.16)};
const model=new THREE.Group();scene.add(model);const groups={};
for(const name of ['lid','ceramic','die','bonds','pins']){const group=new THREE.Group();group.name=name;group.userData.part=name;groups[name]=group;model.add(group);}
const explosion={lid:2.65,ceramic:0,die:.45,bonds:.45,pins:-.7};
function box(parent,w,h,d,material,x=0,y=0,z=0,radius=.03){const mesh=bloco(w,h,d,material,radius);mesh.position.set(x,y,z);parent.add(mesh);return mesh;}
function inscription(parent,text,w,h,position,rotation=[0,0,0],color='#d7ddd7',size=70){
  const c=document.createElement('canvas');c.width=1024;c.height=256;const x=c.getContext('2d');x.fillStyle=color;x.font=`600 ${size}px Arial`;x.textAlign='center';x.textBaseline='middle';x.fillText(text,512,132);
  const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),8);
  const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2}));mesh.position.set(...position);mesh.rotation.set(...rotation);parent.add(mesh);return mesh;
}


// Corpo ceramico com cavidade verdadeira sob a tampa.
const ceramic=new THREE.MeshStandardMaterial({color:0xf4eee2,roughness:.58,metalness:.02});
box(groups.ceramic,10.4,3.10,.25,ceramic,0,0,-.17,.045);
const body=new THREE.Shape();body.moveTo(-5.2,-1.55);body.lineTo(5.2,-1.55);body.lineTo(5.2,1.55);body.lineTo(-5.2,1.55);body.closePath();
const cavity=new THREE.Path();cavity.moveTo(-1.18,-1.10);cavity.lineTo(-1.18,1.10);cavity.lineTo(1.18,1.10);cavity.lineTo(1.18,-1.10);cavity.closePath();body.holes.push(cavity);
const shell=new THREE.Mesh(new THREE.ExtrudeGeometry(body,{depth:.36,bevelEnabled:true,bevelSize:.02,bevelThickness:.015,bevelSegments:2,steps:1}),ceramic);
shell.position.z=-.04;groups.ceramic.add(shell);
box(groups.ceramic,10.30,3.04,.025,mats.solder,0,0,-.055,.015);
inscription(groups.ceramic,'+',.48,.48,[-4.82,-1.06,.34],[0,0,0],'#605c52',180);
inscription(groups.ceramic,'1',.22,.22,[-4.75,-1.31,.341],[0,0,0],'#5c584e',145);
inscription(groups.ceramic,'CERAMIC  /  40 LEADS',3.1,.30,[0,0,-.301],[0,Math.PI,0],'#807a6b',100);
box(groups.ceramic,.09,.37,.018,mats.dark,-5.19,0,.34,.008);
// Tampa dourada, filete de selagem e inscricoes da referencia.
box(groups.lid,2.72,2.65,.05,mats.solder,0,0,.355,.035);
const lidMetal=mats.gold.clone();
const grainCanvas=document.createElement('canvas');grainCanvas.width=grainCanvas.height=512;
const grain=grainCanvas.getContext('2d');let grainSeed=8080;
for(let y=0;y<512;y++)for(let x=0;x<512;x++){
  grainSeed=(Math.imul(grainSeed,1664525)+1013904223)>>>0;
  const shade=100+(grainSeed>>>26);
  grain.fillStyle='rgb('+shade+','+shade+','+shade+')';grain.fillRect(x,y,1,1);
}
lidMetal.bumpMap=new THREE.CanvasTexture(grainCanvas);lidMetal.bumpScale=.006;lidMetal.roughness=.57;
box(groups.lid,2.59,2.51,.10,lidMetal,0,0,.43,.045);
inscription(groups.lid,'C8080A',2.2,.49,[.09,.12,.488],[0,0,0],'#3b2c16',185);
inscription(groups.lid,'1373A',2.05,.44,[.08,-.39,.489],[0,0,0],'#483720',175);
inscription(groups.lid,'intel',.73,.24,[-.66,.77,.489],[0,0,0],'#463520',180);
inscription(groups.lid,'8080',1.45,.30,[0,0,.325],[0,Math.PI,0],'#80632d',135);
// Duas fileiras de 20 terminais, com ombros largos e pernas estreitas.
for(const side of [-1,1])for(let i=0;i<20;i++){
  const x=-4.75+i*.50,y=side*1.80;
  box(groups.pins,.25,.38,.065,mats.gold,x,side*1.64,-.025,.015);
  // Profil embouti continu: epaule, retrecissement et extremite chanfreinee.
  const pinShape=new THREE.Shape();
  const pinOutline=[[-.12,0],[.12,0],[.12,-.27],[.065,-.36],[.065,-1.03],[.045,-1.09],[-.045,-1.09],[-.065,-1.03],[-.065,-.36],[-.12,-.27]];
  pinOutline.forEach(([a,b],j)=>j?pinShape.lineTo(a,b):pinShape.moveTo(a,b));pinShape.closePath();
  const pin=new THREE.Mesh(new THREE.ExtrudeGeometry(pinShape,{depth:.06,bevelEnabled:true,bevelSize:.006,bevelThickness:.006,bevelSegments:2,steps:1}),mats.gold);
  pin.rotation.x=Math.PI/2;pin.position.set(x,y+.03,0);groups.pins.add(pin);
  const number=side<0?i+1:40-i;
  inscription(groups.ceramic,String(number),.27,.18,[x,side*1.31,-.301],[0,Math.PI,0],'#8b8170',135);
}
// Pastilha central com textura de circuitos; disposicao ilustrativa.
box(groups.die,1.11,1.05,.055,mats.silicon,0,0,.026,.012);
const c=document.createElement('canvas');c.width=c.height=1024;const ctx=c.getContext('2d');
ctx.fillStyle='#665041';ctx.fillRect(0,0,1024,1024);
for(let row=0;row<7;row++)for(let col=0;col<5;col++){
  const x=30+col*192,y=28+row*138,w=166,h=113;
  ctx.fillStyle=['#785c4a','#939077','#616e6c'][(row+col)%3];ctx.fillRect(x,y,w,h);
  ctx.strokeStyle='#ccb77b';ctx.lineWidth=2;
  for(let t=0;t<16;t++){ctx.beginPath();ctx.moveTo(x+t*10,y+5);ctx.lineTo(x+t*10,y+h-5);ctx.stroke();}
  ctx.strokeStyle='#decd9f';ctx.strokeRect(x,y,w,h);
  // Sous-blocs et croisements de pistes, visibles au zoom.
  for(let line=0;line<9;line++){
    const yy=y+9+line*11;
    ctx.strokeStyle=line%3?'#524439':'#e4cc91';ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(x+5,yy);ctx.lineTo(x+w-5,yy);ctx.stroke();
    for(let cell=0;cell<7;cell++){ctx.fillStyle=(cell+line)%3?'#beab7b':'#687e7d';ctx.fillRect(x+9+cell*22,yy,6,5);}
  }
}
const dieTexture=new THREE.CanvasTexture(c);dieTexture.colorSpace=THREE.SRGBColorSpace;
const dieFace=new THREE.Mesh(new THREE.PlaneGeometry(1.05,.99),new THREE.MeshStandardMaterial({map:dieTexture,roughness:.42,metalness:.55}));dieFace.position.z=.057;groups.die.add(dieFace);
// Ligacoes arqueadas entre pads da pastilha e terminais internos.
// Cada fio permanece abaixo da tampa quando o conjunto esta fechado.
for(const side of [-1,1])for(let i=0;i<20;i++){
  const px=-.49+i*.98/19,tx=-1.08+i*2.16/19;
  box(groups.bonds,.028,.045,.009,mats.gold,px,side*.47,.064,.002);
  box(groups.bonds,.065,.12,.02,mats.gold,tx,side*1.04,.06,.004);
  const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(px,side*.47,.068),new THREE.Vector3(px,side*.66,.215),new THREE.Vector3(tx,side*.87,.18),new THREE.Vector3(tx,side*1.04,.076)]);
  groups.bonds.add(new THREE.Mesh(new THREE.TubeGeometry(curve,18,.008,6,false),mats.gold));
  const lead=new THREE.CatmullRomCurve3([new THREE.Vector3(tx,side*1.04,.02),new THREE.Vector3(tx,side*1.15,-.015),new THREE.Vector3(-4.75+i*.5,side*1.55,-.025)]);
  groups.pins.add(new THREE.Mesh(new THREE.TubeGeometry(lead,10,.018,6,false),mats.gold));
}
// Filet de fermeture et palier metallise autour de la cavite.
for(const side of [-1,1]){
  box(groups.ceramic,2.58,.045,.025,mats.gold,0,side*1.19,.313,.008);
  box(groups.ceramic,.045,2.37,.025,mats.gold,side*1.27,0,.313,.008);
  box(groups.lid,2.42,.024,.009,mats.copper,0,side*1.18,.324,.004);
  box(groups.lid,.024,2.36,.009,mats.copper,side*1.21,0,.324,.004);
}
// Socle de fixation du die et joint de brasure.
box(groups.ceramic,1.30,1.23,.018,mats.gold,0,0,-.027,.02);
for(const side of [-1,1])for(let i=0;i<20;i++){
  const px=-.49+i*.98/19,tx=-1.08+i*2.16/19;
  for(const [x,y,z] of [[px,side*.47,.07],[tx,side*1.04,.077]]){
    const weld=new THREE.Mesh(new THREE.SphereGeometry(.014,10,6),mats.gold);
    weld.scale.set(1,1.45,.42);weld.position.set(x,y,z);groups.bonds.add(weld);
  }
  // Menisque de brasage a la sortie de chaque patte.
  box(groups.pins,.28,.07,.09,mats.solder,-4.75+i*.5,side*1.51,-.024,.014);
}
// Dessous ceramique: contour, marques d'orientation et points de fabrication.
const undersideCeramic=ceramic.clone();undersideCeramic.color.setHex(0xd9d0bf);
for(const side of [-1,1]){
  box(groups.ceramic,9.96,.032,.015,undersideCeramic,0,side*1.40,-.299,.005);
  box(groups.ceramic,.032,2.80,.015,undersideCeramic,side*4.98,0,-.299,.005);
}
for(const x of [-3.70,3.70]){
  const mark=new THREE.Mesh(new THREE.TorusGeometry(.18,.012,6,32),undersideCeramic);mark.position.set(x,0,-.30);groups.ceramic.add(mark);
}
inscription(groups.ceramic,'C8080A',1.8,.24,[0,.45,-.311],[0,Math.PI,0],'#8c816b',155);
inscription(groups.ceramic,'1',.32,.28,[-4.85,-1.02,-.311],[0,Math.PI,0],'#70664f',160);
const details={
 lid:['01','CERAMICA E OURO','A tampa do C8080A.','A tampa dourada sela a cavidade que protege a pastilha. A gravacao e o acabamento seguem a fotografia fornecida.'],
 ceramic:['02','ENCAPSULAMENTO','O corpo ceramico.','O corpo alongado sustenta duas fileiras de terminais. A marcacao em uma extremidade ajuda a orientar o componente.'],
 die:['03','SILICIO','O processador dentro da capsula.','A pequena pastilha fica no centro. A textura de circuitos e uma representacao didatica, nao o desenho exato do 8080.'],
 bonds:['04','INTERCONEXOES','Fios muito finos.','Os fios arqueados ligam a pastilha aos terminais internos. Estao ampliados para facilitar a observacao.'],
 pins:['05','DIP DE 40 PINOS','Vinte de cada lado.','Ombros, dobras e pernas dos terminais sao modelados em volume. Os numeros seguem a orientacao do encapsulamento.']
};
const names={lid:'Tampa dourada',ceramic:'Corpo ceramico',die:'Pastilha de silicio',bonds:'Fios internos',pins:'40 pinos'};
const hidden=new Set();
$('visibilityList').innerHTML=Object.entries(names).map(([key,label])=>`<label><input type="checkbox" data-visible="${key}" checked><span>${label}</span></label>`).join('');
function syncVisibility(){for(const [name,group] of Object.entries(groups))group.visible=state.isolated?name===state.part:!hidden.has(name);const count=Object.values(groups).filter(g=>g.visible).length;document.querySelectorAll('[data-visible]').forEach(input=>{input.checked=groups[input.dataset.visible].visible;input.disabled=count===1&&input.checked;});$('visibilityCount').textContent=count+' / 5';}
const baseBounds={};model.updateMatrixWorld(true);for(const [name,group] of Object.entries(groups))baseBounds[name]=new THREE.Box3().setFromObject(group);
function bounds(factor=state.targetExpanded){const result=new THREE.Box3();for(const [name,bb] of Object.entries(baseBounds))if(groups[name].visible)result.union(bb.clone().translate(new THREE.Vector3(0,0,explosion[name]*factor)));return result;}
const directions={perspective:new THREE.Vector3(2,-9,12),front:new THREE.Vector3(0,0,1),back:new THREE.Vector3(0,0,-1),side:new THREE.Vector3(1,-.10,.08)};
function fitPosition(direction){const dir=direction.clone().normalize(),right=new THREE.Vector3().crossVectors(camera.up,dir).normalize(),up=new THREE.Vector3().crossVectors(dir,right).normalize(),bb=bounds(),center=bb.getCenter(new THREE.Vector3()),tan=Math.tan(THREE.MathUtils.degToRad(camera.fov/2)),margin=state.isolated?1.48:1.28;let distance=state.isolated?1.2:4;for(const x of [bb.min.x,bb.max.x])for(const y of [bb.min.y,bb.max.y])for(const z of [bb.min.z,bb.max.z]){const p=new THREE.Vector3(x,y,z).sub(center),depth=p.dot(dir);distance=Math.max(distance,depth+Math.abs(p.dot(right))*margin/(tan*camera.aspect),depth+Math.abs(p.dot(up))*margin/tan);}controls.minDistance=state.isolated?.5:2.5;controls.target.copy(center);controls.maxDistance=Math.max(24,distance*3);return dir.multiplyScalar(distance).add(center);}
let cameraTarget=null;function fit(){camera.position.copy(fitPosition(camera.position.clone().sub(controls.target)));cameraTarget=null;controls.update();}
function view(name){state.view=name;camera.position.copy(fitPosition(directions[name]));cameraTarget=null;controls.update();document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.view===name));}
// A base recalcula a camera no resize; enquadrar depois dela evita cortar o modelo.
new ResizeObserver(()=>requestAnimationFrame(()=>fit())).observe($('cena'));
function applyExplosion(value){state.expanded=value;for(const [name,group] of Object.entries(groups))group.position.z=explosion[name]*value;}
function expand(value){if(state.isolated)isolate(false);state.targetExpanded=Math.max(0,Math.min(1,value));$('separation').value=Math.round(state.targetExpanded*100);$('separationValue').textContent=Math.round(state.targetExpanded*100)+'%';$('explode').setAttribute('aria-pressed',state.targetExpanded>0);$('explode').children[1].textContent=state.targetExpanded>0?'Montar processador':'Explorar por dentro';$('assemblyLabel').textContent=state.targetExpanded>0?'VISTA DESMONTADA':'PROCESSADOR MONTADO';if(reducedMotion.matches)applyExplosion(state.targetExpanded);fit();}
function isolate(value){state.isolated=value;syncVisibility();$('isolate').setAttribute('aria-pressed',value);$('isolate').textContent=value?'Mostrar conjunto ↗':'Isolar componente ↗';$('assemblyLabel').textContent=value?'COMPONENTE ISOLADO':state.targetExpanded>0?'VISTA DESMONTADA':'PROCESSADOR MONTADO';fit();}
function selectPart(name){
  state.part=name;const d=details[name];
  document.querySelectorAll('[data-part]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.part===name));
  document.querySelector('.panel-number').textContent=d[0]+' / 05';
  $('partKicker').textContent=d[1];$('partTitle').textContent=d[2];$('partText').textContent=d[3];
  if(state.isolated)isolate(true);
  else if(name==='die'||name==='bonds')expand(1);
  view(name==='pins'?'back':'perspective');
}
$('explode').addEventListener('click',()=>expand(state.targetExpanded>0?0:1));$('separation').addEventListener('input',e=>expand(Number(e.target.value)/100));
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{state.rotating=false;controls.autoRotate=false;view(b.dataset.view);}));document.querySelectorAll('[data-part]').forEach(b=>b.addEventListener('click',()=>selectPart(b.dataset.part)));
$('reset').addEventListener('click',()=>{state.rotating=false;controls.autoRotate=false;navigation('orbit');if(state.isolated)isolate(false);view('perspective');});$('isolate').addEventListener('click',()=>isolate(!state.isolated));
document.querySelectorAll('[data-visible]').forEach(input=>input.addEventListener('change',()=>{if(state.isolated)for(const [name,group] of Object.entries(groups)){if(group.visible)hidden.delete(name);else hidden.add(name);}if(input.checked)hidden.delete(input.dataset.visible);else hidden.add(input.dataset.visible);isolate(false);}));
$('showAll').addEventListener('click',()=>{hidden.clear();isolate(false);view('perspective');});$('rotate').addEventListener('click',()=>{state.rotating=!state.rotating;controls.autoRotate=state.rotating;$('rotate').setAttribute('aria-pressed',state.rotating);cameraTarget=null;});$('pan').addEventListener('click',()=>{state.rotating=false;controls.autoRotate=false;$('rotate').setAttribute('aria-pressed','false');cameraTarget=null;navigation(state.navigation==='pan'?'orbit':'pan');});

$('fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.querySelector('.viewer').requestFullscreen();}catch{}});$('snapshot').addEventListener('click',()=>{renderer.render(scene,camera);const a=document.createElement('a');a.download='intel-8080.png';a.href=canvas.toDataURL('image/png');a.click();});canvas.addEventListener('contextmenu',e=>e.preventDefault());
let down=null;canvas.addEventListener('pointerdown',e=>{cameraTarget=null;state.rotating=false;controls.autoRotate=false;$('rotate').setAttribute('aria-pressed','false');down={x:e.clientX,y:e.clientY};});canvas.addEventListener('pointerup',e=>{if(!down||Math.hypot(e.clientX-down.x,e.clientY-down.y)>7)return;down=null;});
canvas.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-','Home'].includes(e.key))return;e.preventDefault();if(e.key==='Home'){navigation('orbit');view('perspective');return;}if(state.navigation==='pan'&&e.key.startsWith('Arrow')){const distance=camera.position.distanceTo(controls.target)*.035,right=new THREE.Vector3().setFromMatrixColumn(camera.matrix,0),up=new THREE.Vector3().setFromMatrixColumn(camera.matrix,1),delta=new THREE.Vector3();if(e.key==='ArrowLeft')delta.addScaledVector(right,distance);if(e.key==='ArrowRight')delta.addScaledVector(right,-distance);if(e.key==='ArrowUp')delta.addScaledVector(up,-distance);if(e.key==='ArrowDown')delta.addScaledVector(up,distance);camera.position.add(delta);controls.target.add(delta);controls.update();return;}const offset=camera.position.clone().sub(controls.target),spherical=new THREE.Spherical().setFromVector3(offset);if(e.key==='ArrowLeft')spherical.theta-=.10;if(e.key==='ArrowRight')spherical.theta+=.10;if(e.key==='ArrowUp')spherical.phi-=.08;if(e.key==='ArrowDown')spherical.phi+=.08;if(e.key==='+'||e.key==='=')spherical.radius*=.90;if(e.key==='-')spherical.radius*=1.1;spherical.phi=THREE.MathUtils.clamp(spherical.phi,.04,Math.PI-.04);spherical.radius=THREE.MathUtils.clamp(spherical.radius,controls.minDistance,controls.maxDistance);camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical));controls.update();});
const clock=new THREE.Clock();function animate(){requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.04);if(Math.abs(state.expanded-state.targetExpanded)>.001)applyExplosion(THREE.MathUtils.damp(state.expanded,state.targetExpanded,6,dt));else if(state.expanded!==state.targetExpanded)applyExplosion(state.targetExpanded);if(cameraTarget){camera.position.lerp(cameraTarget,1-Math.exp(-7*dt));if(camera.position.distanceTo(cameraTarget)<.01){camera.position.copy(cameraTarget);cameraTarget=null;}}controls.autoRotate=state.rotating;controls.update();renderer.render(scene,camera);}syncVisibility();applyExplosion(0);navigation('orbit');view('perspective',true);$('loading').hidden=true;clearTimeout(window.intelLoadTimer);animate();
window.__intel8080={estado:()=>({...state,hidden:[...hidden],visible:Object.keys(groups).filter(n=>groups[n].visible),moving:!!cameraTarget,meshes:renderer.info.render.calls}),pixels:()=>{const bb=bounds(state.expanded),r=canvas.getBoundingClientRect(),corners=[];camera.updateMatrixWorld();for(const x of [bb.min.x,bb.max.x])for(const y of [bb.min.y,bb.max.y])for(const z of [bb.min.z,bb.max.z])corners.push(palco.pixelDe(new THREE.Vector3(x,y,z)));return {corners,rect:{left:r.left,top:r.top,right:r.right,bottom:r.bottom},camera:camera.position.toArray(),target:controls.target.toArray(),fov:camera.fov,aspect:camera.aspect};}};
