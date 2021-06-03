import { Component, DoCheck, Input, OnInit, Optional, Output, Self, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { CustomValidators } from '@shared_core/directives/validators/ngmodel.validator';
import { WidgetBaseComponent } from '@shared_models/components/widget-base-component.model';

@Component({
    selector: 'widget-calendar',
    templateUrl: './calendar.component.html'
})

export class WidgetCalendarComponent extends WidgetBaseComponent implements ControlValueAccessor, OnInit, DoCheck {

    private _value: Date = new Date();

    @Input() min: Date = null;
    @Input() max: Date = null;
    @Input() btnCancelApply = false;

    @Output() dateChange: EventEmitter<Date> = new EventEmitter<Date>();

    constructor(
        //@Optional() @Self() public validators: Array<Validator | ValidatorFn>,
        @Optional() @Self() public ngControl: NgControl
    ) {
        super();
        this.ngControl.valueAccessor = this;
        this.ngControl.control.setValidators(CustomValidators.createListValidators(this.required, this.validations));
    }

    datePickerFilter = (d: Date | null): boolean => {
        //const day = (d || new Date()).getDay();
        // Prevent Saturday and Sunday from being selected.
        //return day !== 0 && day !== 6;
        return true;
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

    set value(newValue: Date) {
        //let moment = <Moment>newValue;
        //let date = moment.toDate();
        this._value = newValue;
        this.onChange(newValue);
        this.onTouch(newValue);
    }

    writeValue(value: Date) {
        if (!value) value = new Date();
        this.onChange(value);
        this._value = value;
    }
}