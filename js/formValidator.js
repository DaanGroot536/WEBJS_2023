export default class FormValidator {
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
    
        const errorMessageElement = document.getElementById(`${inputElement.name}error`);

        function validateInputValue() {
            if (inputElement.value === "") {
                errorMessageElement.textContent = "You need to enter a value.";
                return false;
            } else if (inputElement.value <= 0 || inputElement.value > 5) {
                errorMessageElement.textContent = "Entered value needs to be between 1 and 5.";
                return false;
            }
            return true;
        }
    
        if (validateInputValue()) {
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
}