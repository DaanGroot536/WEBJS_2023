import TetrisShape from "./tetrisShape.js";

export default class StorageHall {
    constructor () {
        this.hallArray = [];
    }

    updateStorage(newItem) {
        this.hallArray.push(newItem);
        localStorage.setItem('storageHall', JSON.stringify(this.hallArray));
    }

    seedHall() {
        for (let i = 1; i < 6; i++) {
            let shape = new TetrisShape(i);
            this.updateStorage(shape);
        }
    }
}