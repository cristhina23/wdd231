export async function renderRecipes() {
  try {
    const response = await fetch('./scripts/recipes.json'); // Ajusta si tu ruta es diferente
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const recipes = await response.json();
    const container = document.getElementById('recipes-container');
    container.innerHTML = '';

    recipes.forEach(recipe => {
      const card = document.createElement('div');
      card.className = 'recipe-card';

      card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}">
        <h3>${recipe.name}</h3>
        <p><strong>Time:</strong> ${recipe.time}</p>
        <p><strong>Calories:</strong> ${recipe.calories}</p>
        <p>${recipe.description}</p>
      `;

      // 👉 Evento para abrir el modal
      card.addEventListener('click', () => openModal(recipe));

      container.appendChild(card);
    });

  } catch (error) {
    console.error('Error loading recipes:', error);
    const container = document.getElementById('recipes-container');
    container.innerHTML = '<p>Sorry, we could not load the recipes.</p>';
  }
}

// 👉 Función para abrir el modal
function openModal(recipe) {
  document.getElementById('modal-image').src = recipe.image;
  document.getElementById('modal-image').alt = recipe.name;
  document.getElementById('modal-title').textContent = recipe.name;
  document.getElementById('modal-time').textContent = `Time: ${recipe.time}`;
  document.getElementById('modal-calories').textContent = `Calories: ${recipe.calories}`;
  document.getElementById('modal-description').textContent = recipe.description;

  document.getElementById('recipe-modal').classList.remove('hidden');
}

// 👉 Cierra el modal
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('recipe-modal').classList.add('hidden');
  });

  // Cierra haciendo clic afuera
  document.getElementById('recipe-modal').addEventListener('click', (e) => {
    if (e.target.id === 'recipe-modal') {
      document.getElementById('recipe-modal').classList.add('hidden');
    }
  });
});
