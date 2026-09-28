(() => {
  const script = document.currentScript;
  if (!script || document.documentElement.dataset.portalNativeNav === "true" || document.querySelector("[data-irl-global-nav]")) return;

  const scriptUrl = new URL(script.src, location.href);
  const base = new URL("./", scriptUrl);
  const href = (path) => new URL(path, base).href;

  const current = location.href;
  const links = [
    ["HOME", "Inicio", href("index.html")],
    ["LAB", "Laboratorio", href("lab.html")],
    ["BOOK", "EL PUENTE · Libro", href("el-puente/")],
    ["PX", "PRAXIOS", href("praxios.html")],
    ["3D", "Dashboard 3D/4D", href("dashboard.html")],
    ["MATH", "Matemática", href("mathematics.html")],
    ["MIN", "Sistemas minerales", href("mineral-systems.html")],
    ["LIB", "Biblioteca", href("library.html")],
    ["REV", "Revisión", href("review.html")],
    ["INV", "Investor", href("investor/praxios-universe/")]
  ];

  const style = document.createElement("style");
  style.dataset.irlGlobalNav = "styles";
  style.textContent = `
    [data-irl-global-nav]{
      --irl-bg:rgba(7,9,13,.94);--irl-line:rgba(236,244,255,.13);--irl-text:#f3f7fb;
      --irl-muted:#8e99a6;--irl-accent:#67e8f9;--irl-shadow:0 22px 70px rgba(0,0,0,.42);
      position:fixed;right:18px;bottom:18px;z-index:2147483000;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif
    }
    [data-irl-global-nav] *{box-sizing:border-box}
    .irl-nav-trigger{display:flex;align-items:center;gap:9px;height:42px;padding:0 13px;border:1px solid var(--irl-line);border-radius:3px;background:var(--irl-bg);box-shadow:var(--irl-shadow);color:var(--irl-text);cursor:pointer;font:700 10px ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.06em;backdrop-filter:blur(18px)}
    .irl-nav-trigger i{width:7px;height:7px;border-radius:50%;background:var(--irl-accent);box-shadow:0 0 12px rgba(103,232,249,.45)}
    .irl-nav-panel{position:absolute;right:0;bottom:50px;width:min(330px,calc(100vw - 24px));overflow:hidden;border:1px solid var(--irl-line);border-radius:4px;background:var(--irl-bg);box-shadow:var(--irl-shadow);backdrop-filter:blur(22px);opacity:0;transform:translateY(8px) scale(.985);pointer-events:none;transition:.18s ease}
    [data-open="true"] .irl-nav-panel{opacity:1;transform:none;pointer-events:auto}
    .irl-nav-head{display:flex;align-items:center;justify-content:space-between;padding:13px 14px;border-bottom:1px solid var(--irl-line)}
    .irl-nav-head div span,.irl-nav-head div strong{display:block}.irl-nav-head span{color:var(--irl-accent);font:700 8px ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.12em}.irl-nav-head strong{margin-top:4px;color:var(--irl-text);font-size:12px}
    .irl-nav-head button{width:30px;height:30px;border:1px solid var(--irl-line);background:transparent;color:var(--irl-muted);cursor:pointer;font-size:18px}
    .irl-nav-links{display:grid;grid-template-columns:1fr 1fr;padding:7px}
    .irl-nav-links a{min-height:58px;display:grid;grid-template-columns:38px 1fr;align-items:center;gap:7px;padding:8px;border:1px solid transparent;color:var(--irl-muted)!important;text-decoration:none!important}
    .irl-nav-links a:hover,.irl-nav-links a[data-current="true"]{border-color:var(--irl-line);background:rgba(103,232,249,.055);color:var(--irl-text)!important}
    .irl-nav-links a b{display:grid;place-items:center;width:31px;height:31px;border:1px solid var(--irl-line);color:var(--irl-accent);font:700 7px ui-monospace,SFMono-Regular,Menlo,monospace}
    .irl-nav-links a span{font-size:10px;line-height:1.25}
    .irl-nav-foot{padding:10px 13px;border-top:1px solid var(--irl-line);color:#66717e;font:600 7px ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.05em}
    @media(max-width:640px){
      [data-irl-global-nav]{right:10px;bottom:10px}
      .irl-nav-trigger{height:40px;padding:0 11px}.irl-nav-trigger span{display:none}
      .irl-nav-panel{right:-1px;bottom:48px;width:calc(100vw - 20px);max-height:min(72vh,620px);overflow:auto}
      .irl-nav-links{grid-template-columns:1fr}
      .irl-nav-links a{min-height:49px}
    }
    @media print{[data-irl-global-nav]{display:none!important}}
  `;
  document.head.appendChild(style);

  const root = document.createElement("div");
  root.dataset.irlGlobalNav = "";
  root.dataset.open = "false";
  root.innerHTML = `
    <button class="irl-nav-trigger" type="button" aria-expanded="false" aria-label="Abrir navegación global">
      <i></i><span>IRL / NAV</span>
    </button>
    <div class="irl-nav-panel" role="dialog" aria-label="Navegación del sitio">
      <div class="irl-nav-head"><div><span>INVERSE REALITY LAB</span><strong>Navegación global</strong></div><button type="button" aria-label="Cerrar">×</button></div>
      <div class="irl-nav-links"></div>
      <div class="irl-nav-foot">RESEARCH · PRAXIOS · EL PUENTE · EVIDENCE</div>
    </div>
  `;

  const list = root.querySelector(".irl-nav-links");
  for (const [code,label,url] of links) {
    const a = document.createElement("a");
    a.href = url;
    const normalized = url.replace(/index\.html$/,"").replace(/\/$/,"");
    const here = current.replace(/index\.html(?:#.*)?$/,"").replace(/#.*$/,"").replace(/\/$/,"");
    if (here === normalized || (label.startsWith("EL PUENTE") && current.includes("/el-puente/"))) a.dataset.current = "true";
    a.innerHTML = `<b>${code}</b><span>${label}</span>`;
    list.appendChild(a);
  }

  const trigger = root.querySelector(".irl-nav-trigger");
  const close = root.querySelector(".irl-nav-head button");
  const setOpen = (open) => {
    root.dataset.open = String(open);
    trigger.setAttribute("aria-expanded", String(open));
  };
  trigger.addEventListener("click", () => setOpen(root.dataset.open !== "true"));
  close.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") setOpen(false); });
  document.addEventListener("click", (event) => {
    if (root.dataset.open === "true" && !root.contains(event.target)) setOpen(false);
  });

  document.body.appendChild(root);
})();