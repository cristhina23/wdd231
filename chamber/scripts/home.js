const apiKey = '753c05171ea53648ce7c098157f9ff67'; 
const city = 'Lima'; 
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
const lastModified = document.lastModified;

document.getElementById("last-updated").textContent = `Last modified: ${lastModified}`;

document.addEventListener("DOMContentLoaded", () => {
  loadMembers();
});

let membersData = [];

async function loadMembers() {
  try {
    const response = await fetch("data/menbers.json"); 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const members = await response.json();
    membersData = members;
    displayGoldMembers(members); 
  } catch (error) {
    console.error("Error fetching members:", error);
  }
}

// Function to get current weather data
async function getCurrentWeather() {
  try {
    const response = await fetch(weatherURL);
    
    if (!response.ok) {
      throw new Error('Failed to fetch current weather data');
    }

    const data = await response.json();

    // Display temperature and weather description
    document.querySelector('#current-temp').textContent = `${data.main.temp} °C`;
    document.querySelector('#current-desc').textContent = data.weather[0].description;
    document.querySelector('#high').textContent = `${data.main.temp_max} °C`;
    document.querySelector('#low').textContent = `${data.main.temp_min} °C`;
    document.querySelector('#humidity').textContent = `${data.main.humidity} %`;
    document.querySelector('#sunrise').textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    document.querySelector('#sunset').textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();

  } catch (error) {
    console.error('Error fetching current weather:', error);
  }
}

// Function to get 3-day weather forecast
async function getForecast() {
  try {
    const response = await fetch(forecastURL);

    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }

    const data = await response.json();
    const forecastContainer = document.querySelector('#forecast');
    forecastContainer.innerHTML = ''; // Limpiar contenido anterior

    

    // Obtener los días únicos en la lista
    const days = [];

    data.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!days.includes(date)) {
        days.push(date);
      }
    });

    

    // Tomar los tres primeros días y buscar el forecast a las 12:00:00 o el más cercano
    const filteredForecast = days.slice(0, 3).map(day => {
      let forecast = data.list.find(item => item.dt_txt === `${day} 12:00:00`);

      if (!forecast) {
        // Si no hay de 12:00:00, toma el primero del día
        forecast = data.list.find(item => item.dt_txt.startsWith(day));
      }

      
      return forecast;
    }).filter(item => item);

    // Mostrar resultados
    filteredForecast.forEach((item, index) => {
      const date = new Date(item.dt_txt);
      const temp = Math.round(item.main.temp);

      let dayLabel;
      if (index === 0) {
        dayLabel = 'Today';
      } else if (index === 1) {
        dayLabel = 'Tomorrow';
      } else {
        dayLabel = date.toLocaleDateString('en-US', { weekday: 'long' });
      }

      const forecastCard = document.createElement('div');
      forecastCard.classList.add('forecast-day');

      forecastCard.innerHTML = `
        <p>${dayLabel}: ${temp} °C</p>
      `;

      forecastContainer.appendChild(forecastCard);
    });

  } catch (error) {
    console.error('Error fetching forecast:', error);
  }
}


// Call weather functions
getCurrentWeather();
getForecast();


function displayGoldMembers(members = membersData) {
  const goldMembers = members.filter(member => member.membership === 'Gold');
  console.log('Gold Members:', goldMembers);
  innerHTML = '';

  const displayContainer = document.getElementById("advertisement");

  goldMembers.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("advertisement-card");

    card.innerHTML = `
      <div class="company-name">${member.name}</div>
              <div class="company-content">
                <div class="company-img">
                  <img src="${member.image}" alt="">
                </div>
                <div class="company-info">
                  <p><span>email:</span> ${member.email}</p>
                  <p><span>phone:</span>${member.phone}</p>
                  <p><span>website:</span> ${member.website}</p>
                </div>
              </div>
    `;

    displayContainer.appendChild(card);
  });
}

