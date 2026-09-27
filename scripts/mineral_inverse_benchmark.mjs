import fs from "node:fs";

const RULES = [
  {id:"R-STRUCT-01",requires:["regional_transcurrent_fault","intrusive_alignment_with_fault"],emits:["structure_localizes_intrusion"],explanation:"Regional transcurrent architecture and aligned intrusive emplacement support first-order structural localization."},
  {id:"R-STRUCT-02",requires:["regional_transcurrent_fault","dilational_intrusive_site"],emits:["dilation_localizes_intrusion"],explanation:"A dilational site within a transcurrent system is compatible with localized porphyry emplacement."},
  {id:"R-HYDRO-01",any:[["multiphase_porphyry_intrusions","potassic_alteration"],["multiphase_felsic_intrusions","potassic_alteration"]],emits:["intrusion_precedes_potassic"],explanation:"Potassic alteration is treated as an early magmatic-hydrothermal response to intrusive emplacement."},
  {id:"R-HYDRO-02",requires:["potassic_alteration","sericitic_overprint"],emits:["potassic_precedes_sericitic_overprint"],explanation:"Observed sericitic overprint on a potassic assemblage establishes a relative sequence."},
  {id:"R-HYDRO-03",requires:["potassic_alteration","chlorite_sericite_overprint"],emits:["potassic_precedes_chlorite_sericite"],explanation:"Chlorite-sericite replacement of earlier potassic assemblages supports this temporal edge."},
  {id:"R-HYDRO-04",requires:["chlorite_sericite_overprint","quartz_sericite_overprint"],emits:["chlorite_sericite_precedes_quartz_sericite"],explanation:"Nested overprinting provides a relative hydrothermal sequence."},
  {id:"R-HYDRO-05",requires:["advanced_argillic_lithocap","high_sulfidation_veins"],emits:["advanced_argillic_hosts_late_high_sulfidation"],explanation:"Advanced argillic alteration and high-sulfidation veins define a later acidic hydrothermal regime."},
  {id:"R-BRECCIA-01",any:[["cataclastic_brecciation","sulfides_in_brecciation"],["magmatic_hydrothermal_breccias","sulfide_cemented_breccias"]],emits:["brecciation_focuses_sulfides"],explanation:"Sulfide concentration in fractured or hydrothermal breccia domains supports permeability-controlled focusing."},
  {id:"R-VEIN-01",requires:["quartz_moly_veins","main_stage_veins"],emits:["quartz_moly_precedes_main_stage"],explanation:"The quartz-molybdenite vein stage is inferred to predate the main-stage vein system."},
  {id:"R-FAULT-ORE-01",requires:["regional_transcurrent_fault","fault_adjacent_main_stage"],emits:["fault_zone_focuses_main_stage"],explanation:"Main-stage veins concentrated adjacent to a regional fault imply structural focusing."},
  {id:"R-HS-01",requires:["main_stage_veins","late_high_sulfidation_minerals"],emits:["main_stage_precedes_late_high_sulfidation"],explanation:"Late high-sulfidation assemblages are placed after the main vein stage."},
  {id:"R-SUPERGENE-01",requires:["leached_cap","chalcocite_blanket"],emits:["hypogene_precedes_supergene"],explanation:"A leached cap over secondary chalcocite enrichment requires post-hypogene weathering and redistribution."},
  {id:"R-SUPERGENE-02",requires:["nw_structural_supergene_control","chalcocite_blanket"],emits:["structures_control_supergene_geometry"],explanation:"Observed structural alignment of the enrichment body supports structural control on supergene geometry."},
  {id:"R-MAG-01",requires:["alteration_magnetic_contrast"],emits:["alteration_modifies_magnetic_properties"],explanation:"Systematic magnetic contrasts between alteration domains imply hydrothermal modification of magnetic mineralogy."},
  {id:"R-POST-01",requires:["postmineral_fault_offset"],emits:["mineralization_precedes_postmineral_faulting"],explanation:"Displacement of mineralized rock establishes a post-mineral deformation edge."},
  {id:"R-TEN-01",requires:["quartz_anhydrite_stockwork","potassic_alteration","multiphase_felsic_intrusions"],emits:["stockwork_records_late_magmatic_stage"],explanation:"Quartz-anhydrite stockwork with potassic alteration in felsic intrusive context is assigned to a magmatic-hydrothermal stage."},
  {id:"R-TEN-02",requires:["quartz_anhydrite_stockwork","principal_phyllic_stage"],emits:["late_magmatic_precedes_principal_hydrothermal"],explanation:"Stockwork stage precedes the later principal phyllic/hydrothermal overprint."},
  {id:"R-TEN-03",requires:["principal_phyllic_stage","late_hydrothermal_stage"],emits:["principal_precedes_late_hydrothermal"],explanation:"Named cross-cutting hydrothermal stages establish a relative sequence."},
  {id:"R-TEN-04",requires:["radial_concentric_veins","central_breccia_pipe","multiphase_felsic_intrusions"],emits:["intrusion_stress_controls_radial_concentric_veins"],explanation:"Radial and concentric vein architecture around a central intrusive-breccia focus is consistent with intrusion-driven local stress."},
  {id:"R-TEN-05",requires:["central_breccia_pipe","late_hydrothermal_stage"],emits:["hydrothermal_pressure_precedes_breccia_pipe"],explanation:"Late hydrothermal pressure buildup is a compatible predecessor to explosive brecciation."},
  {id:"R-TEN-06",requires:["central_breccia_pipe","central_pipe_ore_destruction"],emits:["breccia_pipe_modifies_central_ore"],explanation:"Direct evidence of ore destruction by the central pipe constrains its post-ore modification role."},
  {id:"R-TEN-07",requires:["late_ne_faults","late_hydrothermal_stage"],emits:["hydrothermal_precedes_late_ne_faulting"],explanation:"Late NE structures are interpreted after the main hydrothermal sequence."},
  {id:"R-MAG-02",requires:["hydrothermal_magnetic_reset"],emits:["hydrothermal_event_resets_magnetic_record"],explanation:"A chemical or thermoremanent reset associated with mineralization records hydrothermal timing."}
];

const SUPPORT_WEIGHTS = {
  arc_magmatism:1,multiphase_porphyry_intrusions:2,multiphase_felsic_intrusions:2,potassic_alteration:2,
  quartz_anhydrite_stockwork:2,quartz_kfeldspar_veinlets:1,sericitic_overprint:1,chlorite_sericite_overprint:1,
  quartz_sericite_overprint:1,advanced_argillic_lithocap:1,magmatic_hydrothermal_breccias:1,
  cataclastic_brecciation:1,regional_transcurrent_fault:1,alteration_magnetic_contrast:1,leached_cap:1,chalcocite_blanket:1
};

function tagsOf(deposit){ return new Set((deposit.observation_set||[]).map(o=>o.tag)); }
function satisfied(rule,tags){
  if(rule.requires && !rule.requires.every(t=>tags.has(t))) return false;
  if(rule.any && !rule.any.some(group=>group.every(t=>tags.has(t)))) return false;
  return true;
}

export function inferMineralSystem(deposit){
  const tags=tagsOf(deposit), edges=new Set(), trace=[];
  for(const rule of RULES){
    if(!satisfied(rule,tags)) continue;
    for(const edge of rule.emits) edges.add(edge);
    trace.push({rule:rule.id,emits:[...rule.emits],explanation:rule.explanation});
  }
  let raw=0,total=0;
  for(const [tag,w] of Object.entries(SUPPORT_WEIGHTS)){ total+=w; if(tags.has(tag)) raw+=w; }
  return {id:deposit.id,inferred_edges:[...edges].sort(),rule_trace:trace,porphyry_system_support:Number((total?raw/total:0).toFixed(3))};
}

export function scoreInference(inference,groundTruth){
  const predicted=new Set(inference.inferred_edges||[]), truth=new Set(groundTruth.edges||[]);
  const tp=[...predicted].filter(x=>truth.has(x)), fp=[...predicted].filter(x=>!truth.has(x)), fn=[...truth].filter(x=>!predicted.has(x));
  const precision=predicted.size?tp.length/predicted.size:0, recall=truth.size?tp.length/truth.size:0;
  const f1=(precision+recall)?2*precision*recall/(precision+recall):0;
  return {tp:tp.sort(),fp:fp.sort(),fn:fn.sort(),precision:Number(precision.toFixed(3)),recall:Number(recall.toFixed(3)),f1:Number(f1.toFixed(3))};
}

export function runBenchmark(dataset){
  const ablation=new Set(dataset.protocol?.exploration_proxy_ablation||[]);
  const results=(dataset.deposits||[]).map(deposit=>{
    const safeInput={id:deposit.id,observation_set:structuredClone(deposit.observation_set||[])};
    const inference=inferMineralSystem(safeInput);
    const score=scoreInference(inference,deposit.ground_truth||{edges:[]});
    const proxyInput={id:deposit.id,observation_set:(deposit.observation_set||[]).filter(o=>!ablation.has(o.tag))};
    const proxyInference=inferMineralSystem(proxyInput);
    const proxyScore=scoreInference(proxyInference,deposit.ground_truth||{edges:[]});
    return {
      id:deposit.id,public_name:deposit.public_name,label:deposit.label,observations:(deposit.observation_set||[]).length,
      reconstruction:{...inference,score},
      exploration_proxy:{observations:proxyInput.observation_set.length,...proxyInference,score:proxyScore}
    };
  });
  const mean=(mode,name)=>Number((results.reduce((a,r)=>a+r[mode].score[name],0)/(results.length||1)).toFixed(3));
  return {
    benchmark:dataset.benchmark,schema_version:dataset.schema_version,protocol:dataset.protocol,results,
    aggregate:{
      reconstruction:{mean_precision:mean("reconstruction","precision"),mean_recall:mean("reconstruction","recall"),mean_f1:mean("reconstruction","f1")},
      exploration_proxy:{mean_precision:mean("exploration_proxy","precision"),mean_recall:mean("exploration_proxy","recall"),mean_f1:mean("exploration_proxy","f1")}
    }
  };
}

if(process.argv[1] && process.argv[1].endsWith("mineral_inverse_benchmark.mjs")){
  const input=process.argv[2]||"data/mineral_benchmarks.json";
  const output=process.argv[3]||"data/mineral_benchmark_results.json";
  const dataset=JSON.parse(fs.readFileSync(input,"utf8"));
  const result=runBenchmark(dataset);
  fs.writeFileSync(output,JSON.stringify(result,null,2)+"\n");
  console.log(JSON.stringify(result,null,2));
}
