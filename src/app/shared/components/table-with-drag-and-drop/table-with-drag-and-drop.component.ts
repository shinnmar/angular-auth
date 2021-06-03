import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterContentInit, Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { TableWrapperComponent } from '@shared_models/components/table-wrapper-component.model';

import * as lodash from 'lodash';

@Component({
    selector: 'table-with-drag-and-drop',
    templateUrl: './table-with-drag-and-drop.component.html'
})

export class IntranetTableWithDragAndDropComponent<T> extends TableWrapperComponent implements OnInit, AfterContentInit {

    loading = false;

    @Input() p0: boolean = false;
    @Input() dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();
    @Output() dropped = new EventEmitter<T[]>();

    tableColumns = ['name', 'description', 'actions'];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor() {
        super();
    }

    ngAfterContentInit() {
        this.tableContentRefresh();
    }

    ngOnInit() {

    }

    setDataSource(_data: T[]) {
        this.dataSource = new MatTableDataSource<T>(_data);
        this.dataSource.paginator = this.paginator;
    }

    getData(): T[] {
        return this.dataSource.data;
    }

    drop(event: CdkDragDrop<T[]>) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        this.dropped.emit(lodash.cloneDeep(this.dataSource.data));
    }

}