var currentTab = 0;
setupForm();
showTab(currentTab);

let errorMessage;

function showTab(tabIndex) {

    var tabs = document.getElementsByClassName("tab");
    tabs[tabIndex].style.display = "block";

    // fix Previous/Next buttons
    if (tabIndex == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (tabIndex == (tabs.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }

    // update step indicator:
    fixStepIndicator(tabIndex)
}

function nextPrev(directionIndex) {

    // get all tabs
    var tabs = document.getElementsByClassName("tab");

    // check if input is valid when pressing 'next'
    if (directionIndex == 1 && !validateForm()) return false;

    // Hide current tab
    tabs[currentTab].style.display = "none";

    currentTab = currentTab + directionIndex;

    if (currentTab >= tabs.length) {
        // handle data here
        return false;
    }

    // move to next tab
    showTab(currentTab);
}

function validateForm() {
    var valid = true;

    // get current tab
    var tabs = document.getElementsByClassName("tab");

    // get all fields in tab
    var fields = tabs[currentTab].getElementsByTagName("input");

    for (var i = 0; i < fields.length; i++) {

        // check if empty
        if (fields[i].value == "") {
            errorMessage.textContent = "You need to enter a value.";
            fields[i].className += " invalid";
            valid = false;
            continue;
        }

        // for number fields, check if input between 1 and 5
        if (fields[i].type = "number" && (fields[i].value <= 0 || fields[i].value > 5)) {
            errorMessage.textContent = "Entered value needs to be between 1 and 5.";
            fields[i].className += " invalid";
            valid = false;
        }
    }

    // if all fields are valid, update step indicator
    if (valid) {
        errorMessage.textContent = "";
        errorMessage.className = "error";

        document.getElementsByClassName("step")[currentTab].className += " finish";
    } else {
        errorMessage.className = "error active";
    }

    return valid;
}

function fixStepIndicator(stepIndex) {
    // deactivate all steps
    var steps = document.getElementsByClassName("step");
    for (var i = 0; i < steps.length; i++) {
        steps[i].className = steps[i].className.replace(" active", "");
    }

    // activate current step
    steps[stepIndex].className += " active";
}

function setupForm() {
    // get all input fields that require validation
    let inputFields = document.querySelectorAll("input");

    // add an event listener to each input field to validate input
    inputFields.forEach(function (elem) {
        elem.addEventListener("input", () => {
            validateForm();
        });
    });
}