import { Component, Input, OnInit, Output, QueryList, AfterViewInit, ViewChild, ViewChildren, EventEmitter, ChangeDetectorRef, ElementRef, AfterViewChecked } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ListSelectGroupModel, SelectGroupModel } from '../../../models/select-group.model';

import * as objectPath from 'object-path';

@Component({
    selector: 'widget-select-group',
    templateUrl: './select-group.component.html'
})

export class WidgetSelectGroupComponent<T> implements OnInit {
    listGroup: ListSelectGroupModel<T>[] = [];
    loading = false;
    idSelect: string;
    nameSelect: string;
    groupSelect: SelectGroupModel;
    width = 0;
    isOpen = false;
    onInit = false;

    @Input() idControl: string = `select-${new Date().getTime()}`;
    @Input() isRequired: boolean = true;
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
        this.idSelect = '';
        this.nameSelect = '';
        this.groupSelect = null;
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

    setIdSelect(idSelect: string, group: SelectGroupModel) {
        this.idSelect = idSelect || '';
        this.groupSelect = group || null;
        this.validateIdSelect();
    }

    setData(_data: ListSelectGroupModel<T>[]) {
        this.listGroup = _data;
        //this.optionsListOriginal = this.optionsList;
        this.validateIdSelect();
    }

    getSelected(): T {
        if (this.idSelect && this.groupSelect) {
            let x = this.listGroup.find(lg => lg.Group.Id == this.groupSelect.Id)?.List?.find(o => o[this.groupSelect.Id] == this.idSelect) || null;
            return x;
        }
        return null;
    }

    // search(value: string) {
    //     //this.optionsList = this.optionsListOriginal.filter(o => String(o[this.name]).toLowerCase().indexOf(value.toLowerCase()) != -1);
    //     if (this.optionsListOriginal.length > 0) {
    //         this.optionsList = this.optionsListOriginal.filter(o => this.getName(o).toLowerCase().indexOf(value.toLowerCase()) != -1);
    //         this.cdr.markForCheck();
    //     }
    // }

    clickItem(item: T, group: SelectGroupModel) {
        if (item) {
            this.idSelect = item[group.Id];
            this.groupSelect = group;
        }
        else {
            this.idSelect = '';
            this.groupSelect = null;
        }

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

    getName(item: T, group: SelectGroupModel): string {
        return group.Name.split('|').map(s => (<string>objectPath.get(item, s))).join(' | ');
    }

    private validateIdSelect() {
        if (this.listGroup.length > 0 && this.onInit && this.groupSelect) {
            let x = this.listGroup.find(lg => lg.Group.Id == this.groupSelect.Id)?.List?.find(o => o[this.groupSelect.Id] == this.idSelect) || null;

            this.idSelect = x ? x[this.groupSelect.Id] : '';
            this.nameSelect = x ? this.getName(x, this.groupSelect) : '';
        }
    }
}