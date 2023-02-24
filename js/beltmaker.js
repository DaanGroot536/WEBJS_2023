import { animate, stop } from './animation.js';
import ImageMaker from './imagemaker.js';
import { setHalls } from './hallswitcher.js';
import TruckGenerator from './View/truckViewGenerator.js';

setHalls();

export default class BeltMaker {
    constructor() {
        this.beltcounter1 = 0;
        this.beltcounter2 = 3;
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
            btndiv.className = "col-2";
        
            let beltstart = document.createElement('button');
            beltstart.className = "btn btn-secondary mt-3";
            beltstart.innerHTML = "Start belt " + beltcounter;
        
            let beltstop = document.createElement('button');
            beltstop.innerHTML = "Stop belt " + beltcounter;
            beltstop.className = "btn btn-secondary mt-3";
            beltstop.style.opacity = 0;
            beltstop.addEventListener('click', (event) => {
                stop(beltstop.innerHTML.charAt(beltstop.innerHTML.length - 1));
                beltstart.style.opacity = 1;
                beltstop.style.opacity = 0;
            });
        
            btndiv.appendChild(beltstart);
            btndiv.appendChild(beltstop);
        
            let newBelt = document.createElement('div');
            newBelt.className = "conveyorbelt col-7";
            let beltItem = document.createElement('div');
            beltItem.id = "package" + beltcounter;
            beltItem.className = "package";
            newBelt.appendChild(beltItem);
        
            let imageMaker = new ImageMaker();
            let rnd = Math.floor(Math.random() * (4 - 0 + 1) + 0)
            imageMaker.draw(rnd, beltItem, beltcounter);
        
            beltstart.addEventListener('click', (event) => {
                animate(beltstart.innerHTML.charAt(beltstart.innerHTML.length - 1), imageMaker, beltItem);
                beltstart.style.opacity = 0;
                beltstop.style.opacity = 1;
            });
        
            let beltRow = document.createElement('div');
            beltRow.className = "row mt-3";
            beltRow.appendChild(btndiv);
            beltRow.appendChild(newBelt);

            TruckGenerator.generateTruck(beltRow,1);

            beltpanel.appendChild(beltRow);
            beltcounter++;
        }
    }

    storeTruck(beltcounter) {
        localStorage.setItem(`truck${beltcounter}`, localStorage.getItem('truck'));
    }
}
