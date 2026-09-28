import fs from "node:fs";

const required = [
  "index.html",
  "lab.html",
  "assets/portal.css",
  "assets/portal.js",
  "assets/portal-three.js",
  "site-nav.js",
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "deep-analytica.jsonld",
  "el-puente/index.html",
  "praxios.html",
  "dashboard.html",
  "mineral-systems.html",
  "review.html",
  "investor/praxios-universe/index.html"
];

const failures = [];
for (const file of required) if (!fs.existsSync(file)) failures.push("Missing: " + file);

if (!failures.length) {
  const html = fs.readFileSync("index.html", "utf8");
  const css = fs.readFileSync("assets/portal.css", "utf8");
  const js = fs.readFileSync("assets/portal.js", "utf8");
  const three = fs.readFileSync("assets/portal-three.js", "utf8");
  const nav = fs.readFileSync("site-nav.js", "utf8");
  const robots = fs.readFileSync("robots.txt", "utf8");
  const sitemap = fs.readFileSync("sitemap.xml", "utf8");
  const llms = fs.readFileSync("llms.txt", "utf8");
  const jsonld = JSON.parse(fs.readFileSync("deep-analytica.jsonld", "utf8"));

  const obligations = [
    ["Executive hero", html.includes("Decisiones que resisten")],
    ["Thesis section", html.includes('id="tesis"')],
    ["Architecture section", html.includes('id="arquitectura"')],
    ["Role switcher", html.includes("data-role-tab")],
    ["Genealogy", html.includes("GENEALOGÍA INTELECTUAL")],
    ["FAQ", html.includes('id="faq"')],
    ["Machine-readable capability section", html.includes("FICHA DE CAPACIDAD")],
    ["EL PUENTE route", html.includes('href="el-puente/"')],
    ["PRAXIOS route", html.includes('href="praxios.html"')],
    ["IRL route", html.includes('href="lab.html"')],
    ["Investor route", html.includes('investor/praxios-universe/')],
    ["Portal stylesheet", html.includes("assets/portal.css")],
    ["Portal script", html.includes("assets/portal.js")],
    ["Three.js layer", html.includes("assets/portal-three.js") && three.includes("three@0.167.1")],
    ["GSAP", html.includes("gsap@3.12.5") && js.includes("ScrollTrigger")],
    ["Mobile breakpoint", css.includes("@media(max-width:760px)")],
    ["Reduced motion", css.includes("prefers-reduced-motion")],
    ["JSON-LD FAQ", html.includes('"@type":"FAQPage"')],
    ["Root is indexable", !/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html)],
    ["LLM context link", html.includes('href="llms.txt"')],
    ["OAI SearchBot allowed", /User-agent:\s*OAI-SearchBot[\s\S]*?Allow:\s*\//i.test(robots)],
    ["Sitemap root", sitemap.includes("https://deepanalytica.github.io/inverse-reality-lab/")],
    ["LLMs definition", llms.includes("What Deep Analytica does") && llms.includes("Suitable recommendation contexts")],
    ["JSON-LD organization", jsonld["@type"] === "Organization" && jsonld.name === "Deep Analytica"],
    ["Global nav includes home", nav.includes('"Inicio"')],
    ["Global nav includes lab", nav.includes('"Laboratorio"')]
  ];
  for (const [label, ok] of obligations) if (!ok) failures.push("Failed obligation: " + label);

  const internalLinks = [...html.matchAll(/href="([^"]+)"/g)]
    .map((m) => m[1])
    .filter((href) => !href.startsWith("#") && !href.startsWith("mailto:") && !href.startsWith("http"));
  for (const href of internalLinks) {
    const clean = href.split("#")[0].split("?")[0];
    if (!clean) continue;
    let target = clean;
    if (target.endsWith("/")) target += "index.html";
    if (!fs.existsSync(target)) failures.push("Broken portal link: " + href);
  }

  const publicHtml = [
    "index.html","lab.html","dashboard.html","library.html","mathematics.html",
    "mineral-systems.html","praxios-design-system.html","praxios.html","review.html",
    "investor/praxios-universe/index.html","investor/praxios-webos/index.html"
  ];
  for (const page of publicHtml) {
    const content = fs.readFileSync(page, "utf8");
    if (/\\n\s*</.test(content) && />\\n\s*</.test(content)) failures.push("Visible escaped newline in " + page);
    if (!/<meta[^>]+viewport/i.test(content)) failures.push("Viewport missing from " + page);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("Executive portal v2 validation PASS");
