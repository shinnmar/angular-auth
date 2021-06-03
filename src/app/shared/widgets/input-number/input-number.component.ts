import { Component, DoCheck, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { CustomValidators } from '@shared_core/directives/validators/ngmodel.validator';
import { WidgetBaseComponent } from '@shared_models/components/widget-base-component.model';

@Component({
    selector: 'widget-input-number',
    templateUrl: './input-number.component.html'
})

export class WidgetInputNumberComponent extends WidgetBaseComponent implements ControlValueAccessor, OnInit, DoCheck {

    private _value: number = 0;

    @Input() validations: string[] = ['decimal'];

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

    set value(newValue: number) {
        this._value = newValue;
        this.onChange(newValue);
        this.onTouch(newValue);
    }

    writeValue(value: number) {
        if (value == null || value == undefined) {
            value = 0;
            this.onChange(value);
        }
        this._value = value;
    }
}