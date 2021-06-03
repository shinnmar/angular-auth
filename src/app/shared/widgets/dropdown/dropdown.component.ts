import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Component, DoCheck, ElementRef, Input, OnInit, Optional, Self, ViewChild, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NgControl, NgModel } from '@angular/forms';

import { CustomValidators } from '@shared_core/directives/validators/ngmodel.validator';

import { WidgetBaseComponent } from '@shared_models/components/widget-base-component.model';
import { Constants } from '@shared_models/constants.model';
import { ResponseMessage } from '@shared_models/response.model';

import * as objectPath from 'object-path';

@Component({
    selector: 'widget-dropdown',
    templateUrl: './dropdown.component.html'
})

export class WidgetDropdownComponent<T> extends WidgetBaseComponent implements ControlValueAccessor, OnInit, AfterViewChecked, DoCheck {

    private _value: T = null;

    list: T[] = [];
    originalList: T[] = [];

    text: string = '';
    isOpen = false;
    loading = false;
    width = 0;

    private promise: Promise<ResponseMessage<T[]>>;
    //private _constructor: new (value: Partial<T>) => T;

    @Input() showNone: boolean = true;
    @Input() textNone: string = 'Ninguno';
    @Input() editable: boolean = true;
    @Input() keyId: string = 'IdCatalog';
    @Input() keyName: string = 'Name';

    @Output() change: EventEmitter<T> = new EventEmitter<T>();

    @ViewChild('containerInput', { static: true }) containerInput: ElementRef;

    get isNone() {
        return !this._value || !this._value[this.keyId];
    }

    get idSelected() {
        if (!this._value) return '';
        return this._value[this.keyId];
    }

    constructor(
        public strategy: ScrollStrategyOptions,
        //@Optional() @Self() public validators: Array<Validator | ValidatorFn>,
        @Optional() @Self() public ngControl: NgControl
    ) {
        super();
        this.ngControl.valueAccessor = this;
        this.ngControl.control.setValidators(CustomValidators.createListValidators(this.required, this.validations));
    }

    ngOnInit() {
    }

    writeValue(value: T) {
        this._value = value;
        this.text = this.getName(value);

        if (value && !value[this.keyId]) {
            this.onChange(null);
        }
    }

    ngAfterViewChecked() {
        let w = (this.containerInput.nativeElement as HTMLElement).getBoundingClientRect().width;
        if (w != 0) {
            this.width = w;
        }
    }

    ngDoCheck() {
        if (this.ngControl.touched) {
            this.inputNgModel.control.markAsTouched();
        }
    }

    async setPromise(_promise: Promise<ResponseMessage<T[]>>, validator?: (item: T) => boolean) {
        this.promise = _promise;
        this.loading = true;
        let { status, message, data, validate } = await this.promise;
        //console.log(data);
        //console.log(data.map(d => new this._constructor(d)));
        if (status === Constants.STATUS.Success) {
            this.list = [];
            if (validator) {
                for (const item of data) {
                    if (validator(item)) this.list.push(item);
                }
            } else {
                this.list = data;
            }
            this.originalList = this.list;
        }

        this.loading = false;
    }

    setData(_data: T[]) {
        this.list = _data;
        this.originalList = _data;
    }

    clickItem(item: T) {
        this.text = this.getName(item);
        this._value = item;
        this.change.emit(item);
        this.onChange(item);
        this.openOptions(false);
    }

    search(value: string) {
        if (this.originalList.length > 0) {
            this.list = this.originalList.filter(o => this.getName(o).toLowerCase().indexOf(value.toLowerCase()) != -1);
            //this.cdr.markForCheck();
        }
    }

    openOptions(value: boolean) {
        if (!this.editable) return;

        if (value != this.isOpen) {
            this.isOpen = value;
            if (!this.isOpen) {
                this.list = this.originalList;
            }
        }
    }

    outsideClick(event) {
        if (event.target == (this.containerInput.nativeElement as HTMLElement).firstChild) return;
        else this.isOpen = false;
    }

    getName(item: T): string {
        return this.keyName.split('|').map(s => (<string>objectPath.get(item, s))).join(' | ');
    }
}