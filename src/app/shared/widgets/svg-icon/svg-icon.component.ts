import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'widget-svg-icon',
    templateUrl: './svg-icon.component.html'
})

export class WidgetSvgIconComponent implements OnInit {

    @Input() icon: 'check' | 'money' | 'repeat' | 'shield' | 'home' | 'adress-book' |
        '4-blocks' | 'phone' | 'box' | 'settings' | 'building' | 'image' | 'layout-panel' |
        'shield-user' | 'user' | 'chart' | 'info' | 'thunder-move' | 'bookmark' | 'layers' |
        'difference' | 'tablet' | 'wallet' | 'tag' | 'angle-down' | 'lock-overturning' | 'arrows' | 'new-tab' = 'check';

    constructor() {

    }

    ngOnInit() { }
}