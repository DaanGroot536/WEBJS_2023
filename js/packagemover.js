import { makeDraggable } from "./draganddrop.js";

export function movePackage(beltcounter) {
    if (localStorage.getItem(`moving${beltcounter}`) == 'true') {
        let truck = document.getElementById('truck'+beltcounter);
        let newCanvas = document.createElement('canvas');
        newCanvas.width = 120;
        newCanvas.height = 100;
        let currPackage = document.getElementById('canvas'+beltcounter);
        truck.appendChild(newCanvas);
        let destCtx = newCanvas.getContext('2d');
        destCtx.drawImage(currPackage, -10, -10);
    }
    else {
        let storageHall = document.getElementById('storageHall');
        let newCanvas = document.createElement('canvas');
        newCanvas.width = 120;
        newCanvas.height = 100;
        newCanvas.style.width = '120px';
        newCanvas.style.height = '100px';
        let currPackage = document.getElementById('canvas'+beltcounter);
        storageHall.appendChild(newCanvas);
        makeDraggable(newCanvas);
        let destCtx = newCanvas.getContext('2d');
        destCtx.drawImage(currPackage, -10, -10);
    }

}

