(() => {
  const root=document.documentElement;
  const KEY="deep-analytica-theme";
  const meta=document.querySelector('meta[name="theme-color"]');
  const prefersDark=()=>window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  const read=()=>{
    try{
      const saved=localStorage.getItem(KEY);
      if(saved==="light"||saved==="dark")return saved;
    }catch{}
    return prefersDark()?"dark":"light";
  };
  const paint=theme=>{
    root.dataset.theme=theme;
    if(meta)meta.setAttribute("content",theme==="dark"?"#0F100F":"#F8F7F3");
    document.querySelectorAll("[data-theme-toggle]").forEach(btn=>{
      btn.setAttribute("aria-pressed",String(theme==="dark"));
      btn.setAttribute("aria-label",theme==="dark"?"Cambiar a modo claro":"Cambiar a modo oscuro");
      const text=btn.querySelector("[data-theme-text]");
      if(text)text.textContent=theme==="dark"?"Modo claro":"Modo oscuro";
    });
  };
  const set=theme=>{
    paint(theme);
    try{localStorage.setItem(KEY,theme)}catch{}
  };
  paint(read());

  document.addEventListener("click",event=>{
    const btn=event.target.closest?.("[data-theme-toggle]");
    if(!btn)return;
    set(root.dataset.theme==="dark"?"light":"dark");
  });

  const media=window.matchMedia?.("(prefers-color-scheme: dark)");
  media?.addEventListener?.("change",event=>{
    let saved=null;
    try{saved=localStorage.getItem(KEY)}catch{}
    if(saved!=="light"&&saved!=="dark")paint(event.matches?"dark":"light");
  });
})();