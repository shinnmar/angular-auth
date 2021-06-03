import { Component, Input, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableWrapperComponent } from '@shared_models/components/table-wrapper-component.model';

@Component({
    selector: 'table-with-paginator',
    templateUrl: './table-with-paginator.component.html'
})

export class IntranetTableWithPaginatorComponent<T> extends TableWrapperComponent implements OnInit, AfterContentInit {

    loading = false;

    @Input() dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor() {
        super();
    }

    ngAfterContentInit() {
        this.tableContentRefresh();
    }

    ngOnInit() { }

    setDataSource(_data: T[]) {
        this.dataSource = new MatTableDataSource<T>(_data);
        this.dataSource.paginator = this.paginator;
    }
}