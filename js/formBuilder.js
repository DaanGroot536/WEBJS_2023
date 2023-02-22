import FormValidator from './formValidator.js';

export default class FormBuilder {

    currentTab = 0;

    constructor(fv) {
        formValidator = fv;

        this.setupForm();
        this.showTab(this.currentTab);
    }

    setupForm() {
        const inputElements = document.querySelectorAll("input");

        // Add event listeners to input fields to automatically validate input
        const handleInput = (event) => {
            formValidator.validateForm(this.currentTab);
            formValidator.preventNonNumericInput(event);
        };

        inputElements.forEach((inputElement) => {
            inputElement.addEventListener("input", handleInput);
        });

        const navigationButtons = document.querySelectorAll("#prevBtn, #nextBtn");

        // Add event listeners to navigation buttons to handle updating buttons and tabs
        const handleNavigationButtonClick = (event) => {
            const directionID = event.target.id === "nextBtn" ? 1 : -1;
            this.nextPrev(directionID);
        };

        navigationButtons.forEach((navigationButton) => {
            navigationButton.addEventListener("click", handleNavigationButtonClick);
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
        this.updateStepIndicator(tabIndex)

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
        if (directionIndex == 1 && !formValidator.validateForm(this.currentTab)) return false;

        // Hide current tab
        tabs[this.currentTab].style.display = "none";

        this.currentTab = this.currentTab + directionIndex;

        if (this.currentTab >= tabs.length) {
            this.submitTruck();
            this.resetForm();

            return false;
        }

        // move to next tab
        this.showTab(this.currentTab);
    }

    updateStepIndicator(stepIndex) {
        // Deactivate all steps
        const steps = document.querySelectorAll(".step");
        steps.forEach((step) => {
            step.classList.remove("active");
        });

        // Activate current step
        steps[stepIndex].classList.add("active");
    }


    resetForm() {
        // empty all fields
        document.getElementById("truckForm").reset();

        // reset tab
        this.currentTab = 0;
        this.showTab(this.currentTab);

        // reset step indicator
        let steps = document.getElementsByClassName("step");

        for (let i = 0; i < steps.length; i++) {
            steps[i].className = steps[i].className.replace(" finish", "");
        }

        steps[0].className += " active";
    }

    submitTruck() {
        let numericData = document.querySelectorAll("input");
        let loadType = document.getElementById("trucktype");
        const truck = {
            length: numericData[0].value,
            width: numericData[1].value,
            interval: numericData[2].value,
            type: loadType.value
        }

        window.localStorage.setItem("truck", JSON.stringify(truck));
    }
}

let formValidator = new FormValidator();
new FormBuilder(formValidator);
