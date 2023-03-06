import TruckContent from '../Model/truckContent.js';
import { drawTruckContent } from '../View/truckContentView.js';

export default class TruckGenerator {
    static sizing = 25;

    static generateTruck(beltRow, truckIndex, truckContentArray, storageHall) {
        const length = parseInt(JSON.parse(localStorage.getItem(`temptruck`)).length);
        const width = parseInt(JSON.parse(localStorage.getItem(`temptruck`)).width);
        // const type = JSON.parse(localStorage.getItem(`temptruck`)).type;
        let truckContent = new TruckContent(truckIndex, width, length);
        let truckDiv = document.createElement('div');
        truckDiv.className = 'col-3';
        truckDiv.id = `truck${truckIndex}`;

        beltRow.appendChild(truckDiv);

        drawTruckContent(truckDiv, truckContent, truckIndex, truckContentArray, storageHall);
        return truckContent;
    }

    static createBody(width, height, type) {
        const div = document.createElement('div');
        div.style.width = (width * this.sizing) + 5 + 'px';
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