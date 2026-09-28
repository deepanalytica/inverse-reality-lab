(() => {
  const header=document.querySelector("[data-header]"),menu=document.querySelector("[data-menu]"),mobile=document.querySelector("[data-mobile]");
  const setMenu=open=>{mobile?.classList.toggle("open",open);mobile?.setAttribute("aria-hidden",String(!open));menu?.setAttribute("aria-expanded",String(open));};
  menu?.addEventListener("click",()=>setMenu(!mobile?.classList.contains("open")));
  mobile?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>setMenu(false)));
  document.addEventListener("keydown",e=>{if(e.key==="Escape")setMenu(false)});
  const onScroll=()=>header?.classList.toggle("scrolled",scrollY>24);onScroll();addEventListener("scroll",onScroll,{passive:true});

  const decisionData={
    invest:{label:"CAPITAL / PRIORIDAD",title:"¿Qué opción merece recursos y por qué?",copy:"Reúna escenarios, evidencia, restricciones, supuestos y riesgos bajo un mismo criterio de decisión. Haga visible qué podría cambiar la recomendación antes de comprometer capital.",questions:["¿Qué evidencia sostiene cada alternativa?","¿Qué supuestos son críticos?","¿Qué desconocido podría cambiar la decisión?","¿Quién está autorizado para actuar?"]},
    act:{label:"OPERACIÓN / INTERVENCIÓN",title:"¿Actuamos ahora o necesitamos medir primero?",copy:"Separe señal, incertidumbre y consecuencias. Identifique qué información adicional tiene capacidad real para cambiar la acción.",questions:["¿Qué ocurre si no actuamos?","¿Cuál es el costo del error?","¿Qué medición reduciría incertidumbre útil?","¿Qué condición habilita la acción?"]},
    risk:{label:"RIESGO",title:"¿Qué riesgo estamos aceptando realmente?",copy:"Haga explícitos exposición, supuestos, alternativas y señales tempranas antes de convertir tolerancia al riesgo en una frase genérica.",questions:["¿Qué escenario estamos subestimando?","¿Qué evidencia contradice la lectura dominante?","¿Cuál es el riesgo residual?","¿Quién acepta formalmente ese riesgo?"]},
    delegate:{label:"IA / DELEGACIÓN",title:"¿Qué puede hacer la IA y dónde debe detenerse?",copy:"Separe capacidad técnica de autoridad. Diseñe qué puede investigar, proponer o ejecutar un sistema y qué exige control humano.",questions:["¿Qué acciones son reversibles?","¿Qué necesita revisión independiente?","¿Qué datos puede utilizar?","¿Quién autoriza efectos externos?"]},
    hypothesis:{label:"I+D / HIPÓTESIS",title:"¿La explicación resiste una prueba seria?",copy:"Transforme una hipótesis convincente en obligaciones observables: evidencia esperada, alternativas, predicciones discriminantes y criterios de abandono.",questions:["¿Qué observación la refutaría?","¿Qué explicación rival compite?","¿Qué parte no es identificable?","¿Qué experimento discrimina mejor?"]}
  };
  const tabs=[...document.querySelectorAll("[data-decision]")],label=document.querySelector("[data-decision-label]"),title=document.querySelector("[data-decision-title]"),copy=document.querySelector("[data-decision-copy]"),questions=document.querySelector("[data-decision-questions]");
  const setDecision=k=>{const d=decisionData[k];if(!d)return;tabs.forEach(b=>b.classList.toggle("active",b.dataset.decision===k));label.textContent=d.label;title.textContent=d.title;copy.textContent=d.copy;questions.innerHTML=d.questions.map(q=>"<li>"+q+"</li>").join("");};
  tabs.forEach(b=>b.addEventListener("click",()=>setDecision(b.dataset.decision)));

  document.querySelectorAll(".faq details").forEach(d=>d.addEventListener("toggle",()=>{if(d.open)document.querySelectorAll(".faq details[open]").forEach(o=>{if(o!==d)o.removeAttribute("open")})}));

  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(window.gsap&&window.ScrollTrigger&&!reduced){
    gsap.registerPlugin(ScrollTrigger);document.documentElement.classList.add("gsap-ready");
    gsap.from(".hero-copy > *",{opacity:0,y:20,duration:.75,stagger:.07,ease:"power3.out",delay:.08});
    gsap.from(".hero-machine",{opacity:0,x:30,duration:1,ease:"power3.out",delay:.18});
    gsap.utils.toArray(".reveal").forEach(el=>gsap.from(el,{opacity:0,y:25,duration:.75,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 88%",once:true}}));
  } else {
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.08});
    document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
  }
})();