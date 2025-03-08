

document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.querySelector(".menu");
  const menu = document.querySelector(".bottom");

  menuIcon.addEventListener("click", function () {
    menu.classList.toggle("active");
    console.log('hola');
  });
});