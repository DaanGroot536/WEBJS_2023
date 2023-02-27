import { animate, stop } from './animation.js';
import { makeDropzone } from './draganddrop.js';
import ImageMaker from './imagemaker.js';
import { setHalls } from './hallswitcher.js';

window.addEventListener("load", (event) => {
    localStorage.clear();
});
setHalls();
let beltbtn1 = document.getElementById('beltbtn1');
let beltbtn2 = document.getElementById('beltbtn2');
let beltcounter1 = 0;
let beltcounter2 = 3;

export function addBelt1() {
    if (beltcounter1 < 3) {
        addBelt(beltcounter1, 1);
        beltcounter1++;
    }

}

export function addBelt2() {
    if (beltcounter2 < 6) {
        addBelt(beltcounter2, 2)
        beltcounter2++;
    }

}

//TODO:
//truck contents need to be stored in localStorage

function addBelt(beltcounter, panel) {
    storeTruck(beltcounter)
    let beltpane = document.getElementById('beltpanel' + panel);
    let btndiv = document.createElement('div');
    btndiv.className = "col-2";

    let beltstart = document.createElement('button');
    beltstart.className = "btn btn-secondary mt-3";
    beltstart.innerHTML = "Start belt " + beltcounter;
    beltstart.disabled = true;

    let beltstop = document.createElement('button');
    beltstop.innerHTML = "Stop belt " + beltcounter;
    beltstop.className = "btn btn-secondary mt-3 ml-1";
    beltstop.addEventListener('click', (event) => {
        stop(beltstop.innerHTML.charAt(beltstop.innerHTML.length - 1));
        beltstart.disabled = false;
        beltstop.disabled = true;
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
        beltstop.disabled = false;
        beltstart.disabled = true;
    });

    let beltRow = document.createElement('div');
    beltRow.className = "row mt-3";
    beltRow.appendChild(btndiv);
    beltRow.appendChild(newBelt);
    addTrucks(beltRow, beltcounter);
    beltpane.appendChild(beltRow);
    animate(beltcounter, imageMaker, beltItem);
    beltcounter++;

}

//temp function to add trucks
function addTrucks(beltRow, beltcounter) {
    let truck = document.createElement('div');
    truck.className = "col-3 truck";
    truck.id = "truck" + beltcounter;
    makeDropzone(truck);
    beltRow.appendChild(truck);
}

function storeTruck(beltcounter) {
    localStorage.setItem(`truck${beltcounter}`, localStorage.getItem('tempTruck'));
}