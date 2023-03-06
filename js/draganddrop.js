import { checkTruckContent } from "./truckmanager.js";
import { drawTruckContent } from "./View/truckContentView.js";
let dragID = 0;
let tempShape = '';

export function makeDraggable(dragItem) {
    dragItem.addEventListener('drag', (event) => {
        dragID = event.target.id;
        let storage = JSON.parse(localStorage.getItem('storageHall'));
        let ID = dragID.substr(dragID.length - 1);
        tempShape = storage[ID];
    });
    dragItem.draggable = "true";
}

export function makeDropzone(dropZone, truckContentArray) {
    dropZone.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    dropZone.addEventListener('drop', (event) => {
        let dropID = event.target.id;
        let ID = dropID.substr(dropID.length - 1);
        let truckContent = truckContentArray[ID];
        console.log(dropID);
        console.log(ID);
        console.log(truckContentArray);
        console.log(truckContentArray[ID]);

        truckContent.addShape(tempShape);
        let truckID = `truck${ID}`;
        let truckDiv = document.getElementById(truckID);
        truckDiv.removeChild(truckDiv.children[0]);
        drawTruckContent(document.getElementById(truckID), truckContent, ID, truckContentArray);
        checkTruckContent(truckContent, ID, truckContentArray);
    });
}
