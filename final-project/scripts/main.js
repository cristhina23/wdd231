const arrow = document.querySelector(".arrow");
const userOptions = document.querySelector(".user-options");
const checkbox = document.getElementById("lanzador");
const nav = document.querySelector("nav");
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
        entry.target.classList.add('show'); 
        observer.unobserve(entry.target); 
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

  const savedUserOptions = localStorage.getItem("userOptionsOpen");
  if (savedUserOptions === "true") {
    userOptions.classList.add("active");
  }

  const isMenuOpen = localStorage.getItem("menuAbierto");


  if (isMenuOpen === "true") {
  checkbox.checked = true;
  nav.classList.add("active");
  }


  checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    nav.classList.add("active");
    localStorage.setItem("menuAbierto", "true");
  } else {
    nav.classList.remove("active");
    localStorage.setItem("menuAbierto", "false");
  }
  });

});



const lastModified = document.lastModified;

document.getElementById("last-updated").textContent = `Last modified: ${lastModified}`;



checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    nav.classList.add("active");
  } else {
    nav.classList.remove("active");
  }
});


