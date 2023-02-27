import { WeatherModel } from '../Model/api.js';
import { checkWeather } from '../truckmanager.js';

class weatherController {
    weatherButton = document.querySelector("#weatherBtn");
    cityInput = document.querySelector("#city-input");
    error = document.querySelector("#cityerror");
    errorMessageElement = document.getElementById('cityerror');

    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.weatherButton.addEventListener("click", () => {
            this.getLocalWeather();
        })
    }

    getLocalWeather() {
        const city = this.cityInput.value;

        WeatherModel.fetchWeather(city)
            .then((weatherData) => {
                this.showWeather(weatherData);

                // hide error
                this.errorMessageElement.textContent = "";
                this.errorMessageElement.classList.remove("active");
            })
            .catch((error) => {
                // show error
                this.errorMessageElement.classList.add("active");
                this.errorMessageElement.textContent = error;
            });
    }

    showWeather(weatherData) {
        checkWeather(weatherData);
        const descriptionElement = document.getElementById('description');
        const tempElement = document.getElementById('temp');
        const windElement = document.getElementById('windspeed');
      
        descriptionElement.textContent = weatherData.description;
        tempElement.textContent = `${weatherData.celsius}°C`;
        windElement.textContent = `Windspeed: ${weatherData.wind}`;
    }
}

new weatherController();

export const Controller = {
};