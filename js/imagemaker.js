export default class ImageMaker {

    draw(shapeNumber, packageNode, beltcounter) {
        console.log('working');
        let currCanvas = document.createElement('canvas');
        currCanvas.id = "canvas"+beltcounter;
        packageNode.appendChild(currCanvas);
        const ctx = currCanvas.getContext("2d");
        switch (shapeNumber) {
            case 0:
                ctx.fillStyle = "rgb(200, 0, 0)";
                ctx.fillRect(10, 36, 25, 25);
                ctx.fillStyle = "rgb(200, 0, 0)";
                ctx.fillRect(36, 36, 25, 25);
                ctx.fillStyle = "rgb(200, 0, 0)";
                ctx.fillRect(36, 62, 25, 25);
                ctx.fillStyle = "rgb(200, 0, 0)";
                ctx.fillRect(62, 62, 25, 25);
                break;

            case 1:
                ctx.fillStyle = "rgb(0, 200, 0)";
                ctx.fillRect(36, 62, 25, 25);
                ctx.fillStyle = "rgb(0, 200, 0)";
                ctx.fillRect(36, 10, 25, 25);
                ctx.fillStyle = "rgb(0, 200, 0)";
                ctx.fillRect(36, 36, 25, 25);
                ctx.fillStyle = "rgb(0, 200, 0)";
                ctx.fillRect(62, 62, 25, 25);
                break;

            case 2:
                ctx.fillStyle = "rgb(0, 0, 200)";
                ctx.fillRect(10, 62, 25, 25);
                ctx.fillStyle = "rgb(0, 0, 200)";
                ctx.fillRect(36, 36, 25, 25);
                ctx.fillStyle = "rgb(0, 0, 200)";
                ctx.fillRect(36, 62, 25, 25);
                ctx.fillStyle = "rgb(0, 0, 200)";
                ctx.fillRect(62, 62, 25, 25);
                break;

            case 3:
                ctx.fillStyle = "rgb(0, 200, 200)";
                ctx.fillRect(62, 36, 25, 25);
                ctx.fillStyle = "rgb(0, 200, 200)";
                ctx.fillRect(36, 36, 25, 25);
                ctx.fillStyle = "rgb(0, 200, 200)";
                ctx.fillRect(36, 62, 25, 25);
                ctx.fillStyle = "rgb(0, 200, 200)";
                ctx.fillRect(62, 62, 25, 25);
                break;

            case 4:
                ctx.fillStyle = "rgb(200, 0, 200)";
                ctx.fillRect(10, 62, 25, 25);
                ctx.fillStyle = "rgb(200, 0, 200)";
                ctx.fillRect(88, 62, 25, 25);
                ctx.fillStyle = "rgb(200, 0, 200)";
                ctx.fillRect(36, 62, 25, 25);
                ctx.fillStyle = "rgb(200, 0, 200)";
                ctx.fillRect(62, 62, 25, 25);
                break;
        }
    }
}