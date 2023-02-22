export default class FormValidator {
    constructor () {
        
    }
    
    onlyNumberKey(evt) {
        var ASCIICode = (evt.which) ? evt.which : evt.keyCode
        if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
            return false;
        return true;
    }

    validateForm(currentTab) {
        let valid = true;
        let errorMessage;
    
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
            if(errorMessage) {
                errorMessage.textContent = "";
                errorMessage.className = "error";
            }

            document.getElementsByClassName("step")[currentTab].className += " finish";
        }
    
        return valid;
    }
}