setupForm();

let errorMessage;
let currentTab = 0;
showTab(currentTab);

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

function showTab(tabIndex) {

    let tabs = document.getElementsByClassName("tab");
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

    // focus on input field
    let focusField = tabs[tabIndex].getElementsByTagName("input")[0];

    if(focusField) {
        focusField.focus();
    }
}

function fixStepIndicator(stepIndex) {
    // deactivate all steps
    let steps = document.getElementsByClassName("step");
    for (let i = 0; i < steps.length; i++) {
        steps[i].className = steps[i].className.replace(" active", "");
    }

    // activate current step
    steps[stepIndex].className += " active";
}

function nextPrev(directionIndex) {

    // get all tabs
    let tabs = document.getElementsByClassName("tab");

    // check if input is valid when pressing 'next'
    if (directionIndex == 1 && !validateForm()) return false;

    // Hide current tab
    tabs[currentTab].style.display = "none";

    currentTab = currentTab + directionIndex;

    if (currentTab >= tabs.length) {
        // handle data here

        const form = document.getElementById('truckForm');
        const formData = new FormData(form);
        console.log(formData);

        return false;
    }

    // move to next tab
    showTab(currentTab);
}

function validateForm() {
    let valid = true;

    // get current tab
    const tabs = document.getElementsByClassName("tab");

    // get all fields in tab
    let fields = tabs[currentTab].getElementsByTagName("input");

    for (let i = 0; i < fields.length; i++) {

        errorMessage = document.getElementById(fields[i].name + "error");

        // check if empty
        if (fields[i].value == "") {
            errorMessage.textContent = "You need to enter a value.";
            errorMessage.className = "error active";
            fields[i].className += " invalid";
            valid = false;
            continue;
        }

        // for number fields, check if input between 1 and 5
        if (fields[i].type = "number" && (fields[i].value <= 0 || fields[i].value > 5)) {
            errorMessage.textContent = "Entered value needs to be between 1 and 5.";
            errorMessage.className = "error active";
            fields[i].className += " invalid";
            valid = false;
            continue;
        }
    }

    // if all fields are valid, update step indicator
    if (valid) {
        errorMessage.textContent = "";
        errorMessage.className = "error";
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }

    return valid;
}

function onlyNumberKey(evt) {
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}