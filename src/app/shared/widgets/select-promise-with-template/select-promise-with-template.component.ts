import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { CounterDecBtnDirective } from './directives/counter-dec-btn.directive';
import { CounterIncBtnDirective } from './directives/counter-inc-btn.directive';
import { CounterValueDirective } from './directives/counter-value.directive';

export interface ICounterValueTplContext {
    $implicit: number;
}

export interface ICounterBtnTplContext {
    $implicit: () => void;
}

@Component({
    selector: 'widget-select-promise',
    templateUrl: './select-promise-with-template.component.html'
})

export class WidgetSelectPromiseTemplate implements OnInit {
    @ContentChild(CounterValueDirective, { static: true }) counterValueDir: CounterValueDirective;
    @ContentChild(CounterIncBtnDirective, { static: true }) counterIncBtnDir: CounterIncBtnDirective;
    @ContentChild(CounterDecBtnDirective, { static: true }) counterDecBtnDir: CounterDecBtnDirective;

    @Input() title = "Counter";
    @Input() value = 0;
    @Output() changed = new EventEmitter<number>();

    get counterValueTpl(): TemplateRef<ICounterValueTplContext> {
        return this.counterValueDir?.tpl;
    }

    get counterIncBtnTpl(): TemplateRef<ICounterBtnTplContext> {
        return this.counterIncBtnDir?.tpl;
    }

    get counterDecBtnTpl(): TemplateRef<ICounterBtnTplContext> {
        return this.counterDecBtnDir?.tpl;
    }

    get counterValueTplContext(): ICounterValueTplContext {
        return { $implicit: this.value };
    }

    get counterIncBtnTplContext(): ICounterBtnTplContext {
        return { $implicit: () => this.increment() };
    }

    get counterDecBtnTplContext(): ICounterBtnTplContext {
        return { $implicit: () => this.decrement() };
    }

    increment() {
        this.updateValue("inc");
    }

    decrement() {
        this.updateValue("dec");
    }

    private updateValue(action: "inc" | "dec") {
        const delta = action === "inc" ? 1 : -1;
        this.value += delta;
        this.changed.emit(this.value);
    }

    constructor() { }

    ngOnInit() { }
}