(() => {
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-button]");
  const menu = document.querySelector("[data-mobile-menu]");

  const setMenu = (open) => {
    document.body.classList.toggle("menu-open", open);
    menu?.classList.toggle("open", open);
    menu?.setAttribute("aria-hidden", String(!open));
    menuButton?.setAttribute("aria-expanded", String(open));
  };

  menuButton?.addEventListener("click", () => setMenu(!menu?.classList.contains("open")));
  menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") setMenu(false); });

  const onScroll = () => header?.classList.toggle("scrolled", window.scrollY > 30);
  onScroll();
  addEventListener("scroll", onScroll, { passive: true });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  const roleData = {
    executive: {
      label: "PARA DIRECCIÓN / GERENCIA",
      title: "Necesito entender qué está ocurriendo y decidir qué hacer.",
      description: "Entre por una vista ejecutiva: hallazgos, riesgos, alternativas, evidencia y deuda abierta. La complejidad permanece debajo; la responsabilidad queda arriba.",
      primary: ["Abrir Decision Room", "praxios.html"],
      secondary: ["Ver un caso aplicado", "mineral-systems.html"]
    },
    technical: {
      label: "PARA EQUIPOS TÉCNICOS",
      title: "Necesito coordinar modelos, herramientas, evidencia y validación.",
      description: "Entre por PRAXIOS y Meta-Harness. Observe misión, estado, agentes, claims, gates, herramientas, autorizaciones y ledger sin depender del chat como fuente de verdad.",
      primary: ["Abrir PRAXIOS", "praxios.html"],
      secondary: ["Ver arquitectura", "library.html#praxiosui"]
    },
    research: {
      label: "PARA INVESTIGACIÓN / I+D",
      title: "Necesito saber si esto resiste crítica, reproducción y falsificación.",
      description: "Entre por EL PUENTE, el paper, Inverse Reality Lab y las superficies de revisión. Aquí las hipótesis conservan deuda, estatus epistemológico y obligaciones de prueba.",
      primary: ["Leer EL PUENTE", "el-puente/"],
      secondary: ["Entrar al laboratorio", "lab.html"]
    },
    investor: {
      label: "PARA INVERSIÓN / ALIANZAS",
      title: "Necesito entender la tesis, el producto, el moat y qué existe hoy.",
      description: "Entre por la narrativa ejecutiva y luego inspeccione los artefactos técnicos. El investor preview separa lo implementado, lo validado, lo investigado y lo que aún falta cerrar.",
      primary: ["Abrir Investor Preview", "investor/praxios-universe/"],
      secondary: ["Probar Web OS", "investor/praxios-webos/"]
    }
  };

  const tabs = [...document.querySelectorAll("[data-role-tab]")];
  const label = document.querySelector("[data-role-label]");
  const title = document.querySelector("[data-role-title]");
  const description = document.querySelector("[data-role-description]");
  const primary = document.querySelector("[data-role-primary]");
  const secondary = document.querySelector("[data-role-secondary]");

  const setRole = (role) => {
    const data = roleData[role];
    if (!data) return;
    tabs.forEach((tab) => {
      const active = tab.dataset.roleTab === role;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    if (label) label.textContent = data.label;
    if (title) title.textContent = data.title;
    if (description) description.textContent = data.description;
    if (primary) { primary.firstChild.textContent = data.primary[0] + " "; primary.href = data.primary[1]; }
    if (secondary) { secondary.firstChild.textContent = data.secondary[0] + " "; secondary.href = data.secondary[1]; }
  };

  tabs.forEach((tab) => tab.addEventListener("click", () => setRole(tab.dataset.roleTab)));
})();