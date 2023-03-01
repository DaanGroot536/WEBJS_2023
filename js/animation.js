import { movePackage } from "./packagemover.js";
import { checkTruckContent } from "./truckmanager.js";
import { drawTetrisShape } from "./View/tetrisShapeView.js";
import TetrisShape from "./Model/tetrisShape.js";
import { drawTruckContent } from "./View/truckContentView.js";

let intervals = new Array();
let positions = new Array();

for (let i = 0; i < 6; i++) {
    positions[i] = 0;
}

export function animate(beltcounter, beltItem, truckContent) {
    const position = positions[beltcounter];
    const item = position !== 0 ? position : 0;
    localStorage.setItem(`package${beltcounter}`, item);
    // const truck = document.getElementById(`truck${beltcounter}`);

    let rnd = Math.floor(Math.random() * (5 - 1) + 1);
    let tetrisShape = new TetrisShape(rnd);
    drawTetrisShape(beltItem, tetrisShape, beltcounter);

    localStorage.setItem(`shape${beltcounter}`, JSON.stringify(tetrisShape));
    localStorage.setItem(`package${beltcounter}`, 0);
    intervals[beltcounter] = setInterval(move, 10, beltcounter, beltItem, truckContent);
    localStorage.setItem(`moving${beltcounter}`, true);
}

function move(beltcounter, beltItem, truckContent) {
    const node = document.getElementById(`package${beltcounter}`);
    let currentPosition = parseInt(localStorage.getItem(`package${beltcounter}`));
    if (currentPosition == screen.width * 0.5) {
        localStorage.setItem(`package${beltcounter}`, 0);
        truckContent.addShape(JSON.parse(localStorage.getItem(`shape${beltcounter}`)));
        let rnd = Math.floor(Math.random() * (5 - 1) + 1);
        let newShape = new TetrisShape(rnd);
        localStorage.setItem(`shape${beltcounter}`, JSON.stringify(newShape));
        drawTetrisShape(beltItem, newShape, beltcounter);
        let viewItem = document.getElementById(`canvas${beltcounter}`);
        viewItem.remove();

        localStorage.setItem(`package${beltcounter}`, 0);
        beltItem.style.left = '0px';

        let truckDiv = document.getElementById(`truck${beltcounter}`);
        truckDiv.removeChild(truckDiv.children[0]);
        drawTruckContent(truckDiv, truckContent);
    }
    else {
        currentPosition += 1;
        localStorage.setItem(`package${beltcounter}`, currentPosition);
        node.style.left = `${currentPosition}px`;
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