let testPackage = document.getElementById("testpackage");
let tempCanvas = 0;
let currCanvas = document.createElement('canvas');
testPackage.appendChild(currCanvas);
currCanvas.draggable = 'true';
currCanvas.width = 120;
const ctx = currCanvas.getContext("2d");
ctx.fillStyle = "rgb(200, 0, 0)";
ctx.fillRect(10, 36, 25, 25);
ctx.fillStyle = "rgb(200, 0, 0)";
ctx.fillRect(36, 36, 25, 25);
ctx.fillStyle = "rgb(200, 0, 0)";
ctx.fillRect(36, 62, 25, 25);
ctx.fillStyle = "rgb(200, 0, 0)";
ctx.fillRect(62, 62, 25, 25);

currCanvas.addEventListener('drag', function () {
    tempCanvas = currCanvas;
});

let testtruck = document.getElementById("testtruck");

testtruck.addEventListener('dragover', (event) => {
    event.preventDefault();
});

testtruck.addEventListener('drop', (event) => {
    event.preventDefault();
    let newCanvas = document.createElement('canvas');
    newCanvas.width = 120;
    newCanvas.height = 100;
    testtruck.appendChild(newCanvas);
    let newCtx = newCanvas.getContext('2d');
    newCtx.drawImage(currCanvas, 0, 0);
});
