import fs from "node:fs";

const required=[
  "index.html","assets/portal-v3.css","assets/portal-v4.css","assets/portal-v5.css","assets/design-system-v1.css","assets/site-theme-bridge-v1.css","assets/theme-v1.js","assets/portal-v5.js","assets/portal-three.js",
  "architecture-room/index.html","assets/architecture-room.js","site-nav.js",
  "robots.txt","sitemap.xml","llms.txt",
  "praxios.html","mineral-systems.html","lab.html","el-puente/index.html","design-system/index.html","DESIGN_SYSTEM.md"
];
const errors=[];
for(const p of required)if(!fs.existsSync(p))errors.push("missing "+p);

if(!errors.length){
  const html=fs.readFileSync("index.html","utf8"),css=fs.readFileSync("assets/design-system-v1.css","utf8"),portal5css=fs.readFileSync("assets/portal-v5.css","utf8"),bridgeCss=fs.readFileSync("assets/site-theme-bridge-v1.css","utf8"),themeJs=fs.readFileSync("assets/theme-v1.js","utf8"),js=fs.readFileSync("assets/portal-v5.js","utf8"),room=fs.readFileSync("architecture-room/index.html","utf8"),llms=fs.readFileSync("llms.txt","utf8"),sitemap=fs.readFileSync("sitemap.xml","utf8");
  const checks=[
    ["design system active",html.includes("assets/design-system-v1.css")],
    ["theme controller active",html.includes("assets/theme-v1.js")&&html.includes("data-theme-toggle")],
    ["semantic light dark tokens",css.includes('html[data-theme="light"]')&&css.includes('html[data-theme="dark"]')&&css.includes("--da-text-2")&&css.includes("--da-surface")],
    ["typography hierarchy",css.includes("--da-font-display")&&css.includes(".section-head h2")&&css.includes(".hero h1")],
    ["mobile hierarchy repair",css.includes("@media(max-width:820px)")&&css.includes(".decision-metaphor")&&css.includes("opacity:.025!important")],
    ["theme persistence",themeJs.includes("deep-analytica-theme")&&themeJs.includes("localStorage")],
    ["buyer copy customer-facing",html.includes("Lo que necesita saber")&&!html.includes("receta propietaria")&&!html.includes("Leads cualificados")&&!html.includes("Solicitar Architecture Room")],

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
    ["v5 stylesheet active",html.includes("assets/portal-v5.css")],
    ["v5 interaction system active",html.includes("assets/portal-v5.js")],
    ["electric iris palette",css.includes("--da-iris500:#725BFF")&&css.includes("--da-accent:#725BFF")],
    ["hero first-screen layout",css.includes("min-height:calc(100svh - 68px)")&&css.includes("grid-template-columns:minmax(0,1.03fr) minmax(460px,.97fr)")],
    ["mobile hero statement",html.includes('class="hero-statement"')&&css.includes(".hero-statement")],
    ["mobile hierarchy governed",css.includes("display:flex!important;flex-direction:column!important")&&css.includes(".decision-metaphor")&&css.includes("opacity:.025!important")],
    ["mobile touch trajectory",js.includes("touchDrawing")&&js.includes("setPointerCapture")&&portal5css.includes("touch-action:none")],
    ["mobile iris CTA",css.includes(".hero-copy .btn-acid")&&css.includes("background:var(--da-accent)!important")],
    ["interactive trajectory",js.includes("trajectory-canvas")&&js.includes("pointermove")&&js.includes("markCell")],
    ["section metaphors",js.includes("metaphorSpecs")&&js.includes("fragment")&&js.includes("converge")&&js.includes("verify")&&js.includes("resolve")],
    ["section numbering",js.includes("data-n")||js.includes("head.dataset.n")],
    ["pixel boot",js.includes("da-preload")],
    ["scramble interaction",js.includes("const scramble=")],
    ["responsive",css.includes("@media(max-width:820px)")&&css.includes("@media(max-width:480px)")],
    ["cross surface theme bridge",bridgeCss.includes('html[data-theme="light"]')&&bridgeCss.includes('html[data-theme="dark"]')&&bridgeCss.includes("[data-irl-global-nav]")],
    ["reduced motion",css.includes("prefers-reduced-motion")],
    ["decision interaction",js.includes("decisionData")],
    ["llms high level",llms.includes("Organizations evaluating a pilot can request a deeper technical review")],
    ["llms no internals",!llms.includes("MODEL_INDEPENDENCE")&&!llms.includes("requestAuthorization")&&!llms.includes("proprietary evaluators")],
    ["sitemap excludes room",!sitemap.includes("architecture-room")],
    ["sitemap excludes technical docs",!sitemap.includes("mathematics.html")&&!sitemap.includes("library.html")]
  ];
  const themedSurfaces=["praxios.html","mineral-systems.html","lab.html","dashboard.html","review.html","library.html","mathematics.html","praxios-design-system.html","el-puente/index.html"];
  for(const p of themedSurfaces){
    const c=fs.readFileSync(p,"utf8");
    if(!c.includes("data-da-theme-preboot"))errors.push("theme preboot missing "+p);
    if(!c.includes("site-theme-bridge-v1.css"))errors.push("theme bridge missing "+p);
  }
  for(const [name,ok] of checks)if(!ok)errors.push("failed: "+name);
  const links=[...html.matchAll(/href="([^"]+)"/g)].map(m=>m[1]).filter(h=>!h.startsWith("#")&&!h.startsWith("mailto:")&&!h.startsWith("http"));
  for(const href of links){let p=href.split("#")[0].split("?")[0];if(!p)continue;if(p.endsWith("/"))p+="index.html";if(!fs.existsSync(p))errors.push("broken link "+href)}
  for(const f of ["index.html","praxios.html","mineral-systems.html","lab.html","dashboard.html"]){const c=fs.readFileSync(f,"utf8");if(/>\\n\s*</.test(c))errors.push("visible escaped newline "+f)}
}
if(errors.length){console.error(errors.join("\n"));process.exit(1)}
console.log("Deep Analytica design system/public surface validation PASS");
