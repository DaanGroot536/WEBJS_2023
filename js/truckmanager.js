import { animate, stop } from "./animation.js";
import { drawTruckContent } from "./View/truckContentView.js";
import ImageMaker from "./imagemaker.js";

export function checkTruckContent(truckContent, truckID) {
    let truck = document.getElementById("truck" + truckID);
    if (truckContent.isEmptied) {
        truck.style.display = 'none';
        stop(truckID);
        startBeltAgain(truckContent, truckID);
    }

}

function startBeltAgain(truckContent, truckID) {
    let storedTruck = JSON.parse(localStorage.getItem(`truck${truckID}`));
    let truckDiv = document.getElementById(`truck${truckID}`);
    setTimeout(function () {
        truckDiv.style.display = 'block';
        truckDiv.innerHTML = '';
        drawTruckContent(truckDiv, truckContent);
        let beltItem = document.getElementById(`package${truckID}`);
        truckContent.isEmptied = false;
        animate(truckID, beltItem, truckContent);
    }, (storedTruck.interval * 1000));

}

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
    if (localStorage.getItem(`moving${truckID}`) == 'false') {
        localStorage.setItem(`moving${truckID}`, 'true');
        document.getElementById('truck'+truckID).style.border = '1px solid black';
    }

    switch (truck.type) {
        case 'cold':
            if (weatherData.celsius >= 35) {
                localStorage.setItem(`moving${truckID}`, 'false');
                document.getElementById('truck'+truckID).style.border = '1px solid red';
            }
        break;
        case 'fragile':
            if (weatherData.description === 'Rain' || weatherData.description === 'Snow') {
                localStorage.setItem(`moving${truckID}`, 'false');
                document.getElementById('truck'+truckID).style.border = '1px solid red';
            }
        break;
        case 'pallet':
            if (weatherData.wind > 10) {
                localStorage.setItem(`moving${truckID}`, 'false');
                document.getElementById('truck'+truckID).style.border = '1px solid red';
            }
        break;
    }
}
