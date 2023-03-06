import { drawTetrisShape } from "./tetrisShapeView.js";
import { makeDraggable } from "../Controller/dragDropController.js";

export function drawStorageHall(storageHall) {
    let length = storageHall.hallArray.length;

    let storageHallView = document.getElementById('storageHall');
    storageHallView.innerHTML = '';
    for (let i = 0; i < length; i++) {
        let div = document.createElement('div');
        div.className = 'storedPackage';
        div.id = `storedPackage${i}`;
        makeDraggable(div);
        storageHallView.appendChild(div);
        drawTetrisShape(div, storageHall.hallArray[i], `SH${i}`);
    }
}