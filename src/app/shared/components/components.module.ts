import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { IntranetContentWithTableComponent } from './content-with-table/content-with-table.component';

//Material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { WidgetsModule } from '../widgets/widgets.module';
import { IntranetDialogWithFormComponent } from './dialog-with-form/dialog-with-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { IntranetDialogEmptyComponent } from './dialog-empty/dialog-empty.component';
import { IntranetFormWithValidationComponent } from './form-with-validation/form-with-validation.component';
import { IntranetTableWithPaginatorComponent } from './table-with-paginator/table-with-paginator.component';
import { IntranetContentEmptyComponent } from './content-empty/content-empty.component';
import { IntranetPanelEmptyComponent } from './panel-empty/panel-empty.component';
import { IntranetTableWithDragAndDropComponent } from './table-with-drag-and-drop/table-with-drag-and-drop.component';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
    imports: [
        CommonModule,

        //MATERIAL
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatTableModule,
        MatDialogModule,
        MatCheckboxModule,
        FormsModule,

        NgbTooltipModule,
        DragDropModule,
        ScrollingModule,
        LayoutModule,

        // SITEL
        WidgetsModule
    ],
    declarations: [
        IntranetContentWithTableComponent,
        IntranetDialogWithFormComponent,
        IntranetDialogEmptyComponent,
        IntranetFormWithValidationComponent,
        IntranetTableWithPaginatorComponent,
        IntranetContentEmptyComponent,
        IntranetPanelEmptyComponent,
        IntranetTableWithDragAndDropComponent
    ],
    exports: [
        //COMPONENTS
        IntranetContentWithTableComponent,
        IntranetDialogWithFormComponent,
        IntranetDialogEmptyComponent,
        IntranetFormWithValidationComponent,
        IntranetTableWithPaginatorComponent,
        IntranetContentEmptyComponent,
        IntranetPanelEmptyComponent,
        IntranetTableWithDragAndDropComponent,

        //MODULES

        //SITEL
        WidgetsModule,

        //MATERIAL
        MatTableModule,
        FormsModule,

        NgbTooltipModule,
        DragDropModule
    ],
})
export class ComponentsModule { }
