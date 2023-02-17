//import { draw } from './imagemaker.js';
import ImageMaker from "./imagemaker.js";

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
    // setInterval(move, 10, beltcounter);
    intervals[beltcounter] = setInterval(move, 10, beltcounter, imageMaker, beltItem);
    console.log(screen.width * 0.75);
}

function move(beltcounter, imageMaker, beltItem) {
    let node = document.getElementById("package"+beltcounter);
    // console.log(node, currentPosition);
    let currentPosition = parseInt(localStorage.getItem('package'+beltcounter));

    if(currentPosition < (screen.width * 0.5) ) {
        currentPosition = currentPosition + 1;
        localStorage.setItem('package'+beltcounter, currentPosition);
        node.style.left = currentPosition + "px";
    }
    else {
        localStorage.setItem('package'+beltcounter, 0);
        let rnd = Math.floor(Math.random() * (4 - 0 + 1) + 0)
        imageMaker.draw(rnd, beltItem);
    }

}

export function stop(beltcounter) {
    console.log(intervals[beltcounter], beltcounter);
    positions[beltcounter] = localStorage.getItem('package'+beltcounter);
    clearInterval(intervals[beltcounter]);
}