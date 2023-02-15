import { animate } from './animation.js';

let beltbtn = document.getElementById('beltbtn');
let beltcounter = 0;
beltbtn.addEventListener('click', addBelt);

function addBelt() {
    if(beltcounter < 3) {
        let beltpane = document.getElementById('beltpanel');
        let beltstart = document.createElement('button');
        beltstart.className = "btn btn-secondary col-2 my-auto";
        beltstart.innerHTML = "Start belt "+(beltcounter);
        beltstart.addEventListener('click', (event) => {
            animate(beltstart.innerHTML.charAt(beltstart.innerHTML.length-1));
        });
        let newBelt = document.createElement('div');
        newBelt.className = "conveyorbelt col-10";
        let beltItem = document.createElement('div');
        beltItem.id = "package"+beltcounter;
        beltItem.className = "package";
        newBelt.appendChild(beltItem);

        let beltRow = document.createElement('div');
        beltRow.className = "row mt-3";
        beltRow.appendChild(beltstart);
        beltRow.appendChild(newBelt);
        beltpane.appendChild(beltRow);
        beltcounter++;
    }
}