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
  var sel = ".section-head, .engagement, .domain-card, .target-card, .portfolio-card, .feature-card, .pack-card, .detail-block, .profile-card, .closing-banner, .contact-inner, .testi-card, .testi-invite";
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
      e.style.transitionDelay = Math.min(sib, 5) * 90 + "ms";
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
