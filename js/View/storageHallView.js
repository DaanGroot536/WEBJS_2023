import { drawTetrisShape } from "./tetrisShapeView.js";
import { makeDraggable } from "../draganddrop.js";

export function drawStorageHall(storageHall) {
    let length = storageHall.hallArray.length;
    console.log(length);

    let storageHallView = document.getElementById('storageHall');
    storageHallView.innerHTML = '';
    for (let i = 0; i < length; i++) {
        let div = document.createElement('div');
        div.className = 'storedPackage';
        makeDraggable(div);
        storageHallView.appendChild(div);
        drawTetrisShape(div, storageHall.hallArray[i], `SH${i}`);
    }
}