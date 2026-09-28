(() => {
  const script=document.currentScript;
  if(!script)return;

  const THEME_KEY="deep-analytica-theme";
  const html=document.documentElement;
  const preferred=()=>{
    try{
      const saved=localStorage.getItem(THEME_KEY);
      if(saved==="light"||saved==="dark")return saved;
    }catch{}
    return matchMedia?.("(prefers-color-scheme: dark)").matches?"dark":"light";
  };
  const applyTheme=theme=>{
    html.dataset.theme=theme;
    try{localStorage.setItem(THEME_KEY,theme)}catch{}
    document.querySelectorAll("[data-da-theme-toggle]").forEach(btn=>{
      btn.setAttribute("aria-pressed",String(theme==="dark"));
      btn.setAttribute("aria-label",theme==="dark"?"Cambiar a modo claro":"Cambiar a modo oscuro");
      const t=btn.querySelector("[data-da-theme-text]");
      if(t)t.textContent=theme==="dark"?"Modo claro":"Modo oscuro";
    });
  };
  if(!html.dataset.theme)html.dataset.theme=preferred();

  const themeStyle=document.createElement("style");
  themeStyle.dataset.daThemeBridge="styles";
  themeStyle.textContent=`
  :root{
    --da-iris:#725BFF;--da-iris-dark:#5A45DD;--da-iris-light:#A796FF;--da-coral:#F56F56;
    --da-font-sans:Inter,"Helvetica Neue",Arial,system-ui,sans-serif;
    --da-font-mono:"IBM Plex Mono","SFMono-Regular",Consolas,monospace
  }
  html[data-theme="light"]{
    color-scheme:light;
    --da-page:#F8F7F3;--da-page2:#F1F0EA;--da-card:#FFFFFF;--da-card2:#F7F6F2;
    --da-ink:#171715;--da-copy:#514E46;--da-muted:#7E7A70;--da-line:rgba(23,23,21,.12);--da-line2:rgba(23,23,21,.19);
    --bg:#F8F7F3;--bg-0:#F8F7F3;--bg-1:#F1F0EA;--bg-2:#FFFFFF;--bg-3:#F7F6F2;
    --surface:#FFFFFF;--surface2:#F7F6F2;--surface-raised:#FFFFFF;--surface-hover:#EEEAFD;
    --card:#FFFFFF;--ink:#171715;--text:#171715;--text-0:#171715;--text-1:#514E46;--text-2:#7E7A70;
    --muted:#6E6A60;--line:rgba(23,23,21,.12);--line-strong:rgba(23,23,21,.20);
    --accent:#725BFF;--blue:#725BFF;--violet:#725BFF;--cyan:#5F78E8;--green:#2E8B57;--amber:#B77A00;--red:#C94A3F;
    --shadow:0 22px 60px rgba(23,23,21,.10)
  }
  html[data-theme="dark"]{
    color-scheme:dark;
    --da-page:#0F100F;--da-page2:#151714;--da-card:#181A17;--da-card2:#1F211D;
    --da-ink:#F5F4EF;--da-copy:#C9C6BC;--da-muted:#9A968C;--da-line:rgba(255,255,255,.10);--da-line2:rgba(255,255,255,.17);
    --bg:#0F100F;--bg-0:#0F100F;--bg-1:#151714;--bg-2:#181A17;--bg-3:#1F211D;
    --surface:#181A17;--surface2:#1F211D;--surface-raised:#1F211D;--surface-hover:#28243C;
    --card:#181A17;--ink:#F5F4EF;--text:#F5F4EF;--text-0:#F5F4EF;--text-1:#C9C6BC;--text-2:#9A968C;
    --muted:#9A968C;--line:rgba(255,255,255,.10);--line-strong:rgba(255,255,255,.18);
    --accent:#8C79FF;--blue:#8C79FF;--violet:#A796FF;--cyan:#7E96FF;--green:#52B788;--amber:#E9B949;--red:#F07167;
    --shadow:0 24px 70px rgba(0,0,0,.28)
  }
  html[data-theme] body{transition:background-color .22s ease,color .22s ease}
  html[data-theme="light"] body{background-color:var(--da-page)!important;color:var(--da-ink)!important}
  html[data-theme="dark"] body{background-color:var(--da-page)!important;color:var(--da-ink)!important}

  /* Legacy-surface bridge: common hard-coded structures now obey the shared theme. */
  html[data-theme] .px-topbar{background:color-mix(in srgb,var(--da-card) 94%,transparent)!important}
  html[data-theme] .px-rail{background:color-mix(in srgb,var(--da-card) 90%,transparent)!important}
  html[data-theme] .px-center{
    background:
      linear-gradient(color-mix(in srgb,var(--da-line) 55%,transparent) 1px,transparent 1px),
      linear-gradient(90deg,color-mix(in srgb,var(--da-line) 55%,transparent) 1px,transparent 1px),
      var(--da-page)!important;
    background-size:32px 32px!important
  }
  html[data-theme] .px-mode-switch{background:var(--da-card2)!important}
  html[data-theme] .px-stat{background:color-mix(in srgb,var(--da-card) 92%,transparent)!important}
  html[data-theme] .node rect{fill:var(--da-card)!important;stroke:var(--da-line2)!important}
  html[data-theme] .node .label{fill:var(--da-ink)!important}
  html[data-theme] .node .sub{fill:var(--da-muted)!important}
  html[data-theme] .edge{stroke:color-mix(in srgb,var(--da-muted) 55%,transparent)!important}
  html[data-theme] svg{background:var(--da-card2)}
  html[data-theme] code{background:var(--da-card2)!important;color:var(--da-ink)!important}

  [data-irl-global-nav]{
    --nav-bg:color-mix(in srgb,var(--da-card) 94%,transparent);
    --nav-line:var(--da-line);--nav-text:var(--da-ink);--nav-muted:var(--da-muted);--nav-accent:var(--accent);
    position:fixed;right:16px;bottom:16px;z-index:2147483000;font-family:var(--da-font-sans);color:var(--nav-text)
  }
  [data-irl-global-nav] *{box-sizing:border-box}
  .irl-trigger{
    height:44px;display:flex;align-items:center;gap:9px;padding:0 13px;
    border:1px solid var(--nav-line);border-radius:12px;background:var(--nav-bg);color:var(--nav-text);
    cursor:pointer;font:600 10px var(--da-font-mono);letter-spacing:.04em;backdrop-filter:blur(18px);box-shadow:var(--shadow)
  }
  .irl-trigger i{width:7px;height:7px;border-radius:50%;background:var(--nav-accent)}
  .irl-panel{
    position:absolute;right:0;bottom:52px;width:min(330px,calc(100vw - 24px));
    border:1px solid var(--nav-line);border-radius:16px;background:var(--nav-bg);backdrop-filter:blur(22px);
    opacity:0;transform:translateY(8px);pointer-events:none;transition:.18s;overflow:hidden;box-shadow:var(--shadow)
  }
  [data-open="true"] .irl-panel{opacity:1;transform:none;pointer-events:auto}
  .irl-head{display:flex;justify-content:space-between;align-items:center;padding:13px;border-bottom:1px solid var(--nav-line)}
  .irl-head span{display:block;color:var(--nav-accent);font:600 8px var(--da-font-mono);letter-spacing:.1em}
  .irl-head strong{display:block;margin-top:4px;font-size:12px}
  .irl-head-actions{display:flex;gap:6px}
  .irl-head button{width:32px;height:32px;border:1px solid var(--nav-line);border-radius:9px;background:transparent;color:var(--nav-muted);cursor:pointer}
  .irl-head button:hover{border-color:var(--nav-accent);color:var(--nav-text)}
  .irl-links{display:grid;padding:8px}
  .irl-links a{
    display:grid;grid-template-columns:42px 1fr;align-items:center;min-height:50px;padding:7px;border:1px solid transparent;border-radius:10px;
    color:var(--nav-muted)!important;text-decoration:none!important
  }
  .irl-links a:hover,.irl-links a[data-current="true"]{border-color:var(--nav-line);background:color-mix(in srgb,var(--nav-accent) 8%,transparent);color:var(--nav-text)!important}
  .irl-links b{display:grid;place-items:center;width:32px;height:30px;border:1px solid var(--nav-line);border-radius:8px;color:var(--nav-accent);font:600 7px var(--da-font-mono)}
  .irl-links span{font-size:11px}
  .irl-theme-row{display:flex;justify-content:space-between;align-items:center;padding:10px 13px;border-top:1px solid var(--nav-line);color:var(--nav-muted);font:600 8px var(--da-font-mono);letter-spacing:.06em}
  .irl-theme-toggle{min-width:84px;height:30px;padding:0 9px!important;width:auto!important;color:var(--nav-text)!important;font:600 8px var(--da-font-mono)!important}
  .irl-foot{padding:10px 13px;border-top:1px solid var(--nav-line);color:var(--nav-muted);font:600 7px var(--da-font-mono);letter-spacing:.06em}
  @media(max-width:640px){
    [data-irl-global-nav]{right:9px;bottom:9px}.irl-trigger>span{display:none}.irl-panel{width:calc(100vw - 18px)}
  }
  @media print{[data-irl-global-nav]{display:none!important}}
  `;
  document.head.appendChild(themeStyle);

  // The main portal owns its own navigation, but shares the same theme state.
  if(html.dataset.portalNativeNav==="true"||document.querySelector("[data-irl-global-nav]"))return;

  const scriptUrl=new URL(script.src,location.href),base=new URL("./",scriptUrl),href=path=>new URL(path,base).href,current=location.href;
  const links=[
    ["HOME","Inicio",href("index.html")],
    ["PX","PRAXIOS · demo",href("praxios.html")],
    ["GEO","Deep Geo",href("mineral-systems.html")],
    ["LAB","Research",href("lab.html")],
    ["BOOK","EL PUENTE",href("el-puente/")],
    ["TECH","Revisión técnica",href("architecture-room/")]
  ];

  const root=document.createElement("div");
  root.dataset.irlGlobalNav="";
  root.dataset.open="false";
  root.innerHTML=`
  <button class="irl-trigger" type="button" aria-expanded="false" aria-label="Abrir navegación"><i></i><span>DEEP ANALYTICA / NAV</span></button>
  <div class="irl-panel">
    <div class="irl-head">
      <div><span>DEEP ANALYTICA</span><strong>Decision systems</strong></div>
      <div class="irl-head-actions">
        <button type="button" data-da-theme-toggle aria-label="Cambiar tema"><span data-da-theme-text>Tema</span></button>
        <button type="button" data-close aria-label="Cerrar">×</button>
      </div>
    </div>
    <div class="irl-links"></div>
    <div class="irl-theme-row"><span>Apariencia</span><button class="irl-theme-toggle" type="button" data-da-theme-toggle><span data-da-theme-text>Tema</span></button></div>
    <div class="irl-foot">DECISIONS · EVIDENCE · HUMAN AUTHORITY</div>
  </div>`;

  const list=root.querySelector(".irl-links");
  for(const [code,label,url] of links){
    const a=document.createElement("a");a.href=url;
    const norm=url.replace(/index\.html$/,"").replace(/\/$/,"");
    const here=current.replace(/index\.html(?:#.*)?$/,"").replace(/#.*$/,"").replace(/\/$/,"");
    if(here===norm||(label==="EL PUENTE"&&current.includes("/el-puente/")))a.dataset.current="true";
    a.innerHTML=`<b>${code}</b><span>${label}</span>`;list.appendChild(a)
  }

  const trigger=root.querySelector(".irl-trigger");
  const close=root.querySelector("[data-close]");
  const setOpen=open=>{root.dataset.open=String(open);trigger.setAttribute("aria-expanded",String(open))};
  trigger.addEventListener("click",()=>setOpen(root.dataset.open!=="true"));
  close.addEventListener("click",()=>setOpen(false));
  document.addEventListener("click",e=>{
    const btn=e.target.closest?.("[data-da-theme-toggle]");
    if(!btn)return;
    applyTheme(html.dataset.theme==="dark"?"light":"dark");
  });
  document.addEventListener("keydown",e=>{if(e.key==="Escape")setOpen(false)});
  document.addEventListener("click",e=>{if(root.dataset.open==="true"&&!root.contains(e.target))setOpen(false)});
  document.body.appendChild(root);
  applyTheme(html.dataset.theme||preferred());
})();