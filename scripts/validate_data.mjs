import fs from "node:fs";

const read=(p)=>JSON.parse(fs.readFileSync(p,"utf8"));
const khufu=read("data/khufu.json");
const hypotheses=read("data/hypotheses.json");
const sources=read("data/sources.json");
const monuments=read("data/monuments.json");
const topology=read("data/topology.json");

const allowed=new Set(["observed","published","derived","inferred","hypothesis","counterfactual","unknown","schematic"]);
const errors=[];
const assert=(cond,msg)=>{if(!cond)errors.push(msg)};
const unique=(items,label)=>{
  const set=new Set();
  for(const x of items){assert(!set.has(x),label+": identificador duplicado "+x);set.add(x)}
  return set;
};

const sourceIds=unique(sources.map(s=>s.id),"sources");
const checkRefs=(ids,where)=>(ids||[]).forEach(id=>assert(sourceIds.has(id),where+": referencia inexistente "+id));

assert(khufu.meta?.version,"khufu: falta meta.version");
assert(khufu.dimensions?.baseOriginalMeanM>0,"khufu: base inválida");
assert(khufu.dimensions?.originalHeightM>0,"khufu: altura inválida");
assert(khufu.dimensions?.densityBaselineKgM3>0,"khufu: densidad inválida");

unique(khufu.interior.map(e=>e.id),"khufu.interior");
for(const e of khufu.interior){
  assert(allowed.has(e.status),"khufu.interior "+e.id+": status inválido "+e.status);
  assert(e.geometry?.shape,"khufu.interior "+e.id+": falta geometry.shape");
  assert(e.explanation?.length>20,"khufu.interior "+e.id+": explicación insuficiente");
  checkRefs(e.evidence,"khufu.interior "+e.id);
}
for(const d of khufu.detectors||[]) checkRefs(d.evidence,"detector "+d.id);
for(const d of khufu.searchDomains||[]){
  assert(allowed.has(d.status),"searchDomain "+d.id+": status inválido");
  checkRefs(d.evidence,"searchDomain "+d.id);
}

let last=-Infinity;
for(const s of khufu.causalStates){
  assert(s.p>last,"causalStates: p debe ser estrictamente creciente en "+s.id);
  last=s.p;
  assert(s.p>=0&&s.p<=1,"causalStates "+s.id+": p fuera de [0,1]");
  assert(Array.isArray(s.required)&&s.required.length>0,"causalStates "+s.id+": faltan condiciones");
  checkRefs(s.evidence,"causalStates "+s.id);
}

unique(hypotheses.map(h=>h.id),"hypotheses");
for(const h of hypotheses){
  assert(allowed.has(h.epistemic),"hypothesis "+h.id+": epistemic inválido");
  assert(h.summary?.length>30,"hypothesis "+h.id+": summary insuficiente");
  assert(Array.isArray(h.modelDeductions)&&h.modelDeductions.length>0,"hypothesis "+h.id+": faltan deducciones");
  assert(Array.isArray(h.predictions)&&h.predictions.length>0,"hypothesis "+h.id+": faltan predicciones");
  assert(Array.isArray(h.discriminators)&&h.discriminators.length>0,"hypothesis "+h.id+": faltan discriminadores");
  checkRefs(h.evidence,"hypothesis "+h.id);
}

const nodeIds=unique(topology.nodes.map(n=>n.id),"topology.nodes");
for(const n of topology.nodes){
  assert(allowed.has(n.status),"topology node "+n.id+": status inválido");
  checkRefs(n.evidence,"topology node "+n.id);
}
for(const e of topology.edges){
  assert(nodeIds.has(e.a)&&nodeIds.has(e.b),"topology edge "+e.a+"-"+e.b+": nodo inexistente");
  assert(Number.isFinite(e.proxyClearanceRadiusM)&&e.proxyClearanceRadiusM>=0,"topology edge "+e.a+"-"+e.b+": clearance inválido");
}

assert(monuments.filter(m=>m.status==="active").length===1,"monuments: debe existir exactamente un caso active");
assert(sources.every(s=>s.url),"sources: todas las fuentes deben tener URL");

if(errors.length){
  console.error("IRL semantic validation FAILED");
  errors.forEach(e=>console.error(" - "+e));
  process.exit(1);
}
console.log("IRL semantic validation OK");
console.log(JSON.stringify({
  khufuInterior:khufu.interior.length,
  causalStates:khufu.causalStates.length,
  hypotheses:hypotheses.length,
  sources:sources.length,
  topologyNodes:topology.nodes.length,
  topologyEdges:topology.edges.length,
  monuments:monuments.length
},null,2));
