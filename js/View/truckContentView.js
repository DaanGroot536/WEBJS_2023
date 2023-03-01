export function drawTruckContent(targetElement, truckContent) {
    const RectSize = 28;
    const rectColors = [
        "white",
        "#47acd1",
        "#47d193",
        "#dad852",
        "#da8252",
        "#b478e2"
    ]
    console.log(truckContent);

    // let targetElement = document.getElementById(targetID);
    let canvas = document.createElement('canvas');
    canvas.width = (truckContent.contentArray[0].length * RectSize) + 20;
    canvas.height = (truckContent.contentArray.length * RectSize) + 20;
    targetElement.appendChild(canvas);
    canvas.className = 'testTruck';
    let ctx = canvas.getContext('2d');

    for (let i = 0; i < truckContent.contentArray.length; i++) {
        for (let j = 0; j < truckContent.contentArray[i].length; j++) {
            let tile = truckContent.contentArray[i][j];
            ctx.fillStyle = rectColors[tile.shapeType];
            ctx.fillRect(5 + (RectSize * j), 5 + (RectSize * i), RectSize - 2, RectSize - 2);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(4+ (RectSize * j), 4+ (RectSize * i), RectSize, RectSize);
        }
    }

}