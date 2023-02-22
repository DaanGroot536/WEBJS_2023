export default class FormValidator {
    constructor() {

    }

    // only allows numbers to be entered
    onlyNumberKey(evt) {
        var ASCIICode = (evt.which) ? evt.which : evt.keyCode
        if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
            return false;
        return true;
    }

    // validate fields in a given tab
    validateForm(currentTab) {
        let valid = true;

        // get field to validate
        const tab = document.getElementsByClassName("tab")[currentTab];
        let fieldToValidate = tab.getElementsByTagName("input")[0];

        if (!fieldToValidate) return valid;

        let errorMessage = document.getElementById(fieldToValidate.name + "error");

        // check if empty
        if (fieldToValidate.value == "") {
            errorMessage.textContent = "You need to enter a value.";
            valid = false;
        } else if (fieldToValidate.value <= 0 || fieldToValidate.value > 5) {
            errorMessage.textContent = "Entered value needs to be between 1 and 5.";
            valid = false;
        }

        if (valid) {
            // hide error message
            errorMessage.textContent = "";
            errorMessage.className = "error";

            // update step indicator
            document.getElementsByClassName("step")[currentTab].className += " finish";
        } else {
            // show error message
            errorMessage.className = "error active";
            fieldToValidate.className += " invalid";
        }

        return valid;
    }
}