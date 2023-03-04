import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function rNumberValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        let value = control.value;
        if (!value) return null;
        if (isNaN(value)) {
            return {invalidNumber: {
                isNaN: true
            }};
        }
        value = parseFloat(value);
        if (value > -3 && value < 3) {
            return null;
        } else return {invalidNumber: {
            isNaN: false,
            beyondBounds: true
        }};
    }
}