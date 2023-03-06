import TruckContent from '../Model/truckContent.js';
import { drawTruckContent } from '../View/truckContentView.js';

export default class TruckGenerator {
    static sizing = 25;

    static generateTruck(beltRow, truckIndex, truckContentArray, storageHall) {
        const length = parseInt(JSON.parse(localStorage.getItem(`temptruck`)).length);
        const width = parseInt(JSON.parse(localStorage.getItem(`temptruck`)).width);
        const type = JSON.parse(localStorage.getItem(`temptruck`)).type;

        // const type = JSON.parse(localStorage.getItem(`temptruck`)).type;
        let truckContent = new TruckContent(truckIndex, width, length);
        let truckDiv = document.createElement('div');
        truckDiv.className = 'col-3';
        truckDiv.id = `truck${truckIndex}`;
        document.getElementById(`typeLabel${truckIndex}`).innerHTML = type;
        beltRow.appendChild(truckDiv);

        drawTruckContent(truckDiv, truckContent, truckIndex, truckContentArray, storageHall);
        return truckContent;
    }
}

export const TruckViewGenerator = {
    generateTruck: TruckGenerator.generateTruck
};