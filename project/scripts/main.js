// scripts/main.js - Archivo principal que orquesta la aplicación "Perfect Diet"

// Importa funciones utilitarias y de configuración general desde utils.js
import {
    showError,
    initializeMobileMenu,
    initializeScrollAnimations,
    updateFooterInfo
} from './utils.js';

// **Variables DOM globales para la sección de Recetas**
const recipeGrid = document.getElementById('recipe-grid');

// **Variables DOM globales para el Modal de Recetas**
const recipeModal = document.getElementById('recipe-modal');
let closeButton = null;
let modalImage = null;
let modalTitle = null;
let modalDescription = null;
let modalCalories = null;
let modalCookTime = null;
let modalFullInstructions = null;

if (recipeModal) {
    closeButton = recipeModal.querySelector('.close-button');
    modalImage = document.getElementById('modal-image');
    modalTitle = document.getElementById('modal-title');
    modalDescription = document.getElementById('modal-description');
    modalCalories = document.getElementById('modal-calories');
    modalCookTime = document.getElementById('modal-cook-time');
    modalFullInstructions = document.getElementById('modal-full-instructions');
}

// **Variables DOM globales para la sección de Estadísticas**
const statsGrid = document.getElementById('stats-grid');

// **Variable DOM global para el Formulario de Preferencias**
const dietPreferenceForm = document.getElementById('diet-preference-form');


// Evento que se dispara cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar la información del pie de página (fecha actual y última modificación)
    updateFooterInfo();

    // 2. Inicializar el menú de navegación móvil
    initializeMobileMenu();

    // 3. Inicializar las animaciones al desplazar (IntersectionObserver)
    initializeScrollAnimations();

    // 4. Lógica específica de la página actual
    // Usamos condicionales para ejecutar código solo si los elementos relevantes están presentes

    // Si estamos en la página principal (index.html)
    if (recipeGrid) {
        console.log("Iniciando carga de recetas y estadísticas para index.html...");
        fetchAndDisplayRecipes();
        setupRecipeModal(); // Configura los eventos del modal
        fetchAndDisplayStats();
    }

    // Si estamos en la página del formulario (form.html)
    if (dietPreferenceForm) {
        console.log("Iniciando manejo del formulario para form.html...");
        handleFormSubmission();
    }
});


// --- LÓGICA DE RECETAS ---

/**
 * Crea y retorna un elemento de tarjeta de receta.
 * @param {object} recipe - Objeto con los datos de la receta.
 * @returns {HTMLElement} El elemento `div` que representa la tarjeta de receta.
 */
const createRecipeCard = (recipe) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('recipe-card');
    cardDiv.setAttribute('data-id', recipe.id); // Guardamos el ID para el modal

    // Usando template literals para construir el HTML de forma limpia y moderna
    cardDiv.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image" loading="lazy">
        <div class="recipe-info">
            <h4>${recipe.name}</h4>
            <p class="recipe-calories">Calorías: ${recipe.calories} kcal</p>
            <p class="recipe-cook-time">Tiempo de Cocción: ${recipe.cookTime} min</p>
            <p class="recipe-description">${recipe.description}</p>
        </div>
    `;

    // Añade un evento de click a la tarjeta para abrir el modal
    cardDiv.addEventListener('click', () => openRecipeModal(recipe));

    return cardDiv;
};

/**
 * Obtiene las recetas del archivo JSON local y las muestra en la cuadrícula.
 */
const fetchAndDisplayRecipes = async () => {
    if (!recipeGrid) {
        return; // Salir si el elemento no existe
    }

    try {
        const response = await fetch('data/recipes.json');
        // Usamos la propiedad 'ok' de la respuesta para verificar si la petición fue exitosa
        if (!response.ok) {
            throw new Error(`Error HTTP! estado: ${response.status}`);
        }
        const recipes = await response.json(); // Convierte la respuesta a JSON
        // Usa forEach para iterar sobre el array de recetas y añadir cada tarjeta al DOM
        recipes.forEach(recipe => {
            recipeGrid.appendChild(createRecipeCard(recipe));
        });
    } catch (error) {
        // Usa la función de utilidad para mostrar errores
        showError('No se pudieron cargar las recetas. Por favor, inténtalo de nuevo más tarde.');
        console.error("Error al obtener las recetas:", error);
    }
};


// --- LÓGICA DEL MODAL DE RECETAS ---

/**
 * Configura los event listeners para el modal (cerrar botón y clic exterior).
 */
const setupRecipeModal = () => {
    if (!recipeModal) {
        return; // Salir si el modal no existe
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeRecipeModal);
    }

    // Cierra el modal cuando se hace clic fuera de su contenido
    recipeModal.addEventListener('click', (event) => {
        if (event.target === recipeModal) { // Comprueba si el clic fue directamente en el overlay
            closeRecipeModal();
        }
    });

    // Cierra el modal con la tecla Escape
    document.addEventListener('keydown', (event) => {
        // Uso de condicional de control (event.key)
        if (event.key === 'Escape') {
            if (recipeModal.classList.contains('active')) {
                closeRecipeModal();
            }
        }
    });
};

/**
 * Abre el modal y muestra los detalles de una receta específica.
 * @param {object} recipe - El objeto de la receta a mostrar.
 */
const openRecipeModal = (recipe) => {
    // Asegurarse de que todos los elementos DOM del modal existan antes de usarlos
    if (!recipeModal) {
        console.error("El elemento 'recipeModal' no fue encontrado.");
        return;
    }
    if (!modalImage) {
        console.error("El elemento 'modalImage' no fue encontrado.");
        return;
    }
    if (!modalTitle) {
        console.error("El elemento 'modalTitle' no fue encontrado.");
        return;
    }
    if (!modalDescription) {
        console.error("El elemento 'modalDescription' no fue encontrado.");
        return;
    }
    if (!modalCalories) {
        console.error("El elemento 'modalCalories' no fue encontrado.");
        return;
    }
    if (!modalCookTime) {
        console.error("El elemento 'modalCookTime' no fue encontrado.");
        return;
    }
    if (!modalFullInstructions) {
        console.error("El elemento 'modalFullInstructions' no fue encontrado.");
        return;
    }

    // Rellenar el modal con los datos de la receta usando template literals
    modalImage.src = recipe.image;
    modalImage.alt = `Imagen de ${recipe.name}`;
    modalTitle.textContent = recipe.name;
    modalDescription.textContent = recipe.description;
    modalCalories.textContent = recipe.calories;
    modalCookTime.textContent = recipe.cookTime;
    modalFullInstructions.textContent = recipe.fullInstructions;

    // Mostrar el modal
    recipeModal.classList.add('active');
    document.body.classList.add('modal-open'); // Previene el scroll del fondo
    recipeModal.focus(); // Enfoca el modal para accesibilidad
};

/**
 * Cierra el modal de receta.
 */
const closeRecipeModal = () => {
    if (recipeModal) {
        recipeModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
};


// --- LÓGICA DE ESTADÍSTICAS ---

/**
 * Crea y retorna un elemento de tarjeta de estadística de salud.
 * @param {object} stat - Objeto con los datos de la estadística.
 * @returns {HTMLElement} El elemento `div` que representa la tarjeta de estadística.
 */
const createStatCard = (stat) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('stat-card');

    // Usando template literals para el HTML de la tarjeta
    cardDiv.innerHTML = `
        <img src="${stat.icon}" alt="${stat.title} icono" class="stat-icon" loading="lazy">
        <h4>${stat.title}</h4>
        <p class="stat-value">${stat.value}</p>
        <p class="stat-description">${stat.description}</p>
    `;

    return cardDiv;
};

/**
 * Obtiene las estadísticas de salud del archivo JSON local y las muestra en la cuadrícula.
 */
const fetchAndDisplayStats = async () => {
    if (!statsGrid) {
        return; // Salir si el elemento no existe
    }

    try {
        const response = await fetch('data/stats.json');
        if (!response.ok) {
            throw new Error(`Error HTTP! estado: ${response.status}`);
        }
        const stats = await response.json();
        stats.forEach(stat => {
            statsGrid.appendChild(createStatCard(stat));
        });
    } catch (error) {
        showError('No se pudieron cargar las estadísticas de salud. Por favor, inténtalo de nuevo más tarde.');
        console.error("Error al obtener las estadísticas:", error);
    }
};


// --- LÓGICA DEL FORMULARIO DE PREFERENCIAS ---

/**
 * Configura el event listener para el envío del formulario de preferencias.
 * Guarda los datos en `localStorage` y redirige al usuario.
 */
const handleFormSubmission = () => {
    if (!dietPreferenceForm) {
        return; // Salir si el formulario no existe
    }

    dietPreferenceForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Previene el envío por defecto del formulario

        const formData = new FormData(dietPreferenceForm);
        const preferences = {}; // Objeto para almacenar las preferencias del usuario

        // Itera sobre los pares clave-valor del formulario
        for (const [key, value] of formData.entries()) {
            // Usa un condicional para manejar las restricciones como un array
            if (key === 'restrictions') {
                if (!preferences[key]) {
                    preferences[key] = []; // Inicializa el array si es la primera restricción
                }
                preferences[key].push(value); // Agrega el valor al array de restricciones
            } else {
                preferences[key] = value; // Para otros campos, asigna el valor directamente
            }
        }

        // Intenta guardar las preferencias en `localStorage`
        try {
            localStorage.setItem('dietPreferences', JSON.stringify(preferences));
            // Redirige a la página de agradecimiento
            window.location.href = 'thankyou.html';
        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
            showError('No se pudieron guardar tus preferencias. Por favor, asegúrate de que tu navegador lo permite.');
        }
    });
};