import fs from "node:fs";

const required=[
  "index.html","assets/system/tokens.css","assets/system/components.css","assets/system/landing.css","assets/system/theme.js","assets/portal-v5.js","assets/portal-three.js",
  "architecture-room/index.html","assets/architecture-room.js","site-nav.js",
  "robots.txt","sitemap.xml","llms.txt",
  "praxios.html","mineral-systems.html","lab.html","el-puente/index.html"
];
const errors=[];
for(const p of required)if(!fs.existsSync(p))errors.push("missing "+p);

if(!errors.length){
  const html=fs.readFileSync("index.html","utf8"),tokens=fs.readFileSync("assets/system/tokens.css","utf8"),components=fs.readFileSync("assets/system/components.css","utf8"),css=fs.readFileSync("assets/system/landing.css","utf8"),theme=fs.readFileSync("assets/system/theme.js","utf8"),js=fs.readFileSync("assets/portal-v5.js","utf8"),room=fs.readFileSync("architecture-room/index.html","utf8"),llms=fs.readFileSync("llms.txt","utf8"),sitemap=fs.readFileSync("sitemap.xml","utf8");
  const checks=[
    ["pain first",html.includes("Más información. Más modelos.")],
    ["decision finder",html.includes("¿Qué decisión necesita")],
    ["before after",html.includes("CON DEEP ANALYTICA")],
    ["integration",html.includes("No reemplace su stack")],
    ["llm differentiation",html.includes("Los modelos generan respuestas")],
    ["deliverables",html.includes("Executive Decision Brief")],
    ["commercial path",html.includes("Controlled Mission")&&html.includes("Suscripción + uso + integración")],
    ["evaluation pathway",html.includes("03 / TECHNICAL REVIEW")&&html.includes("04 / DUE DILIGENCE")],
    ["brand belief",html.includes("No decidimos a ciegas")],
    ["technical review route",html.includes('href="architecture-room/"')&&html.includes("Solicitar revisión técnica")],
    ["room noindex",/name="robots" content="noindex,nofollow"/i.test(room)],
    ["room form",room.includes("data-access-form")],
    ["design system tokens active",html.includes("assets/system/tokens.css")],
    ["design system components active",html.includes("assets/system/components.css")],
    ["design system landing active",html.includes("assets/system/landing.css")],
    ["legacy css removed",!html.includes("assets/portal-v3.css")&&!html.includes("assets/portal-v4.css")&&!html.includes("assets/portal-v5.css")],
    ["light theme tokens",tokens.includes('html[data-theme="light"]')&&tokens.includes("--bg-app")&&tokens.includes("--text-primary")],
    ["dark theme tokens",tokens.includes('html[data-theme="dark"]')&&tokens.includes("--accent:#8c79ff")],
    ["semantic accent",tokens.includes("--accent:var(--iris-500)")&&tokens.includes("--accent-hover")],
    ["typography hierarchy",components.includes(".section-head h2")&&components.includes("var(--font-sans)")&&css.includes("var(--font-display)")],
    ["theme toggle html",html.includes("data-theme-toggle")&&html.includes("data-theme-icon")],
    ["theme persistence",theme.includes("deep-analytica-theme")&&theme.includes("localStorage")],
    ["system preference",theme.includes("prefers-color-scheme: dark")],
    ["theme-color sync",theme.includes('meta[name="theme-color"]')],
    ["interactive trajectory",js.includes("trajectory-canvas")&&js.includes("pointermove")&&js.includes("markCell")],
    ["mobile touch trajectory",js.includes("touchDrawing")&&js.includes("setPointerCapture")&&css.includes("touch-action:none")],
    ["section metaphors",js.includes("metaphorSpecs")&&js.includes("fragment")&&js.includes("converge")&&js.includes("verify")&&js.includes("resolve")],
    ["section numbering",js.includes("head.dataset.n")],
    ["pixel boot",js.includes("da-preload")],
    ["responsive",css.includes("@media(max-width:720px)")&&css.includes("@media(max-width:420px)")],
    ["reduced motion",tokens.includes("prefers-reduced-motion")],
    ["decision interaction",js.includes("decisionData")],
    ["llms high level",llms.includes("Organizations evaluating a pilot can request a deeper technical review")],
    ["llms no internals",!llms.includes("MODEL_INDEPENDENCE")&&!llms.includes("requestAuthorization")&&!llms.includes("proprietary evaluators")],
    ["sitemap excludes room",!sitemap.includes("architecture-room")],
    ["sitemap excludes technical docs",!sitemap.includes("mathematics.html")&&!sitemap.includes("library.html")]
  ];
  for(const [name,ok] of checks)if(!ok)errors.push("failed: "+name);
  const links=[...html.matchAll(/href="([^"]+)"/g)].map(m=>m[1]).filter(h=>!h.startsWith("#")&&!h.startsWith("mailto:")&&!h.startsWith("http"));
  for(const href of links){let p=href.split("#")[0].split("?")[0];if(!p)continue;if(p.endsWith("/"))p+="index.html";if(!fs.existsSync(p))errors.push("broken link "+href)}
  for(const f of ["index.html","praxios.html","mineral-systems.html","lab.html","dashboard.html"]){const c=fs.readFileSync(f,"utf8");if(/>\\n\s*</.test(c))errors.push("visible escaped newline "+f)}
}
if(errors.length){console.error(errors.join("\n"));process.exit(1)}
console.log("Deep Analytica design system production validation PASS");
