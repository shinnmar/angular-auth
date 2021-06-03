import { AbstractControl, NgModel, ValidatorFn, Validators } from '@angular/forms';
import { ElementRef } from '@angular/core';

export class CustomValidators {

    private static defaultValidators: string[] = ['min-2', 'max-100'];

    static createListValidators(isRequired: boolean, validations: string[], el?: ElementRef): any[] {
        let _validators = [];

        if (isRequired) _validators.push(Validators.required);

        (validations.length > 0 ? validations : this.defaultValidators).forEach(v => {
            if (v.indexOf('min-') != -1) _validators.push(Validators.minLength(parseInt(v.split('-')[1])));
            if (v.indexOf('max-') != -1) {
                _validators.push(Validators.maxLength(parseInt(v.split('-')[1])));
                if (el) (<HTMLElement>el.nativeElement).setAttribute('maxlength', String(parseInt(v.split('-')[1])));
            };
            if (v == 'email') _validators.push(Validators.email);
            if (v == 'decimal') _validators.push(CustomValidators.isDecimalValidator);
            if (v == 'password-secure') _validators.push(CustomValidators.isPasswordSecureValidator);
        });
        return _validators;
    }

    static get isDecimalValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let value = String(control.value);
            if (value == "0") return null;
            else return /^\d{1,10}(\.\d{1,2})?$/.test(value) ? null : { decimal: true };
            //else return /^\d{1,10}(\.\d{2})$/.test(value) ? null : { decimal: true };
            //return /^\d{1,10}(\.\d{1,2})?$/.test(value) ? null : { decimal: true };
        };
    }

    static get isPasswordSecureValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let value = String(control.value);
            if (!value) return null;

            let array = [];
            array[0] = value.match(/[A-Z]/);
            array[1] = value.match(/[a-z]/);
            array[2] = value.match(/\d/);
            array[3] = value.match(/[!"#$%&'()*+-./:;<=>?@^_`{|}~]/);

            let sum = 0;
            for (let i = 0; i < array.length; i++) {
                sum += array[i] ? 1 : 0;
            }

            return sum < 4 ? { secure: true } : null;
        }
    }

}

