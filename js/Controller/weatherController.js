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
              e.preventDefault();
            }
          });

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
        
        this.descriptionElement.textContent = `Weather: ${weatherData.description}`;
        this.tempElement.textContent = `${weatherData.celsius}°C`;
        this.windElement.textContent = `Windspeed: ${weatherData.wind}`;
    }
}

new weatherController();

export const Controller = {
};