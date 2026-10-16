/* =========================================================
   Muhammad Yusuf Prananda — portfolio
   Horizontal slide deck (snap + dots + arrows + keyboard),
   language toggle (ID/EN), theme toggle (dark default),
   entrance animations, counters, scroll progress, Berau clock.
   No dependencies.
   ========================================================= */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var STORAGE_LANG = "lang";
  var STORAGE_THEME = "theme";
  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- English dictionary ----------
     Indonesian lives in the HTML (no-JS + SEO friendly), so we
     only keep the English strings here. */
  var EN = {
    "a11y.skip": "Skip to content",

    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.contact": "Contact",

    "hero.eyebrow": "IT Programmer & Support — 2026 · Berau, East Kalimantan",
    "hero.name1": "Muhammad Yusuf",
    "hero.name2": "Prananda",
    "hero.role": "IT Programmer · Application Developer · IT Support",
    "hero.lead":
      "Programmer focused on building web and desktop applications and on IT support. Builds software with JavaScript, TypeScript, React, Python, and PHP, designs relational databases, and handles the installation, configuration, and troubleshooting of hardware and software.",
    "hero.status.label": "Status",
    "hero.status.value": "Open to opportunities",
    "hero.loc.label": "Location",
    "hero.loc.value": "Berau, East Kalimantan",
    "hero.tz.label": "Time zone",

    "about.title": "About",
    "about.p1":
      "Programmer focused on web and desktop application development and on technical support (IT support). Builds software with JavaScript, TypeScript, React, Python, and PHP, designs relational database schemas, and turns user needs into working features. Experienced in installing, configuring, and troubleshooting both hardware and software.",
    "about.p2":
      "Based in Berau, East Kalimantan. Develops desktop applications (Electron, PySide6), web applications (React, Laravel, CodeIgniter, WordPress), and provides day-to-day IT support. Applying for an IT Programmer & Application Developer role in the Information Technology & Digitalisation Sub-Division.",
    "about.stat1": "Public repositories",
    "about.stat2": "Desktop applications",
    "about.stat3": "Years writing code",

    "exp.title": "Work Experience",
    "exp.e1.date": "March 2022 — Present",
    "exp.e1.b1":
      "Designed and developed Bicless, an internal desktop application (TypeScript, Vite, Supabase/PostgreSQL) for managing operational data.",
    "exp.e1.b2":
      "Built relational database schemas and PL/pgSQL functions for reporting needs.",
    "exp.e1.b3":
      "Provided day-to-day IT support for the team: troubleshooting devices, printers, and networks at the work site.",
    "exp.e1.b4":
      "Automated operational report recaps and exports, turning raw data into ready-to-use files.",
    "exp.e1.b5":
      "Prepared a Windows installer (NSIS) along with documentation and user guides.",
    "exp.e1.b6":
      "Bridged user needs and technical specifications, including requirements analysis and application testing.",

    "exp.e2.date": "June 2021 — March 2022",
    "exp.e2.b1":
      "Built and managed staff work-data databases, including input and validation.",
    "exp.e2.b2":
      "Created data-processing tools to make monthly reports faster and more accurate.",
    "exp.e2.b3":
      "Provided IT support for laptops, computers, and printers at the school.",
    "exp.e2.b4":
      "Designed and built the school's digital assets (web pages and digital materials).",

    "exp.e3.date": "January 2020 — March 2020",
    "exp.e3.role": "Front-End Developer",
    "exp.e3.b1":
      "Built the BPTIK landing page and the Kemahasiswaan website of Universitas Ngudi Waluyo.",
    "exp.e3.b2":
      "Implemented web interfaces with HTML, CSS, and JavaScript.",
    "exp.e3.b3":
      "Designed UI/UX layouts for web projects under development.",
    "exp.e3.b4":
      "Researched front-end frameworks and libraries to optimise performance and presentation.",

    "proj.title": "Projects",
    "proj.p1.tag": "Desktop App · Internal",
    "proj.p1.desc":
      "Internal desktop application for labour-supply operations: authentication, data entry, and PL/pgSQL database functions on Supabase.",
    "proj.p1.note": "Private repository",
    "proj.p2.tag": "Desktop App",
    "proj.p2.desc":
      "Local HR-management desktop app that runs without a server, using pure-JavaScript SQLite (sql.js) and buildable into a Windows .exe installer.",
    "proj.p3.tag": "Desktop App",
    "proj.p3.desc":
      "Local desktop app for composing Instagram content: a multi-post canvas, live preview, and export to single PNGs or a ZIP.",
    "proj.p4.tag": "Desktop App",
    "proj.p4.desc":
      "Desktop app for subtitle-translation and fansubbing workflows: an .ass parser, grid viewer, detail panel, and a translation pipeline (Ollama integration planned).",
    "proj.p5.tag": "Web App",
    "proj.p5.desc":
      "Manga reader web app with CBZ/ZIP support and offline storage in IndexedDB.",
    "proj.p6.tag": "WordPress Theme",
    "proj.p6.desc":
      "A classic WordPress theme styled after old-school anime fansub sites, written in PHP without a modern framework.",
    "proj.p7.tag": "Web · Expert System",
    "proj.p7.desc":
      "Expert-system front-end using the Certainty Factor method to diagnose personality from user answers.",
    "proj.p8.tag": "Web · E-commerce",
    "proj.p8.desc": "A guppy-fish online store built with CodeIgniter 4.",

    "skills.title": "Technical Skills",
    "skills.lang.k": "Programming Languages",
    "skills.lang.v": "JavaScript · TypeScript · PHP · Python · Lua · HTML · CSS",
    "skills.fw.k": "Frameworks & Libraries",
    "skills.fw.v":
      "React · Vite · Electron · Laravel · CodeIgniter · Django · Node.js · PySide6 · Tailwind CSS · Zustand",
    "skills.db.k": "Databases",
    "skills.db.v":
      "PostgreSQL · MySQL · SQLite (sql.js) · IndexedDB · Relational schema design",
    "skills.api.k": "APIs & Integration",
    "skills.api.v": "RESTful API · Supabase · Ollama",
    "skills.support.k": "IT Support",
    "skills.support.v":
      "Hardware & software troubleshooting · OS and device installation & configuration · Printers & basic networking · Account & data management · User support · Technical documentation",
    "skills.tools.k": "Tools",
    "skills.tools.v": "Git · GitHub · Postman · NSIS",

    "edu.title": "Education & Certifications",
    "edu.e1.date": "Aug 2017 — Sep 2021",
    "edu.e1.degree": "Bachelor of Informatics Engineering",
    "edu.e1.school": "Universitas Ngudi Waluyo · Central Java",
    "edu.e1.gpa": "GPA 3.76 / 4.00",
    "edu.e2.degree": "Senior High School · Science (MIPA)",
    "edu.e2.school": "SMA Negeri 1 Berau · East Kalimantan",

    "cert.c1.name": "Introduction to Computer Programming",
    "cert.c1.meta": "Codepolitan · 2021",
    "cert.c2.meta": "Programiz · 2025",

    "contact.title": "Contact",
    "contact.lead":
      "Open to an IT Programmer & Application Developer role. Send an email or reach out through the links below.",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.site": "Website",

    "footer.note": "Designed and hand-built with HTML, CSS, and JavaScript.",
    "footer.meta": "Berau, East Kalimantan"
  };

  /* =========================================================
     Slides (horizontal deck)
     ========================================================= */
  var deck = document.querySelector(".deck");
  var slides = Array.prototype.slice.call(
    document.querySelectorAll(".slide")
  );
  var navEl = document.getElementById("slides-nav");
  var currentEl = document.getElementById("slide-current");
  var totalEl = document.getElementById("slide-total");
  var prevBtn = document.getElementById("slide-prev");
  var nextBtn = document.getElementById("slide-next");
  var dots = [];
  var activeIndex = -1;

  function pad(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function slideLabel(slide, i) {
    var custom = slide.getAttribute("data-slide-label");
    if (custom) {
      return root.lang === "en" && custom === "Intro" ? "Intro" : custom;
    }
    var h2 = slide.querySelector(".section-head h2");
    return h2 ? h2.textContent.trim() : "Slide " + (i + 1);
  }

  function buildNav() {
    if (!navEl) return;
    slides.forEach(function (slide, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "dot-nav";

      var label = document.createElement("span");
      label.className = "dot-nav-label";
      label.textContent = slideLabel(slide, i);

      var line = document.createElement("span");
      line.className = "dot-nav-line";

      btn.appendChild(label);
      btn.appendChild(line);
      btn.addEventListener("click", function () {
        goTo(i);
      });

      navEl.appendChild(btn);
      dots.push(btn);
    });
    if (totalEl) totalEl.textContent = pad(slides.length);
  }

  function syncNavLabels() {
    dots.forEach(function (btn, i) {
      var text = slideLabel(slides[i], i);
      btn.querySelector(".dot-nav-label").textContent = text;
      btn.setAttribute(
        "aria-label",
        (root.lang === "en" ? "Go to " : "Ke slide ") + text
      );
    });
  }

  function panelWidth() {
    return deck ? deck.clientWidth : window.innerWidth;
  }

  var navLock = false;

  function goTo(i) {
    if (i < 0 || i >= slides.length || !deck) return;
    navLock = true;
    window.setTimeout(function () {
      navLock = false;
    }, 650);
    var left = i * panelWidth();
    if (reduceMotion) {
      deck.scrollLeft = left;
      setActive(i);
    } else {
      deck.scrollTo({ left: left, behavior: "smooth" });
    }
  }

  function syncFromScroll() {
    if (!deck) return;
    var w = panelWidth();
    if (!w) return;
    var i = Math.round(deck.scrollLeft / w);
    i = Math.max(0, Math.min(slides.length - 1, i));
    if (i !== activeIndex) setActive(i);
  }

  function setActive(i) {
    if (i < 0 || i >= slides.length) return;
    if (i === activeIndex && slides[i].classList.contains("is-active")) {
      return;
    }
    activeIndex = i;

    slides.forEach(function (s, idx) {
      s.classList.toggle("is-active", idx === i);
    });

    dots.forEach(function (btn, idx) {
      btn.setAttribute("aria-current", idx === i ? "true" : "false");
    });

    if (currentEl) currentEl.textContent = pad(i + 1);
    if (prevBtn) prevBtn.disabled = i === 0;
    if (nextBtn) nextBtn.disabled = i === slides.length - 1;

    // Highlight the matching header link.
    var id = slides[i] ? slides[i].id : "";
    Array.prototype.forEach.call(
      document.querySelectorAll(".nav a"),
      function (a) {
        a.classList.toggle(
          "is-current",
          id !== "" && a.getAttribute("href") === "#" + id
        );
      }
    );

    // Kick off counters on the about slide.
    var counters = slides[i]
      ? slides[i].querySelectorAll("[data-count]")
      : [];
    Array.prototype.forEach.call(counters, animateCount);
  }

  /* ---------- Counters ---------- */
  function animateCount(el) {
    if (el.getAttribute("data-counted") === "true") return;
    el.setAttribute("data-counted", "true");

    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";

    if (isNaN(target)) return;

    if (reduceMotion) {
      el.textContent = target + suffix;
      return;
    }

    var duration = 1100;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  /* ---------- Entrance animation targets ---------- */
  var ANIM_SELECTOR = [
    ".eyebrow",
    ".hero-role",
    ".hero-lead",
    ".hero-meta",
    ".section-head",
    ".prose p",
    ".stat",
    ".entry",
    ".project-card",
    ".skill",
    ".certs li",
    ".contact-lead",
    ".contact-list li"
  ].join(", ");

  slides.forEach(function (slide) {
    var targets = slide.querySelectorAll(ANIM_SELECTOR);
    Array.prototype.forEach.call(targets, function (el, i) {
      el.classList.add("anim");
      el.style.transitionDelay = Math.min(i * 70, 560) + "ms";
    });
  });

  /* ---------- Active-slide detection + navigation ---------- */
  buildNav();
  syncNavLabels();

  if (slides.length) {
    setActive(0);
  }

  if (deck) {
    var scrollTick = false;
    deck.addEventListener(
      "scroll",
      function () {
        if (scrollTick) return;
        scrollTick = true;
        window.requestAnimationFrame(function () {
          scrollTick = false;
          syncFromScroll();
        });
      },
      { passive: true }
    );
  }

  // Wheel: scroll inside a panel first, then advance between panels.
  if (deck) {
    deck.addEventListener(
      "wheel",
      function (e) {
        // Horizontal intent (trackpad) → let native horizontal scrolling run.
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
        if (navLock) {
          e.preventDefault();
          return;
        }
        var panel = slides[activeIndex] || slides[0];
        if (!panel) return;
        var dy = e.deltaY;
        var canDown =
          panel.scrollTop + panel.clientHeight < panel.scrollHeight - 1;
        var canUp = panel.scrollTop > 1;
        if ((dy > 0 && canDown) || (dy < 0 && canUp)) return;
        e.preventDefault();
        goTo(dy > 0 ? activeIndex + 1 : activeIndex - 1);
      },
      { passive: false }
    );
  }

  // Hash links (nav, skip link, brand) become horizontal navigation.
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a) return;
    var id = a.getAttribute("href").slice(1);
    if (id === "top") {
      e.preventDefault();
      goTo(0);
      return;
    }
    for (var k = 0; k < slides.length; k++) {
      if (slides[k].id === id) {
        e.preventDefault();
        goTo(k);
        return;
      }
    }
  });

  // Keep the current panel aligned on resize.
  window.addEventListener("resize", function () {
    if (deck && activeIndex >= 0) deck.scrollLeft = activeIndex * panelWidth();
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      goTo(activeIndex - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      goTo(activeIndex + 1);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

    if (e.key === "ArrowRight" || e.key === "PageDown") {
      e.preventDefault();
      goTo(activeIndex + 1);
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      goTo(activeIndex - 1);
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      // Scroll inside the panel first; move on at its edges.
      var panel = slides[activeIndex];
      if (panel) {
        var down = e.key === "ArrowDown";
        var canDown =
          panel.scrollTop + panel.clientHeight < panel.scrollHeight - 1;
        var canUp = panel.scrollTop > 1;
        if ((down && canDown) || (!down && canUp)) {
          e.preventDefault();
          panel.scrollBy({
            top: down ? 120 : -120,
            behavior: reduceMotion ? "auto" : "smooth"
          });
          return;
        }
      }
      e.preventDefault();
      goTo(e.key === "ArrowDown" ? activeIndex + 1 : activeIndex - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(slides.length - 1);
    }
  });

  /* =========================================================
     Language
     ========================================================= */
  var nodes = Array.prototype.slice.call(
    document.querySelectorAll("[data-i18n]")
  );
  var idText = new Map();
  nodes.forEach(function (el) {
    idText.set(el, el.textContent);
  });

  var langBtn = document.getElementById("lang-toggle");

  function applyLang(lang) {
    var isEN = lang === "en";
    nodes.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var value = isEN && EN[key] != null ? EN[key] : idText.get(el);
      el.textContent = value;
    });

    root.lang = isEN ? "en" : "id";

    if (langBtn) {
      langBtn.textContent = isEN ? "ID" : "EN";
      langBtn.setAttribute(
        "aria-label",
        isEN ? "Ganti bahasa ke Indonesia" : "Switch language to English"
      );
    }

    syncNavLabels();
    updateClock();
  }

  var savedLang = null;
  try {
    savedLang = localStorage.getItem(STORAGE_LANG);
  } catch (e) {}
  applyLang(savedLang === "en" ? "en" : "id");

  if (langBtn) {
    langBtn.addEventListener("click", function () {
      var next = root.lang === "en" ? "id" : "en";
      applyLang(next);
      try {
        localStorage.setItem(STORAGE_LANG, next);
      } catch (e) {}
    });
  }

  /* =========================================================
     Theme (dark is the default)
     ========================================================= */
  var themeBtn = document.getElementById("theme-toggle");

  function updateThemeButton() {
    if (!themeBtn) return;
    var isDark = root.getAttribute("data-theme") === "dark";
    themeBtn.textContent = isDark ? "LIGHT" : "DARK";
    themeBtn.setAttribute(
      "aria-label",
      isDark ? "Aktifkan tema terang" : "Aktifkan tema gelap"
    );
  }

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_THEME, theme);
    } catch (e) {}
    updateThemeButton();
  }

  updateThemeButton();

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  /* =========================================================
     Scroll progress (deck position)
     ========================================================= */
  var bar = document.getElementById("progress-bar");
  if (bar) {
    var ticking = false;
    var updateProgress = function () {
      var max = deck ? deck.scrollWidth - deck.clientWidth : 0;
      var pct = max > 0 ? (deck.scrollLeft / max) * 100 : 0;
      bar.style.width = Math.min(100, Math.max(0, pct)) + "%";
      ticking = false;
    };
    var progressTarget = deck || window;
    progressTarget.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(updateProgress);
        }
      },
      { passive: true }
    );
    updateProgress();
  }

  /* =========================================================
     Berau local clock (WITA, UTC+8)
     ========================================================= */
  var clockEl = document.getElementById("clock");

  function updateClock() {
    if (!clockEl) return;
    var locale = root.lang === "en" ? "en-GB" : "id-ID";
    try {
      var fmt = new Intl.DateTimeFormat(locale, {
        timeZone: "Asia/Makassar",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
      clockEl.textContent = fmt.format(new Date());
    } catch (e) {
      var d = new Date();
      var h = (d.getUTCHours() + 8) % 24;
      var m = String(d.getUTCMinutes()).padStart(2, "0");
      clockEl.textContent = String(h).padStart(2, "0") + ":" + m;
    }
  }

  if (clockEl) {
    updateClock();
    window.setInterval(updateClock, 30000);
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
