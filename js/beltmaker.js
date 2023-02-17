import { animate, stop } from './animation.js';
import ImageMaker from './imagemaker.js';

let beltbtn1 = document.getElementById('beltbtn1');
let beltbtn2 = document.getElementById('beltbtn2');
let beltcounter = 0;
let beltcounter2 = 3;
beltbtn1.addEventListener('click', addBelt);
beltbtn2.addEventListener('click', addBelt2);

function addBelt() {
    if(beltcounter < 3) {
        let beltpane = document.getElementById('beltpanel1');
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

        let imageMaker = new ImageMaker();
        let rnd = Math.floor(Math.random() * (4 - 0 + 1) + 0)
        imageMaker.draw(rnd, beltItem);
    }
    
}

function addBelt2() {
    if(beltcounter2 < 6) {
        let beltpane = document.getElementById('beltpanel2');
        let btndiv = document.createElement('div');
        btndiv.className = "col-2";

        let beltstart = document.createElement('button');
        beltstart.className = "btn btn-secondary mt-3";
        beltstart.innerHTML = "Start belt "+(beltcounter2);
        beltstart.addEventListener('click', (event) => {
            animate(beltstart.innerHTML.charAt(beltstart.innerHTML.length-1));
            beltstart.style.opacity = 0;
            beltstop.style.opacity = 1;
        });

        let beltstop = document.createElement('button');
        beltstop.innerHTML = "Stop belt "+(beltcounter2);
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
        newBelt.className = "conveyorbelt col-10";
        let beltItem = document.createElement('div');
        beltItem.id = "package"+beltcounter2;
        beltItem.className = "package";
        newBelt.appendChild(beltItem);

        let beltRow = document.createElement('div');
        beltRow.className = "row mt-3";
        beltRow.appendChild(btndiv);
        beltRow.appendChild(newBelt);
        beltpane.appendChild(beltRow);
        beltcounter2++;

        let imageMaker = new ImageMaker();
        let rnd = Math.floor(Math.random() * (4 - 0 + 1) + 0)
        imageMaker.draw(rnd, beltItem);
    }
    
}