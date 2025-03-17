const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const displayGrid = document.getElementById("members-container");
const displayList = document.getElementById("members-container-list");
const lastModified = document.lastModified;

document.getElementById("last-updated").textContent = `Last modified: ${lastModified}`;

gridbutton.addEventListener("click", () => {
  displayGrid.classList.remove("none");
  displayList.classList.add("none");
  
});

listbutton.addEventListener("click", () => {
  displayList.classList.remove("none");
  displayGrid.classList.add("none");
  
});


document.addEventListener("DOMContentLoaded", () => {
  loadMembers();
});

async function loadMembers() {
  try {
    const response = await fetch("chamber\scripts\directory.json"); 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error fetching members:", error);
  }
}

function displayMembers(members) {
  const container = document.getElementById("members-container");

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

    container.appendChild(card);
  });
}