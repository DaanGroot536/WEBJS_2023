let hallBtn = document.getElementById('hallbtn');
let hall1 = document.getElementById('hall1');
let hall2 = document.getElementById('hall2');
hall2.style.display = 'none';

hallBtn.addEventListener('click', function () {
    if(hall2.style.display == 'none') {
        hall1.style.display = 'none';
        hall2.style.display = 'block';
        document.body.style.backgroundColor = "#afd7fd";
    }
    else {
        hall2.style.display = 'none';
        hall1.style.display = 'block';
        document.body.style.backgroundColor = "#affdcc";
    }
});