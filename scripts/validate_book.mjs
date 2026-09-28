import fs from "node:fs";

const fail = (message) => {
  console.error("BOOK VALIDATION FAILED:", message);
  process.exit(1);
};
const ok = (condition, message) => { if (!condition) fail(message); };

const enhanced = fs.readFileSync("el-puente/index.html", "utf8");
const original = fs.readFileSync("el-puente/original.html", "utf8");

ok(original.length > 1_000_000, "archival source is unexpectedly small");
ok(enhanced.length >= original.length, "enhanced edition must contain the complete source plus reader layer");
ok(/<meta name="viewport"/i.test(enhanced), "viewport metadata missing");
ok(/@media\(max-width:760px\)/.test(enhanced), "mobile reader breakpoint missing");
ok(/readerSidebar/.test(enhanced) && /readerChapterNav/.test(enhanced), "reader navigation missing");
ok(/readerSearch/.test(enhanced) && /readerProgress/.test(enhanced), "search/progress controls missing");
ok(/\.\.\/site-nav\.js/.test(enhanced), "global site navigation missing from book");

for (let i = 1; i <= 39; i += 1) {
  ok(new RegExp('id=["\\\']cap' + i + '["\\\']').test(enhanced), "missing chapter cap" + i);
  ok(new RegExp('id=["\\\']cap' + i + '["\\\']').test(original), "archival source missing chapter cap" + i);
}
for (const id of ["capA","capB","capC","capD","epilogo"]) {
  ok(new RegExp('id=["\\\']' + id + '["\\\']').test(enhanced), "missing " + id);
  ok(new RegExp('id=["\\\']' + id + '["\\\']').test(original), "archival source missing " + id);
}
for (const id of [
  "PARTEILASVISIONES","PARTEIILAFÁBRICA","PARTEIIILOSFUTUROS","PARTEIVLOSARTÍCULOS",
  "PARTEVLASTEORÍASMEDI","PARTEVILASEXPEDICION","PARTEVIIELDEPREDADOR","APENDICES"
]) {
  ok(enhanced.includes('id="' + id + '"'), "missing part anchor " + id);
}

ok(enhanced.includes("SÚPER PROMPT EULER"), "Euler chapter missing");
ok(enhanced.includes("χ — LA CARACTERÍSTICA"), "Characteristic chapter missing");
ok(enhanced.includes(">EL PUENTE<"), "EL PUENTE chapter missing");
ok(enhanced.includes("EL ENGRANAJE"), "EL ENGRANAJE missing");
ok(enhanced.includes("EL TIBURÓN"), "EL TIBURÓN missing");
ok(enhanced.includes("Creative Commons Atribución–CompartirIgual 4.0"), "book license missing");
ok((enhanced.match(/<table/g) || []).length >= 40, "expected tables missing");
ok((enhanced.match(/<pre/g) || []).length >= 30, "expected code/output blocks missing");
ok((enhanced.match(/data:image\/png;base64/g) || []).length >= 7, "embedded figures missing");
ok(enhanced.includes("MathJax"), "MathJax support missing");

const readerMatch = enhanced.match(/<script data-book-reader>([\s\S]*?)<\/script>/);
ok(readerMatch, "reader script missing");
try { new Function(readerMatch[1]); } catch (error) { fail("reader script syntax: " + error.message); }

const globalPages = [
  "index.html","dashboard.html","library.html","mathematics.html","mineral-systems.html",
  "praxios-design-system.html","praxios.html","review.html",
  "investor/praxios-universe/index.html","investor/praxios-webos/index.html"
];
for (const page of globalPages) {
  const content = fs.readFileSync(page, "utf8");
  ok(content.includes("site-nav.js"), "global nav missing from " + page);
  ok(/<meta[^>]+viewport/i.test(content), "responsive viewport missing from " + page);
}

console.log(JSON.stringify({
  ok: true,
  numericChapters: 39,
  appendices: 4,
  epilogue: 1,
  enhancedBytes: Buffer.byteLength(enhanced),
  archivalBytes: Buffer.byteLength(original),
  globalPages: globalPages.length
}, null, 2));
