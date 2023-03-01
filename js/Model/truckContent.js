import TruckContentTile from "./truckContentTile.js";

export default class TruckContent {
    constructor(truckID, width, length) {
        this.truckID = truckID;
        this.width = width;
        this.length = length;
        this.contentArray = [];
        this.createContentBase();
    }

    //maak een array aan met als key 2 cijfers [xPos+Ypos]
    createContentBase() {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.length; j++) {
                let truckContentTile = new TruckContentTile(0, i, j);
                this.contentArray[`${i}${j}`] = truckContentTile;
            }
        }
    }

    //check all possible spots to place the shape
    //check which spot is the lowest in the yPos value
    addShape() {
        
    }
}