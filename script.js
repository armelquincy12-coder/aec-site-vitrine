// Menu mobile : ouverture/fermeture simple, aucune dépendance.
const burger = document.getElementById("navBurger");
const menu = document.getElementById("mobileMenu");

burger.addEventListener("click", () => {
  menu.classList.toggle("open");
});

menu.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => menu.classList.remove("open"));
});
