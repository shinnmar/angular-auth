import { AfterContentInit, Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'panel-empty',
    templateUrl: './panel-empty.component.html',
    styleUrls: ['./panel-empty.component.scss']
})

export class IntranetPanelEmptyComponent  {
    loading = false;

    @Input() title: string = 'Titulo';

}