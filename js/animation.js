import { movePackage } from "./packagemover.js";

let intervals = new Array();
let positions = new Array();
for (let i = 0; i < 6; i++) {
    positions[i] = 0;
}

export function animate(beltcounter, imageMaker, beltItem) {
    if (positions[beltcounter] != 0) {
        localStorage.setItem('package'+beltcounter, positions[beltcounter]);
    }
    else {
        localStorage.setItem('package'+beltcounter, 0);
    }
    intervals[beltcounter] = setInterval(move, 10, beltcounter, imageMaker, beltItem);
    console.log(screen.width * 0.75);
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
    }

}

export function stop(beltcounter) {
    console.log(intervals[beltcounter], beltcounter);
    positions[beltcounter] = localStorage.getItem('package'+beltcounter);
    clearInterval(intervals[beltcounter]);
}