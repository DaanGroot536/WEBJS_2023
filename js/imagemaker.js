export default class ImageMaker {
    RECTANGLE_SIZE = 25;
    SHAPES = [
        {
            color: "rgb(200, 0, 0)",
            coords: [
                [10, 36],
                [36, 36],
                [36, 62],
                [62, 62],
            ],
        },
        {
            color: "rgb(0, 200, 0)",
            coords: [
                [36, 10],
                [36, 36],
                [36, 62],
                [62, 62],
            ],
        },
        {
            color: "rgb(0, 0, 200)",
            coords: [
                [10, 62],
                [36, 36],
                [36, 62],
                [62, 62],
            ],
        },
        {
            color: "rgb(0, 200, 200)",
            coords: [
                [36, 36],
                [36, 62],
                [62, 36],
                [62, 62],
            ],
        },
        {
            color: "rgb(200, 0, 200)",
            coords: [
                [10, 62],
                [36, 62],
                [62, 62],
                [88, 62],
            ],
        },
    ];

    draw(shapeNumber, packageNode, beltcounter) {
        const currentCanvas = document.createElement("canvas");
        currentCanvas.id = `canvas${beltcounter}`;
        packageNode.appendChild(currentCanvas);
        const ctx = currentCanvas.getContext("2d");

        const { color, coords } = this.SHAPES[shapeNumber];

        ctx.fillStyle = color;
        coords.forEach(([x, y]) => {
            ctx.fillRect(x, y, this.RECTANGLE_SIZE, this.RECTANGLE_SIZE);
        });
    }
}