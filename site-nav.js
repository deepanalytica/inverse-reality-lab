(() => {
  const script=document.currentScript;
  if(!script||document.documentElement.dataset.portalNativeNav==="true"||document.querySelector("[data-irl-global-nav]"))return;
  const scriptUrl=new URL(script.src,location.href),base=new URL("./",scriptUrl),href=path=>new URL(path,base).href,current=location.href;
  const links=[
    ["HOME","Inicio",href("index.html")],
    ["PX","PRAXIOS · demo",href("praxios.html")],
    ["GEO","Deep Geo",href("mineral-systems.html")],
    ["LAB","Research",href("lab.html")],
    ["BOOK","EL PUENTE",href("el-puente/")],
    ["ACCESS","Architecture Room",href("architecture-room/")]
  ];
  const style=document.createElement("style");style.dataset.irlGlobalNav="styles";style.textContent=`
  [data-irl-global-nav]{--bg:rgba(9,10,8,.95);--line:rgba(245,244,238,.14);--text:#f4f5ef;--muted:#8d948b;--acid:#d9ff63;position:fixed;right:16px;bottom:16px;z-index:2147483000;font-family:Inter,system-ui,sans-serif}
  [data-irl-global-nav] *{box-sizing:border-box}.irl-trigger{height:42px;display:flex;align-items:center;gap:9px;padding:0 13px;border:1px solid var(--line);background:var(--bg);color:var(--text);cursor:pointer;font:700 9px ui-monospace,monospace;letter-spacing:.06em;backdrop-filter:blur(18px)}
  .irl-trigger i{width:7px;height:7px;border-radius:50%;background:var(--acid)}.irl-panel{position:absolute;right:0;bottom:50px;width:min(320px,calc(100vw - 24px));border:1px solid var(--line);background:var(--bg);backdrop-filter:blur(22px);opacity:0;transform:translateY(8px);pointer-events:none;transition:.18s}
  [data-open="true"] .irl-panel{opacity:1;transform:none;pointer-events:auto}.irl-head{display:flex;justify-content:space-between;align-items:center;padding:12px 13px;border-bottom:1px solid var(--line)}.irl-head span{display:block;color:var(--acid);font:700 7px ui-monospace,monospace;letter-spacing:.1em}.irl-head strong{display:block;margin-top:4px;font-size:11px}.irl-head button{width:30px;height:30px;border:1px solid var(--line);background:none;color:var(--muted);cursor:pointer}
  .irl-links{display:grid;padding:7px}.irl-links a{display:grid;grid-template-columns:42px 1fr;align-items:center;min-height:49px;padding:7px;border:1px solid transparent;color:var(--muted)!important;text-decoration:none!important}.irl-links a:hover,.irl-links a[data-current="true"]{border-color:var(--line);background:rgba(217,255,99,.045);color:var(--text)!important}.irl-links b{display:grid;place-items:center;width:32px;height:30px;border:1px solid var(--line);color:var(--acid);font:700 6px ui-monospace,monospace}.irl-links span{font-size:10px}.irl-foot{padding:10px 13px;border-top:1px solid var(--line);color:#62685f;font:700 6px ui-monospace,monospace;letter-spacing:.06em}
  @media(max-width:640px){[data-irl-global-nav]{right:9px;bottom:9px}.irl-trigger span{display:none}.irl-panel{width:calc(100vw - 18px)}}@media print{[data-irl-global-nav]{display:none!important}}`;
  document.head.appendChild(style);
  const root=document.createElement("div");root.dataset.irlGlobalNav="";root.dataset.open="false";root.innerHTML=`
  <button class="irl-trigger" type="button" aria-expanded="false" aria-label="Abrir navegación"><i></i><span>DEEP ANALYTICA / NAV</span></button>
  <div class="irl-panel"><div class="irl-head"><div><span>PUBLIC SURFACE</span><strong>Deep Analytica</strong></div><button type="button" aria-label="Cerrar">×</button></div><div class="irl-links"></div><div class="irl-foot">CAPABILITY PUBLIC · MECHANISM PROTECTED</div></div>`;
  const list=root.querySelector(".irl-links");
  for(const [code,label,url] of links){const a=document.createElement("a");a.href=url;const norm=url.replace(/index\.html$/,"").replace(/\/$/,""),here=current.replace(/index\.html(?:#.*)?$/,"").replace(/#.*$/,"").replace(/\/$/,"");if(here===norm||(label==="EL PUENTE"&&current.includes("/el-puente/")))a.dataset.current="true";a.innerHTML=`<b>${code}</b><span>${label}</span>`;list.appendChild(a)}
  const trigger=root.querySelector(".irl-trigger"),close=root.querySelector(".irl-head button"),setOpen=open=>{root.dataset.open=String(open);trigger.setAttribute("aria-expanded",String(open))};
  trigger.addEventListener("click",()=>setOpen(root.dataset.open!=="true"));close.addEventListener("click",()=>setOpen(false));document.addEventListener("keydown",e=>{if(e.key==="Escape")setOpen(false)});document.addEventListener("click",e=>{if(root.dataset.open==="true"&&!root.contains(e.target))setOpen(false)});
  document.body.appendChild(root);
})();