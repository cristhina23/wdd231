export async function renderRecipes() {
  try {
    const response = await fetch('./scripts/recipes.json'); 
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

     
      card.addEventListener('click', () => openModal(recipe));

      container.appendChild(card);
    });

  } catch (error) {
    console.error('Error loading recipes:', error);
    const container = document.getElementById('recipes-container');
    container.innerHTML = '<p>Sorry, we could not load the recipes.</p>';
  }
}


function openModal(recipe) {
  const modalContent = document.getElementById('modal-body');
  modalContent.innerHTML = ''; 

  const img = document.createElement('img');
  img.src = recipe.image;
  img.alt = recipe.name;
  img.loading = 'lazy';
 

  const title = document.createElement('h2');
  title.textContent = recipe.name;

  const time = document.createElement('p');
  time.textContent = `Time: ${recipe.time}`;

  const calories = document.createElement('p');
  calories.textContent = `Calories: ${recipe.calories}`;

  const description = document.createElement('p');
  description.textContent = recipe.description;

  modalContent.appendChild(img);
  modalContent.appendChild(title);
  modalContent.appendChild(time);
  modalContent.appendChild(calories);
  modalContent.appendChild(description);

  document.getElementById('recipe-modal').classList.remove('hidden');
}


document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('recipe-modal').classList.add('hidden');
});
