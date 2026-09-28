import fs from "node:fs";

const required=[
  "index.html","assets/portal-v3.css","assets/portal-v3.js","assets/portal-three.js",
  "architecture-room/index.html","assets/architecture-room.js","site-nav.js",
  "robots.txt","sitemap.xml","llms.txt","PUBLIC_DISCLOSURE_POLICY.md",
  "praxios.html","mineral-systems.html","lab.html","el-puente/index.html"
];
const errors=[];
for(const p of required)if(!fs.existsSync(p))errors.push("missing "+p);

if(!errors.length){
  const html=fs.readFileSync("index.html","utf8"),css=fs.readFileSync("assets/portal-v3.css","utf8"),js=fs.readFileSync("assets/portal-v3.js","utf8"),room=fs.readFileSync("architecture-room/index.html","utf8"),llms=fs.readFileSync("llms.txt","utf8"),sitemap=fs.readFileSync("sitemap.xml","utf8");
  const checks=[
    ["pain first",html.includes("Más información. Más modelos.")],
    ["decision finder",html.includes("¿Qué decisión necesita")],
    ["before after",html.includes("CON DEEP ANALYTICA")],
    ["integration",html.includes("No reemplace su stack")],
    ["llm differentiation",html.includes("Los modelos generan respuestas")],
    ["deliverables",html.includes("Executive Decision Brief")],
    ["commercial path",html.includes("Controlled Mission")&&html.includes("Suscripción + uso + integración")],
    ["progressive disclosure",html.includes("P2 / QUALIFIED ACCESS")&&html.includes("P4–P5 / INTERNAL")],
    ["brand belief",html.includes("No decidimos a ciegas")],
    ["architecture room",html.includes('href="architecture-room/"')],
    ["room noindex",/name="robots" content="noindex,nofollow"/i.test(room)],
    ["room form",room.includes("data-access-form")],
    ["responsive",css.includes("@media(max-width:780px)")],
    ["reduced motion",css.includes("prefers-reduced-motion")],
    ["decision interaction",js.includes("decisionData")],
    ["llms high level",llms.includes("Detailed assurance mechanisms are proprietary")],
    ["llms no internals",!llms.includes("MODEL_INDEPENDENCE")&&!llms.includes("requestAuthorization")],
    ["sitemap excludes room",!sitemap.includes("architecture-room")],
    ["sitemap excludes technical docs",!sitemap.includes("mathematics.html")&&!sitemap.includes("library.html")]
  ];
  for(const [name,ok] of checks)if(!ok)errors.push("failed: "+name);
  const links=[...html.matchAll(/href="([^"]+)"/g)].map(m=>m[1]).filter(h=>!h.startsWith("#")&&!h.startsWith("mailto:")&&!h.startsWith("http"));
  for(const href of links){let p=href.split("#")[0].split("?")[0];if(!p)continue;if(p.endsWith("/"))p+="index.html";if(!fs.existsSync(p))errors.push("broken link "+href)}
  for(const f of ["index.html","praxios.html","mineral-systems.html","lab.html","dashboard.html"]){const c=fs.readFileSync(f,"utf8");if(/>\\n\s*</.test(c))errors.push("visible escaped newline "+f)}
}
if(errors.length){console.error(errors.join("\n"));process.exit(1)}
console.log("Public surface v3 validation PASS");
