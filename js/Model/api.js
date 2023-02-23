const API_KEY = '5fd95cd07d4497355ddf9030a99b491d';

export function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=nl`;
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            const celsius = Math.round(parseFloat(data.main.temp) - 273.15);
            const description = data.weather[0].main;
            return { celsius, description };
        });
}