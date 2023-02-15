export function animate(beltcounter) {
    localStorage.setItem('package'+beltcounter, 0);
    setInterval(move, 10, beltcounter);
}

function move(beltcounter) {
    let node = document.getElementById("package"+beltcounter);
    // console.log(node, currentPosition);
    let currentPosition = parseInt(localStorage.getItem('package'+beltcounter));
    currentPosition = currentPosition + 1;
    localStorage.setItem('package'+beltcounter, currentPosition);
    console.log(currentPosition);
    node.style.left = currentPosition + "px";
}