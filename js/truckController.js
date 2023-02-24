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

export function checkWeather() {
    let trucks = [];
    for (let i = 0; i < window.localStorage.length; i++) {
        let key = window.localStorage.key(i);
        console.log(key);
        if (key.slice(0, 5) === "truck") {
            trucks.push(JSON.parse(window.localStorage.getItem(key)));
        }
    }
    console.log(trucks);
}
