import FormValidator from './formValidator.js';
import { currentHall } from './hallswitcher.js';
import BeltMaker from './beltmaker.js';

export default class FormBuilder {

    currentTab = 0;

    constructor(fv, bm) {
        formValidator = fv;
        beltMaker = bm;

        this.setupForm();
        this.showTab(this.currentTab);
    }

    setupForm() {
        const inputElements = document.forms["truckForm"].querySelectorAll("input");

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

        const tabs = document.getElementsByClassName("tab");
        tabs[tabIndex].style.display = "block";

        // fix Previous/Next buttons
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");

        prevBtn.style.display = (tabIndex == 0) ? "none" : "inline";
        nextBtn.innerHTML = (tabIndex == tabs.length - 1) ? "Submit" : "Next";
        nextBtn.classList.toggle("btn-primary", tabIndex != tabs.length - 1);
        nextBtn.classList.toggle("btn-success", tabIndex == tabs.length - 1);

        // update step indicator:
        this.updateStepIndicator(tabIndex);

        // focus on input field
        const focusField = tabs[tabIndex].getElementsByTagName("input")[0];

        if (focusField) {
            focusField.focus();
        }
    }

    nextPrev(directionIndex) {

        // get all tabs
        const tabs = document.getElementsByClassName("tab");

        // check if input is valid when pressing 'next'
        if (directionIndex === 1 && !formValidator.validateForm(this.currentTab)) {
            return false;
        }

        // Hide current tab
        tabs[this.currentTab].style.display = "none";

        this.currentTab += directionIndex;

        if (this.currentTab === tabs.length) {
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
        // Empty all fields
        document.querySelector("#truckForm").reset();

        // Reset tab
        this.currentTab = 0;
        this.showTab(this.currentTab);

        // Reset step indicator
        const steps = document.querySelectorAll(".step");
        steps.forEach((step) => {
            step.classList.remove("finish", "active");
        });

        steps[0].classList.add("active");
    }

    submitTruck() {
        const lengthInput = document.querySelector("#length");
        const widthInput = document.querySelector("#width");
        const intervalInput = document.querySelector("#interval");
        const loadTypeInput = document.querySelector("#trucktype");

        const truck = {
            length: lengthInput.value,
            width: widthInput.value,
            interval: intervalInput.value,
            type: loadTypeInput.value
        };

        try {
            window.localStorage.setItem("temptruck", JSON.stringify(truck));
        } catch (e) {
            console.error("Error storing truck data:", e);
        }

        beltMaker.addBelt(currentHall);
    }
}

let formValidator = new FormValidator();
let beltMaker = new BeltMaker();
new FormBuilder(formValidator, beltMaker);
