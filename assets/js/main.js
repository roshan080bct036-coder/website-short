/* =============================================================================
   main.js - renders the portfolio from window.SITE (see data.js) and wires up
   navigation, theme switching, scroll reveals and publication filtering.
   Plain ES2015+. No dependencies.
   ========================================================================== */
(function () {
  "use strict";

  var S = window.SITE || {};
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  function el(tag, attrs, html) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") node.className = attrs[k];
        else if (k === "text") node.textContent = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    if (html != null) node.innerHTML = html;
    return node;
  }

  function boldAuthor(str) {
    return String(str).replace(/D\.\sN\.\sDhakal/g, "<strong>D. N. Dhakal</strong>");
  }

  /* ---------------------------------------------------------------- Hero */
  function renderHero() {
    if ($("#siteRole") && S.role) $("#siteRole").textContent = S.role;
    if ($("#siteTagline")) $("#siteTagline").textContent = S.tagline || "";
    if ($("#siteDeva")) $("#siteDeva").textContent = S.nameDevanagari || "";
    var sch = $("#heroScholar");
    if (sch && S.scholarUrl) sch.href = S.scholarUrl;
    var pl = $("#pubScholarLink");
    if (pl && S.scholarUrl) pl.href = S.scholarUrl;
  }

  /* ------------------------------------------------------------- Metrics */
  function renderMetrics() {
    var list = $("#metricsList");
    if (!list || !S.metrics) return;
    S.metrics.forEach(function (m) {
      var li = el("li");
      li.appendChild(el("span", { class: "metric__value" }, m.value));
      li.appendChild(el("span", { class: "metric__label", text: m.label }));
      list.appendChild(li);
    });
    if ($("#metricsNote")) $("#metricsNote").textContent = S.metricsNote || "";
  }

  /* --------------------------------------------------------------- About */
  function renderAbout() {
    var prose = $("#aboutProse");
    if (prose && S.about) {
      S.about.forEach(function (p) { prose.appendChild(el("p", { text: p })); });
    }
    var edu = $("#educationList");
    if (edu && S.education) {
      S.education.forEach(function (e) {
        var li = el("li");
        li.appendChild(el("span", { class: "meta-list__t", text: e.title }));
        li.appendChild(el("span", { class: "meta-list__s", text: e.org }));
        if (e.year) li.appendChild(el("span", { class: "meta-list__y", text: e.year }));
        edu.appendChild(li);
      });
    }
    var app = $("#appointmentsList");
    if (app && S.appointments) {
      S.appointments.forEach(function (a) {
        var li = el("li");
        li.appendChild(el("span", { class: "meta-list__t", text: a.title }));
        li.appendChild(el("span", { class: "meta-list__s", text: a.org }));
        if (a.year) li.appendChild(el("span", { class: "meta-list__y", text: a.year }));
        app.appendChild(li);
      });
    }
  }

  /* ------------------------------------------------------------ Research */
  function renderResearch() {
    var dl = $("#researchList");
    if (!dl || !S.research) return;
    S.research.forEach(function (r) {
      var wrap = el("div", { class: "research__item" });
      wrap.appendChild(el("dt", { text: r.title }));
      wrap.appendChild(el("dd", { text: r.body }));
      dl.appendChild(wrap);
    });
  }

  /* ----------------------------------------------------------- Fieldwork */
  function renderFieldwork() {
    if ($("#fieldworkIntro")) $("#fieldworkIntro").textContent = S.fieldworkIntro || "";
    var host = $("#langGroups");
    if (host && S.languageGroups) {
      S.languageGroups.forEach(function (g) {
        var group = el("div", { class: "lang-group" });
        group.appendChild(el("h3", { class: "lang-group__label", text: g.label }));
        var tags = el("div", { class: "lang-tags" });
        g.items.forEach(function (it) {
          var t = el("span", { class: "tag", text: it.name });
          if (it.note) { t.setAttribute("title", it.note); }
          tags.appendChild(t);
        });
        group.appendChild(tags);
        host.appendChild(group);
      });
    }
    var reg = $("#regionList");
    if (reg && S.regions) {
      S.regions.forEach(function (r) { reg.appendChild(el("li", { text: r })); });
    }
  }

  /* ------------------------------------------------------------ Projects */
  function renderProjects() {
    var ol = $("#projectList");
    if (!ol || !S.projects) return;
    S.projects.forEach(function (p) {
      var li = el("li", { class: "project" });
      li.appendChild(el("div", { class: "project__years", text: p.years }));
      var body = el("div", { class: "project__body-wrap" });
      body.appendChild(el("h3", { class: "project__title", text: p.title }));
      body.appendChild(el("p", { class: "project__org", text: p.org }));
      body.appendChild(el("p", { class: "project__body", text: p.body }));
      li.appendChild(body);
      ol.appendChild(li);
    });
  }

  /* -------------------------------------------------------- Publications */
  var TYPE_LABEL = { book: "Book", article: "Article", report: "Report", conference: "Conference" };
  var FILTER_NOUN = {
    book: "books & dictionaries", article: "articles & chapters",
    report: "reports & surveys", conference: "conference papers"
  };
  var pubState = { filter: "all", expanded: false };

  function pubItem(p) {
    var li = el("li", { class: "pub" + (p.type === "book" ? " is-book" : "") });
    li.setAttribute("data-type", p.type);
    if (p.featured) li.classList.add("is-featured");

    li.appendChild(el("span", { class: "pub__year", text: p.year }));

    var main = el("div", { class: "pub__main" });
    var title = el("h3", { class: "pub__title" });
    if (p.url) {
      var a = el("a", { href: p.url, target: "_blank", rel: "noopener", text: p.title });
      title.appendChild(a);
    } else {
      title.textContent = p.title;
    }
    main.appendChild(title);
    main.appendChild(el("p", { class: "pub__meta" }, boldAuthor(p.authors) + " &nbsp;·&nbsp; " + p.venue));
    li.appendChild(main);

    var badges = el("div", { class: "pub__badges" });
    badges.appendChild(el("span", { class: "pub__type", text: TYPE_LABEL[p.type] || "" }));
    if (p.cites) badges.appendChild(el("span", { class: "pub__cite", text: "cited " + p.cites + "×" }));
    li.appendChild(badges);
    return li;
  }

  function renderPubList() {
    var ol = $("#pubList");
    var empty = $("#pubEmpty");
    var toggle = $("#pubToggle");
    var count = $("#pubCount");
    if (!ol || !S.publications) return;

    var all = S.publications.slice().sort(function (a, b) { return b.year - a.year; });
    var filtered = pubState.filter === "all"
      ? all
      : all.filter(function (p) { return p.type === pubState.filter; });

    var showing = filtered;
    var collapsed = pubState.filter === "all" && !pubState.expanded;
    if (collapsed) showing = filtered.filter(function (p) { return p.featured; });

    ol.innerHTML = "";
    showing.forEach(function (p) { ol.appendChild(pubItem(p)); });

    var isEmpty = showing.length === 0;
    if (empty) empty.hidden = !isEmpty;
    ol.hidden = isEmpty;

    if (pubState.filter === "all") {
      toggle.hidden = false;
      toggle.setAttribute("aria-expanded", String(pubState.expanded));
      toggle.textContent = pubState.expanded ? "Show selected only" : "Show all publications";
      count.textContent = pubState.expanded
        ? "Showing all " + all.length
        : "Showing " + showing.length + " selected of " + all.length;
    } else {
      toggle.hidden = true;
      count.textContent = filtered.length + " " + (FILTER_NOUN[pubState.filter] || "");
    }
  }

  function initPublications() {
    renderPubList();
    $$(".chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        $$(".chip").forEach(function (c) {
          c.classList.remove("is-active");
          c.setAttribute("aria-pressed", "false");
        });
        chip.classList.add("is-active");
        chip.setAttribute("aria-pressed", "true");
        pubState.filter = chip.getAttribute("data-filter");
        pubState.expanded = false;
        renderPubList();
      });
    });
    var toggle = $("#pubToggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        // Keep the button pinned under the pointer while the list grows or
        // shrinks, so the toggle never jumps off-screen.
        var anchorBefore = toggle.getBoundingClientRect().top;
        pubState.expanded = !pubState.expanded;
        renderPubList();
        var drift = toggle.getBoundingClientRect().top - anchorBefore;
        if (drift) window.scrollBy(0, drift);
      });
    }
  }

  /* -------------------------------------------------- Teaching / Contact */
  function renderTeaching() {
    if ($("#teachingText")) $("#teachingText").textContent = S.teaching || "";
    var areas = $("#teachingAreas");
    if (areas && S.teachingAreas) {
      S.teachingAreas.forEach(function (a) { areas.appendChild(el("li", { text: a })); });
    }
  }

  function renderContact() {
    var c = S.contact || {};
    var addr = $("#contactAddress");
    if (addr && c.address) {
      addr.innerHTML = c.address.map(function (l) { return l; }).join("<br>");
    }
    var mail = $("#contactEmail");
    if (mail && c.email) {
      mail.href = "mailto:" + c.email;
      mail.textContent = c.email;
    }
    initEmailCopy(c.email);
    var links = $("#contactLinks");
    if (links && c.links) {
      c.links.forEach(function (lnk) {
        var li = el("li");
        li.appendChild(el("a", { href: lnk.url, target: "_blank", rel: "noopener", text: lnk.label }));
        links.appendChild(li);
      });
    }
  }

  function initEmailCopy(email) {
    var btn = $("#contactCopy");
    var hint = $("#contactEmailHint");
    if (!btn || !email) return;
    var label = btn.querySelector(".contact__copy-label");
    var timer;

    function flash(msg, ok) {
      if (label) label.textContent = ok ? "Copied" : "Copy";
      btn.classList.toggle("is-copied", !!ok);
      if (hint) { hint.textContent = msg; hint.hidden = false; }
      clearTimeout(timer);
      timer = setTimeout(function () {
        if (label) label.textContent = "Copy";
        btn.classList.remove("is-copied");
        if (hint) hint.hidden = true;
      }, 2400);
    }

    function selectEmailText() {
      var link = $("#contactEmail");
      if (!link || !window.getSelection || !document.createRange) return;
      var sel = window.getSelection();
      var range = document.createRange();
      range.selectNodeContents(link);
      sel.removeAllRanges();
      sel.addRange(range);
    }

    function legacyCopy() {
      var ok = false;
      try {
        var t = document.createElement("textarea");
        t.value = email;
        t.setAttribute("readonly", "");
        t.style.cssText = "position:absolute;left:-9999px;top:0";
        document.body.appendChild(t);
        t.select();
        ok = document.execCommand("copy");
        document.body.removeChild(t);
      } catch (e) { ok = false; }
      if (ok) {
        flash("Copied to clipboard", true);
      } else {
        selectEmailText();
        flash("Address selected — press Ctrl+C (or Cmd+C) to copy", false);
      }
    }

    btn.addEventListener("click", function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () {
          flash("Copied to clipboard", true);
        }).catch(legacyCopy);
      } else {
        legacyCopy();
      }
    });
  }

  function renderFooter() {
    var fine = $("#footerFine");
    if (fine) {
      var yr = new Date().getFullYear();
      fine.textContent = "© " + yr + " Dubi Nanda Dhakal. Last updated September 2026. "
        + "Citation data from Google Scholar.";
    }
  }

  /* -------------------------------------------------------------- Chrome */
  function prefersReduced() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function initNav() {
    var btn = $("#navToggle");
    var list = $("#navList");
    if (!btn || !list) return;
    function close() { list.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); }
    btn.addEventListener("click", function () {
      var open = list.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
    list.addEventListener("click", function (e) { if (e.target.tagName === "A") close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    window.addEventListener("resize", function () { if (window.innerWidth > 820) close(); });
  }

  function initTheme() {
    var root = document.documentElement;
    var btn = $("#themeToggle");
    var stored = null;
    try { stored = localStorage.getItem("theme"); } catch (e) {}
    if (stored === "light" || stored === "dark") root.setAttribute("data-theme", stored);

    function effective() {
      var t = root.getAttribute("data-theme");
      if (t === "light" || t === "dark") return t;
      return (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
    }
    if (btn) {
      btn.addEventListener("click", function () {
        var next = effective() === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem("theme", next); } catch (e) {}
      });
    }
  }

  function initStickyHeader() {
    var header = $("#siteHeader");
    var sentinel = $("#top");
    if (!header || !sentinel || !("IntersectionObserver" in window)) return;
    new IntersectionObserver(function (entries) {
      header.classList.toggle("is-stuck", !entries[0].isIntersecting);
    }, { rootMargin: "0px 0px 0px 0px" }).observe(sentinel);
  }

  function initReveal() {
    if (prefersReduced() || !("IntersectionObserver" in window)) return;
    var targets = $$([
      ".hero__text", ".hero__aside", ".metrics", ".section__head",
      ".about__prose", ".about__meta", ".research__item", ".lang-group",
      ".regions", ".project", ".filters", ".pubs", ".prose-lg",
      ".teaching__areas", ".contact__col"
    ].join(","));
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    targets.forEach(function (t) { t.classList.add("reveal"); io.observe(t); });
  }

  /* ---------------------------------------------------------------- Boot */
  function boot() {
    renderHero();
    renderMetrics();
    renderAbout();
    renderResearch();
    renderFieldwork();
    renderProjects();
    initPublications();
    renderTeaching();
    renderContact();
    renderFooter();
    initNav();
    initTheme();
    initStickyHeader();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
