import { Component, Input, ViewChild, DoCheck } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
    template: ''
})
export abstract class WidgetBaseComponent {

    @Input() required: boolean = true;
    @Input() validations: string[] = [];
    @Input() label: string = 'label';
    @Input() name: string = 'name';

    @ViewChild("inputNgModel") inputNgModel: NgModel;

    constructor() {

    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouch = fn;
    }

    onChange: any = () => { }
    onTouch: any = () => { }

    // abstract setData(data: T): T;

    // abstract getData(): Promise<T>;
}