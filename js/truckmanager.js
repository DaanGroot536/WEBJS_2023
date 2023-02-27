import { animate, stop } from "./animation.js";
import ImageMaker from "./imagemaker.js";

export function checkTruckContent(truckID) {
    let truck = document.getElementById("truck" + truckID);
    let storedTruck = JSON.parse(localStorage.getItem(`truck${truckID}`));
    let content = truck.querySelectorAll('canvas');
    let space = storedTruck.length * storedTruck.width;
    if (content.length === space) {
        truck.style.display = 'none';
        stop(truckID);
        startBeltAgain(truckID);
    }

}

function startBeltAgain(truckID) {
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
//-strong wind != pallets

export function checkWeather(weatherData) {
    let trucks = [];

    for (let i = 0; i < window.localStorage.length; i++) {
        let key = window.localStorage.key(i);
        if (key.slice(0, 5) === "truck") {
            trucks.push(JSON.parse(window.localStorage.getItem(key)));
            console.log(trucks);
            checkRoadClearance(key.slice(5, 6), JSON.parse(window.localStorage.getItem(key)), weatherData);
        }
    }
}

function checkRoadClearance(truckID, truck, weatherData) {
    let beltItem = document.getElementById(`package${truckID}`);
    let imageMaker = new ImageMaker();
    console.log(localStorage.getItem(`moving${truckID}`));
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
                console.log(truckID);
                document.getElementById('truck'+truckID).style.border = '1px solid red';
            }
        break;
    }
    console.log(weatherData);
}