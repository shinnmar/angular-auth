import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';

import { BaseComponent } from '@shared_models/components/base-component.model';
import { IntranetContentWithTableComponent } from '@shared_components/content-with-table/content-with-table.component';
import { ConfigPropertiesComponent } from '@shared_core/decorators/default-values-component.decorator';
import { ToolService } from '@shared_core/services/core.service';

import { FeatureModel } from '../../../models/feature.model';
import { FeatureEditComponent } from '../edit/edit.component';

@ConfigPropertiesComponent({
    title: 'Usuarios',
    description: 'Permite un CRUD de usuarios',
    icon: 'users',
    columns: ['check', 'name', 'description', 'acciones'],
    smallTableColumns: ['name', 'acciones'],
    filterColumns: ['Name', 'Description']
})
@Component({
    selector: 'intranet-security-users',
    templateUrl: './index.component.html'
})

export class SecurityUsersComponent extends BaseComponent implements OnInit {

    @ViewChild(IntranetContentWithTableComponent, { static: true }) content: IntranetContentWithTableComponent<FeatureModel>;

    constructor(
        private toolsService: ToolService,
    ) {
        super();
    }

    ngOnInit() {

    }

    list() {

    }

    create() {
        let refDialog = this.toolsService.dialog.open(FeatureEditComponent, { data: null });
        refDialog.afterClosed().pipe(take(1)).subscribe(async response => {
            if (response) await this.list();
        });
    }

    edit(item: FeatureModel) {

    }

    remove(item: FeatureModel) {

    }
}