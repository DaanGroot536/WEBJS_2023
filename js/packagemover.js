export function movePackage(beltcounter) {
    let truck = document.getElementById('truck'+beltcounter);
    let newCanvas = document.createElement('canvas');
    newCanvas.className = "movedPackage";
    newCanvas.width = 120;
    newCanvas.height = 100;
    let currPackage = document.getElementById('canvas'+beltcounter);
    truck.appendChild(newCanvas);
    let destCtx = newCanvas.getContext('2d');
    destCtx.drawImage(currPackage, -10, -10);
}

