import { animate, stop } from './animation.js';
import ImageMaker from './imagemaker.js';

let beltbtn1 = document.getElementById('beltbtn1');
let beltbtn2 = document.getElementById('beltbtn2');
let beltcounter = 0;
let beltcounter2 = 3;
beltbtn1.addEventListener('click', addBelt1);
beltbtn2.addEventListener('click', addBelt2);

function addBelt1() {
    if(beltcounter < 3) {
        addBelt(beltcounter, 1);
    }
    
}

function addBelt2() {
    if(beltcounter2 < 6) {
        addBelt(beltcounter2, 2)
    }
    
}

//TODO:
//make tetris shapes refresh after animate end
//make new js file with mechanics to transfer canvas to truck
//truck contents need to be stored in localStorage

function addBelt(beltcounter, panel) {
    let beltpane = document.getElementById('beltpanel'+panel);
    let btndiv = document.createElement('div');
    btndiv.className = "col-2";

    let beltstart = document.createElement('button');
    beltstart.className = "btn btn-secondary mt-3";
    beltstart.innerHTML = "Start belt "+(beltcounter);
    beltstart.addEventListener('click', (event) => {
        animate(beltstart.innerHTML.charAt(beltstart.innerHTML.length-1));
        beltstart.style.opacity = 0;
        beltstop.style.opacity = 1;
    });

    let beltstop = document.createElement('button');
    beltstop.innerHTML = "Stop belt "+(beltcounter);
    beltstop.className = "btn btn-secondary mt-3";
    beltstop.style.opacity = 0;
    beltstop.addEventListener('click', (event) => {
        stop(beltstop.innerHTML.charAt(beltstop.innerHTML.length-1));
        beltstart.style.opacity = 1;
        beltstop.style.opacity = 0;
    });

    btndiv.appendChild(beltstart);
    btndiv.appendChild(beltstop);

    let newBelt = document.createElement('div');
    newBelt.className = "conveyorbelt col-7";
    let beltItem = document.createElement('div');
    beltItem.id = "package"+beltcounter;
    beltItem.className = "package";
    newBelt.appendChild(beltItem);

    let beltRow = document.createElement('div');
    beltRow.className = "row mt-3";
    beltRow.appendChild(btndiv);
    beltRow.appendChild(newBelt);
    addTrucks(beltRow, beltcounter);
    beltpane.appendChild(beltRow);
    beltcounter++;

    let imageMaker = new ImageMaker();
    let rnd = Math.floor(Math.random() * (4 - 0 + 1) + 0)
    imageMaker.draw(rnd, beltItem);
}

//temp function to add trucks
function addTrucks(beltRow, beltcounter) {
    let truck = document.createElement('div');
    truck.className = "col-3 truck";
    truck.id = "truck"+beltcounter;
    beltRow.appendChild(truck);
}