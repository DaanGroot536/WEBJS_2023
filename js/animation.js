let intervals = new Array();

export function animate(beltcounter) {
    localStorage.setItem('package'+beltcounter, 0);
    // setInterval(move, 10, beltcounter);
    intervals[beltcounter] = setInterval(move, 10, beltcounter);
    console.log(intervals[beltcounter]);
}

function move(beltcounter) {
    let node = document.getElementById("package"+beltcounter);
    // console.log(node, currentPosition);
    let currentPosition = parseInt(localStorage.getItem('package'+beltcounter));
    currentPosition = currentPosition + 1;
    localStorage.setItem('package'+beltcounter, currentPosition);
    node.style.left = currentPosition + "px";
}

export function stop(beltcounter) {
    console.log(intervals[beltcounter], beltcounter);
    clearInterval(intervals[beltcounter]);
}