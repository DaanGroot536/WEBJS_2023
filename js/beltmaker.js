import { animate, stop } from './animation.js';

let beltbtn = document.getElementById('beltbtn');
let beltcounter = 0;
beltbtn.addEventListener('click', addBelt);

function addBelt() {
    if(beltcounter < 3) {
        let beltpane = document.getElementById('beltpanel');
        let btndiv = document.createElement('div');
        btndiv.className = "col-2";

        let beltstart = document.createElement('button');
        beltstart.className = "btn btn-secondary mt-3";
        beltstart.innerHTML = "Start belt "+(beltcounter);
        beltstart.addEventListener('click', (event) => {
            animate(beltstart.innerHTML.charAt(beltstart.innerHTML.length-1));
        });

        let beltstop = document.createElement('button');
        beltstop.innerHTML = "Stop belt "+(beltcounter);
        beltstop.className = "btn btn-secondary mt-3";
        beltstop.addEventListener('click', (event) => {
            stop(beltstop.innerHTML.charAt(beltstop.innerHTML.length-1));
        });

        btndiv.appendChild(beltstart);
        btndiv.appendChild(beltstop);

        let newBelt = document.createElement('div');
        newBelt.className = "conveyorbelt col-10";
        let beltItem = document.createElement('div');
        beltItem.id = "package"+beltcounter;
        beltItem.className = "package";
        newBelt.appendChild(beltItem);

        let beltRow = document.createElement('div');
        beltRow.className = "row mt-3";
        beltRow.appendChild(btndiv);
        beltRow.appendChild(newBelt);
        beltpane.appendChild(beltRow);
        beltcounter++;
    }
}