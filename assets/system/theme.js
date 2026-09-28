(() => {
  const root=document.documentElement;
  const KEY="deep-analytica-theme";
  const meta=document.querySelector('meta[name="theme-color"]');
  const systemDark=()=>matchMedia("(prefers-color-scheme: dark)").matches;

  function currentPreferred(){
    const stored=localStorage.getItem(KEY);
    if(stored==="light"||stored==="dark") return stored;
    return systemDark()?"dark":"light";
  }

  function sync(theme,persist=true){
    root.dataset.theme=theme;
    if(persist)localStorage.setItem(KEY,theme);
    const dark=theme==="dark";
    if(meta)meta.setAttribute("content",dark?"#10110f":"#f5f4ee");
    document.querySelectorAll("[data-theme-toggle]").forEach(btn=>{
      btn.setAttribute("aria-pressed",String(dark));
      btn.setAttribute("aria-label",dark?"Cambiar a modo claro":"Cambiar a modo oscuro");
      const icon=btn.querySelector("[data-theme-icon]");
      const label=btn.querySelector("[data-theme-label]");
      if(icon)icon.textContent=dark?"☼":"◐";
      if(label)label.textContent=dark?"Claro":"Oscuro";
    });
  }

  sync(currentPreferred(),false);

  document.addEventListener("click",e=>{
    const btn=e.target.closest("[data-theme-toggle]");
    if(!btn)return;
    sync(root.dataset.theme==="dark"?"light":"dark",true);
  });

  const mq=matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener?.("change",()=>{
    if(!localStorage.getItem(KEY))sync(systemDark()?"dark":"light",false);
  });
})();