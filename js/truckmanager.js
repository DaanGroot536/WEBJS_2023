import { animate, stop } from "./animation.js";
import ImageMaker from "./imagemaker.js";

export function checkTruckContent(truckID) {
    let truck = document.getElementById("truck" + truckID);
    let content = truck.querySelectorAll('canvas');
    console.log(content.length);
    if (content.length > 2) {
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
