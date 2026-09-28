(() => {
  function boot(){
    if(document.querySelector(".readerShell")) return;
    const body=document.body;
    const scripts=[...body.querySelectorAll("script")];
    const keep=[...body.childNodes].filter(node=>{
      if(node.nodeType===1 && node.matches("[data-irl-global-nav]")) return false;
      if(node.nodeType===1 && node.tagName==="SCRIPT" && node.src && node.src.includes("reader.js")) return false;
      return true;
    });

    const top=document.createElement("header");
    top.className="readerTopbar";
    top.innerHTML=`
      <a class="readerBrand" href="../index.html"><span class="readerMark">SH</span><span class="readerBrandText"><strong>SIN HUMO</strong><small>EL PUENTE · CORPUS COMPLETO</small></span></a>
      <div class="readerCurrent"><span id="readerPart">LIBRO ABIERTO</span><strong id="readerChapter">Prólogo</strong></div>
      <div class="readerTools">
        <button class="readerMobileToc" id="readerTocBtn" aria-label="Abrir índice">☰</button>
        <button data-desktop-only id="readerMinus" aria-label="Reducir texto">A−</button>
        <button data-desktop-only id="readerPlus" aria-label="Aumentar texto">A+</button>
        <button id="readerTheme" aria-label="Cambiar tema">◐</button>
        <a data-desktop-only href="./original.html" title="Fuente archivística íntegra">RAW</a>
      </div>
    `;
    const progress=document.createElement("div");progress.className="readerProgress";progress.innerHTML="<span></span>";
    const shell=document.createElement("div");shell.className="readerShell";
    const aside=document.createElement("aside");aside.className="readerSidebar";
    aside.innerHTML=`<div class="readerSidebarInner"><div class="readerSidebarHead"><span>EDICIÓN WEB</span><strong>Índice navegable</strong><p>39 capítulos · 4 apéndices · epílogo</p><div class="readerStats"><b>CC BY-SA 4.0</b><b>JULIO 2026</b></div></div><div class="readerSearch"><input id="readerSearch" type="search" placeholder="Buscar capítulo o concepto…" aria-label="Buscar en el índice"></div><nav class="readerToc" id="readerToc"></nav></div>`;
    const main=document.createElement("main");main.className="readerMain";
    const article=document.createElement("article");article.id="bookContent";
    keep.forEach(node=>article.appendChild(node));
    const chapterNav=document.createElement("div");chapterNav.className="readerChapterNav";chapterNav.innerHTML=`<button id="readerPrev"><span>ANTERIOR</span><strong>—</strong></button><button id="readerNext"><span>SIGUIENTE</span><strong>—</strong></button>`;
    main.append(article,chapterNav);shell.append(aside,main);
    const scrim=document.createElement("div");scrim.className="readerScrim";scrim.id="readerScrim";
    body.prepend(top,progress,shell,scrim);

    const caps=[...article.querySelectorAll('div[id^="cap"],div#epilogo')];
    const toc=document.getElementById("readerToc");
    const allAnchors=[];
    const sequence=[...article.querySelectorAll('h1[id^="PARTE"],h1#APENDICES,div[id^="cap"],div#epilogo')];

    const titleFor=(el)=>{
      if(el.tagName==="H1") return el.textContent.trim();
      let n=el.nextElementSibling;
      while(n && !["H1","H2"].includes(n.tagName)) n=n.nextElementSibling;
      return n ? n.textContent.trim() : (el.id==="epilogo"?"EPÍLOGO":el.textContent.trim());
    };
    const codeFor=(el)=>{
      if(el.id==="epilogo") return "E";
      if(/^cap[A-D]$/.test(el.id)) return el.id.slice(3);
      const m=el.id.match(/^cap(\\d+)$/); return m?m[1].padStart(2,"0"):"•";
    };

    for(const el of sequence){
      if(el.tagName==="H1"){
        const p=document.createElement("div");p.className="readerTocPart";p.textContent=el.textContent.trim();toc.appendChild(p);
      }else{
        const a=document.createElement("a");a.href="#"+el.id;a.dataset.target=el.id;
        a.innerHTML=`<b>${codeFor(el)}</b><span>${titleFor(el)}</span>`;
        a.addEventListener("click",()=>document.body.classList.remove("readerTocOpen"));
        toc.appendChild(a);allAnchors.push(a);
      }
    }

    const chapterEls=caps.filter(el=>el.id);
    let activeIndex=0;
    const setActive=(id)=>{
      const idx=chapterEls.findIndex(el=>el.id===id);if(idx<0)return;activeIndex=idx;
      allAnchors.forEach(a=>a.classList.toggle("active",a.dataset.target===id));
      const el=chapterEls[idx],title=titleFor(el);
      document.getElementById("readerChapter").textContent=title;
      let prev=el.previousElementSibling,part="";
      while(prev){if(prev.tagName==="H1" && (prev.id.startsWith("PARTE")||prev.id==="APENDICES")){part=prev.textContent.trim();break}prev=prev.previousElementSibling}
      document.getElementById("readerPart").textContent=part||"SIN HUMO";
      const pb=document.getElementById("readerPrev"),nb=document.getElementById("readerNext");
      const p=chapterEls[idx-1],n=chapterEls[idx+1];
      pb.disabled=!p;nb.disabled=!n;
      pb.querySelector("strong").textContent=p?titleFor(p):"Inicio";
      nb.querySelector("strong").textContent=n?titleFor(n):"Fin del libro";
    };

    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>Math.abs(a.boundingClientRect.top)-Math.abs(b.boundingClientRect.top));
      if(visible[0]) setActive(visible[0].target.id);
    },{rootMargin:"-68px 0px -72% 0px",threshold:[0,1]});
    chapterEls.forEach(el=>observer.observe(el));

    document.getElementById("readerPrev").onclick=()=>{const el=chapterEls[activeIndex-1];if(el){location.hash=el.id;el.scrollIntoView({behavior:"smooth"})}};
    document.getElementById("readerNext").onclick=()=>{const el=chapterEls[activeIndex+1];if(el){location.hash=el.id;el.scrollIntoView({behavior:"smooth"})}};

    const updateProgress=()=>{
      const max=document.documentElement.scrollHeight-innerHeight;
      const value=max>0?Math.min(100,Math.max(0,scrollY/max*100)):0;
      progress.firstElementChild.style.width=value+"%";
    };
    addEventListener("scroll",updateProgress,{passive:true});updateProgress();

    const input=document.getElementById("readerSearch");
    input.addEventListener("input",()=>{
      const q=input.value.trim().toLowerCase();
      allAnchors.forEach(a=>{a.hidden=Boolean(q && !a.textContent.toLowerCase().includes(q))});
    });
    input.addEventListener("keydown",e=>{
      if(e.key==="Enter"){const a=allAnchors.find(x=>!x.hidden);if(a){e.preventDefault();a.click();document.querySelector(a.getAttribute("href")).scrollIntoView({behavior:"smooth"})}}
      if(e.key==="Escape"){input.value="";input.dispatchEvent(new Event("input"))}
    });

    const storedTheme=localStorage.getItem("sin-humo-theme");
    if(storedTheme) body.dataset.readerTheme=storedTheme;
    document.getElementById("readerTheme").onclick=()=>{
      body.dataset.readerTheme=body.dataset.readerTheme==="dark"?"light":"dark";
      localStorage.setItem("sin-humo-theme",body.dataset.readerTheme);
    };
    let scale=Number(localStorage.getItem("sin-humo-scale")||"1");
    const applyScale=()=>{scale=Math.max(.88,Math.min(1.22,scale));document.documentElement.style.setProperty("--reader-scale",String(scale));localStorage.setItem("sin-humo-scale",String(scale))};
    applyScale();
    document.getElementById("readerMinus").onclick=()=>{scale-=.05;applyScale()};
    document.getElementById("readerPlus").onclick=()=>{scale+=.05;applyScale()};

    const tocBtn=document.getElementById("readerTocBtn"),scrimEl=document.getElementById("readerScrim");
    tocBtn.onclick=()=>body.classList.toggle("readerTocOpen");scrimEl.onclick=()=>body.classList.remove("readerTocOpen");
    document.addEventListener("keydown",e=>{
      if(e.key==="Escape") body.classList.remove("readerTocOpen");
      if(e.key==="/" && document.activeElement!==input){e.preventDefault();if(innerWidth<=760)body.classList.add("readerTocOpen");input.focus()}
      if(e.altKey && e.key==="ArrowLeft") document.getElementById("readerPrev").click();
      if(e.altKey && e.key==="ArrowRight") document.getElementById("readerNext").click();
    });

    if(location.hash){
      const target=document.querySelector(location.hash);
      if(target) setTimeout(()=>target.scrollIntoView({block:"start"}),80);
    }else if(chapterEls[0]) setActive(chapterEls[0].id);
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",boot,{once:true}); else boot();
})();