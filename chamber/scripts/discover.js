import businesses from './data.js';
const cards = document.querySelector('.cards');

console.log(businesses);
function displayBusinesses() {
  const container = document.createElement('div');
  container.classList.add('cards-container');
  businesses.forEach(business => {
    
    const cardContent = `
      <div class="card">
      <h2>${business.name}</h2>
        <div class="card-content">
          <div class="card-image">
          <figure>
          <img src="${business.img}" loading="lazy" alt="local shop" />
          </figure>
        </div>
        <div class="card-info">
          
          
          <p>${business.description}</p>
          <address>${business.address}</address>
          
        </div>
        </div>
        <button>Learn More</button>
      </div>
    `;

    container.innerHTML += cardContent;
    
  })
  cards.appendChild(container);
}

displayBusinesses();

const message = document.querySelector("#visits");
let lastVisit = localStorage.getItem("lastVisit");

if (lastVisit) {
  const daysSince = Math.floor((Date.now() - lastVisit) / 86400000);
  message.textContent = `Your last visit was ${daysSince} days ago.`;
} else {
  message.textContent = "Welcome! This is your first visit.";
}

localStorage.setItem("lastVisit", Date.now());  