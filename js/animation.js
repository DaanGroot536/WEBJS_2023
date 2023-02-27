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

    document.getElementById(`truck${beltcounter}`).style.border = '1px solid black';
    intervals[beltcounter] = setInterval(move, 10, beltcounter, imageMaker, beltItem);
    localStorage.setItem(`moving${beltcounter}`, true);
}

function move(beltcounter, imageMaker, beltItem) {
    let node = document.getElementById("package"+beltcounter);
    let currentPosition = parseInt(localStorage.getItem('package'+beltcounter));

    if(currentPosition < (screen.width * 0.5) ) {
        currentPosition = currentPosition + 1;
        localStorage.setItem('package'+beltcounter, currentPosition);
        node.style.left = currentPosition + "px";
    }
    else {
        movePackage(beltcounter);
        localStorage.setItem('package'+beltcounter, 0);
        let viewItem = document.getElementById('canvas'+beltcounter);
        viewItem.remove();
        let rnd = Math.floor(Math.random() * (4 - 0 + 1) + 0)
        imageMaker.draw(rnd, beltItem, beltcounter);
        checkTruckContent(beltcounter);
    }

}

export function stop(beltcounter) {
    if (document.getElementById('truck'+beltcounter).style.display === 'none') {
        document.getElementById('package'+beltcounter).style.left = 0;
        localStorage.setItem('package'+beltcounter, 0);
        positions[beltcounter] = 0;
        clearInterval(intervals[beltcounter]);
    }
    else {
        positions[beltcounter] = localStorage.getItem('package'+beltcounter);
        clearInterval(intervals[beltcounter]);
    }
}