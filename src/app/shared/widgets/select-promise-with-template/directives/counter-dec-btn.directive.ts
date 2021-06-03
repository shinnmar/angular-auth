import { Directive, TemplateRef } from "@angular/core";
import { ICounterBtnTplContext } from "../select-promise-with-template.component";

@Directive({
    selector: "[appCounterDecBtn]"
})
export class CounterDecBtnDirective {
    constructor(readonly tpl: TemplateRef<ICounterBtnTplContext>) { }
}
