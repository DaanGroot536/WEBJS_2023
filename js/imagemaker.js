export default class ImageMaker {

    draw(shapeNumber, packageNode, beltcounter) {
        const currCanvas = document.createElement('canvas');
        currCanvas.id = `canvas${beltcounter}`;
        packageNode.appendChild(currCanvas);
        const ctx = currCanvas.getContext("2d");
    }

    static SHAPES = [
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
}