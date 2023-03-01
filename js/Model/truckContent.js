import TruckContentTile from "./truckContentTile.js";

export default class TruckContent {
    constructor(truckID, width, length) {
        this.truckID = truckID;
        this.width = width;
        this.length = length;
        this.contentArray = new Array();
        this.createContentBase();
    }

    //maak een array aan met als key 2 cijfers [xPos+Ypos]
    createContentBase() {
        for (let i = 0; i < this.width; i++) {
            this.contentArray[i] = new Array();
            for (let j = 0; j < this.length; j++) {
                let truckContentTile = new TruckContentTile(0, i, j);
                this.contentArray[i][j] = truckContentTile;
            }
        }
    }

    //check all possible spots to place the shape
    //check which spot is the lowest in the yPos value
    addShape(tetrisShape) {
        let filledSpaces = [];
        for (let i = 0; i < tetrisShape.tileArray.length; i++) {
            for (let j = 0; j < tetrisShape.tileArray[i].length; j++) {
                if (tetrisShape.tileArray[i][j].shapeType != 0) {
                    filledSpaces.push(tetrisShape.tileArray[i][j]);
                }
            }
        }
        console.log(filledSpaces);

        
    }
}