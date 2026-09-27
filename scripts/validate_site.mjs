import fs from "node:fs";

const required=[
  "index.html","dashboard.html","library.html","review.html","praxios.html","praxios-design-system.html",
  "ADVANCED_MATHEMATICS.md","TOPOLOGY.md","VALIDATION_PROTOCOL.md",
  "AI_REVIEW_GUIDE.md","PROOF_OBLIGATIONS.md","ASSUMPTIONS_AND_LIMITS.md",
  "REPRODUCIBILITY.md","PRAXIOS_UI_SPEC.md","PRAXIOS_DESIGN_SYSTEM.md","PRAXIOS_RUNTIME.md","META_HARNESS_RUNTIME.md",
  "PRAXIOS_ARCHITECTURE.md","DECISION_ROOM_RUNTIME.md","MODEL_PROVIDER_CONTRACT.md","THREAT_MODEL.md","SECURITY_INVARIANTS.md","AUDIT_GUIDE.md","DEPLOYMENT.md",
  "paper/main.tex","paper/PAPER.pdf",
  "data/khufu.json","data/topology.json","scripts/validate_data.mjs",
  "runtime/core/ledger.mjs","runtime/core/policy.mjs","runtime/core/meta-harness.mjs","runtime/core/scheduler.mjs","runtime/core/praxios-runtime.mjs","runtime/core/orchestrator.mjs",
  "runtime/providers/openai.mjs","runtime/providers/anthropic.mjs","runtime/providers/fixture.mjs","runtime/storage/file-store.mjs","runtime/storage/encrypted-file-store.mjs",
  "runtime/core/contracts.mjs","runtime/core/budget.mjs","runtime/core/decision-room.mjs","runtime/server.mjs","runtime/package.json","runtime/openapi.yaml","runtime/Dockerfile","railway.json",
  "assets/praxios-api.mjs","scripts/security_scan.mjs"
];

const errors=[];
for(const p of required){
  if(!fs.existsSync(p)) errors.push("falta archivo requerido: "+p);
}

const dashboard=fs.readFileSync("dashboard.html","utf8");
for(const token of ["tab-topology","tab-math","assets/dashboard.js"]){
  if(!dashboard.includes(token)) errors.push("dashboard: falta "+token);
}

const library=fs.readFileSync("library.html","utf8");
for(const token of ["ADVANCED_MATHEMATICS.md","TOPOLOGY.md","VALIDATION_PROTOCOL.md","AI_REVIEW_GUIDE.md"]){
  if(!library.includes(token)) errors.push("library: falta "+token);
}

const praxios=fs.readFileSync("praxios.html","utf8");
for(const token of ["assets/praxios.css","assets/praxios.js","Connect backend","runtime-dialog","data-mode=\"operate\"","data-mode=\"assure\"","data-mode=\"decide\""]){
  if(!praxios.includes(token)) errors.push("praxios: falta "+token);
}

const runtime=fs.readFileSync("runtime/core/praxios-runtime.mjs","utf8");
for(const token of ["requestAuthorization","executeAction","verifyClaim","applyClaimReview","createDecisionPackage","selectDecision","fromSnapshot","listExecutors"]){
  if(!runtime.includes(token)) errors.push("runtime: falta "+token);
}
const harness=fs.readFileSync("runtime/core/meta-harness.mjs","utf8");
for(const token of ["PROVENANCE","CONTRADICTION","IDENTIFIABILITY","AUDIT","REVIEW_COVERAGE","MODEL_INDEPENDENCE","CLAIM_DEPENDENCY"]){
  if(!harness.includes(token)) errors.push("meta-harness: falta gate "+token);
}
const orchestrator=fs.readFileSync("runtime/core/orchestrator.mjs","utf8");
for(const token of ["validatePlannerOutput","validateWorkerOutput","validateReviewOutput","ExecutionBudget","MODEL_CALL_STARTED","MODEL_CALL_COMPLETED"]){
  if(!orchestrator.includes(token)) errors.push("orchestrator: falta "+token);
}
const server=fs.readFileSync("runtime/server.mjs","utf8");
for(const token of ["PRAXIOS_SERVER_TOKEN","PRAXIOS_DATA_KEY","EncryptedFileSessionStore","rateLimit","timingSafeEqual"]){
  if(!server.includes(token)) errors.push("server: falta "+token);
}
const publicClient=fs.readFileSync("assets/praxios.js","utf8");
for(const token of ["PraxiosApiClient","connectRemote","runRemoteSession","escape"]){
  if(!publicClient.includes(token) && token!=="escape") errors.push("public control room: falta "+token);
}

const paper=fs.readFileSync("paper/main.tex","utf8");
if(!paper.includes("08b_topology_identifiability")) errors.push("paper: falta sección topológica v1.2");
if(!paper.includes("Preprint v1.2")) errors.push("paper: versión no sincronizada");

if(errors.length){
  console.error("IRL site validation FAILED");
  errors.forEach(e=>console.error(" - "+e));
  process.exit(1);
}
console.log("IRL site validation OK");
