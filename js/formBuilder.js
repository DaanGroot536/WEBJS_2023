import FormValidator from './formValidator.js';
import { currentHall } from './hallswitcher.js';
import BeltMaker from './beltmaker.js';

export default class FormBuilder {

    currentTab = 0;

    constructor(fv, bm) {
        formValidator = fv;
        beltMaker = bm;

        this.initForms();
        this.showTab(this.currentTab);
    }

    initForms() {
        // create truck form
        const truckHeader = "Register Truck:";
        const truckFormID = "truck";
        const truckNumberFields = [
            ["length", "number", "Length (Y axis):"],
            ["width", "number", "Width (X axis):"],
            ["interval", "number", "Truck Interval:"]
        ];

        const truckSelectInputFields = [
            ["Load Type: ", [
                { value: 'cold', label: 'Cold transport' },
                { value: 'fragile', label: 'Fragile transport' },
                { value: 'general', label: 'General transport' },
                { value: 'quick', label: 'Quick transport' },
                { value: 'pallet', label: 'Pallet transport' }
            ]]
        ];

        this.buildForm(truckHeader, truckFormID, true, truckNumberFields, truckSelectInputFields);

        // create weather form
        const weatherHeader = "Check Weather:";
        const weatherformID = "weather";
        const weatherInputFields = [
            ["weather", "text", "City:"]
        ];

        this.buildForm(weatherHeader, weatherformID, false, weatherInputFields)


    }

    buildForm(header, formID, hasTabs = false, inputFields = [], selectInputFields = []) {
        // create base form
        const form = document.createElement("form");
        form.setAttribute("id", `${formID}Form`);
        form.setAttribute("class", "card card-body mt-3 ml-3 col-3");

        // get base area
        const formArea = document.getElementById("form-area");
        formArea.appendChild(form);

        // create header
        this.createHeader(header, form);

        // create input fields if any
        inputFields.forEach((element) => {
            this.createInputElement(element[0], element[1], element[2], form, hasTabs);
        });

        // create select fields if any
        selectInputFields.forEach((element) => {
            this.createSelectElement(element[0], element[1], form);
        })

        // create buttons
        this.createButtonElements(form, hasTabs, formID);

        // create step indicators if needed
        const amountOfSteps = inputFields.length + selectInputFields.length;
        if (amountOfSteps > 1) {
            this.createStepIndicators(amountOfSteps, form);
        }

        // add descriptive text to weather form
        // TODO: remove, ugly code
        if (formID === "weather") {
            this.addDescriptiveText(form);
        }
    }

    createHeader(textContent, parentElement) {
        const header = document.createElement("h5");

        header.classList.add("h5", "text-center");
        header.textContent = textContent;

        parentElement.appendChild(header);
    }

    createInputElement(name, type, title, parent, hasTabs) {
        // Create elements
        const div = document.createElement("div");
        const label = document.createElement("label");
        const inputWrapper = document.createElement("div");
        const input = document.createElement("input");
        const error = document.createElement("span");

        // Set attributes and text content
        if (hasTabs) {
            div.classList.add("tab");
        }

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

        parent.appendChild(div);

        if(hasTabs) {
            const handleInput = (event) => {
                formValidator.validateForm(this.currentTab);
                formValidator.preventNonNumericInput(event);
            };
    
            input.addEventListener("input", handleInput);
        }
    }

    createSelectElement(name, options, parent) {
        // create tab
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('tab');

        // create label
        const labelTextNode = document.createTextNode(`${name}: `);

        // create select element
        const selectElement = document.createElement('select');
        selectElement.setAttribute('id', "trucktype"); // TODO: hardcoded value

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

        parent.appendChild(containerDiv);
    }

    createButtonElements(parent, hasTabs, header) {
        // create container
        const overflowDiv = document.createElement("div");
        overflowDiv.classList.add("overflow-auto");

        // align buttons
        const floatRightDiv = document.createElement("div");
        floatRightDiv.classList.add("float-right");

        // initialize empty array for navigation buttons
        const navigationButtons = []

        // create continue/submit button
        const nextButton = document.createElement("button");
        nextButton.setAttribute("type", "button");
        nextButton.setAttribute("id", `${header}NextBtn`);
        nextButton.classList.add("btn", "btn-primary", "mt-3");
        nextButton.textContent = "Submit";

        // if the form has tabs, create back button
        if (hasTabs) {
            const prevButton = document.createElement("button");
            prevButton.setAttribute("type", "button");
            prevButton.setAttribute("id", `${header}PrevBtn`);
            prevButton.classList.add("btn", "btn-secondary", "mt-3");
            prevButton.textContent = "Previous";

            // add button to array and container
            floatRightDiv.appendChild(prevButton);
            navigationButtons.push(prevButton);

            // change text of continue/submit button to "Next
            nextButton.textContent = "Next";
        }

        // add button to array and container
        navigationButtons.push(nextButton);
        floatRightDiv.appendChild(nextButton);

        // append button container to parent container
        overflowDiv.appendChild(floatRightDiv);
        parent.appendChild(overflowDiv);

        if (hasTabs) { // TODO: double hasTabs if statement
            // create event handler function for navigation button clicks
            const handleNavigationButtonClick = (event) => {
                const directionID = event.target.id === "truckNextBtn" ? 1 : -1;
                this.nextPrev(directionID);
            };

            // add event listener to each navigation button
            navigationButtons.forEach((navigationButton) => {
                navigationButton.addEventListener("click", handleNavigationButtonClick);
            });
        }
    }

    createStepIndicators(amountOfSteps, parent) {
        const container = document.createElement("div");
        container.classList.add("text-center");

        for (let step = 0; step < amountOfSteps; step++) {
            const stepSpan = document.createElement("span");
            stepSpan.classList.add("step");
            container.appendChild(stepSpan);
        }

        parent.appendChild(container);
    }

    addDescriptiveText(parent) {
        const div = document.createElement("div");
        div.classList.add("text-center");

        const h3 = document.createElement("h3");
        h3.setAttribute("id", "temp");

        const h5a = document.createElement("h5");
        h5a.setAttribute("id", "description");

        h3.appendChild(h5a);

        const h5b = document.createElement("h5");
        h5b.setAttribute("id", "windspeed");

        div.appendChild(h3);
        div.appendChild(h5b);

        parent.appendChild(div);
    }

    showTab(tabIndex) {
        const tabs = document.getElementsByClassName("tab");
        // console.log(tabs);
        // console.log(tabIndex);
        // console.log(tabs[tabIndex]);
        // console.log("----------------------------------");
        tabs[tabIndex].style.display = "block";

        // fix Previous/Next buttons
        const prevBtn = document.getElementById("truckPrevBtn");
        const nextBtn = document.getElementById("truckNextBtn");

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