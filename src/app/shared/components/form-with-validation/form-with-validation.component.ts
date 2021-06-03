import { Component, ContentChildren, OnInit, QueryList, ViewChild, AfterViewInit, Input } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
    selector: 'form-with-validation',
    templateUrl: './form-with-validation.component.html'
})

export class IntranetFormWithValidationComponent implements OnInit, AfterViewInit {

    private inputsOther: NgModel[] = [];

    @Input() scrollAndPadding = true;

    @ContentChildren(NgModel, { descendants: true }) private inputs: QueryList<NgModel>;
    @ViewChild('form') private form: NgForm;

    constructor() {
    }

    ngAfterViewInit() {
        this.inputs.toArray().forEach((model) => this.form.addControl(model));
        this.inputsOther.map((model) => this.form.addControl(model));
    }

    ngOnInit() { }

    addNgModel(model: NgModel) {
        this.inputsOther.push(model);
    }

    isValidateForm(): boolean {
        if (this.form.invalid) {
            this.form.control.markAllAsTouched();
        }
        return !this.form.invalid;
    }
}