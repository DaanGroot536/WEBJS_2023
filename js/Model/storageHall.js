export default class StorageHall {
    constructor () {
        this.hallArray = [];
    }

    updateStorage(newItem) {
        this.hallArray.push(newItem);
    }
}