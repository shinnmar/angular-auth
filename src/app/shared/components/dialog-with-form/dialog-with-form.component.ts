import { Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit, ContentChildren, QueryList } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ConfigComponent } from '@shared_models/components/config-component.model';

@Component({
    selector: 'dialog-with-form',
    templateUrl: './dialog-with-form.component.html'
})

export class IntranetDialogWithFormComponent implements OnInit, AfterViewInit {

    private inputsOther: NgModel[] = [];
    modalSize: string;

    @Input() configComponent: ConfigComponent = new ConfigComponent();
    @Input() size = 'sm';

    @Output() closeDialog = new EventEmitter<any>();

    @ContentChildren(NgModel, { descendants: true }) private inputs: QueryList<NgModel>;
    @ViewChild('form') private form: NgForm;

    constructor() { }

    ngAfterViewInit() {
        this.inputs.toArray().forEach((model) => this.form.addControl(model));
        this.inputsOther.map((model) => this.form.addControl(model));
    }

    ngOnInit() {
        switch (this.size) {
            case 'sm':
                this.modalSize = 'dialog-sm'; break;
            case 'md':
                this.modalSize = 'dialog-md'; break;
            case 'lg':
                this.modalSize = 'dialog-lg'; break;
            case 'xl':
                this.modalSize = 'dialog-xl'; break;
        }
    }

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