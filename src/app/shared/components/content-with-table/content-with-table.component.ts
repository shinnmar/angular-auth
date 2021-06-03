import { AfterContentInit, Component, Input, OnInit, Output, ViewChild, EventEmitter, OnDestroy, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Subscription, Observable } from 'rxjs';

import { TableWrapperComponent } from '@shared_models/components/table-wrapper-component.model';
import { ResponseMessage } from '@shared_models/response.model';
import { Constants } from '@shared_models/constants.model';
import { ConfigComponent } from '@shared_models/components/config-component.model';

import { ToolService } from '@shared_core/services/core.service';

import * as objectPath from 'object-path';

type PromiseMultipleDeleteType = (CatalogIds: string[]) => Promise<ResponseMessage<void>>;

@Component({
    selector: 'content-with-table',
    templateUrl: './content-with-table.component.html'
})

export class IntranetContentWithTableComponent<T> extends TableWrapperComponent implements OnInit, AfterContentInit, OnDestroy {
    loading = false;

    selection = new SelectionModel<T>(true, []);
    columns: string[] = [];

    @Input() configComponent: ConfigComponent = new ConfigComponent();
    @Input() dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();
    @Input() validatorRef: (item: T) => boolean = null;

    @Output() selected = new EventEmitter<number>();
    @Output() list = new EventEmitter<void>();
    @Output() deleteSelectedFunction = new EventEmitter<void>();

    private multipleDeletePromise: PromiseMultipleDeleteType;
    private messageAlertMultipleDelete = null;

    private $layoutChanges: Observable<BreakpointState>;
    private subs: Subscription[] = [];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private toolsService: ToolService,
        private breakpointerObserver: BreakpointObserver,
        private cdr: ChangeDetectorRef
    ) {
        super();
        this.$layoutChanges = this.breakpointerObserver.observe([
            Breakpoints.XSmall,
            Breakpoints.Small,
            Breakpoints.Medium,
            Breakpoints.Large,
            Breakpoints.XLarge
        ]);
    }

    ngAfterContentInit() {
        this.tableContentRefresh();
    }

    ngOnInit() {
        this.columns = this.configComponent.columns;

        let sub1 = this.selection.changed.subscribe(response => {
            let selected = response.source.selected.length;
            if (selected > 0) {
                this.selected.emit(selected);
            }
        });

        let sub2 = this.$layoutChanges.subscribe(result => {
            if (result.matches) {
                if ((result.breakpoints[Breakpoints.XSmall] || result.breakpoints[Breakpoints.Small]) && this.configComponent.smallTableColumns.length > 0)
                    this.columns = this.configComponent.smallTableColumns;
                else
                    this.columns = this.configComponent.columns;
                this.cdr.markForCheck();
            }
        });

        this.subs = [];
        this.subs.push(sub1);
        this.subs.push(sub2);
    }

    setDataSource(_data: T[]) {
        this.clearSelected();
        this.dataSource = new MatTableDataSource<T>(_data);
        this.dataSource.paginator = this.paginator;
        this.setFilterPredicate();
    }

    setFilterToSearch(filter: string) {
        this.dataSource.filter = filter;
        this.clearSelected();
    }

    setMultipleDeletePromise(p: PromiseMultipleDeleteType) {
        this.multipleDeletePromise = p;
    }

    setMessageAlertMultipleDelete(message) {
        this.messageAlertMultipleDelete = message;
    }

    getSelected(): T[] {
        return this.selection.selected;
    }

    validator(item: T): boolean {
        if (this.validatorRef) {
            return this.validatorRef(item);
        }
        return true;
    }

    private setFilterPredicate() {
        if (this.configComponent.filterColumns.length > 0) {
            this.dataSource.filterPredicate = (data: T, filter: string): boolean => {
                let search = filter.trim().toLowerCase();
                let coincidences = 0;
                this.configComponent.filterColumns.forEach(c => {
                    let attribute = String(objectPath.get(data, c.trim()))?.toLowerCase() || '';
                    coincidences = coincidences + (attribute.indexOf(search) != -1 ? 1 : 0);
                });
                return coincidences > 0;
            }
        }
    }

    async deleteSelected() {
        if (this.multipleDeletePromise) {
            let selected = this.getSelected().map(s => s["IdCatalog"]);

            if (selected.length > 0) {
                let { isConfirmed } = (this.messageAlertMultipleDelete) ?
                    await this.toolsService.sweetAlert.confirmation2(`¿Está seguro de eliminar los <b>${selected.length} item(s)</b> seleccionados?`, this.messageAlertMultipleDelete) :
                    await this.toolsService.sweetAlert.confirmation(`¿Está seguro de eliminar los <b>${selected.length} item(s)</b> seleccionados?`);

                if (isConfirmed) {
                    this.toolsService.splash.show();
                    let { status, message, validate } = await this.multipleDeletePromise(selected);
                    this.toolsService.splash.hide();

                    if (status == Constants.STATUS.Success) {
                        this.list.emit();
                    }

                    this.toolsService.sweetAlert.show(status, message);
                }
            }
        } else {
            this.deleteSelectedFunction.emit();
        }
    }

    private clearSelected() {
        this.selection.clear();
    }

    isAllSelected() {
        let checksNotAllowed = (this.validatorRef) ? this.dataSource.filteredData.filter(d => !this.validatorRef(d))?.length || 0 : 0;

        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.filteredData.length - checksNotAllowed;
        return numSelected === numRows;
    }

    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.filteredData.forEach(row => {
                if (this.validatorRef) {
                    if (this.validatorRef(row)) this.selection.select(row);
                } else {
                    this.selection.select(row);
                }
            });
    }

    ngOnDestroy() {
        this.subs?.forEach(s => {
            s?.unsubscribe();
        });
    }
}