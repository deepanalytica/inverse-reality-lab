
const $=s=>document.querySelector(s);
const $$=s=>Array.from(document.querySelectorAll(s));

const modes={
  operate:{eyebrow:"PRAXIOS · runtime view",title:"Orquestación de sesión",stats:["4","3","5/7"]},
  assure:{eyebrow:"META-HARNESS · assurance view",title:"Evidencia, claims y gates",stats:["9","3","5/7"]},
  decide:{eyebrow:"DECISION ROOM · authority view",title:"Opciones, decisión y ejecución",stats:["3","2","1"]}
};

const nodes={
  planner:{
    kind:"PRAXIOS · orchestration",title:"Planner",status:"ready",badge:"running",
    html:'<div class="px-panel"><h3>Responsabilidad</h3><p>Convierte el objetivo de la sesión en trabajos delegables. Propone el plan; PRAXIOS controla estado, permisos y ejecución.</p></div><div class="px-panel"><h3>Contrato</h3><dl class="px-kv"><dt>Input</dt><dd>Goal + state</dd><dt>Output</dt><dd>Task DAG</dd><dt>Authority</dt><dd>Propose only</dd><dt>Side effects</dt><dd>Gated</dd></dl></div><div class="px-panel"><h3>Current plan</h3><ul><li>Buscar evidencia instrumental.</li><li>Ejecutar cálculo.</li><li>Solicitar revisión independiente.</li></ul></div>'
  },
  researcher:{
    kind:"WORKER · evidence",title:"Researcher",status:"queued",badge:"info",
    html:'<div class="px-panel"><h3>Task</h3><p>Recuperar evidencia relevante para el claim seleccionado y registrar procedencia.</p></div><div class="px-panel"><h3>Tools</h3><dl class="px-kv"><dt>Allowed</dt><dd>Web · Files</dd><dt>Write</dt><dd>Evidence ledger</dd><dt>Policy</dt><dd>Source required</dd></dl></div>'
  },
  simulator:{
    kind:"WORKER · computation",title:"Simulator",status:"queued",badge:"info",
    html:'<div class="px-panel"><h3>Task</h3><p>Evaluar el modelo cuantitativo y producir un artefacto reproducible.</p></div><div class="px-panel"><h3>Contract</h3><dl class="px-kv"><dt>Input</dt><dd>Versioned data</dd><dt>Output</dt><dd>Result + artifact</dd><dt>Validation</dt><dd>Tests required</dd></dl></div>'
  },
  reviewer:{
    kind:"WORKER · independent verification",title:"Reviewer",status:"queued",badge:"info",
    html:'<div class="px-panel"><h3>Role separation</h3><p>Busca contradicciones, supuestos no declarados y explicaciones alternativas. No hereda el rol de proposer.</p></div><div class="px-panel"><h3>Review focus</h3><ul><li>Identificabilidad.</li><li>Contradicciones.</li><li>Falsificadores.</li><li>Calidad de evidencia.</li></ul></div>'
  },
  harness:{
    kind:"META-HARNESS · assurance",title:"Meta-Harness",status:"review",badge:"review",
    html:'<div class="px-panel"><h3>Claim C-0142</h3><p><strong>“El NFC podría continuar hacia el sur mediante una sección menor.”</strong></p><p>Clase: <span class="px-badge review">hypothesis</span></p></div><div class="px-panel"><h3>Gates</h3><div class="px-gate-list"><div class="px-gate"><div><b>Provenance</b><small>source linked</small></div><span class="px-badge pass">PASS</span></div><div class="px-gate"><div><b>Evidence</b><small>published constraint</small></div><span class="px-badge pass">PASS</span></div><div class="px-gate"><div><b>Contradiction</b><small>alternatives remain</small></div><span class="px-badge review">REVIEW</span></div><div class="px-gate"><div><b>Identifiability</b><small>current data insufficient</small></div><span class="px-badge review">REVIEW</span></div><div class="px-gate"><div><b>Physics</b><small>compatible</small></div><span class="px-badge pass">PASS</span></div><div class="px-gate"><div><b>Publish as discovery</b><small>evidence threshold unmet</small></div><span class="px-badge block">BLOCK</span></div></div></div>'
  },
  human:{
    kind:"AUTHORITY · human checkpoint",title:"Human authority",status:"waiting",badge:"review",
    html:'<div class="px-panel"><h3>Approval request</h3><p>Autorizar una nueva medición. La sesión puede proponer el diseño; la acción externa requiere aprobación humana.</p></div><div class="px-panel"><button class="px-btn primary" id="approve-action">Approve measurement design</button> <button class="px-btn danger" id="reject-action">Reject</button></div>'
  },
  decision:{
    kind:"DECISION ROOM",title:"Decision Room",status:"ready",badge:"pass",
    html:'<div class="px-panel"><h3>Situation</h3><p>La evidencia actual permite una continuación pequeña del NFC, pero mantiene alternativas.</p></div><div class="px-panel"><h3>Options</h3><div class="px-card"><strong>A · Nueva posición muográfica</strong><p>Mayor capacidad esperada para discriminar continuidad.</p></div><div class="px-card"><strong>B · Mantener estado actual</strong><p>Sin costo inmediato; incertidumbre permanece.</p></div></div><div class="px-panel"><h3>Decision state</h3><p><span class="px-badge review">human decision required</span></p></div>'
  },
  ledger:{
    kind:"CANONICAL STATE",title:"The Ledger",status:"append-only",badge:"pass",
    html:'<div class="px-panel"><h3>Purpose</h3><p>Registro canónico de eventos, artefactos, claims, evidencia, gates, autorizaciones y resultados.</p></div><div class="px-panel"><h3>Properties</h3><ul><li>Append-only.</li><li>Versioned artifacts.</li><li>Model-independent state.</li><li>Replayable session.</li></ul></div>'
  }
};

const ledgerSeed=[
  ["12:41:03","SESSION","IRL-042 created",""],
  ["12:41:04","GOAL","Validate NFC continuation hypothesis",""],
  ["12:41:06","PLAN","3 jobs proposed",""],
  ["12:41:07","POLICY","external actions require human authority","pass"]
];

function renderLedger(rows){
  const data=rows||ledgerSeed;
  $("#ledger").innerHTML=data.map(function(r){
    return '<div class="px-ledger-row '+(r[3]||"")+'"><span>'+r[0]+'</span><span class="kind">'+r[1]+'</span><span>'+r[2]+'</span></div>';
  }).join("");
}

function selectNode(id){
  $$(".node").forEach(n=>n.classList.toggle("selected",n.dataset.node===id));
  const n=nodes[id];
  $("#inspector-kind").textContent=n.kind;
  $("#inspector-title").textContent=n.title;
  $("#inspector-status").textContent=n.status;
  $("#inspector-status").className="px-badge "+n.badge;
  $("#inspector-content").innerHTML=n.html;
  const approve=$("#approve-action");
  const reject=$("#reject-action");
  if(approve) approve.onclick=function(){toast("Authorization appended to ledger.");};
  if(reject) reject.onclick=function(){toast("Action blocked by human authority.");};
}

function setMode(mode){
  $$(".px-mode-switch button").forEach(b=>b.classList.toggle("active",b.dataset.mode===mode));
  $("#mode-eyebrow").textContent=modes[mode].eyebrow;
  $("#mode-title").textContent=modes[mode].title;
  $("#stat-agents").textContent=modes[mode].stats[0];
  $("#stat-claims").textContent=modes[mode].stats[1];
  $("#stat-gates").textContent=modes[mode].stats[2];
  if(mode==="operate")selectNode("planner");
  if(mode==="assure")selectNode("harness");
  if(mode==="decide")selectNode("decision");
}

function toast(msg){
  const t=$("#toast");
  t.textContent=msg;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1800);
}

const stages=[
  {node:"planner",edge:null,kind:"PLAN",msg:"Task DAG created",klass:"running"},
  {node:"researcher",edge:"e1",kind:"JOB",msg:"Researcher retrieving evidence",klass:"running"},
  {node:"simulator",edge:"e2",kind:"JOB",msg:"Simulator evaluating model",klass:"running"},
  {node:"reviewer",edge:"e3",kind:"JOB",msg:"Independent review started",klass:"running"},
  {node:"harness",edges:["e4","e5","e6"],kind:"GATE",msg:"Meta-Harness evaluating claim C-0142",klass:"review"},
  {node:"human",edge:"e7",kind:"AUTH",msg:"Human checkpoint requested",klass:"review"},
  {node:"decision",edge:"e8",kind:"DECISION",msg:"Option set prepared",klass:"pass"},
  {node:"ledger",edge:"e9",kind:"LEDGER",msg:"Session state committed",klass:"pass"}
];

let timer=null;
function resetDemo(){
  if(timer)clearInterval(timer);
  timer=null;
  $$(".node").forEach(n=>n.classList.remove("running","pass","review","block"));
  $$(".edge").forEach(e=>e.classList.remove("active","pass","review","block"));
  $("#progress").style.width="0";
  renderLedger();
  setMode("operate");
}
function runDemo(){
  resetDemo();
  let i=0;
  const rows=ledgerSeed.map(r=>r.slice());
  const step=function(){
    if(i>=stages.length){
      clearInterval(timer);timer=null;toast("Demo complete: decision package ready.");return;
    }
    const s=stages[i];
    const node=$('[data-node="'+s.node+'"]');
    if(node)node.classList.add(s.klass);
    if(s.edge)$("#"+s.edge).classList.add("active",s.klass);
    (s.edges||[]).forEach(e=>$("#"+e).classList.add("active",s.klass));
    const time=new Date().toLocaleTimeString("es-CL",{hour12:false}).slice(0,8);
    rows.push([time,s.kind,s.msg,s.klass==="pass"?"pass":s.klass==="review"?"review":""]);
    renderLedger(rows);
    $("#progress").style.width=((i+1)/stages.length*100)+"%";
    selectNode(s.node);
    i++;
  };
  step();
  timer=setInterval(step,720);
}

$$(".node").forEach(n=>n.addEventListener("click",()=>selectNode(n.dataset.node)));
$$(".px-mode-switch button").forEach(b=>b.addEventListener("click",()=>setMode(b.dataset.mode)));
$("#run-demo").addEventListener("click",runDemo);
$("#reset-demo").addEventListener("click",function(){resetDemo();toast("Demo reset.");});
$("#send-command").addEventListener("click",function(){toast("Command queued in demo session.");runDemo();});
renderLedger();
selectNode("planner");
