let intervals = new Array();

export function animate(beltcounter) {
    localStorage.setItem('package'+beltcounter, 0);
    // setInterval(move, 10, beltcounter);
    intervals[beltcounter] = setInterval(move, 10, beltcounter);
    console.log(screen.width * 0.75);
}

function move(beltcounter) {
    let node = document.getElementById("package"+beltcounter);
    // console.log(node, currentPosition);
    let currentPosition = parseInt(localStorage.getItem('package'+beltcounter));

    if(currentPosition < (screen.width * 0.5) ) {
        currentPosition = currentPosition + 1;
        localStorage.setItem('package'+beltcounter, currentPosition);
        node.style.left = currentPosition + "px";
    }
    else {
        localStorage.setItem('package'+beltcounter, 0);
    }

}

export function stop(beltcounter) {
    console.log(intervals[beltcounter], beltcounter);
    clearInterval(intervals[beltcounter]);
}