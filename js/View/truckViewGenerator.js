import { makeDropzone } from "../draganddrop.js";
import TruckContent from '../Model/truckContent.js';
import { drawTruckContent } from '../View/truckContentView.js';

export default class TruckGenerator {
    static sizing = 100;

    static generateTruck(beltRow, truckIndex) {
        const length = JSON.parse(localStorage.getItem(`temptruck`)).length;
        const width = JSON.parse(localStorage.getItem(`temptruck`)).width;
        // const type = JSON.parse(localStorage.getItem(`temptruck`)).type;

        let truckContent = new TruckContent(truckIndex, width, length);
        let truckDiv = document.createElement('div');
        truckDiv.id = `truck${truckIndex}`;
        beltRow.appendChild(truckDiv);

        drawTruckContent(truckDiv, truckContent);
        return truckContent;
        // let truck = this.createBody(width, length, type);
        // truckDiv.className = 'col-4';
        // truck.id = `truck${truckIndex}`;
        // truck.classList.add("truck");
        // makeDropzone(truck);
        // truckDiv.appendChild(truck);
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