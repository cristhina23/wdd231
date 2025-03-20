const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const displayContainer = document.getElementById("members-container");
const lastModified = document.lastModified;

document.getElementById("last-updated").textContent = `Last modified: ${lastModified}`;

let membersData = [];

// Botón Grid
gridbutton.addEventListener("click", () => {
  displayContainer.classList.remove("list");
  
  displayMembers(membersData);
});

// Botón Lista
listbutton.addEventListener("click", () => {
  displayListMembers(membersData);
});

// Cargar miembros al iniciar
document.addEventListener("DOMContentLoaded", () => {
  loadMembers();
});

async function loadMembers() {
  try {
    const response = await fetch("data/menbers.json"); 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const members = await response.json();
    membersData = members;
    displayMembers(members); // Render por defecto en grid
  } catch (error) {
    console.error("Error fetching members:", error);
  }
}

function displayMembers(members) {
  displayContainer.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("card"); 

    card.innerHTML = `
      <img src="${member.image}" alt="local shop" />
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p>${member.membership} Membership</p>
    `;

    displayContainer.appendChild(card);
  });
}

function displayListMembers(members) {
  displayContainer.innerHTML = "";
  displayContainer.classList.add("list"); 
  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("card-list"); 

    card.innerHTML = `
      <div class="card-list-info">
        <p class="name-list">${member.name}</p> 
        <p class="address">${member.address}</p>
        <p class="phone">${member.phone}</p>
        <a class="website" href="${member.website}" target="_blank">Visit Website</a>
      </div>
      <div>
        <p>${member.membership} Membership</p>
      </div>
    `;

    displayContainer.appendChild(card);
  });
}
