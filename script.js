// Menu mobile : ouverture/fermeture simple, aucune dépendance.
const burger = document.getElementById("navBurger");
const menu = document.getElementById("mobileMenu");

if (burger && menu) {
  burger.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => menu.classList.remove("open"));
  });
}

// Formulaire "Présenter mon projet" : construit un message WhatsApp pré-rempli,
// aucun serveur nécessaire (site statique).
const projectForm = document.getElementById("projectForm");
if (projectForm) {
  const WHATSAPP_NUMBER = "242050238985";

  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nom = projectForm.nom.value.trim();
    const telephone = projectForm.telephone.value.trim();
    const type = projectForm.type.value;
    const localisation = projectForm.localisation.value.trim();
    const message = projectForm.message.value.trim();

    const lignes = [
      "Bonjour AEC, je souhaite présenter mon projet.",
      "",
      `Nom : ${nom}`,
      `Téléphone / WhatsApp : ${telephone}`,
      `Type de projet : ${type}`,
    ];
    if (localisation) lignes.push(`Localisation : ${localisation}`);
    if (message) lignes.push("", message);

    const texte = encodeURIComponent(lignes.join("\n"));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${texte}`, "_blank", "noopener");
  });
}

// ---- Apparitions douces au défilement (le contenu reste visible si le script échoue) ----
(function () {
  document.documentElement.classList.add("js");
  var sel = ".section-head, .engagement, .domain-card, .target-card, .portfolio-card, .feature-card, .pack-card, .detail-block, .profile-card, .closing-banner, .contact-inner, .testi-card, .testi-invite, .cn-card, .cn-offer, .cn-fig, .ar-steps li, .cn-why, .ba-card, .tf-acc, .tf-table-wrap, .ap-split, .ap-legal";
  var els = Array.prototype.slice.call(document.querySelectorAll(sel));
  if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); }
  else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (e) {
      var sib = e.parentElement ? Array.prototype.indexOf.call(e.parentElement.children, e) : 0;
      // cascade de 100 ms entre cartes d'une même ligne (colonnes de la grille)
      var cols = 1;
      if (e.parentElement) {
        var gt = getComputedStyle(e.parentElement).gridTemplateColumns;
        if (gt && gt !== "none") cols = gt.split(" ").length;
        else cols = 4;
      }
      var stg = e.parentElement && e.parentElement.getAttribute("data-stagger");
      e.style.transitionDelay = stg ? (sib % Math.max(cols, 1)) * parseInt(stg, 10) + "ms" : (sib % Math.max(cols, 1)) * 100 + "ms";
      e.classList.add("reveal");
      io.observe(e);
    });
  }
})();

// ---- Bouton WhatsApp flottant (toutes les pages) ----
(function () {
  if (document.querySelector(".wa-float")) return;
  var a = document.createElement("a");
  a.className = "wa-float";
  a.href = "https://wa.me/242050238985?text=" + encodeURIComponent("Bonjour AEC, je souhaite parler de mon projet.");
  a.target = "_blank";
  a.rel = "noopener";
  a.setAttribute("aria-label", "Écrire à AEC sur WhatsApp");
  a.innerHTML = '<span class="wa-float-label">Écrivez-nous sur WhatsApp</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.3z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1.2-1.6-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z" fill="currentColor" stroke="none"/></svg>';
  document.body.appendChild(a);
})();

// ---- Barre d'annonce fermable ----
(function () {
  var closed = false;
  try { closed = sessionStorage.getItem("aecAnnounce") === "1"; } catch (e) {}
  var nav = document.getElementById("nav");
  if (closed || !nav) return;
  var bar = document.createElement("div");
  bar.className = "announce";
  bar.innerHTML = 'Un projet à Pointe-Noire ou depuis l’étranger ? <a href="https://wa.me/242050238985?text=' + encodeURIComponent("Bonjour AEC, je souhaite parler de mon projet.") + '" target="_blank" rel="noopener">Écrivez-nous sur WhatsApp →</a><button class="announce-close" type="button" aria-label="Fermer">×</button>';
  nav.parentNode.insertBefore(bar, nav);
  bar.querySelector(".announce-close").addEventListener("click", function () {
    bar.remove();
    try { sessionStorage.setItem("aecAnnounce", "1"); } catch (e) {}
  });
})();

// ---- Bouton « remonter en haut » ----
(function () {
  var b = document.createElement("button");
  b.className = "to-top";
  b.type = "button";
  b.setAttribute("aria-label", "Remonter en haut de la page");
  b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(b);
  b.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  window.addEventListener("scroll", function () { b.classList.toggle("show", window.scrollY > 600); }, { passive: true });
})();

// ---- Burger animé (burger -> croix) ----
(function () {
  var burger = document.getElementById("navBurger");
  var menu = document.getElementById("mobileMenu");
  if (!burger || !menu) return;
  burger.addEventListener("click", function () { burger.classList.toggle("open", menu.classList.contains("open")); });
  menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { burger.classList.remove("open"); }); });
})();

// ---- Effet d'onde au toucher / clic sur les boutons ----
document.addEventListener("click", function (e) {
  var b = e.target.closest && e.target.closest(".btn");
  if (!b) return;
  var r = b.getBoundingClientRect();
  var size = Math.max(r.width, r.height);
  var s = document.createElement("span");
  s.className = "ripple";
  s.style.width = s.style.height = size + "px";
  s.style.left = (e.clientX - r.left - size / 2) + "px";
  s.style.top = (e.clientY - r.top - size / 2) + "px";
  b.appendChild(s);
  setTimeout(function () { s.remove(); }, 650);
});


// ---- Titres : apparition en fondu ----
(function () {
  var t = Array.prototype.slice.call(document.querySelectorAll("main h2, .xc-title, section h2"));
  t = t.filter(function (e, i) { return t.indexOf(e) === i; });
  if (!("IntersectionObserver" in window)) return;
  var io = new IntersectionObserver(function (en) {
    en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("tin"); io.unobserve(x.target); } });
  }, { threshold: 0.2 });
  t.forEach(function (e) { e.classList.add("title-fx"); io.observe(e); });
})();

// ---- Portfolio : défilement horizontal ----
(function () {
  var root = document.getElementById("pfSlider");
  if (!root) return;
  var tr = root.querySelector(".pf-track");
  function step() { var c = tr.querySelector(".portfolio-card"); return c ? c.getBoundingClientRect().width + 24 : 300; }
  function go(d) {
    var end = tr.scrollLeft + tr.clientWidth >= tr.scrollWidth - 4;
    if (d > 0 && end) tr.scrollTo({ left: 0, behavior: "smooth" });
    else if (d < 0 && tr.scrollLeft <= 4) tr.scrollTo({ left: tr.scrollWidth, behavior: "smooth" });
    else tr.scrollBy({ left: d * step(), behavior: "smooth" });
  }
  root.querySelector(".pf-next").addEventListener("click", function () { stop(); go(1); });
  root.querySelector(".pf-prev").addEventListener("click", function () { stop(); go(-1); });
  var timer = null;
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) {
    timer = setInterval(function () { go(1); }, 4500);
    ["pointerdown", "touchstart", "wheel", "focusin", "mouseenter"].forEach(function (ev) { root.addEventListener(ev, stop, { passive: true }); });
  }
})();


// ---- Comparateur Avant / Après (souris, toucher, clavier via input range) ----
(function () {
  document.querySelectorAll("[data-ba]").forEach(function (f) {
    var r = f.querySelector(".ba-range"), st = f.querySelector(".ba-stage");
    function up() { st.style.setProperty("--p", r.value + "%"); }
    r.addEventListener("input", up); up();
  });
})();

// ---- Flèche des boutons : léger glissement au survol ----
(function () {
  document.querySelectorAll(".btn, .link-arrow").forEach(function (el) {
    var n = el.lastChild;
    if (!n || n.nodeType !== 3 || !/→\s*$/.test(n.textContent)) return;
    n.textContent = n.textContent.replace(/\s*→\s*$/, " ");
    var sp = document.createElement("span"); sp.className = "arw"; sp.setAttribute("aria-hidden", "true"); sp.textContent = "→";
    el.appendChild(sp);
  });
})();


// ---- Comparateur : boutons de bascule Avant / Après (animation fluide) ----
(function () {
  document.querySelectorAll("[data-ba]").forEach(function (f) {
    var r = f.querySelector(".ba-range"), st = f.querySelector(".ba-stage");
    var bar = f.querySelector(".ba-toggle");
    if (!r || !bar) return;
    var raf = null;
    function go(to) {
      if (raf) cancelAnimationFrame(raf);
      var from = parseFloat(r.value), t0 = null, dur = 600;
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) { r.value = to; st.style.setProperty("--p", to + "%"); return; }
      function step(ts) {
        if (t0 === null) t0 = ts;
        var k = Math.min((ts - t0) / dur, 1), e = 1 - Math.pow(1 - k, 3);
        var v = from + (to - from) * e;
        r.value = v; st.style.setProperty("--p", v + "%");
        if (k < 1) raf = requestAnimationFrame(step);
      }
      raf = requestAnimationFrame(step);
    }
    bar.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () { go(b.getAttribute("data-to") === "avant" ? 100 : 0); });
    });
  });
})();


// ---- Onglets (profils) : clavier + fondu ----
(function () {
  document.querySelectorAll("[data-tabs]").forEach(function (root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute("aria-controls")); });
    function sel(i, focus) {
      tabs.forEach(function (t, k) {
        var on = k === i;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        if (on) { panels[k].hidden = false; } else { panels[k].hidden = true; }
      });
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { sel(i); });
      t.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % tabs.length;
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i + tabs.length - 1) % tabs.length;
        else if (e.key === "Home") n = 0; else if (e.key === "End") n = tabs.length - 1;
        if (n !== null) { e.preventDefault(); sel(n, true); }
      });
    });
  });
})();

// ---- Frise : le fil doré se dessine à l'entrée dans l'écran ----
(function () {
  var tl = document.querySelectorAll("[data-tl]");
  if (!tl.length) return;
  if (!("IntersectionObserver" in window)) { tl.forEach(function (e) { e.classList.add("tl-in"); }); return; }
  var io = new IntersectionObserver(function (en) {
    en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("tl-in"); io.unobserve(x.target); } });
  }, { threshold: 0.15 });
  tl.forEach(function (e) { io.observe(e); });
})();
