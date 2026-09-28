import fs from "node:fs";

const root = process.cwd();
const required = [
  "index.html",
  "lab.html",
  "assets/portal.css",
  "assets/portal.js",
  "site-nav.js",
  "el-puente/index.html",
  "praxios.html",
  "dashboard.html",
  "mineral-systems.html",
  "review.html",
  "investor/praxios-universe/index.html"
];

const failures = [];
for (const file of required) {
  if (!fs.existsSync(file)) failures.push("Missing: " + file);
}

if (!failures.length) {
  const html = fs.readFileSync("index.html", "utf8");
  const css = fs.readFileSync("assets/portal.css", "utf8");
  const js = fs.readFileSync("assets/portal.js", "utf8");
  const nav = fs.readFileSync("site-nav.js", "utf8");

  const obligations = [
    ["Executive hero", html.includes("De la complejidad a")],
    ["Architecture section", html.includes('id="arquitectura"')],
    ["Role switcher", html.includes("data-role-tab")],
    ["EL PUENTE route", html.includes('href="el-puente/"')],
    ["PRAXIOS route", html.includes('href="praxios.html"')],
    ["IRL preserved route", html.includes('href="lab.html"')],
    ["Investor route", html.includes('investor/praxios-universe/')],
    ["Portal stylesheet", html.includes("assets/portal.css")],
    ["Portal script", html.includes("assets/portal.js")],
    ["Mobile breakpoint", css.includes("@media(max-width:760px)")],
    ["Reduced motion", css.includes("prefers-reduced-motion")],
    ["Role JS", js.includes("roleData")],
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
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Portal validation PASS");
