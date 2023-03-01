import FormValidator from './formValidator.js';
import { currentHall } from './hallswitcher.js';
import BeltMaker from './beltmaker.js';

export default class FormBuilder {

    currentTab = 0;

    constructor(fv, bm) {
        formValidator = fv;
        beltMaker = bm;

        const header = "Register Truck:";
        const formID = "truckForm";
        const numberInputFields = [
            ["length", "number", "Length (Y axis):"],
            ["width", "number", "Width (X axis):"],
            ["interval", "number", "Truck Interval:"]
        ];

        const selectInputFields = [
            ["Load Type: ", [
                { value: 'cold', label: 'Cold transport' },
                { value: 'fragile', label: 'Fragile transport' },
                { value: 'general', label: 'General transport' },
                { value: 'quick', label: 'Quick transport' },
                { value: 'pallet', label: 'Pallet transport' }
            ]]
        ];


        this.setupForm(header, formID, numberInputFields, selectInputFields);
        this.showTab(this.currentTab);
    }

    setupForm(header, formID, numberInputFields, selectInputFields) {
        // create form
        const form = document.createElement("form");
        form.setAttribute("id", formID);
        form.setAttribute("class", "card card-body mt-3 col-3");

        // get base area
        const formArea = document.getElementById("form-area");
        formArea.appendChild(form);

        // create header
        this.createHeader(header, form);

        // create input fields
        numberInputFields.forEach((element) => {
            const field = this.createInputElement(element[0], element[1], element[2]);
            form.append(field);
        });

        // create select fields
        selectInputFields.forEach((element) => {
            const field = this.createSelectElement(element[0], element[1]);
            form.append(field);
        })

        // create buttons
        this.createButtonElements(form);

        // create step indicators
        const amountOfSteps = numberInputFields.length + selectInputFields.length
        this.createStepIndicators(amountOfSteps, form);


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

    createHeader(textContent, parentElement) {
        const header = document.createElement("h5");

        header.classList.add("h5");
        header.textContent = textContent;

        parentElement.appendChild(header);
    }

    createInputElement(name, type, title) {
        // Create elements
        const div = document.createElement("div");
        const label = document.createElement("label");
        const inputWrapper = document.createElement("div");
        const input = document.createElement("input");
        const error = document.createElement("span");

        // Set attributes and text content
        div.classList.add("tab");
        label.textContent = title;
        label.htmlFor = name;
        error.classList.add("error", "float-right");
        error.setAttribute("aria-live", "polite");
        error.id = `${name}error`;
        input.type = type;
        input.placeholder = name;
        input.id = name;
        input.name = name;

        // Assemble elements
        inputWrapper.appendChild(input);
        div.appendChild(label);
        div.appendChild(error);
        div.appendChild(inputWrapper);

        return div;
    }

    createSelectElement(name, options) {
        // create tab
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('tab');

        // create label
        const labelTextNode = document.createTextNode(`${name}: `);

        // create select element
        const selectElement = document.createElement('select');
        selectElement.setAttribute('id', name.toLowerCase());

        // create option elements
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.setAttribute('value', option.value);
            optionElement.textContent = option.label;
            selectElement.appendChild(optionElement);
        });

        // create p element
        const pElement = document.createElement('p');
        pElement.appendChild(selectElement);

        // append label and p element
        containerDiv.appendChild(labelTextNode);
        containerDiv.appendChild(pElement);

        return containerDiv;
    }

    createButtonElements(parent) {
        const overflowDiv = document.createElement("div");
        overflowDiv.classList.add("overflow-auto");

        const floatRightDiv = document.createElement("div");
        floatRightDiv.classList.add("float-right");

        const prevButton = document.createElement("button");
        prevButton.setAttribute("type", "button");
        prevButton.setAttribute("id", "prevBtn");
        prevButton.classList.add("btn", "btn-secondary");
        prevButton.textContent = "Previous";

        const nextButton = document.createElement("button");
        nextButton.setAttribute("type", "button");
        nextButton.setAttribute("id", "nextBtn");
        nextButton.classList.add("btn", "btn-primary");
        nextButton.textContent = "Next";

        floatRightDiv.appendChild(prevButton);
        floatRightDiv.appendChild(nextButton);

        overflowDiv.appendChild(floatRightDiv);

        parent.appendChild(overflowDiv);
    }

    createStepIndicators(amountOfSteps, parent) {
        const container = document.createElement("div");
        container.classList.add("text-center");

        for (let step = 0; step < amountOfSteps; step++) {
            const stepSpan = document.createElement("span");
            stepSpan.classList.add("step");
            console.log("step!");
            container.appendChild(stepSpan);
        }

        parent.appendChild(container);
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
