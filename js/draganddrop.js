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
        event.preventDefault();
        let newCanvas = document.createElement('canvas');
        newCanvas.width = 120;
        newCanvas.height = 100;
        dropZone.appendChild(newCanvas);
        let newCtx = newCanvas.getContext('2d');
        newCtx.drawImage(tempCanvas, 0, 0);
        tempCanvas = 0;
    });
}
