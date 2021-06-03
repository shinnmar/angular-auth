import { MatColumnDef, MatHeaderRowDef, MatNoDataRow, MatRowDef, MatTable, } from '@angular/material/table';
import { Component, ContentChild, ContentChildren, QueryList, ViewChild } from '@angular/core';

@Component({
    template: ''
})
export abstract class TableWrapperComponent {

    @ContentChildren(MatHeaderRowDef) headerRowDefs: QueryList<MatHeaderRowDef>;
    @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<any>>;
    @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;
    @ContentChild(MatNoDataRow) noDataRow: MatNoDataRow;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;


    tableContentRefresh() {

        this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
        this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
        this.headerRowDefs.forEach(headerRowDef => this.table.addHeaderRowDef(headerRowDef));
        this.table.setNoDataRow(this.noDataRow);

    }

}