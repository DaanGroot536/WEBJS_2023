import TruckContentTile from "./truckContentTile.js";

//shapes 1 trhough 5
//1 = red Z shape
//2 = blue L shape
//3 = green Square
//4 = yellow Pole
//5 = purple T shape

export default class TetrisShape {
    constructor(shapeNumber) {
        this.shapeNumber = shapeNumber;
        this.shapeOrientation = 0;
        this.tileArray = new Array();
        this.createShape();
    }

    createShape() {
        for(let i = 0; i < 4; i++) {
            this.tileArray[i] = new Array();
            for(let j = 0; j < 4; j++) {
                let tile = new TruckContentTile(0, i, j);
                this.tileArray[i][j] = tile;
            }
        }

        switch (this.shapeNumber) {
            case 1:
                this.shapeOrientation = Math.floor(Math.random() * (2 - 1 + 1) + 0);
                if (this.shapeOrientation === 1) {
                    this.tileArray[0][1].shapeType = 1;
                    this.tileArray[1][0].shapeType = 1;
                    this.tileArray[1][1].shapeType = 1;
                    this.tileArray[2][0].shapeType = 1;
                }
                if (this.shapeOrientation === 2) {
                    this.tileArray[0][1].shapeType = 1;
                    this.tileArray[0][2].shapeType = 1;
                    this.tileArray[1][0].shapeType = 1;
                    this.tileArray[1][1].shapeType = 1;
                }
            break;
            case 2:
                this.shapeOrientation = Math.floor(Math.random() * (4 - 1 + 1) + 0);
                if (this.shapeOrientation === 1) {
                    this.tileArray[0][0].shapeType = 2;
                    this.tileArray[0][1].shapeType = 2;
                    this.tileArray[0][2].shapeType = 2;
                    this.tileArray[1][2].shapeType = 2;
                }
                if (this.shapeOrientation === 2) {
                    this.tileArray[0][1].shapeType = 2;
                    this.tileArray[1][1].shapeType = 2;
                    this.tileArray[2][0].shapeType = 2;
                    this.tileArray[2][1].shapeType = 2;
                }
                if (this.shapeOrientation === 3) {
                    this.tileArray[0][0].shapeType = 2;
                    this.tileArray[1][0].shapeType = 2;
                    this.tileArray[1][1].shapeType = 2;
                    this.tileArray[1][2].shapeType = 2;
                }
                if (this.shapeOrientation === 4) {
                    this.tileArray[0][0].shapeType = 2;
                    this.tileArray[0][1].shapeType = 2;
                    this.tileArray[1][0].shapeType = 2;
                    this.tileArray[2][0].shapeType = 2;
                }
            break;
            case 3:
                this.tileArray[0][0].shapeType = 3;
                this.tileArray[1][0].shapeType = 3;
                this.tileArray[0][1].shapeType = 3;
                this.tileArray[1][1].shapeType = 3;
            break;
            case 4:
                this.shapeOrientation = Math.floor(Math.random() * (2 - 1 + 1) + 0);
                if (this.shapeOrientation === 1) {
                    this.tileArray[0][0].shapeType = 4;
                    this.tileArray[0][1].shapeType = 4;
                    this.tileArray[0][2].shapeType = 4;
                    this.tileArray[0][3].shapeType = 4;
                }
                if (this.shapeOrientation === 2) {
                    this.tileArray[0][0].shapeType = 4;
                    this.tileArray[1][0].shapeType = 4;
                    this.tileArray[2][0].shapeType = 4;
                    this.tileArray[3][0].shapeType = 4;
                }
            break;
            case 5:
                this.shapeOrientation = Math.floor(Math.random() * (4 - 1 + 1) + 0);
                if (this.shapeOrientation === 1) {
                    this.tileArray[0][0].shapeType = 5;
                    this.tileArray[1][0].shapeType = 5;
                    this.tileArray[1][1].shapeType = 5;
                    this.tileArray[2][0].shapeType = 5;
                }
                if (this.shapeOrientation === 2) {
                    this.tileArray[0][0].shapeType = 5;
                    this.tileArray[0][1].shapeType = 5;
                    this.tileArray[0][2].shapeType = 5;
                    this.tileArray[1][1].shapeType = 5;
                }
                if (this.shapeOrientation === 3) {
                    this.tileArray[0][1].shapeType = 5;
                    this.tileArray[1][0].shapeType = 5;
                    this.tileArray[1][1].shapeType = 5;
                    this.tileArray[2][1].shapeType = 5;
                }
                if (this.shapeOrientation === 4) {
                    this.tileArray[0][1].shapeType = 5;
                    this.tileArray[1][0].shapeType = 5;
                    this.tileArray[1][1].shapeType = 5;
                    this.tileArray[1][2].shapeType = 5;
                }
            break;
        }
    }
}