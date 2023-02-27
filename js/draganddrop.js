import { checkTruckContent } from "./truckmanager.js";
let tempCanvas = 0;

export function makeDraggable(dragItem) {
    dragItem.addEventListener('drag', function () {
        tempCanvas = dragItem;
    });
    dragItem.draggable = "true";
}

export function makeDropzone(dropZone) {
    dropZone.addEventListener('dragover', (event) => {
        event.preventDefault();
    });
    
    dropZone.addEventListener('drop', (event) => {
        let truckID = dropZone.id.slice(5,6);
        event.preventDefault();
        let newCanvas = document.createElement('canvas');
        newCanvas.width = 100;
        newCanvas.height = 100;
        dropZone.appendChild(newCanvas);
        let newCtx = newCanvas.getContext('2d');
        newCtx.drawImage(tempCanvas, 0, 0);
        tempCanvas = 0;
        checkTruckContent(truckID);
    });
}
