import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

import { CustomValidators } from '@shared_core/directives/validators/ngmodel.validator';

import { WidgetBaseComponent } from '@shared_models/components/widget-base-component.model';

@Component({
    selector: 'widget-input-textarea',
    templateUrl: './input-textarea.component.html'
})

export class WidgetInputTextAreaComponent extends WidgetBaseComponent implements ControlValueAccessor, OnInit {

    private _value: string = '';

    @Input() rows = 5;

    constructor(
        //@Optional() @Self() public validators: Array<Validator | ValidatorFn>,
        @Optional() @Self() public ngControl: NgControl
    ) {
        super();
        this.ngControl.valueAccessor = this;
        this.ngControl.control.setValidators(CustomValidators.createListValidators(this.required, this.validations));
    }

    ngOnInit() { }

    ngDoCheck() {
        if (this.ngControl.touched) {
            this.inputNgModel.control.markAsTouched();
        }
    }

    get value() {
        return this._value;
    }

    set value(newValue: string) {
        if (newValue != this._value) {
            this._value = newValue;
            this.onChange(newValue);
            this.onTouch(newValue);
        }
    }

    writeValue(value: string) {
        this._value = value;
    }
}