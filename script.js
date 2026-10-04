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
