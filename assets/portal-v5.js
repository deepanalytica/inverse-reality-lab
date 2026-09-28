(() => {
  document.documentElement.classList.remove("portal-v4");
  document.documentElement.classList.add("portal-v5");
  if(matchMedia("(pointer:fine)").matches) document.documentElement.classList.add("pointer-fine");

  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header=document.querySelector("[data-header]");
  const menu=document.querySelector("[data-menu]");
  const mobile=document.querySelector("[data-mobile]");

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

  /* Pixel boot uses the Deep Analytica iris signal, not the reference blue. */
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
    mark.innerHTML="<i></i><b>DEEP ANALYTICA</b><span>DECISION FIELD / BOOT</span>";
    loader.appendChild(mark);
    document.body.prepend(loader);
    const cells=[...grid.children];
    if(window.gsap){
      gsap.set(cells,{opacity:0});
      gsap.to(cells,{opacity:1,duration:.055,stagger:{each:.008,from:"random"},ease:"none"});
      gsap.to(cells,{opacity:0,duration:.1,delay:.64,stagger:{each:.005,from:"random"},ease:"none"});
      gsap.to(mark,{opacity:0,y:-4,duration:.18,delay:.9});
      gsap.delayedCall(1.05,()=>loader.classList.add("is-done"));
      gsap.delayedCall(1.4,()=>loader.remove());
    }else{
      setTimeout(()=>loader.classList.add("is-done"),760);
      setTimeout(()=>loader.remove(),1200);
    }
  }

  const sectionHeads=[...document.querySelectorAll(".section-head")];
  sectionHeads.forEach((head,i)=>{
    head.dataset.n=String(i+1).padStart(2,"0")+" / "+String(sectionHeads.length).padStart(2,"0");
    const kicker=head.querySelector(".kicker");
    head.dataset.label=(kicker?.textContent||"SECTION").trim();
    const rule=document.createElement("i");
    rule.className="da-rule";
    head.appendChild(rule);
  });

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
    const apply=()=>{
      if(label)label.textContent=d.label;
      if(title)title.textContent=d.title;
      if(copy)copy.textContent=d.copy;
      if(questions)questions.innerHTML=d.questions.map(q=>"<li>"+q+"</li>").join("");
    };
    if(window.gsap&&!reduced){
      gsap.to([title,copy,questions],{opacity:0,y:6,duration:.1,onComplete:()=>{
        apply();
        gsap.to([title,copy,questions],{opacity:1,y:0,duration:.26,stagger:.03,ease:"power2.out"});
      }});
    }else apply();
  };
  tabs.forEach(b=>b.addEventListener("click",()=>setDecision(b.dataset.decision)));

  document.querySelectorAll(".faq details").forEach(d=>d.addEventListener("toggle",()=>{
    if(d.open)document.querySelectorAll(".faq details[open]").forEach(o=>{if(o!==d)o.removeAttribute("open")});
  }));

  /* ── Hero decision trajectory ───────────────────────────── */
  const stage=document.querySelector(".machine-stage");
  if(stage){
    stage.tabIndex=0;
    stage.setAttribute("role","application");
    stage.setAttribute("aria-label","Campo de decisión interactivo. Mueva el cursor o use las flechas para recorrer y conectar celdas.");

    const cols=18,rows=10,count=cols*rows;
    const grid=document.createElement("div");
    grid.className="pixel-signal-grid";
    grid.setAttribute("aria-hidden","true");
    for(let i=0;i<count;i++){const cell=document.createElement("i");cell.dataset.i=i;grid.appendChild(cell)}
    stage.prepend(grid);
    const cells=[...grid.children];

    const canvas=document.createElement("canvas");
    canvas.className="trajectory-canvas";
    canvas.setAttribute("aria-hidden","true");
    stage.appendChild(canvas);
    const ctx=canvas.getContext("2d");
    const points=[];
    const cellTimes=new Map();
    let keyCol=2,keyRow=2;
    let raf=0;

    const fitCanvas=()=>{
      const rect=stage.getBoundingClientRect();
      const dpr=Math.min(devicePixelRatio||1,2);
      canvas.width=Math.max(1,Math.round(rect.width*dpr));
      canvas.height=Math.max(1,Math.round(rect.height*dpr));
      canvas.style.width=rect.width+"px";
      canvas.style.height=rect.height+"px";
      ctx?.setTransform(dpr,0,0,dpr,0,0);
    };
    fitCanvas();
    new ResizeObserver(fitCanvas).observe(stage);

    const markCell=(col,row,time=performance.now())=>{
      if(col<0||row<0||col>=cols||row>=rows)return;
      const idx=row*cols+col;
      cellTimes.set(idx,time);
      cells[idx]?.classList.add("trace-3");
      [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{
        const n=(row+dy)*cols+(col+dx);
        if(col+dx>=0&&col+dx<cols&&row+dy>=0&&row+dy<rows) cells[n]?.classList.add("trace-near");
      });
    };

    const addPoint=(x,y,time=performance.now())=>{
      points.push({x,y,t:time});
      if(points.length>90)points.splice(0,points.length-90);
      const rect=stage.getBoundingClientRect();
      const col=Math.max(0,Math.min(cols-1,Math.floor((x/rect.width)*cols)));
      const row=Math.max(0,Math.min(rows-1,Math.floor((y/rect.height)*rows)));
      markCell(col,row,time);
    };

    const draw=now=>{
      if(ctx){
        const rect=stage.getBoundingClientRect();
        ctx.clearRect(0,0,rect.width,rect.height);
        const live=points.filter(p=>now-p.t<1500);
        points.splice(0,points.length,...live);
        for(let i=1;i<live.length;i++){
          const a=live[i-1],b=live[i];
          const age=now-b.t;
          const alpha=Math.max(0,1-age/1500);
          ctx.beginPath();
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.lineWidth=1.25+alpha*1.8;
          ctx.strokeStyle="rgba(146,127,255,"+(alpha*.82).toFixed(3)+")";
          ctx.stroke();
          if(i%5===0){
            ctx.fillStyle="rgba(206,199,255,"+(alpha*.72).toFixed(3)+")";
            ctx.fillRect(b.x-2,b.y-2,4,4);
          }
        }
      }

      cellTimes.forEach((t,idx)=>{
        const age=now-t,cell=cells[idx];
        cell?.classList.remove("trace-1","trace-2","trace-3");
        if(age<330)cell?.classList.add("trace-3");
        else if(age<780)cell?.classList.add("trace-2");
        else if(age<1500)cell?.classList.add("trace-1");
        else{
          cellTimes.delete(idx);
          cell?.classList.remove("trace-near");
        }
      });
      raf=requestAnimationFrame(draw);
    };
    if(!reduced)raf=requestAnimationFrame(draw);

    let last=null;
    stage.addEventListener("pointermove",e=>{
      if(e.pointerType==="touch")return;
      const rect=stage.getBoundingClientRect();
      const x=e.clientX-rect.left,y=e.clientY-rect.top;
      const now=performance.now();
      if(last){
        const dx=x-last.x,dy=y-last.y,dist=Math.hypot(dx,dy);
        const steps=Math.max(1,Math.ceil(dist/16));
        for(let s=1;s<=steps;s++)addPoint(last.x+dx*s/steps,last.y+dy*s/steps,now-s);
      }else addPoint(x,y,now);
      last={x,y};
    },{passive:true});
    stage.addEventListener("pointerleave",()=>{last=null});

    stage.addEventListener("keydown",e=>{
      const keys={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
      if(!keys[e.key])return;
      e.preventDefault();
      keyCol=Math.max(0,Math.min(cols-1,keyCol+keys[e.key][0]));
      keyRow=Math.max(0,Math.min(rows-1,keyRow+keys[e.key][1]));
      const rect=stage.getBoundingClientRect();
      addPoint((keyCol+.5)/cols*rect.width,(keyRow+.5)/rows*rect.height);
    });

    /* seed a calm initial route so the field communicates before interaction */
    const seed=[[2,2],[3,2],[4,3],[5,3],[6,4],[7,4],[8,4],[9,5],[10,5],[11,5],[12,6],[13,6],[14,7]];
    seed.forEach(([c,r],i)=>setTimeout(()=>{
      const rect=stage.getBoundingClientRect();
      addPoint((c+.5)/cols*rect.width,(r+.5)/rows*rect.height);
      if(i===seed.length-1)cells[r*cols+c]?.classList.add("locked");
    },1050+i*55));
  }

  /* ── Reusable section metaphors ────────────────────────── */
  const metaphorSpecs=[
    {selector:"#dolor",mode:"fragment",label:"FRAGMENTED SIGNALS"},
    {selector:".how-section",mode:"flow",label:"DECISION PATH"},
    {selector:".integration",mode:"converge",label:"CONVERGING SOURCES"},
    {selector:".evidence-section",mode:"verify",label:"EVIDENCE LOCK"},
    {selector:".final",mode:"resolve",label:"DECISION / OUTCOME"}
  ];

  const makePattern=(mode,cols,rows)=>{
    const p=[];
    if(mode==="fragment"){
      return [4,8,20,28,31,38,51,59,74,81,91,98].filter(i=>i<cols*rows);
    }
    if(mode==="flow"){
      for(let c=1;c<cols-1;c++)p.push(Math.min(rows-1,Math.floor(1+(c/(cols-2))*(rows-3)))*cols+c);
    }
    if(mode==="converge"){
      const center=Math.floor(rows/2)*cols+Math.floor(cols/2);
      const corners=[[0,0],[cols-1,0],[0,rows-1],[cols-1,rows-1]];
      corners.forEach(([cx,cy])=>{
        for(let s=0;s<=6;s++){
          const x=Math.round(cx+(Math.floor(cols/2)-cx)*s/6);
          const y=Math.round(cy+(Math.floor(rows/2)-cy)*s/6);
          p.push(y*cols+x);
        }
      });
      p.push(center);
    }
    if(mode==="verify"){
      p.push(17,18,19,34,35,36,50,51,52,68,69,83,84,85,99);
    }
    if(mode==="resolve"){
      for(let c=1;c<Math.floor(cols/2);c++){
        p.push(1*cols+c,(rows-2)*cols+c);
      }
      for(let c=Math.floor(cols/2);c<cols-1;c++)p.push(Math.floor(rows/2)*cols+c);
    }
    return [...new Set(p.filter(i=>i>=0&&i<cols*rows))];
  };

  metaphorSpecs.forEach(spec=>{
    const section=document.querySelector(spec.selector);
    if(!section)return;
    const cols=16,rows=7,total=cols*rows;
    const field=document.createElement("div");
    field.className="decision-metaphor";
    field.dataset.mode=spec.mode;
    field.setAttribute("aria-hidden","true");
    field.innerHTML='<div class="decision-metaphor-grid"></div><span class="decision-metaphor-label">'+spec.label+"</span>";
    const g=field.querySelector(".decision-metaphor-grid");
    for(let i=0;i<total;i++){const cell=document.createElement("i");cell.dataset.i=i;g.appendChild(cell)}
    section.prepend(field);
    const cells=[...g.children];
    const pattern=makePattern(spec.mode,cols,rows);

    if(spec.mode==="fragment") [20,51,91].forEach(i=>cells[i]?.classList.add("broken"));
    if(spec.mode==="verify") [35,51,69,84].forEach(i=>cells[i]?.classList.add("verified"));

    const activate=()=>{
      pattern.forEach((idx,i)=>setTimeout(()=>{
        const cell=cells[idx];if(!cell)return;
        cell.classList.add(i===pattern.length-1?"signal":(i%4===0?"hot":"on"));
        if(spec.mode==="verify"&&[35,51,69,84].includes(idx))cell.classList.add("verified");
      },i*(spec.mode==="converge"?36:52)));
    };

    if("IntersectionObserver" in window){
      const io=new IntersectionObserver(entries=>entries.forEach(e=>{
        if(e.isIntersecting){activate();io.disconnect()}
      }),{threshold:.16});
      io.observe(section);
    }else activate();

    if(matchMedia("(pointer:fine)").matches&&!reduced){
      let touched=[];
      field.addEventListener("pointermove",e=>{
        const rect=field.getBoundingClientRect();
        const c=Math.max(0,Math.min(cols-1,Math.floor((e.clientX-rect.left)/rect.width*cols)));
        const r=Math.max(0,Math.min(rows-1,Math.floor((e.clientY-rect.top)/rect.height*rows)));
        const idx=r*cols+c;
        cells[idx]?.classList.add("pointer-hit");
        [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{
          const x=c+dx,y=r+dy;
          if(x>=0&&x<cols&&y>=0&&y<rows)cells[y*cols+x]?.classList.add("pointer-near");
        });
        touched.push(idx);
        if(touched.length>8){
          const old=touched.shift();
          if(!pattern.includes(old)&&![35,51,69,84].includes(old))cells[old]?.classList.remove("pointer-hit","pointer-near");
        }
      },{passive:true});
    }
  });

  const heroEm=document.querySelector(".hero h1 em");
  if(heroEm&&!reduced){
    const finalText=heroEm.textContent.trim();
    heroEm.setAttribute("aria-label",finalText);
    heroEm.textContent="";
    heroEm.classList.add("typing");
    let i=0;
    const type=()=>{
      i+=1;heroEm.textContent=finalText.slice(0,i);
      if(i<finalText.length)setTimeout(type,30);
      else setTimeout(()=>heroEm.classList.remove("typing"),600);
    };
    setTimeout(type,1080);
  }

  const chars="!<>-_[]{}—=+*^?#01";
  const scramble=el=>{
    if(reduced||el.dataset.scrambling==="1")return;
    const original=el.dataset.original||el.textContent;
    el.dataset.original=original;el.dataset.scrambling="1";
    let frame=0,max=9;
    const tick=()=>{
      const p=frame/max;
      el.textContent=[...original].map((ch,i)=>ch===" "?" ":(i/original.length<p?ch:chars[(i+frame*3)%chars.length])).join("");
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

  if(window.gsap&&window.ScrollTrigger&&!reduced){
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add("gsap-ready");

    const delay=1.0;
    gsap.from(".hero-copy>.kicker",{opacity:0,y:8,duration:.32,delay});
    gsap.from(".hero h1",{opacity:0,y:16,duration:.58,delay:delay+.12,ease:"power3.out"});
    gsap.from(".lead,.support,.principle,.hero-copy>.actions,.micro-proof",{opacity:0,y:11,duration:.46,stagger:.05,delay:delay+.3,ease:"power2.out"});
    gsap.from(".hero-machine",{opacity:0,x:22,duration:.7,delay:delay+.08,ease:"power3.out"});
    gsap.from(".machine-core",{opacity:0,scale:.94,duration:.52,delay:delay+.3,ease:"power3.out"});
    gsap.from(".machine-input,.machine-output",{opacity:0,y:7,duration:.34,stagger:.045,delay:delay+.38});

    gsap.utils.toArray(".section-head").forEach(head=>{
      const rule=head.querySelector(".da-rule");
      if(rule)gsap.to(rule,{scaleX:1,duration:.65,ease:"power2.out",scrollTrigger:{trigger:head,start:"top 83%",once:true}});
      gsap.from(head.querySelectorAll(".kicker,h2,p"),{opacity:0,y:14,duration:.52,stagger:.06,ease:"power3.out",scrollTrigger:{trigger:head,start:"top 85%",once:true}});
    });
    gsap.utils.toArray(".symptom,.deliverables article,.commercial-grid article,.disclosure-grid article,.evidence-card,.difference-grid article").forEach((el,i)=>{
      gsap.from(el,{opacity:0,y:16,duration:.44,delay:(i%4)*.02,ease:"power2.out",scrollTrigger:{trigger:el,start:"top 90%",once:true}});
    });
    gsap.utils.toArray(".compare-card,.decision-answer,.stack-map,.birth-flow,.deployment-note,.model-rule").forEach(el=>{
      gsap.from(el,{opacity:0,y:20,duration:.58,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 88%",once:true}});
    });
    gsap.to(".machine-core",{y:-7,duration:2.5,yoyo:true,repeat:-1,ease:"sine.inOut"});
  }else{
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.08});
    document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
  }
})();