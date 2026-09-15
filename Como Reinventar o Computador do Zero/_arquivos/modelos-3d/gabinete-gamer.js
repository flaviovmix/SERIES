import { THREE, montaVisualizador } from './_visualizador-pecas.js';

// Estudo ilustrativo: vidro em -X, frente em +Z, placa-mãe na bandeja +X.
const v = montaVisualizador({
 global:'__gabineteGamer', arquivoDaImagem:'gabinete-gamer.png',
 pecas:{
  estrutura:{nome:'Chassi e painéis',explosao:0},
  vidro:{nome:'Vidro lateral',explosao:[-3.5,0,0],parte:'estrutura'},
  placa:{nome:'Placa-mãe',explosao:0},gpu:{nome:'Placa de vídeo',explosao:[-1.3,.5,0]},
  cpu:{nome:'Bomba e mangueiras',explosao:0},ram:{nome:'Memória RGB',explosao:[-.8,0,0]},
  fonte:{nome:'Fonte e cabos',explosao:[0,0,-2.6]},radiador:{nome:'Radiador superior',explosao:[0,2.3,0]},
  fans:{nome:'Ventoinhas frontais',explosao:[0,0,1.6]},
 },
 detalhes:{
  estrutura:['01','CHASSI E VIDRO','Uma janela para o computador.','Perfis metálicos, pés, grelhas e parafusos formam a estrutura. Ao abrir, o vidro sai pela lateral e permite examinar as peças.'],
  placa:['02','CONEXÕES','Placa-mãe e alimentação.','Socket, VRM, slots, bateria e conectores ocupam a face voltada para o vidro. Espaçadores prendem a placa na bandeja.'],
  gpu:['03','GRÁFICOS','GPU com três ventoinhas.','A placa fica na horizontal, com ventoinhas na face inferior, aletas de alumínio, backplate e suporte na ponta.'],
  cpu:['04','REFRIGERAÇÃO LÍQUIDA','Bomba e circuito fechado.','O bloco sobre o processador conduz calor para o líquido. Duas mangueiras ligam o bloco ao radiador no teto.'],
  ram:['05','MEMÓRIA','Módulos com difusores RGB.','Dois módulos ficam nos slots ao lado do processador. Dissipadores e travas acompanham cada peça.'],
  fonte:['06','ENERGIA E CABOS','Fonte sob a cobertura inferior.','A fonte fica na parte baixa. Feixes seguem pelas passagens da bandeja até a placa-mãe e a GPU. Presilhas organizam o percurso.'],
  radiador:['07','TROCA DE CALOR','Radiador no teto.','Aletas finas e dois ventiladores expulsam o calor do circuito líquido. O conjunto sobe ao explorar o interior.'],
  fans:['08','ENTRADA DE AR','Três ventoinhas frontais.','Pás curvas giram dentro de molduras com anéis RGB. Você pode apagar a iluminação e parar a rotação separadamente.'],
 },
 direcoes:{perspective:[-13,6.5,9],top:[-.1,1,.1],bottom:[-.1,-1,.1],back:[-7,3,-10]},
 textos:{montado:'GABINETE MONTADO',desmontado:'GABINETE ABERTO',montar:'Fechar gabinete'},
 palco:{alvo:[0,4,0],camPos:[-13,10.5,9],meiaLarguraDesktop:6.5,meiaLarguraMobile:6.5,distMin:12,orbitaMin:3,maxPolar:Math.PI},
 luz:{fundo:0x10151f,chao:-.22,alcance:14,exposicao:1.05,hemisferio:[0xcad8ec,0x263142,1.2],principal:{cor:0xeaf2ff,forca:3.5,posicao:[-7,12,7]},apoio:[{cor:0x9ebdff,forca:2.5,posicao:[6,7,-5]},{cor:0xc9b4ff,forca:1.2,posicao:[-8,3,-3]}]},
 alternadores:[{id:'rgb',chave:'rgb',inicial:true,movimento:false},{id:'ventoinhas',chave:'ventoinhas',inicial:true,movimento:true}],
 aoSelecionar(k,a){a.isolar(true);a.vista(k==='gpu'?'bottom':'perspective');},
});
const {grupos:g,caixa:box,metal}=v;
v.controls.zoomSpeed=.18;
v.canvas.setAttribute('aria-label','Gabinete gamer detalhado em 3D. Arraste para girar. Abra o vidro, isole componentes e controle RGB e ventoinhas.');
const m={frame:metal(0x242c38,.38,.65),trim:metal(0x465164,.3,.75),silver:metal(0xa5b5c7,.26,.85),pcb:metal(0x173c40,.63,.15),black:metal(0x10141c,.65,.08),blade:metal(0x77889b,.4,.22),chip:metal(0x21242c,.68,.1),gold:metal(0xd4b276,.32,.8),wire:metal(0x1d2330,.8,.02),whiteWire:metal(0x92a6be,.7,.03),ceramic:metal(0xbaa58a,.6,.12)};
const colors=[0x53dcff,0xa787ff,0xf078d9];
const lights=colors.map(color=>new THREE.MeshStandardMaterial({color,emissive:color,emissiveIntensity:1.6,roughness:.3,metalness:.15}));
const rotors=[],side=[0,-Math.PI/2,0];
function label(p,s,w,h,xyz,r=side,c='#b2c5dc'){return v.inscricao(p,s,w,h,xyz,r,c,150);}
function cyl(p,r,h,mat,xyz,axis='y',segments=24){const o=v.cilindro(r,h,mat,...xyz,axis,{lados:segments});p.add(o);return o;}
function screw(p,xyz,axis='x'){
 cyl(p,.055,.035,m.silver,xyz,axis,12);const o=box(p,.011,.018,.073,m.black,...xyz,.003);
 if(axis==='x')o.position.x-=.021;
 if(axis==='z'){o.rotation.y=Math.PI/2;o.position.z+=.022;}
 if(axis==='y'){o.rotation.z=Math.PI/2;o.position.y+=.022;}
}
function tube(p,points,r,mat){const path=new THREE.CatmullRomCurve3(points.map(a=>new THREE.Vector3(...a)));const o=new THREE.Mesh(new THREE.TubeGeometry(path,40,r,8,false),mat);o.castShadow=true;p.add(o);return path;}
function ring(p,r,t,mat,xyz=[0,0,0]){const o=new THREE.Mesh(new THREE.TorusGeometry(r,t,8,64),mat);o.position.set(...xyz);p.add(o);return o;}
// Ventoinha construída no plano XY; o grupo orienta o eixo no gabinete.
function fan(parent,position,rotation=[0,0,0],r=.86,lit=true,hue=0){
 const group=new THREE.Group();group.position.set(...position);group.rotation.set(...rotation);parent.add(group);
 const frame=v.retangulo(r*2.3,r*2.3,.12);frame.holes.push(v.furoRedondo(0,0,r));v.extrusao(group,frame,.15,-.08,m.frame,.015);
 const rotor=new THREE.Group();group.add(rotor);rotors.push(rotor);
 const blade=new THREE.Shape();blade.moveTo(.17,-.04);blade.bezierCurveTo(.39,-.23,.68,-.29,.80,-.17);blade.quadraticCurveTo(.82,-.09,.76,-.015);blade.quadraticCurveTo(.44,-.11,.17,.04);blade.closePath();
 const geometry=new THREE.ExtrudeGeometry(blade,{depth:.026,bevelEnabled:false,curveSegments:8});
 for(let i=0;i<7;i++){const o=new THREE.Mesh(geometry,m.blade);o.scale.setScalar(r/.86);o.rotation.z=i*Math.PI*2/7;rotor.add(o);}
 cyl(rotor,r*.23,.10,m.trim,[0,0,.015],'z');cyl(rotor,r*.13,.013,m.silver,[0,0,.071],'z');
 if(lit){ring(group,r*.95,.041,lights[hue],[0,0,.08]);ring(group,r*.95,.028,lights[hue],[0,0,-.10]);}
 for(const x of[-1,1])for(const y of[-1,1])screw(group,[x*r,y*r,.10],'z');
 return group;
}
// Perfis de metal deixam a janela lateral realmente aberta.
for(const x of[-1.95,1.95])for(const z of[-3.35,3.35])box(g.estrutura,.16,7.75,.16,m.frame,x,4.08,z,.035);
for(const y of[.26,7.95]){for(const x of[-1.95,1.95])box(g.estrutura,.18,.18,6.8,m.frame,x,y,0,.04);for(const z of[-3.35,3.35])box(g.estrutura,4.05,.18,.18,m.frame,0,y,z,.04);}
box(g.estrutura,4.02,.12,6.75,m.frame,0,.27,0,.04);
box(g.estrutura,.09,7.55,6.55,m.frame,2.01,4.06,0,.05);
box(g.estrutura,.08,5.62,5.5,m.frame,1.58,4.64,-.32,.03);
box(g.estrutura,3.75,.11,6.5,m.frame,0,1.72,0,.04);
box(g.estrutura,.09,1.35,6.4,m.frame,-1.82,1.01,0,.025);
label(g.estrutura,'SEIRES  /  AIR',2.45,.23,[-1.877,1.12,-.45]);
for(const x of[-1.55,1.55])for(const z of[-2.75,2.75])box(g.estrutura,.52,.27,.85,m.wire,x,.06,z,.08);
for(const x of[-1.6,1.6])box(g.estrutura,.6,.1,6.55,m.frame,x,7.94,0,.03);
for(let i=0;i<29;i++)box(g.estrutura,2.72,.044,.045,m.trim,0,7.95,-3.12+i*.22,.01);
for(let y=2.1;y<4;y+=.23)box(g.estrutura,2.5,.06,.07,m.trim,-.35,y,-3.35,.01);
box(g.estrutura,.5,2.25,.12,m.frame,1.57,5.85,-3.35,.03);
fan(g.estrutura,[-.25,6.23,-3.30],[0,Math.PI,0],.77,true,1);
for(let i=0;i<6;i++)box(g.estrutura,.24,.19,.14,i<4?m.black:m.silver,1.57,5.05+i*.32,-3.42,.015);
for(const x of[-1.76,1.76])box(g.estrutura,.18,7.52,.18,m.trim,x,4.08,3.48,.04);
for(const y of[.62,7.61])box(g.estrutura,3.65,.32,.19,m.frame,0,y,3.48,.035);
const glassMat=new THREE.MeshPhysicalMaterial({color:0xb8d2eb,transparent:true,opacity:.12,roughness:.1,metalness:.1,side:THREE.DoubleSide,depthWrite:false});
const glass=new THREE.Mesh(new THREE.BoxGeometry(.035,6.0,6.32),glassMat);glass.position.set(-2.055,4.78,0);glass.renderOrder=8;g.vidro.add(glass);
for(const z of[-3.13,3.13])box(g.vidro,.055,6,.06,m.trim,-2.055,4.78,z,.01);
for(const y of[1.79,7.77])box(g.vidro,.055,.06,6.3,m.trim,-2.055,y,0,.01);
for(const y of[1.95,7.62])for(const z of[-2.95,2.95])screw(g.vidro,[-2.085,y,z]);
const front=new THREE.Mesh(new THREE.PlaneGeometry(3.32,6.68),glassMat.clone());front.material.opacity=.07;front.position.set(0,4.12,3.58);front.renderOrder=8;g.estrutura.add(front);
cyl(g.estrutura,.13,.04,m.silver,[.95,8.065,2.75]);
for(const x of[.1,-.4])box(g.estrutura,.3,.04,.15,m.black,x,8.04,2.75,.02);
box(g.estrutura,.20,.045,.10,m.silver,-.92,8.04,2.75,.04);
// Placa-mãe vertical com trilhas impressas, socket, VRM e bateria.
box(g.placa,.08,4.95,4.35,m.pcb,1.45,4.74,-.75,.03);
const pcbTexture=v.textura((ctx,w,h)=>{
 ctx.strokeStyle='#489384';ctx.lineWidth=1.5;
 for(let i=0;i<56;i++){const a=35+(i%14)*39,b=35+Math.floor(i/14)*90;ctx.beginPath();ctx.moveTo(a,b);ctx.lineTo(a+22,b+22);ctx.lineTo(a+22,540-(i%11)*15);ctx.stroke();}
 ctx.fillStyle='#b7ccc3';ctx.font='18px Arial';ctx.fillText('SEIRES  /  ATX',45,590);
},640,640);
const circuit=new THREE.Mesh(new THREE.PlaneGeometry(4.35,4.95),new THREE.MeshStandardMaterial({map:pcbTexture,transparent:true,depthWrite:false,roughness:.6}));circuit.rotation.y=-Math.PI/2;circuit.position.set(1.404,4.74,-.75);g.placa.add(circuit);
for(const y of[2.4,4.8,7.08])for(const z of[-2.75,1.2])screw(g.placa,[1.37,y,z]);
box(g.placa,.16,1.35,1.35,m.silver,1.30,5.74,-.85,.07);
for(const z of[-1.91,-2.22]){box(g.placa,.25,2.25,.23,m.frame,1.18,5.85,z,.03);for(let i=0;i<12;i++)box(g.placa,.15,.052,.3,m.trim,1.04,4.88+i*.175,z,.007);}
for(let i=0;i<8;i++){box(g.placa,.17,.2,.24,m.trim,1.2,6.66,-1.67+i*.34,.02);cyl(g.placa,.066,.2,m.silver,[1.18,6.37,-1.65+i*.34],'x');}
box(g.placa,.17,1.03,1.0,m.frame,1.28,3.72,.43,.08);label(g.placa,'CHIPSET',.73,.17,[1.185,3.72,.43]);
for(const y of[2.77,3.12])box(g.placa,.14,.12,2.4,m.black,1.30,y,-.73,.02);
cyl(g.placa,.20,.065,m.silver,[1.315,3.69,-2.11],'x');
for(let i=0;i<30;i++)box(g.placa,.07,.045,.085,m.ceramic,1.37,3.4+(i%10)*.3,-2.59+Math.floor(i/10)*.18,.008);
for(const z of[.55,1.05]){
 box(g.placa,.15,1.92,.18,m.black,1.3,5.71,z,.025);box(g.ram,.12,1.75,.13,m.pcb,1.13,5.71,z,.016);
 box(g.ram,.23,1.60,.22,m.frame,.97,5.71,z,.03);box(g.ram,.065,1.65,.16,lights[z<1?0:1],.815,5.71,z,.035);
 for(const y of[4.82,6.6])box(g.ram,.24,.12,.25,m.trim,1.13,y,z,.02);
}
// Bloco líquido com anel luminoso e duas mangueiras contínuas.
box(g.cpu,.58,.88,.88,m.frame,.94,5.73,-.84,.16);
ring(g.cpu,.32,.041,lights[0],[.622,5.73,-.84]).rotation.y=-Math.PI/2;
label(g.cpu,'S',.37,.37,[.616,5.73,-.84],side,'#e6f4ff');
for(const dz of[0,.27]){const p=tube(g.cpu,[[.86,6.16,-.82+dz],[.40,6.64,-.67+dz],[-.46,6.82,.2+dz],[-.57,7.36,.96+dz]],.077,m.wire);for(const t of[0,1])cyl(g.cpu,.11,.18,m.trim,p.getPoint(t).toArray());}
// Placa de vídeo horizontal, com backplate, dissipador e três rotores inferiores.
for(const x of[-1.19,1.15])box(g.gpu,.1,.67,4.67,m.frame,x,3.29,-.34,.03);
for(const z of[-2.65,1.97])box(g.gpu,2.35,.67,.1,m.frame,-.02,3.29,z,.03);
box(g.gpu,2.43,.06,4.57,m.trim,-.02,3.665,-.34,.04);
for(const x of[-1.02,1.0])for(const z of[-2.33,-.4,1.64])screw(g.gpu,[x,3.707,z],'y');
for(let i=0;i<9;i++){const stripe=box(g.gpu,.035,.009,1.8,m.black,-.81+i*.2,3.7,-.7,.003);stripe.rotation.y=-.4;}
label(g.gpu,'SEIRES  /  GRAPHICS',1.8,.17,[0,3.704,1.36],[-Math.PI/2,0,0]);
for(const x of[-.8,-.4,0,.4,.8])tube(g.gpu,[[x,3.5,-2.38],[x,3.49,1.45],[x,3.29,1.69],[x,3.1,1.45]],.035,m.gold);
for(let i=0;i<33;i++)box(g.gpu,2.18,.34,.027,m.silver,-.02,3.28,-2.44+i*.13,.004);
box(g.gpu,.07,.39,4.42,m.frame,-1.28,3.3,-.34,.025);
box(g.gpu,.035,.055,2.5,lights[1],-1.323,3.48,-.3,.01);label(g.gpu,'SEIRES  /  GRAPHICS',2.9,.19,[-1.33,3.24,-.38]);
for(const z of[-1.83,-.34,1.15])fan(g.gpu,[-.02,2.895,z],[Math.PI/2,0,0],.53,false);
box(g.gpu,.38,.25,.50,m.black,-.1,3.83,1.5,.02);box(g.gpu,2.6,.83,.085,m.silver,.01,3.24,-2.76,.02);
for(const x of[-.84,-.21,.42])box(g.gpu,.4,.2,.09,m.black,x,3.21,-2.82,.015);
box(g.gpu,.13,1.16,.16,m.trim,-.94,2.37,1.72,.02);box(g.gpu,.55,.10,.5,m.frame,-.94,1.80,1.72,.04);
// Fonte inferior, conectores traseiros, feixes de cabos e pentes de organização.
box(g.fonte,3.20,1.17,2.48,m.black,0,.94,-1.94,.07);
box(g.fonte,1.0,.57,.08,m.trim,-.45,.91,-3.24,.025);box(g.fonte,.6,.31,.10,m.black,-.45,.91,-3.29,.03);box(g.fonte,.22,.22,.10,m.black,.43,.91,-3.29,.015);
for(let i=0;i<10;i++)box(g.fonte,2.75,.035,.035,m.trim,0,.47+i*.105,-3.197,.008);
for(let i=0;i<8;i++){
 const o=i*.062;
 tube(g.fonte,[[.72+o,1.05,-.62],[1.27,1.4,.1+o],[1.37,2.13,1.98+o],[.24+o,3.22,2.24],[-.1+o*.4,3.83,1.56]],.024,i%3?m.wire:m.whiteWire);
 tube(g.fonte,[[1.38,1.10,-.81+o],[1.72,2.0,.55+o],[1.7,4.8,1.75+o*.45],[1.28,5.25,1.37+o*.45]],.024,m.wire);
}
for(const y of[2.17,2.55])box(g.fonte,.53,.075,.11,m.trim,.80,y,2.13,.02);
// Radiador no teto e ventoinhas no plano correto de cada face.
for(const x of[-1.2,.96])box(g.radiador,.1,.28,4.35,m.black,x,7.48,-.25,.03);
for(const z of[-2.42,1.92])box(g.radiador,2.25,.28,.12,m.black,-.12,7.48,z,.03);
for(let i=0;i<49;i++)box(g.radiador,1.92,.17,.028,m.trim,-.12,7.5,-2.27+i*.083,.003);
for(const z of[-1.35,.84])fan(g.radiador,[-.12,7.20,z],[-Math.PI/2,0,0],.83,true,z<0?0:1);
for(const [i,y]of[2.32,4.46,6.6].entries())fan(g.fans,[0,y,3.09],[0,0,0],.85,true,i);
for(const x of[-1.13,1.13])box(g.fans,.10,6.25,.18,m.frame,x,4.46,2.89,.025);
for(let i=0;i<13;i++)box(g.estrutura,3.10,.014,.025,m.trim,0,.88+i*.055,3.54,.003);
let elapsed=0;
function tick(dt,state){
 if(!v.movimentoReduzido.matches)elapsed+=dt;
 for(let i=0;i<lights.length;i++){lights[i].emissiveIntensity=state.rgb?1.35+Math.sin(elapsed*.65+i)*.12:0;lights[i].color.set(state.rgb?colors[i]:0x657080);}
 if(state.ventoinhas&&!v.movimentoReduzido.matches)for(const rotor of rotors)rotor.rotation.z-=dt*7;
}
v.inicia({tick});
window.__gabineteGamer.detalhes=()=>({rotors:rotors.map(r=>r.rotation.z),light:lights.map(m=>m.emissiveIntensity),glassOpacity:glass.material.opacity});
// Coordenadas de arraste corrigidas para o app deitado no telefone.
const portrait=matchMedia('(max-width:820px) and (orientation:portrait) and (pointer:coarse)'),panel=document.getElementById('mobilePanel'),pointers=new Map();
panel.addEventListener('click',()=>{const open=document.body.classList.toggle('panel-open');panel.setAttribute('aria-expanded',open);panel.setAttribute('aria-label',open?'Fechar controles':'Abrir controles');panel.textContent=open?'×':'☰';});
function orient(){v.controls.enableRotate=!portrait.matches;v.controls.enablePan=!portrait.matches;}portrait.addEventListener('change',orient);orient();
v.canvas.addEventListener('pointerdown',e=>{if(portrait.matches){pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});v.controls.dispatchEvent({type:'start'});}});
v.canvas.addEventListener('pointermove',e=>{
 const prev=pointers.get(e.pointerId);if(!prev||!portrait.matches)return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size!==1)return;
 const dx=e.clientY-prev.y,dy=prev.x-e.clientX,delta=v.camera.position.clone().sub(v.controls.target);
 if(v.estado.navegacao==='mover'){const scale=delta.length()*.0016,shift=new THREE.Vector3().setFromMatrixColumn(v.camera.matrix,0).multiplyScalar(-dx*scale);shift.add(new THREE.Vector3().setFromMatrixColumn(v.camera.matrix,1).multiplyScalar(dy*scale));v.camera.position.add(shift);v.controls.target.add(shift);}
 else{const orbit=new THREE.Spherical().setFromVector3(delta);orbit.theta-=dx*.006;orbit.phi=THREE.MathUtils.clamp(orbit.phi-dy*.006,.03,Math.PI-.03);v.camera.position.copy(v.controls.target).add(new THREE.Vector3().setFromSpherical(orbit));}v.controls.update();
});
for(const event of['pointerup','pointercancel'])v.canvas.addEventListener(event,e=>pointers.delete(e.pointerId));
