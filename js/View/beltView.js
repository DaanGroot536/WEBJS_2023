import { animate, restart, stop } from '../Controller/animationController.js';
import { setHalls } from '../Controller/hallController.js';
import TruckGenerator from './truckViewGenerator.js';
import StorageHall from '../Model/storageHall.js';
import { drawStorageHall } from './storageHallView.js';

setHalls();

export default class BeltMaker {
    constructor() {
        localStorage.clear();
        this.beltcounter1 = 0;
        this.beltcounter2 = 3;
        this.storage = new StorageHall();
        this.storage.seedHall();
        this.truckContentArray = new Array();
        drawStorageHall(this.storage);
    }

    addBelt(currentHall) {
        const isHall1AndBeltCounterLessThan3 = currentHall === 1 && this.beltcounter1 < 3;
        const isHall2AndBeltCounterLessThan6 = currentHall === 2 && this.beltcounter2 < 6;

        // Check if the current hall has less than the maximum number of belts
        if (isHall1AndBeltCounterLessThan3 || isHall2AndBeltCounterLessThan6) {
            let beltcounter = this[`beltcounter${currentHall}`];

            this.storeTruck(beltcounter)
            let beltpanel = document.getElementById(`beltpanel${currentHall}`);
            let btndiv = document.createElement('div');
            btndiv.className = "col-1";

            let beltstart = document.createElement('button');
            beltstart.className = "btn btn-secondary mt-3";
            beltstart.innerHTML = "Start belt " + beltcounter;
            beltstart.disabled = true;
            beltstart.id = `startBtn${beltcounter}`;

            let beltstop = document.createElement('button');
            beltstop.innerHTML = "Stop belt " + beltcounter;
            beltstop.className = "btn btn-secondary mt-3";
            beltstop.id = `stopBtn${beltcounter}`;

            let typeLabel = document.createElement('h5');
            typeLabel.id = `typeLabel${beltcounter}`;
            typeLabel.classList.add('mt-1');

            beltstop.addEventListener('click', (event) => {
                stop(beltstop.innerHTML.charAt(beltstop.innerHTML.length - 1));
                beltstart.disabled = false;
                beltstop.disabled = true;
            });

            btndiv.appendChild(beltstart);
            btndiv.appendChild(beltstop);
            btndiv.appendChild(typeLabel);

            let newBelt = document.createElement('div');
            newBelt.className = "conveyorbelt col-7";
            let beltItem = document.createElement('div');
            beltItem.id = "package" + beltcounter;
            beltItem.className = "package";
            newBelt.appendChild(beltItem);

            let beltRow = document.createElement('div');
            let buffer = document.createElement('div');
            buffer.className = 'col-1';
            beltRow.className = "row mt-3";
            beltRow.appendChild(btndiv);
            beltRow.appendChild(newBelt);
            beltRow.appendChild(buffer);
            beltpanel.appendChild(beltRow);

            let truckContent = TruckGenerator.generateTruck(beltRow, beltcounter, this.truckContentArray, this.storage);
            this.truckContentArray.push(truckContent);

            beltstart.addEventListener('click', (event) => {
                restart(beltcounter, beltItem, truckContent, this.storage, this.truckContentArray);
                beltstart.disabled = true;
                beltstop.disabled = false;
            });

            animate(beltcounter, beltItem, truckContent, this.storage, this.truckContentArray);
            this[`beltcounter${currentHall}`]++;
        }
    }

    storeTruck(beltcounter) {
        localStorage.setItem(`truck${beltcounter}`, localStorage.getItem('temptruck'));
    }
}
