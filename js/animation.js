import { movePackage } from "./packagemover.js";
import { checkTruckContent } from "./truckmanager.js";

let intervals = new Array();
let positions = new Array();

for (let i = 0; i < 6; i++) {
    positions[i] = 0;
}

export function animate(beltcounter, imageMaker, beltItem) {

    const position = positions[beltcounter];
    const item = position !== 0 ? position : 0;

    localStorage.setItem(`package${beltcounter}`, item);

    const truck = document.getElementById(`truck${beltcounter}`);
    truck.style.border = '1px solid black';

    intervals[beltcounter] = setInterval(move, 10, beltcounter, imageMaker, beltItem);
    localStorage.setItem(`moving${beltcounter}`, true);
}

function move(beltcounter, imageMaker, beltItem) {
    const node = document.getElementById(`package${beltcounter}`);
    let currentPosition = parseInt(localStorage.getItem(`package${beltcounter}`));

    if(currentPosition < screen.width * 0.5) {
        currentPosition += 1;
        localStorage.setItem(`package${beltcounter}`, currentPosition);
        node.style.left = `${currentPosition}px`;
    }
    else {
        movePackage(beltcounter);
        localStorage.setItem(`package${beltcounter}`, 0);

        let viewItem = document.getElementById(`canvas${beltcounter}`);
        viewItem.remove();

        let rnd = Math.floor(Math.random() * 5); // Generate a random number between 0 and 4
        imageMaker.draw(rnd, beltItem, beltcounter);

        checkTruckContent(beltcounter);
    }
}

export function stop(beltcounter) {
    const truck = document.getElementById(`truck${beltcounter}`);
    const item = document.getElementById(`package${beltcounter}`);

    if (truck.style.display === 'none') {
        item.style.left = 0;
        positions[beltcounter] = 0;
        clearInterval(intervals[beltcounter]);
        localStorage.setItem(`package${beltcounter}`, 0);
    }
    else {
        positions[beltcounter] = localStorage.getItem(`package${beltcounter}`);
        clearInterval(intervals[beltcounter]);
    }
}