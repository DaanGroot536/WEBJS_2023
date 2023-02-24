export default class TruckGenerator {
    static sizing = 50;

    static generateTruck(beltRow, truckIndex) {
        const length = JSON.parse(localStorage.getItem(`truck${0}`)).length;
        const width = JSON.parse(localStorage.getItem(`truck${0}`)).width;
        const type = JSON.parse(localStorage.getItem(`truck${0}`)).type;

        let truck = this.createBody(width, length, type);
        truck.id = `truck${truckIndex}`;
        truck.classList.add("truck");

        //makeDropzone(truck);
        beltRow.appendChild(truck);
    }

    static createBody(width, height, type) {
        const div = document.createElement('div');
        div.style.width = width * this.sizing + 'px';
        div.style.height = height * this.sizing + 'px';
        div.style.backgroundColor = this.getColor(type);
        return div;
    }

    static getColor(type) {
        switch (type) {
            case 'cold':
                return '#87CEEB'
            case 'fragile':
                return '#D8BFD8'
            case 'quick':
                return '#FF6347'
            case 'pallet':
                return '#8B4513'
            case 'general':
                return '#C0C0C0'
            default:
                break;
        }
    }
}

export const TruckViewGenerator = {
    generateTruck: TruckGenerator.generateTruck
};