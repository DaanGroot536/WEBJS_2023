import { WeatherModel } from '../Model/api.js';
import { checkWeather } from '../truckmanager.js';

class weatherController {
    constructor() {
        this.weatherButton = document.querySelector("#weatherNextBtn");
        this.cityInput = document.querySelector("#weather");
        this.errorMessageElement = document.getElementById('weathererror');
    
        this.descriptionElement = document.getElementById('description');
        this.tempElement = document.getElementById('temp');
        this.windElement = document.getElementById('windspeed');

        this.setupEventListeners();
    }

    setupEventListeners() {
        const inputField = document.getElementById("weatherForm")
        inputField.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
              e.preventDefault(); // disable enter key
            }
          });

        this.weatherButton.addEventListener("click", () => {
            this.getLocalWeather();
        })
    }

    getLocalWeather() {
        const city = this.cityInput.value;

        if (city.trim() === '') {
            this.errorMessageElement.textContent = "Please enter a city name";
            this.errorMessageElement.classList.add("active");
            return;
        }

        WeatherModel.fetchWeather(city)
            .then((weatherData) => {
                this.showWeather(weatherData);

                // hide error
                this.errorMessageElement.textContent = "";
                this.errorMessageElement.classList.remove("active");
            })
            .catch(() => {
                // show error
                this.errorMessageElement.classList.add("active");
                this.errorMessageElement.textContent = "City not found";
            });
    }

    showWeather(weatherData) {
        // disable trucks if needed
        checkWeather(weatherData);

        // update weather elements
        this.descriptionElement.textContent = `Weather: ${weatherData.description}`;
        this.tempElement.textContent = `${weatherData.celsius}°C`;
        this.windElement.textContent = `Windspeed: ${weatherData.wind}`;
    }
}

new weatherController();

export const Controller = {
};