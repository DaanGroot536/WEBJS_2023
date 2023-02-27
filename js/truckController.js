import { animate, stop } from "./animation.js";
import ImageMaker from "./imagemaker.js";


export function checkTruckContent(truckID) {
    let truck = document.getElementById("truck" + truckID);
    let content = truck.querySelectorAll('canvas');
    console.log(content.length);
    if (content.length > 2) {
        truck.style.display = 'none';
        stop(truckID);
        startBelt(truckID);
    }

}

function startBelt(truckID) {
    let storedTruck = JSON.parse(localStorage.getItem(`truck${truckID}`));
    let truck = document.getElementById("truck" + truckID);
    setTimeout(function () {
        truck.style.display = 'block';
        truck.innerHTML = '';
        let beltItem = document.getElementById(`package${truckID}`);
        let imageMaker = new ImageMaker();
        animate(truckID, imageMaker, beltItem);
    }, (storedTruck.interval * 1000));

}

//get weather
//compare for each truck if it can be on the road
//args:
//-rain/snow != fragile
//-if >35 celsius != cold
//-strong wind != pallets
//if not make visible the truck cant go due to weather
//stop the animation

export function checkWeather(weatherData) {
    let trucks = [];

    for (let i = 0; i < window.localStorage.length; i++) {
        let key = window.localStorage.key(i);
        if (key.slice(0, 5) === "truck") {
            trucks.push(JSON.parse(window.localStorage.getItem(key)));
            checkRoadClearance(key.slice(5, 6), JSON.parse(window.localStorage.getItem(key)), weatherData);
        }
    }
}

function checkRoadClearance(truckID, truck, weatherData) {
    let beltItem = document.getElementById(`package${truckID}`);
    let imageMaker = new ImageMaker();
    console.log(localStorage.getItem(`moving${truckID}`));
    if (localStorage.getItem(`moving${truckID}`) == 'false') {
        animate(truckID, imageMaker, beltItem);
    }

    switch (truck.type) {
        case 'cold':
            if (weatherData.celsius >= 35) {
                stop(truckID);
            }
        break;
        case 'fragile':
            if (weatherData.description === 'Rain' || weatherData.description === 'Snow') {
                stop(truckID);
            }
        break;
    }
    console.log(weatherData);
}
