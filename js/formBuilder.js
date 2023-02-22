import FormValidator from './formValidator.js';

export default class FormBuilder {
    constructor(currentTab, fv) {
        formValidator = fv;

        this.setupForm();
        this.showTab(currentTab);
    }

    setupForm() {
        // get all input fields that require validation
        let inputFields = document.querySelectorAll("input");

        // add an event listener to each input field to validate input
        inputFields.forEach(function (elem) {
            elem.addEventListener("input", (event) => {
                formValidator.validateForm(currentTab);
                formValidator.onlyNumberKey(event);
            });
        });

        let buttons = document.querySelectorAll("#prevBtn, #nextBtn");

        buttons.forEach((elem) => {

            let directionID = elem.id === "nextBtn" ? 1 : -1;

            elem.addEventListener("click", (e) => {
                this.nextPrev(directionID);
            });
        });
    }

    showTab(tabIndex) {

        let tabs = document.getElementsByClassName("tab");
        tabs[tabIndex].style.display = "block";

        // fix Previous/Next buttons

        let prevBtn = document.getElementById("prevBtn");
        let nextBtn = document.getElementById("nextBtn")

        if (tabIndex == 0) {
            prevBtn.style.display = "none";
        } else {
            prevBtn.style.display = "inline";
        }

        if (tabIndex == (tabs.length - 1)) {
            nextBtn.innerHTML = "Submit";
            nextBtn.classList.replace("btn-primary", "btn-success");
        } else {
            nextBtn.innerHTML = "Next";
            nextBtn.classList.replace("btn-success", "btn-primary");
        }

        // update step indicator:
        this.fixStepIndicator(tabIndex)

        // focus on input field
        let focusField = tabs[tabIndex].getElementsByTagName("input")[0];

        if (focusField) {
            focusField.focus();
        }
    }

    nextPrev(directionIndex) {

        // get all tabs
        let tabs = document.getElementsByClassName("tab");

        // check if input is valid when pressing 'next'
        if (directionIndex == 1 && !formValidator.validateForm(currentTab)) return false;

        // Hide current tab
        tabs[currentTab].style.display = "none";

        currentTab = currentTab + directionIndex;

        if (currentTab >= tabs.length) {
            // handle data here


            return false;
        }

        // move to next tab
        this.showTab(currentTab);
    }

    fixStepIndicator(stepIndex) {
        // deactivate all steps
        let steps = document.getElementsByClassName("step");
        for (let i = 0; i < steps.length; i++) {
            steps[i].className = steps[i].className.replace(" active", "");
        }

        // activate current step
        steps[stepIndex].className += " active";
    }
}

let currentTab = 0;
let formValidator = new FormValidator();
new FormBuilder(currentTab, formValidator);



