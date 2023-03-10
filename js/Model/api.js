const API_KEY = '5fd95cd07d4497355ddf9030a99b491d';

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=nl`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('City not found.');
    }

    const data = await response.json();
    const celsius = Math.round(parseFloat(data.main.temp) - 273.15);
    const description = data.weather[0].main;
    const wind = data.wind.speed;

    return { celsius, description, wind };
}

export const WeatherModel = {
    fetchWeather
};