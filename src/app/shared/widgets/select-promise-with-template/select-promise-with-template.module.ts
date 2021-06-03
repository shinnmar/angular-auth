import { NgModule } from '@angular/core';
import { CounterDecBtnDirective } from './directives/counter-dec-btn.directive';
import { CounterIncBtnDirective } from './directives/counter-inc-btn.directive';
import { CounterValueDirective } from './directives/counter-value.directive';
import { WidgetSelectPromiseTemplate } from './select-promise-with-template.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        WidgetSelectPromiseTemplate,
        CounterValueDirective,
        CounterIncBtnDirective,
        CounterDecBtnDirective
    ],
    exports: [WidgetSelectPromiseTemplate,
        CounterValueDirective,
        CounterIncBtnDirective,
        CounterDecBtnDirective],
    providers: [],
})
export class SelectPromiseWithTemplateModule { }
