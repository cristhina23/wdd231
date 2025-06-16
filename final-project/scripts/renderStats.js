
export async function renderStats() {
  const container = document.querySelector(".numbers");

  try {
    const response = await fetch('./scripts/data.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const statsData = await response.json();
    container.innerHTML = "";

    statsData.forEach(stat => {
      const statDiv = document.createElement("div");
      statDiv.classList.add("number");

      statDiv.innerHTML = `
        <span>${stat.number}</span>
        <p>${stat.text}</p>
      `;

      container.appendChild(statDiv);
    });

  } catch (error) {
    console.error("Error loading stats:", error);
    container.innerHTML = "<p>Unable to load stats at the moment.</p>";
  }
}

