const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = '56e79226ad41150dc6183c911ff34f3a';
const weatherResult = document.getElementById('weatherResult');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = cityInput.value;

    if (city) {
        try{
            const weatherData = await getWeather(city);
            displayWeather(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError('Please enter a city');
    }
});

async function getWeather(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error('City not found');
    }

    const weatherData = await response.json();
    return weatherData;
}

function displayWeather(data) {
    const { name, main: { temp, humidity }, weather: [{ description, id }] } = data;
    
}

function getWeatherEmoji(weatherId) {

}

function displayError(message) {
    const errorDisplay = document.createElement('p');
    errorDisplay.classList.add('errorDisplay');
    errorDisplay.textContent = message;

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}