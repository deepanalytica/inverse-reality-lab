import fs from "node:fs";
const fail=(m)=>{console.error("BOOK VALIDATION FAILED:",m);process.exit(1)};const ok=(c,m)=>{if(!c)fail(m)};
const enhanced=fs.readFileSync("el-puente/index.html","utf8"),original=fs.readFileSync("el-puente/original.html","utf8");
ok(original.length>1_000_000,"archival source is unexpectedly small");ok(enhanced.length>=original.length-500,"enhanced edition must retain the complete source");
ok(/<meta name="viewport"/i.test(enhanced),"viewport metadata missing");ok(enhanced.includes("reader.css")&&enhanced.includes("reader.js"),"reader assets missing");
for(let i=1;i<=39;i++){ok(new RegExp('id=["\\\']cap'+i+'["\\\']').test(enhanced),"missing cap"+i);ok(new RegExp('id=["\\\']cap'+i+'["\\\']').test(original),"archive missing cap"+i)}
for(const id of ["capA","capB","capC","capD","epilogo"]){ok(new RegExp('id=["\\\']'+id+'["\\\']').test(enhanced),"missing "+id);ok(new RegExp('id=["\\\']'+id+'["\\\']').test(original),"archive missing "+id)}
for(const id of ["PARTEILASVISIONES","PARTEIILAFÁBRICA","PARTEIIILOSFUTUROS","PARTEIVLOSARTÍCULOS","PARTEVLASTEORÍASMEDI","PARTEVILASEXPEDICION","PARTEVIIELDEPREDADOR","APENDICES"])ok(enhanced.includes('id="'+id+'"'),"missing part "+id);
for(const needle of ["SÚPER PROMPT EULER","χ — LA CARACTERÍSTICA",">EL PUENTE<","EL ENGRANAJE","EL TIBURÓN","Creative Commons Atribución–CompartirIgual 4.0","MathJax"])ok(enhanced.includes(needle),"missing corpus marker "+needle);
ok((enhanced.match(/<table/g)||[]).length>=40,"tables missing");ok((enhanced.match(/<pre/g)||[]).length>=30,"code/output blocks missing");ok((enhanced.match(/data:image\/png;base64/g)||[]).length>=7,"figures missing");
const css=fs.readFileSync("el-puente/reader.css","utf8"),js=fs.readFileSync("el-puente/reader.js","utf8");ok(css.includes("@media(max-width:760px)"),"mobile breakpoint missing");new Function(js);
const pages=["index.html","dashboard.html","library.html","mathematics.html","mineral-systems.html","praxios-design-system.html","praxios.html","review.html","investor/praxios-universe/index.html","investor/praxios-webos/index.html"];
for(const page of pages){const c=fs.readFileSync(page,"utf8");ok(c.includes("site-nav.js"),"global nav missing from "+page);ok(/<meta[^>]+viewport/i.test(c),"viewport missing from "+page)}
console.log(JSON.stringify({ok:true,numericChapters:39,appendices:4,epilogue:1,archiveBytes:Buffer.byteLength(original),webBytes:Buffer.byteLength(enhanced),globalPages:pages.length},null,2));
