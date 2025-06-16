// scripts/utils.js - Módulo para funciones de utilidad y configuración general

/**
 * Muestra un mensaje de error al usuario.
 * @param {string} message - El mensaje de error a mostrar.
 */
export const showError = (message) => {
    // Para simplicidad, se usa un alert. En producción, se usaría un elemento DOM dedicado.
    alert(`Error: ${message}`);
};

/**
 * Actualiza la información del pie de página (año actual y última modificación del documento).
 */
export const updateFooterInfo = () => {
    // Selecciona todos los elementos con IDs que empiezan por 'current-year'
    const currentYearElements = document.querySelectorAll('[id^="current-year"]');
    currentYearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });

    // Selecciona todos los elementos con IDs que empiezan por 'last-modified'
    const lastModifiedElements = document.querySelectorAll('[id^="last-modified"]');
    lastModifiedElements.forEach(element => {
        element.textContent = document.lastModified;
    });
};

/**
 * Inicializa la funcionalidad de alternar el menú de navegación para móviles.
 */
export const initializeMobileMenu = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Cierra el menú cuando se hace clic en un enlace (útil para el desplazamiento suave)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Uso de condicional de control
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }
};

/**
 * Inicializa las animaciones de desplazamiento para elementos con la clase 'animate-on-scroll'.
 * Utiliza IntersectionObserver para un rendimiento óptimo.
 */
export const initializeScrollAnimations = () => {
    const sectionsToAnimate = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Uso de condicional de control
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Dejar de observar una vez que se ha animado
            }
        });
    }, { threshold: 0.1 }); // El 10% del elemento debe ser visible para activar

    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });
};