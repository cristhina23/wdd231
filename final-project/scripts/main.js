const arrow = document.querySelector(".arrow");
const userOptions = document.querySelector(".user-options");
import { renderStats } from "./renderStats.js";
import { renderRecipes } from "./renderRecipes.js";


arrow.addEventListener("click", () => {
  userOptions.classList.toggle("active");
});

document.addEventListener('DOMContentLoaded', () => {
  function scrollAnimations() {
  const images = document.querySelectorAll('.scroll-image'); 

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show'); // Aplica a cada imagen visible
        observer.unobserve(entry.target); // Opcional: evitar reanimar
      }
    });
  }, {
    threshold: 0.5
  });

  images.forEach(image => observer.observe(image));
}
  scrollAnimations();
  renderStats();
  renderRecipes();

});



const lastModified = document.lastModified;

document.getElementById("last-updated").textContent = `Last modified: ${lastModified}`;

const checkbox = document.getElementById("lanzador");
const nav = document.querySelector("nav");

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    nav.classList.add("active");
  } else {
    nav.classList.remove("active");
  }
});


