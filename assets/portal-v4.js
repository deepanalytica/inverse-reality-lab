(() => {
  document.documentElement.classList.add("portal-v4");

  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header=document.querySelector("[data-header]");
  const menu=document.querySelector("[data-menu]");
  const mobile=document.querySelector("[data-mobile]");

  /* ── navigation ─────────────────────────────────────────── */
  const setMenu=open=>{
    mobile?.classList.toggle("open",open);
    mobile?.setAttribute("aria-hidden",String(!open));
    menu?.setAttribute("aria-expanded",String(open));
  };
  menu?.addEventListener("click",()=>setMenu(!mobile?.classList.contains("open")));
  mobile?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>setMenu(false)));
  document.addEventListener("keydown",e=>{if(e.key==="Escape")setMenu(false)});

  const progress=document.createElement("div");
  progress.className="da-progress";
  progress.innerHTML="<i></i>";
  document.body.appendChild(progress);
  const progressBar=progress.querySelector("i");

  const onScroll=()=>{
    header?.classList.toggle("scrolled",scrollY>24);
    const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
    if(progressBar) progressBar.style.width=(Math.min(1,scrollY/max)*100)+"%";
  };
  onScroll();
  addEventListener("scroll",onScroll,{passive:true});

  /* ── pixel boot: inspired by the reference, rebuilt for DA ─ */
  if(!reduced){
    const loader=document.createElement("div");
    loader.className="da-preload";
    loader.setAttribute("aria-hidden","true");
    const grid=document.createElement("div");
    grid.className="da-preload-grid";
    for(let i=0;i<84;i++){
      const cell=document.createElement("i");
      cell.className="da-preload-cell";
      if([17,18,19,20,29,30,31,42,43,54].includes(i)) cell.classList.add("is-blue");
      if([16,28,41,53].includes(i)) cell.classList.add("is-ghost");
      grid.appendChild(cell);
    }
    loader.appendChild(grid);
    const mark=document.createElement("div");
    mark.className="da-preload-mark";
    mark.innerHTML="<i></i><b>DEEP ANALYTICA</b><span>DECISION SYSTEMS / BOOT</span>";
    loader.appendChild(mark);
    document.body.prepend(loader);

    const cells=[...grid.children];
    if(window.gsap){
      gsap.set(cells,{opacity:0});
      gsap.to(cells,{opacity:1,duration:.06,stagger:{each:.009,from:"random"},ease:"none"});
      gsap.to(cells,{opacity:0,duration:.12,delay:.72,stagger:{each:.006,from:"random"},ease:"none"});
      gsap.to(mark,{opacity:0,y:-4,duration:.2,delay:1.0});
      gsap.delayedCall(1.18,()=>loader.classList.add("is-done"));
      gsap.delayedCall(1.6,()=>loader.remove());
    }else{
      setTimeout(()=>loader.classList.add("is-done"),850);
      setTimeout(()=>loader.remove(),1300);
    }
  }

  /* ── section numbering / editorial metadata ────────────── */
  const sectionHeads=[...document.querySelectorAll(".section-head")];
  sectionHeads.forEach((head,i)=>{
    head.dataset.n=String(i+1).padStart(2,"0")+" / "+String(sectionHeads.length).padStart(2,"0");
    const kicker=head.querySelector(".kicker");
    head.dataset.label=(kicker?.textContent||"SECTION").trim();
    const rule=document.createElement("i");
    rule.className="da-rule";
    head.appendChild(rule);
  });

  /* ── decision selector ─────────────────────────────────── */
  const decisionData={
    invest:{label:"CAPITAL / PRIORIDAD",title:"¿Qué opción merece recursos y por qué?",copy:"Reúna escenarios, evidencia, restricciones, supuestos y riesgos bajo un mismo criterio de decisión. Haga visible qué podría cambiar la recomendación antes de comprometer capital.",questions:["¿Qué evidencia sostiene cada alternativa?","¿Qué supuestos son críticos?","¿Qué desconocido podría cambiar la decisión?","¿Quién está autorizado para actuar?"]},
    act:{label:"OPERACIÓN / INTERVENCIÓN",title:"¿Actuamos ahora o necesitamos medir primero?",copy:"Separe señal, incertidumbre y consecuencias. Identifique qué información adicional tiene capacidad real para cambiar la acción.",questions:["¿Qué ocurre si no actuamos?","¿Cuál es el costo del error?","¿Qué medición reduciría incertidumbre útil?","¿Qué condición habilita la acción?"]},
    risk:{label:"RIESGO",title:"¿Qué riesgo estamos aceptando realmente?",copy:"Haga explícitos exposición, supuestos, alternativas y señales tempranas antes de convertir tolerancia al riesgo en una frase genérica.",questions:["¿Qué escenario estamos subestimando?","¿Qué evidencia contradice la lectura dominante?","¿Cuál es el riesgo residual?","¿Quién acepta formalmente ese riesgo?"]},
    delegate:{label:"IA / DELEGACIÓN",title:"¿Qué puede hacer la IA y dónde debe detenerse?",copy:"Separe capacidad técnica de autoridad. Diseñe qué puede investigar, proponer o ejecutar un sistema y qué exige control humano.",questions:["¿Qué acciones son reversibles?","¿Qué necesita revisión independiente?","¿Qué datos puede utilizar?","¿Quién autoriza efectos externos?"]},
    hypothesis:{label:"I+D / HIPÓTESIS",title:"¿La explicación resiste una prueba seria?",copy:"Transforme una hipótesis convincente en obligaciones observables: evidencia esperada, alternativas, predicciones discriminantes y criterios de abandono.",questions:["¿Qué observación la refutaría?","¿Qué explicación rival compite?","¿Qué parte no es identificable?","¿Qué experimento discrimina mejor?"]}
  };
  const tabs=[...document.querySelectorAll("[data-decision]")];
  const label=document.querySelector("[data-decision-label]");
  const title=document.querySelector("[data-decision-title]");
  const copy=document.querySelector("[data-decision-copy]");
  const questions=document.querySelector("[data-decision-questions]");
  const setDecision=k=>{
    const d=decisionData[k]; if(!d)return;
    tabs.forEach(b=>b.classList.toggle("active",b.dataset.decision===k));
    if(window.gsap&&!reduced){
      gsap.to([title,copy,questions],{opacity:0,y:6,duration:.12,onComplete:()=>{
        label.textContent=d.label; title.textContent=d.title; copy.textContent=d.copy;
        questions.innerHTML=d.questions.map(q=>"<li>"+q+"</li>").join("");
        gsap.to([title,copy,questions],{opacity:1,y:0,duration:.28,stagger:.035,ease:"power2.out"});
      }});
    }else{
      label.textContent=d.label;title.textContent=d.title;copy.textContent=d.copy;
      questions.innerHTML=d.questions.map(q=>"<li>"+q+"</li>").join("");
    }
  };
  tabs.forEach(b=>b.addEventListener("click",()=>setDecision(b.dataset.decision)));

  /* ── FAQ behavior ──────────────────────────────────────── */
  document.querySelectorAll(".faq details").forEach(d=>d.addEventListener("toggle",()=>{
    if(d.open)document.querySelectorAll(".faq details[open]").forEach(o=>{if(o!==d)o.removeAttribute("open")});
  }));

  /* ── pixel decision field ──────────────────────────────── */
  const stage=document.querySelector(".machine-stage");
  if(stage){
    const pg=document.createElement("div");
    pg.className="pixel-signal-grid";
    const n=96;
    for(let i=0;i<n;i++){const cell=document.createElement("i");cell.dataset.i=i;pg.appendChild(cell)}
    stage.prepend(pg);
    const cells=[...pg.children];
    const path=[6,7,8,9,10,26,42,58,57,56,55,54,70,69,68,67,66];
    path.forEach((idx,j)=>cells[idx]?.classList.add(j%4===0?"hot":j%3===0?"warm":"trace"));
    if(!reduced){
      let t=0;
      setInterval(()=>{
        const idx=path[t%path.length],prev=path[(t-3+path.length)%path.length];
        cells.forEach(c=>c.classList.remove("hot"));
        cells[idx]?.classList.add("hot");
        cells[prev]?.classList.add("warm");
        t++;
      },360);
    }
  }

  /* ── one-shot terminal typing in hero ──────────────────── */
  const heroEm=document.querySelector(".hero h1 em");
  if(heroEm&&!reduced){
    const finalText=heroEm.textContent.trim();
    heroEm.setAttribute("aria-label",finalText);
    heroEm.textContent="";
    heroEm.classList.add("typing");
    let i=0;
    const type=()=>{
      i+=1;
      heroEm.textContent=finalText.slice(0,i);
      if(i<finalText.length) setTimeout(type,34);
      else setTimeout(()=>heroEm.classList.remove("typing"),700);
    };
    setTimeout(type,1250);
  }

  /* ── lightweight hover scramble, no proprietary GSAP plugin */
  const chars="!<>-_[]{}—=+*^?#01";
  const scramble=(el)=>{
    if(reduced||el.dataset.scrambling==="1")return;
    const original=el.dataset.original||el.textContent;
    el.dataset.original=original;
    el.dataset.scrambling="1";
    let frame=0;
    const max=10;
    const tick=()=>{
      const p=frame/max;
      el.textContent=[...original].map((ch,i)=>{
        if(ch===" ")return " ";
        if(i/original.length<p)return ch;
        return chars[(i+frame*3)%chars.length];
      }).join("");
      frame++;
      if(frame<=max)requestAnimationFrame(tick);
      else{el.textContent=original;el.dataset.scrambling="0"}
    };
    tick();
  };
  document.querySelectorAll(".nav a,.quiet-link,.kicker,.evidence-card b,.disclosure-grid a").forEach(el=>{
    el.dataset.scrambleHover="";
    el.addEventListener("mouseenter",()=>scramble(el));
  });

  /* ── GSAP motion system ────────────────────────────────── */
  if(window.gsap&&window.ScrollTrigger&&!reduced){
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add("gsap-ready");

    const delay=1.12;
    gsap.from(".hero-machine",{opacity:0,duration:.45,delay,ease:"power1.out"});
    gsap.from(".machine-core",{scale:.92,opacity:0,duration:.55,delay:delay+.12,ease:"power3.out"});
    gsap.from(".machine-input,.machine-output",{opacity:0,y:8,duration:.4,stagger:.06,delay:delay+.18,ease:"power2.out"});
    gsap.from(".hero-copy>.kicker",{opacity:0,y:8,duration:.35,delay:delay+.18});
    gsap.from(".hero h1",{opacity:0,y:18,duration:.65,delay:delay+.2,ease:"power3.out"});
    gsap.from(".lead,.support,.principle,.hero-copy>.actions,.micro-proof",{opacity:0,y:12,duration:.5,stagger:.055,delay:delay+.42,ease:"power2.out"});

    gsap.utils.toArray(".section-head").forEach(head=>{
      const rule=head.querySelector(".da-rule");
      if(rule)gsap.to(rule,{scaleX:1,duration:.7,ease:"power2.out",scrollTrigger:{trigger:head,start:"top 82%",once:true}});
      gsap.from(head.querySelectorAll(".kicker,h2,p"),{opacity:0,y:16,duration:.58,stagger:.07,ease:"power3.out",scrollTrigger:{trigger:head,start:"top 84%",once:true}});
    });

    gsap.utils.toArray(".symptom,.deliverables article,.commercial-grid article,.disclosure-grid article,.evidence-card,.difference-grid article").forEach((el,i)=>{
      gsap.from(el,{opacity:0,y:18,duration:.48,delay:(i%4)*.025,ease:"power2.out",scrollTrigger:{trigger:el,start:"top 90%",once:true}});
    });

    gsap.utils.toArray(".compare-card,.decision-answer,.stack-map,.birth-flow,.deployment-note,.model-rule").forEach(el=>{
      gsap.from(el,{opacity:0,y:22,duration:.62,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 88%",once:true}});
    });

    gsap.to(".machine-core",{y:-9,duration:2.4,yoyo:true,repeat:-1,ease:"sine.inOut"});
    gsap.to(".machine-output",{xPercent:1.6,duration:1.8,yoyo:true,repeat:-1,ease:"sine.inOut"});

    gsap.utils.toArray(".identity h2").forEach(el=>{
      gsap.from(el,{letterSpacing:"-.02em",opacity:.15,duration:1.1,ease:"power2.out",scrollTrigger:{trigger:el,start:"top 80%",once:true}});
    });
  }else{
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.08});
    document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
  }
})();