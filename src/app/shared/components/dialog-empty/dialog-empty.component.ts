import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfigComponent } from '../../models/components/config-component.model';

@Component({
    selector: 'dialog-empty',
    templateUrl: './dialog-empty.component.html'
})

export class IntranetDialogEmptyComponent implements OnInit {

    @Input() configComponent: ConfigComponent = new ConfigComponent();
    @Input() size = 'sm';

    @Output() closeDialog = new EventEmitter<any>();
    modalSize = '';
    constructor() { }

    ngOnInit() {
        switch (this.size) {
            case 'sm':
                this.modalSize = 'dialog-sm'; break;
            case 'md':
                this.modalSize = 'dialog-md'; break;
            case 'lg':
                this.modalSize = 'dialog-lg'; break;
            case 'xl':
                this.modalSize = 'dialog-xl'; break;
            case 'none':
                this.modalSize = ''; break;
        }
    }
}