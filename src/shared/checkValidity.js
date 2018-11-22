export const checkValidityHandler = (el, rules) => {
    let validationPass = true;
    if(rules.requiredField) {
        validationPass = el.trim() !== '' && validationPass;
    }
    
    if(rules.minLength) {
        validationPass = el.length >= rules.minLength && validationPass;
    }

    if(rules.maxLength) {
        validationPass = el.length <= rules.maxLength && validationPass;
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        validationPass = pattern.test(el) && validationPass
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        validationPass = pattern.test(el) && validationPass
    }

    return validationPass;

}