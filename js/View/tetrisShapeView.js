export function drawTetrisShape(targetID, tetrisShape) {
    const RectSize = 25;
    const rectColors = [
        "",
        "#47acd1",
        "#47d193",
        "#dad852",
        "#da8252",
        "#b478e2"
    ]

    let targetElement = document.getElementById(targetID);
    let canvas = document.createElement('canvas');
    targetElement.appendChild(canvas);
    let ctx = canvas.getContext('2d');

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (tetrisShape.tileArray[i][j].shapeType != 0) {
                ctx.rect(0 + ((i + 1) * RectSize), 0 + ((j + 1) * RectSize), RectSize, RectSize);
                ctx.fillStyle = rectColors[tetrisShape.tileArray[i][j].shapeType];
                ctx.fill()
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
        }
    }
}
