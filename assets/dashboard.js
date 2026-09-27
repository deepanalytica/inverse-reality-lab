import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const qs=(s)=>document.querySelector(s);
const qsa=(s)=>[...document.querySelectorAll(s)];
const fmt=(n,d=1)=>Number(n).toLocaleString("es-CL",{maximumFractionDigits:d,minimumFractionDigits:d});
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

async function readJSON(path){
  const r=await fetch(path,{cache:"no-store"});
  if(!r.ok) throw new Error("No se pudo cargar "+path);
  return r.json();
}

const [khufu,hypotheses,sources,monuments]=await Promise.all([
  readJSON("data/khufu.json"),
  readJSON("data/hypotheses.json"),
  readJSON("data/sources.json"),
  readJSON("data/monuments.json")
]);
const sourceMap=new Map(sources.map(s=>[s.id,s]));

const statusColors={
  observed:0x67d391,
  published:0x56d5ff,
  derived:0xffdf75,
  inferred:0xffb45d,
  hypothesis:0xb89cff,
  counterfactual:0xff7a7a,
  unknown:0x9aa6b2,
  schematic:0x86a0b8
};
const statusLabels={
  observed:"observado",
  published:"publicado",
  derived:"derivado",
  inferred:"inferido",
  hypothesis:"hipótesis",
  counterfactual:"contrafactual",
  unknown:"desconocido",
  schematic:"esquemático"
};
function badge(status){
  const s=statusLabels[status]?" "+status:" unknown";
  return '<span class="badge'+s+'">'+(statusLabels[status]||status)+'</span>';
}
function sourceLinks(ids=[]){
  if(!ids.length) return '<span class="small">Sin referencia asociada en esta capa.</span>';
  return ids.map(id=>{
    const s=sourceMap.get(id);
    if(!s) return '<span class="small mono">'+id+'</span>';
    return '<a class="evidence-link" href="'+s.url+'" target="_blank" rel="noopener"><b>'+id+' · '+s.title+'</b><span>'+s.publisher+(s.year?' · '+s.year:'')+'</span></a>';
  }).join("");
}

const container=qs("#scene");
const scene=new THREE.Scene();
scene.fog=new THREE.FogExp2(0x071019,0.0027);

const camera=new THREE.PerspectiveCamera(42,1,0.1,1200);
camera.position.set(220,155,235);

const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.localClippingEnabled=true;
renderer.outputColorSpace=THREE.SRGBColorSpace;
container.appendChild(renderer.domElement);

const controls=new OrbitControls(camera,renderer.domElement);
controls.target.set(0,48,0);
controls.enableDamping=true;
controls.minDistance=70;
controls.maxDistance=520;

scene.add(new THREE.HemisphereLight(0xbcd9ff,0x26301f,2.2));
const sun=new THREE.DirectionalLight(0xffedcf,4.2);
sun.position.set(-120,220,120);
scene.add(sun);

const groundMat=new THREE.MeshStandardMaterial({color:0x9b805d,roughness:1,metalness:0,transparent:true,opacity:.45});
const ground=new THREE.Mesh(new THREE.PlaneGeometry(520,520),groundMat);
ground.rotation.x=-Math.PI/2;
ground.position.y=-.18;
scene.add(ground);

const grid=new THREE.GridHelper(520,52,0x33465a,0x1b2a38);
grid.position.y=0;
scene.add(grid);

const groups={
  shell:new THREE.Group(),
  courses:new THREE.Group(),
  interior:new THREE.Group(),
  muon:new THREE.Group(),
  force:new THREE.Group(),
  blocks:new THREE.Group(),
  search:new THREE.Group()
};
Object.values(groups).forEach(g=>scene.add(g));

const base=khufu.dimensions.baseOriginalMeanM;
const height=khufu.dimensions.originalHeightM;
const pyramidRadius=base/Math.sqrt(2);
const clipPlane=new THREE.Plane(new THREE.Vector3(0,-1,0),height);

const shellGeo=new THREE.ConeGeometry(pyramidRadius,height,4,1,false);
shellGeo.rotateY(Math.PI/4);
const shellMat=new THREE.MeshPhysicalMaterial({
  color:0xd8c49b,roughness:.88,metalness:0,transparent:true,opacity:.18,
  side:THREE.DoubleSide,depthWrite:false,clippingPlanes:[clipPlane]
});
const shell=new THREE.Mesh(shellGeo,shellMat);
shell.position.y=height/2;
shell.userData.entity={
  id:"shell",label:"Envolvente paramétrica de Khufu",status:"derived",
  explanation:"Geometría idealizada ajustada a las dimensiones de referencia del proyecto. Se utiliza como dominio espacial y baseline de masa.",
  evidence:khufu.dimensions.sourceIds
};
groups.shell.add(shell);

const edgeGeo=new THREE.EdgesGeometry(shellGeo,15);
const edgeMat=new THREE.LineBasicMaterial({color:0xe1cfaa,transparent:true,opacity:.75,clippingPlanes:[clipPlane]});
const edges=new THREE.LineSegments(edgeGeo,edgeMat);
edges.position.copy(shell.position);
groups.shell.add(edges);

const courseCount=90;
for(let i=0;i<=courseCount;i++){
  const y=height*i/courseCount;
  const side=base*(1-y/height);
  if(side<.3) continue;
  const h=side/2;
  const pts=[
    new THREE.Vector3(-h,y,-h),new THREE.Vector3(h,y,-h),
    new THREE.Vector3(h,y,h),new THREE.Vector3(-h,y,h),
    new THREE.Vector3(-h,y,-h)
  ];
  const geo=new THREE.BufferGeometry().setFromPoints(pts);
  const line=new THREE.Line(geo,new THREE.LineBasicMaterial({color:0xa6977b,transparent:true,opacity:.22}));
  line.userData.y=y;
  groups.courses.add(line);
}

function materialFor(status,opacity=.58){
  return new THREE.MeshBasicMaterial({
    color:statusColors[status]||statusColors.unknown,
    transparent:true,opacity,depthWrite:false,side:THREE.DoubleSide
  });
}
function addBoxEntity(entity,parent){
  const g=entity.geometry;
  const geo=new THREE.BoxGeometry(g.size[0],g.size[1],g.size[2]);
  const mesh=new THREE.Mesh(geo,materialFor(entity.status,entity.kind==="muography-void"?.58:.5));
  mesh.position.set(...g.center);
  if(g.rotationDeg){
    mesh.rotation.set(...g.rotationDeg.map(v=>THREE.MathUtils.degToRad(v)));
  }
  mesh.userData.entity=entity;
  parent.add(mesh);
  const e=new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:statusColors[entity.status]||0xffffff,transparent:true,opacity:.9}));
  e.position.copy(mesh.position); e.rotation.copy(mesh.rotation); e.userData.entity=entity;
  parent.add(e);
  return mesh;
}

for(const entity of khufu.interior){
  const target=entity.kind==="muography-void"?groups.muon:groups.interior;
  if(entity.geometry.shape==="stack"){
    const [w,h,d]=entity.geometry.size;
    const count=entity.geometry.count||5;
    const each=h/count*.62;
    for(let i=0;i<count;i++){
      const child=structuredClone(entity);
      child.id=entity.id+"-"+(i+1);
      child.label=entity.label+" · nivel "+(i+1);
      child.geometry={shape:"box",center:[entity.geometry.center[0],entity.geometry.center[1]-h/2+(i+.5)*h/count,entity.geometry.center[2]],size:[w,each,d]};
      addBoxEntity(child,target);
    }
  }else{
    addBoxEntity(entity,target);
  }
}

const voidTargets=khufu.interior.filter(e=>e.kind==="muography-void");
for(const d of khufu.detectors){
  const sphere=new THREE.Mesh(new THREE.SphereGeometry(1.15,14,14),materialFor("observed",.95));
  sphere.position.set(...d.center);
  sphere.userData.entity={
    id:d.id,label:d.label,status:"observed",
    explanation:"Posición representativa utilizada para visualizar líneas de visión muográficas. La geometría exacta del detector se consulta en la publicación.",
    evidence:d.evidence
  };
  groups.muon.add(sphere);
  for(const t of voidTargets){
    const a=new THREE.Vector3(...d.center),b=new THREE.Vector3(...t.geometry.center);
    const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints([a,b]),new THREE.LineDashedMaterial({color:0x67d391,dashSize:2,gapSize:1,transparent:true,opacity:.35}));
    line.computeLineDistances();
    groups.muon.add(line);
  }
}

const king=khufu.interior.find(e=>e.id==="king");
for(const dx of [-4,0,4]){
  const origin=new THREE.Vector3(king.geometry.center[0]+dx,king.geometry.center[1]+11,king.geometry.center[2]);
  const arrow=new THREE.ArrowHelper(new THREE.Vector3(0,-1,0),origin,12,0xffb45d,2.4,1.3);
  groups.force.add(arrow);
}
for(const x of [-82,-28,28,82]){
  for(const z of [-82,82]){
    const origin=new THREE.Vector3(x,10,z);
    groups.force.add(new THREE.ArrowHelper(new THREE.Vector3(0,-1,0),origin,10,0xffd36a,1.9,1));
  }
}

for(const domain of khufu.searchDomains){
  const g=domain.geometry;
  const geo=new THREE.BoxGeometry(...g.size);
  const mat=new THREE.MeshBasicMaterial({
    color:statusColors[domain.status]||statusColors.unknown,
    transparent:true,opacity:domain.status==="unknown"?.05:.13,
    wireframe:true,depthWrite:false
  });
  const mesh=new THREE.Mesh(geo,mat);
  mesh.position.set(...g.center);
  mesh.userData.entity={
    id:domain.id,label:domain.label,status:domain.status,
    explanation:domain.explanation,evidence:domain.evidence||[]
  };
  groups.search.add(mesh);
}

const blockGeo=new THREE.BoxGeometry(1,1,1);
const blockMat=new THREE.MeshStandardMaterial({color:0xbfa87b,roughness:.94,metalness:0});
let blockIndex=0;
for(let level=0;level<20;level++){
  const y=4+level*(height-12)/21;
  const side=base*(1-y/height);
  const half=side/2;
  const courseHeight=.65+1.05*(1-level/20);
  const blockW=1.35+0.35*(1-level/20);
  const blockD=1.15+0.25*(1-level/20);
  const samples=3;
  for(let face=0;face<4;face++){
    for(let j=0;j<samples;j++){
      const t=(j+1)/(samples+1);
      let x=0,z=0;
      if(face===0){x=-half+side*t;z=-half+blockD/2}
      if(face===1){x=half-blockD/2;z=-half+side*t}
      if(face===2){x=half-side*t;z=half-blockD/2}
      if(face===3){x=-half+blockD/2;z=half-side*t}
      const mesh=new THREE.Mesh(blockGeo,blockMat.clone());
      mesh.scale.set(face%2===0?blockW:blockD,courseHeight,face%2===0?blockD:blockW);
      mesh.position.set(x,y,z);
      const volume=blockW*blockD*courseHeight;
      const density=khufu.dimensions.densityBaselineKgM3;
      mesh.userData.y=y;
      mesh.userData.blockInfo={
        id:"PB-"+String(++blockIndex).padStart(3,"0"),
        label:"Bloque proxy "+blockIndex,
        status:"inferred",
        course:Math.round(level*courseCount/20),
        dimensionsM:[blockW,courseHeight,blockD],
        densityKgM3:density,
        volumeM3:volume,
        massKg:volume*density,
        explanation:"Unidad paramétrica utilizada para demostrar cálculo de masa, selección y acceso. Representa una clase de bloque, no la geometría medida de una pieza real.",
        evidence:["S6","S8"]
      };
      groups.blocks.add(mesh);
    }
  }
}
groups.blocks.visible=false;
groups.search.visible=false;

function setLayer(name,visible){groups[name].visible=visible}
const layerBindings={
  "#layer-shell":"shell","#layer-courses":"courses","#layer-interior":"interior",
  "#layer-muon":"muon","#layer-force":"force","#layer-blocks":"blocks","#layer-search":"search"
};
for(const [selector,name] of Object.entries(layerBindings)){
  qs(selector).addEventListener("change",e=>setLayer(name,e.target.checked));
}

function interpolationAt(p){
  const states=khufu.causalStates;
  if(p<=states[0].p) return states[0].visibleHeightFraction;
  for(let i=0;i<states.length-1;i++){
    const a=states[i],b=states[i+1];
    if(p>=a.p && p<=b.p){
      const u=(p-a.p)/(b.p-a.p);
      return a.visibleHeightFraction+(b.visibleHeightFraction-a.visibleHeightFraction)*u;
    }
  }
  return states.at(-1).visibleHeightFraction;
}
function nearestState(p){
  return khufu.causalStates.reduce((best,s)=>Math.abs(s.p-p)<Math.abs(best.p-p)?s:best,khufu.causalStates[0]);
}

const totalMassKg=khufu.dimensions.volumeM3*khufu.dimensions.densityBaselineKgM3;
function updateMetrics(frac){
  const remainingFrac=1-Math.pow(1-frac,3);
  const mass=totalMassKg*remainingFrac;
  const removed=1-remainingFrac;
  const pressure=mass*9.80665/(base*base)/1e6;
  qs("#mass-mt").textContent=fmt(mass/1e9,2)+" Mt";
  qs("#pressure-mpa").textContent=fmt(pressure,2)+" MPa";
  qs("#height-m").textContent=fmt(height*frac,1)+" m";
  qs("#removed-pct").textContent=fmt(removed*100,1)+"%";
}

function stateHTML(s){
  return '<div class="card">'+
    '<div class="entity-title"><h2>'+s.title+'</h2>'+badge(s.epistemic)+'</div>'+
    '<p><b>Inmediatamente antes</b><br>'+s.immediatelyBefore+'</p>'+
    '<h3>Condiciones necesarias</h3><ul>'+s.required.map(x=>'<li>'+x+'</li>').join("")+'</ul>'+
    '<h3>Transición siguiente</h3><p>'+s.next+'</p>'+
    '<h3>Evidencia relacionada</h3>'+sourceLinks(s.evidence)+
  '</div>';
}

function updateTime(raw){
  const p=clamp(Number(raw)/100,0,1);
  const frac=interpolationAt(p);
  const cutoff=height*frac;
  clipPlane.constant=cutoff;
  groups.courses.children.forEach(o=>o.visible=o.userData.y<=cutoff+.1);
  groups.blocks.children.forEach(o=>o.visible=o.userData.y<=cutoff+.1);
  const s=nearestState(p);
  qs("#state-card").innerHTML=stateHTML(s);
  qs("#timeline-title").textContent=s.title;
  qs("#timeline-code").textContent=s.id;
  qs("#timeline-sub").textContent="progreso inferencial "+Math.round(p*100)+"%";
  qs("#state-pill").textContent=s.id+" · "+s.title;
  updateMetrics(frac);
}
qs("#time").addEventListener("input",e=>updateTime(e.target.value));

function hypothesisHTML(h){
  return '<div class="card">'+
    '<div class="entity-title"><h2>'+h.title+'</h2>'+badge(h.epistemic)+'</div>'+
    '<p class="small">'+h.family+'</p><p>'+h.summary+'</p>'+
    '<h3>Deducciones del modelo</h3><ul>'+h.modelDeductions.map(x=>'<li>'+x+'</li>').join("")+'</ul>'+
    '<h3>Predicciones</h3><ul>'+h.predictions.map(x=>'<li>'+x+'</li>').join("")+'</ul>'+
    '<h3>Qué la discrimina</h3><ul>'+h.discriminators.map(x=>'<li>'+x+'</li>').join("")+'</ul>'+
    '<h3>Evidencia</h3>'+sourceLinks(h.evidence)+
  '</div>';
}
const hSelect=qs("#hypothesis-select");
hypotheses.forEach(h=>{
  const o=document.createElement("option");o.value=h.id;o.textContent=h.id+" · "+h.title;hSelect.appendChild(o);
});
function renderHypothesis(){
  const h=hypotheses.find(x=>x.id===hSelect.value)||hypotheses[0];
  qs("#hypothesis-card").innerHTML=hypothesisHTML(h);
}
hSelect.addEventListener("change",renderHypothesis);
renderHypothesis();

qs("#source-count").textContent=sources.length+" fuentes";
qs("#evidence-list").innerHTML=sources.map(s=>
  '<a class="evidence-link" href="'+s.url+'" target="_blank" rel="noopener">'+
  '<b>'+s.id+' · '+s.title+'</b>'+
  '<span>'+s.type+' · '+s.publisher+(s.year?' · '+s.year:'')+'</span>'+
  '<span style="display:block;margin-top:4px">'+s.relevance+'</span>'+
  '</a>'
).join("");

const anomalyEntities=[
  ...khufu.interior.filter(e=>e.kind==="muography-void"),
  ...khufu.searchDomains
];
qs("#anomaly-list").innerHTML=anomalyEntities.map(a=>
  '<div class="card"><div class="entity-title"><h3>'+a.label+'</h3>'+badge(a.status)+'</div>'+
  '<p>'+a.explanation+'</p>'+sourceLinks(a.evidence||[])+'</div>'
).join("");

qs("#monument-list").innerHTML=monuments.map(m=>
  '<div class="card"><div class="entity-title"><h3>'+m.label+'</h3>'+badge(m.status==="active"?"observed":"unknown")+'</div>'+
  '<p>'+m.site+' · '+m.purpose+'</p>'+
  (m.url?'<a class="mini-btn" target="_blank" rel="noopener" href="'+m.url+'">Referencia ↗</a>':'')+
  '</div>'
).join("");

qsa(".tabs button").forEach(btn=>btn.addEventListener("click",()=>{
  qsa(".tabs button").forEach(b=>b.classList.remove("active"));
  qsa(".tab").forEach(t=>t.classList.remove("active"));
  btn.classList.add("active");
  qs("#tab-"+btn.dataset.tab).classList.add("active");
}));

function entityCard(e){
  return '<div class="entity-title"><h2>'+e.label+'</h2>'+badge(e.status||"unknown")+'</div>'+
    (e.id?'<p class="small mono">'+e.id+'</p>':'')+
    '<p>'+e.explanation+'</p>'+
    (e.confidence?'<p class="small"><b>Alcance:</b> '+e.confidence+'</p>':'')+
    (e.massKg?'<div class="metric-grid"><div class="metric"><div class="v">'+fmt(e.massKg/1000,2)+' t</div><div class="l">masa estimada</div></div>'+
      '<div class="metric"><div class="v">'+fmt(e.volumeM3,2)+' m³</div><div class="l">volumen proxy</div></div></div>':'')+
    (e.dimensionsM?'<p class="small"><b>Dimensiones proxy:</b> '+e.dimensionsM.map(v=>fmt(v,2)).join(" × ")+' m</p>':'')+
    '<h3 style="margin-top:10px">Evidencia</h3>'+sourceLinks(e.evidence||[]);
}

const raycaster=new THREE.Raycaster();
const mouse=new THREE.Vector2();
renderer.domElement.addEventListener("pointerdown",ev=>{
  const rect=renderer.domElement.getBoundingClientRect();
  mouse.x=((ev.clientX-rect.left)/rect.width)*2-1;
  mouse.y=-((ev.clientY-rect.top)/rect.height)*2+1;
  raycaster.setFromCamera(mouse,camera);
  const candidates=[
    ...groups.interior.children,...groups.muon.children,...groups.search.children,
    ...groups.blocks.children,shell
  ];
  const hits=raycaster.intersectObjects(candidates,false);
  const hit=hits.find(h=>h.object!==shell && (h.object.userData.entity||h.object.userData.blockInfo)) || hits.find(h=>h.object.userData.entity||h.object.userData.blockInfo);
  if(!hit) return;
  const e=hit.object.userData.blockInfo||hit.object.userData.entity;
  qs("#selected").innerHTML=entityCard(e);
});

function setCamera(name){
  if(name==="iso"){camera.position.set(220,155,235);controls.target.set(0,48,0)}
  if(name==="north"){camera.position.set(0,85,-310);controls.target.set(0,55,0)}
  if(name==="section"){camera.position.set(310,80,0);controls.target.set(0,48,0)}
  controls.update();
}
qsa("[data-view]").forEach(b=>b.addEventListener("click",()=>setCamera(b.dataset.view)));
qs("#reset-camera").addEventListener("click",()=>setCamera("iso"));

function resize(){
  const r=container.getBoundingClientRect();
  camera.aspect=r.width/r.height;
  camera.updateProjectionMatrix();
  renderer.setSize(r.width,r.height,false);
}
window.addEventListener("resize",resize);
resize();

updateTime(0);

const clock=new THREE.Clock();
renderer.setAnimationLoop(()=>{
  const t=clock.getElapsedTime();
  groups.muon.children.forEach(o=>{
    if(o.isMesh && o.geometry.type==="SphereGeometry") o.scale.setScalar(1+.08*Math.sin(t*2));
  });
  controls.update();
  renderer.render(scene,camera);
});

console.info("IRL Dashboard v1.1",{
  dataVersion:khufu.meta.version,
  sourceCount:sources.length,
  hypotheses:hypotheses.length,
  causalStates:khufu.causalStates.length
});
