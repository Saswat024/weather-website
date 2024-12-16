// WEATHER APP

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "4b9a086c100412623080dac8d999362a";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value.trim();

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please Enter a City");
    }
});

async function getWeatherData(city) {
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Couldn't fetch weather data")
    }

    console.log(response);

    return await response.json();
}

function displayWeatherInfo(data){
    const {
        name: city, 
        main: {temp, humidity, temp_min, temp_max, feels_like}, 
        weather: [{description, id, icon}],
        wind: {speed}
    } = data;
    
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("img");
    const windSpeed = document.createElement("p");
    const minTemp = document.createElement("p");
    const maxTemp = document.createElement("p");
    const feelsLike = document.createElement("p");

    
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    windSpeed.textContent = `Wind Speed: ${speed} m/s`;
    minTemp.textContent = `Min: ${(temp_min - 273.15).toFixed(1)}°C`;
    maxTemp.textContent = `Max: ${(temp_max - 273.15).toFixed(1)}°C`;
    feelsLike.textContent = `Feels Like: ${(feels_like - 273.15).toFixed(1)}°C`;
 

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    minTemp.classList.add("minTemp");
    maxTemp.classList.add("maxTemp");
    feelsLike.classList.add("feelsLike");
    descDisplay.classList.add("descDisplay");
    windSpeed.classList.add("windSpeed");

    const tempDetails = document.createElement("div");
    tempDetails.classList.add("tempDetails");

    tempDetails.appendChild(minTemp);
    tempDetails.appendChild(maxTemp);
    tempDetails.appendChild(feelsLike);

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(tempDetails);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
    card.appendChild(windSpeed);
}

// function getWeatherEmoji(weatherId){
//     switch (true) {
//         case (weatherId >= 200 && weatherId < 300):
//             return "⛈️";
//             break;
    
//         case (weatherId >= 300 && weatherId < 400):
//             return "🌧️";
//             break;
    
//         case (weatherId >= 500 && weatherId < 600):
//             return "☔";
//             break;
    
//         case (weatherId >= 600 && weatherId < 700):
//             return "❄️";
//             break;
    
//         case (weatherId >= 700 && weatherId < 800):
//             return "🌫️";
//             break;

//         case (weatherId === 800):
//             return "☀️";
//             break;
    
//         case (weatherId >= 801 && weatherId < 810):
//             return "☁️";
//             break;
    
//         default:
//             return "❔"
//             break;
//     }
// }

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
