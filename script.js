const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('error-message');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const cityDate = document.getElementById('city-date');
const humidityValue = document.getElementById('humidity');
const windSpeedValue = document.getElementById('wind-speed');


const API_KEY = "d192fcfe3584a98069c068201f33d94c";

/**
 * Asynchronously fetches weather data from the OpenWeatherMap API for a given city.
 * @param {string} city - The name of the city to get weather for.
 */
async function fetchWeather(city) {
    
    weatherInfo.style.display = 'none';
    errorMessage.style.display = 'none';
    loader.style.display = 'block';

    try {
        
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        
        const response = await fetch(apiUrl);

        
        if (!response.ok) {
            
            if (response.status === 404) {
                throw new Error('City not found. Please check the spelling or try a different city.');
            } else {
                throw new Error('An error occurred. Please try again.');
            }
        }

        
        const data = await response.json();

       
        updateUI(data);

    } catch (error) {
       
        console.error("Error fetching weather data:", error);
        errorMessage.textContent = error.message;
        errorMessage.style.display = 'block';

    } finally {
       
        loader.style.display = 'none';
    }
}

/**
 * Updates the UI elements with the fetched weather data.
 * @param {object} data - The weather data object from the API.
 */
function updateUI(data) {
    
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    cityDate.textContent = `${data.name}, ${data.sys.country} | ${dateString}, ${timeString}`;
    humidityValue.textContent = `${data.main.humidity}%`;
    windSpeedValue.textContent = `${data.wind.speed} m/s`;

    
    weatherInfo.style.display = 'flex';
}

/**
 * Event listener for the search button click.
 */
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

/**
 * Event listener for the Enter key press in the input field.
 */
cityInput.addEventListener('keypress', (event) => {
    // Check if the key pressed is "Enter"
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    }
});


document.addEventListener('DOMContentLoaded', () => {
    fetchWeather('London');
});
