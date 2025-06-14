const arrow = document.querySelector(".arrow");
const userOptions = document.querySelectorAll(".user-options");

arrow.addEventListener("click", () => {
  userOptions.classList.toggle("active");
});

document.addEventListener('DOMContentLoaded', function () {
  const images = document.querySelectorAll('.scroll-image'); // Selecciona TODAS

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
});

/* <div class="banner">
            <div class="image-plate">
              <figure class="wpb_wrapper">
                <div class="plate_rounded">
                  <img
                    src="images/plate_rounded.png"
                    alt="plato giratorio"
                  />
                </div>
              </figure>
            </div>*/