import { Component, Input, OnInit, Output, QueryList, AfterViewInit, ViewChild, ViewChildren, EventEmitter, ChangeDetectorRef, ElementRef, AfterViewChecked } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';

import { ResponseMessage } from '../../../models/response.model';
import { Constants } from '../../../models/constants.model';

import * as objectPath from 'object-path';
import { buildTreeLevel2 } from '../../../utils/types-convertion.utils';
@Component({
    selector: 'widget-select-tree',
    templateUrl: './select-tree.component.html'
})

export class WidgetSelectTreeComponent<T> implements OnInit, AfterViewInit, AfterViewChecked {

    optionsList: T[] = [];
    optionsListTree: T[] = [];
    //optionsListOriginal: T[] = [];
    loading = false;
    idSelect: string;
    nameSelect: string;
    width = 0;
    isOpen = false;
    onInit = false;

    private promise: Promise<ResponseMessage<T[]>>;

    @Input() idControl: string = `select-${new Date().getTime()}`;
    @Input() isRequired: boolean = true;
    @Input() id: string = 'IdCatalog';
    @Input() name: string = 'Name';
    @Input() showNinguno: boolean = false;
    @Input() textNinguno: string = 'Ninguno';
    @Input() editable: boolean = true;

    @Output() selectRef: EventEmitter<NgModel> = new EventEmitter<NgModel>();
    @Output() optionChange: EventEmitter<T> = new EventEmitter<T>();

    @ViewChildren(NgModel) private ngModelSelect: QueryList<NgModel>;
    @ViewChild('input', { static: true }) selectInput: ElementRef;

    constructor(
        private cdr: ChangeDetectorRef,
        public strategy: ScrollStrategyOptions,
    ) {
        this.optionsList = [];
        this.promise = null;
        this.idSelect = '';
    }

    ngOnInit() {
        this.onInit = true;
        this.validateIdSelect();
    }

    ngAfterViewInit() {
        this.selectRef.emit(this.ngModelSelect.toArray()[0]);
    }

    ngAfterViewChecked() {
        let w = (this.selectInput.nativeElement as HTMLElement).getBoundingClientRect().width;
        if (w != 0) {
            this.width = w;
        }
    }

    setIdSelect(_idSelect: string) {
        this.idSelect = _idSelect || '';
        this.validateIdSelect();
    }

    setData(_data: T[], _idSelect?: string) {
        this.optionsList = _data;
        this.optionsListTree = buildTreeLevel2<T>(this.optionsList, this.optionsList, null);
        //this.optionsListOriginal = this.optionsList;
        if (_idSelect) this.idSelect = _idSelect;

        this.validateIdSelect();
    }

    async setPromise(_promise: Promise<ResponseMessage<T[]>>, validator?: (item: T) => boolean) {
        this.promise = _promise;
        this.loading = true;
        let { status, message, data, validate } = await this.promise;
        this.loading = false;

        if (status === Constants.STATUS.Success) {
            this.optionsList = [];

            if (validator) {
                for (const item of data) {
                    if (validator(item)) {
                        this.optionsList.push(item);
                    }
                }
            } else {
                this.optionsList = data;
            }

            this.optionsListTree = buildTreeLevel2<T>(this.optionsList, this.optionsList, null);
            //this.optionsListOriginal = this.optionsList;
            this.cdr.markForCheck();
            this.validateIdSelect();
        }
    }

    getSelected(): T {
        if (this.idSelect) {
            return this.optionsList.find(op => op[this.id] == this.idSelect);
        }
        return null;
    }

    // search(value: string) {
    //     if (this.optionsListOriginal.length > 0) {
    //         this.optionsList = this.optionsListOriginal.filter(o => this.getName(o).toLowerCase().indexOf(value.toLowerCase()) != -1);
    //         this.cdr.markForCheck();
    //     }
    // }

    clickItem(item: T) {
        if (item)
            this.idSelect = item[this.id];
        else
            this.idSelect = '';

        this.validateIdSelect();

        this.optionChange.emit(this.getSelected());

        this.openOptions(false);
    }

    openOptions(value: boolean) {
        if (!this.editable) return;

        if (value != this.isOpen) {
            this.isOpen = value;
            // if (!this.isOpen) {
            //     this.optionsList = this.optionsListOriginal;
            // }
            this.cdr.markForCheck();
        }
    }

    outsideclick(event) {
        if (event.target == this.selectInput.nativeElement)
            return;
        else this.isOpen = false;
    }

    getName(item: T): string {
        return this.name.split('|').map(s => (<string>objectPath.get(item, s))).join(' | ');
    }

    private validateIdSelect() {
        if (this.optionsList.length > 0 && this.onInit) {
            let x = this.optionsList.find(o => o[this.id] == this.idSelect);

            this.idSelect = x ? this.idSelect : '';
            this.nameSelect = x ? this.getName(x) : '';
        }
    }

}