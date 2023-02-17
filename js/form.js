var currentTab = 0;
showTab(currentTab);

function showTab(n) {

    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";

    // fix Previous/Next buttons
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }

    // update step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {

    // get all tabs
    var x = document.getElementsByClassName("tab");

    // check if input is valid when pressing 'next'
    if (n == 1 && !validateForm()) return false;

    // Hide current tab
    x[currentTab].style.display = "none";

    currentTab = currentTab + n;

    if (currentTab >= x.length) {
        // handle data here
        return false;
    }

    // move to next tab
    showTab(currentTab);
}

function validateForm() {
    var valid = true;

    // get current tab
    var x = document.getElementsByClassName("tab");

    // get all fields in tab
    var y = x[currentTab].getElementsByTagName("input");

    for (var i = 0; i < y.length; i++) {

        // check if empty
        if (y[i].value == "") {
            y[i].className += " invalid";
            valid = false;
            continue;
        }

        // for number fields, check if input between 1 and 5
        if (y[i].type = "number" && (y[i].value <= 0 || y[i].value > 5)) {
            y[i].className += " invalid";
            valid = false;
        }
    }

    // if all fields are valid, update step indicator
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }

    return valid;
}

function fixStepIndicator(n) {
    // deactivate all steps
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    
    // activate current step
    x[n].className += " active";
}