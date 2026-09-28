(() => {
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-button]");
  const menu = document.querySelector("[data-mobile-menu]");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  const fallbackReveal = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  };

  const initGsap = () => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger || reducedMotion) {
      fallbackReveal();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add("gsap-ready");

    gsap.utils.toArray(".reveal").forEach((element) => {
      gsap.from(element, {
        opacity: 0,
        y: 28,
        duration: .8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once: true
        }
      });
    });

    gsap.from(".hero-copy > *", {
      opacity: 0,
      y: 18,
      duration: .75,
      stagger: .08,
      ease: "power3.out",
      delay: .08
    });

    gsap.from(".atlas-lines .signal", {
      strokeDasharray: 900,
      strokeDashoffset: 900,
      duration: 1.8,
      stagger: .16,
      ease: "power2.inOut"
    });

    gsap.utils.toArray("[data-parallax]").forEach((element) => {
      const amount = Number(element.dataset.parallax || 1);
      gsap.to(element, {
        y: -24 * amount,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-atlas]",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    gsap.utils.toArray(".genealogy-track a").forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        x: 22,
        duration: .55,
        delay: Math.min(index * .03, .3),
        scrollTrigger: { trigger: ".genealogy-track", start: "top 82%", once: true }
      });
    });
  };

  const roleData = {
    executive: {
      label: "PARA DIRECCIÓN / GERENCIA",
      title: "Necesito entender qué está ocurriendo y decidir qué hacer.",
      description: "Entre por una vista ejecutiva de hallazgos, riesgos, alternativas, evidencia y deuda abierta. La complejidad permanece disponible debajo; la responsabilidad queda arriba.",
      primary: ["Abrir Decision Room", "praxios.html"],
      secondary: ["Ver un caso aplicado", "mineral-systems.html"]
    },
    technical: {
      label: "PARA EQUIPOS TÉCNICOS",
      title: "Necesito coordinar modelos, herramientas, evidencia y validación.",
      description: "Entre por PRAXIOS y Meta-Harness. Observe misión, estado, agentes, claims, gates, herramientas, autorizaciones y ledger sin depender del chat como fuente de verdad.",
      primary: ["Abrir PRAXIOS", "praxios.html"],
      secondary: ["Ver arquitectura técnica", "library.html#praxiosui"]
    },
    research: {
      label: "PARA INVESTIGACIÓN / I+D",
      title: "Necesito saber si esto resiste crítica, reproducción y falsificación.",
      description: "Entre por EL PUENTE, el paper, Inverse Reality Lab y las superficies de revisión. Las hipótesis conservan deuda, estatus epistemológico y obligaciones de prueba.",
      primary: ["Leer EL PUENTE", "el-puente/"],
      secondary: ["Entrar al laboratorio", "lab.html"]
    },
    investor: {
      label: "PARA INVERSIÓN / ALIANZAS",
      title: "Necesito entender la tesis, el producto, la defensibilidad y qué existe hoy.",
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
    if (primary) {
      primary.childNodes[0].textContent = data.primary[0] + " ";
      primary.href = data.primary[1];
    }
    if (secondary) {
      secondary.childNodes[0].textContent = data.secondary[0] + " ";
      secondary.href = data.secondary[1];
    }
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setRole(tab.dataset.roleTab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft","ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const index = tabs.indexOf(tab);
      const nextIndex = event.key === "ArrowRight" ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
      tabs[nextIndex].focus();
      setRole(tabs[nextIndex].dataset.roleTab);
    });
  });

  document.querySelectorAll(".faq-list details").forEach((detail) => {
    detail.addEventListener("toggle", () => {
      if (!detail.open) return;
      document.querySelectorAll(".faq-list details[open]").forEach((other) => {
        if (other !== detail) other.removeAttribute("open");
      });
    });
  });

  initGsap();
})();