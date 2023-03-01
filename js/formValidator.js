export default class FormValidator {

    MIN_LENGTH = 5;
    MAX_LENGTH = 9;

    MIN_WIDTH = 4;
    MAX_WIDTH = 8;
    
    MIN_INTERVAL = 1;
    MAX_INTERVAL = 5;

    constructor() {

    }

    // only allows numbers to be entered
    preventNonNumericInput(evt) {
        const key = evt.key;
        if (/\D/.test(key)) {
            evt.preventDefault();
        }
    }

    validateForm(currentTab) {
        let valid = true;

        const currentTabElement = document.getElementsByClassName("tab")[currentTab];
        const inputElement = currentTabElement.getElementsByTagName("input")[0];

        if (!inputElement) return valid;

        // reset input class
        inputElement.classList = [];

        const errorMessageElement = document.getElementById(`${inputElement.name}error`);

        if (this.validateInputValue(inputElement, errorMessageElement)) {
            // hide error message
            errorMessageElement.textContent = "";
            errorMessageElement.classList.remove("active");

            // update step indicator
            document.getElementsByClassName("step")[currentTab].classList.add("finish");
        } else {
            // show error message
            errorMessageElement.classList.add("active");
            inputElement.classList.add("invalid");

            valid = false;
        }

        return valid;
    }

    validateInputValue(inputElement, errorMessageElement) {
        const name = inputElement.name;
        const value = inputElement.value;
        let errorMessage = '';

        switch (name) {
            case "interval":
                if (value < this.MIN_INTERVAL || value > this.MAX_INTERVAL) {
                    errorMessage = `Entered value must be between ${this.MIN_INTERVAL} and ${this.MAX_INTERVAL}.`;
                }
                break;
            case "length":
                if (value < this.MIN_LENGTH || value > this.MAX_LENGTH) {
                    errorMessage = `Entered value must be between ${this.MIN_LENGTH} and ${this.MAX_LENGTH}.`;
                }
                break;
            case "width":
                if (value <= this.MIN_WIDTH || value > this.MAX_WIDTH) {
                    errorMessage = `Entered value must be between ${this.MIN_WIDTH} and ${this.MAX_WIDTH}.`;
                } else if (value <= document.querySelector("#length").value) {
                    errorMessage = "Width must be higher than length.";
                }
                break;
            default:
                errorMessage = "Invalid input element name.";
                break;
        }


        if (errorMessage !== "") {
            errorMessageElement.textContent = errorMessage;
            return false;
        }

        return true;
    }
}