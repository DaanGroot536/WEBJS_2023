import { animate, stop } from "./animation.js";
import { drawTruckContent } from "./View/truckContentView.js";

export function checkTruckContent(truckContent, truckID, truckContentArray, storageHall, bool) {
    let truck = document.getElementById("truck" + truckID);
    if (truckContent.isEmptied) {
        truck.style.display = 'none';
        if (bool) {
            let currPack = document.getElementById(`package${truckID}`);
            currPack.innerHTML = '';
        }
        stop(truckID);
        startBeltAgain(truckContent, truckID, truckContentArray, storageHall);
    }

}

function startBeltAgain(truckContent, truckID, truckContentArray, storageHall) {
    let storedTruck = JSON.parse(localStorage.getItem(`truck${truckID}`));
    let truckDiv = document.getElementById(`truck${truckID}`);
    setTimeout(function () {
        truckDiv.style.display = 'block';
        truckDiv.innerHTML = '';
        drawTruckContent(truckDiv, truckContent, truckID, truckContentArray, storageHall);

        let beltItem = document.getElementById(`package${truckID}`);
        truckContent.isEmptied = false;
        animate(truckID, beltItem, truckContent, storageHall, truckContentArray);
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
    }

    switch (truck.type) {
        case 'cold':
            if (weatherData.celsius >= 35) {
                localStorage.setItem(`moving${truckID}`, 'false');
                document.getElementById('truck'+truckID).style.borderRight = '1px solid red';
            }
        break;
        case 'fragile':
            if (weatherData.description === 'Rain' || weatherData.description === 'Snow') {
                localStorage.setItem(`moving${truckID}`, 'false');
                document.getElementById('truck'+truckID).style.borderRight = '1px solid red';
            }
        break;
        case 'pallet':
            if (weatherData.wind > 10) {
                localStorage.setItem(`moving${truckID}`, 'false');
                document.getElementById('truck'+truckID).style.borderRight = '1px solid red';
            }
        break;
    }
}
