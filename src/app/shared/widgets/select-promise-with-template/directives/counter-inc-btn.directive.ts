import { Directive, TemplateRef } from "@angular/core";
import { ICounterBtnTplContext } from "../select-promise-with-template.component";

@Directive({
    selector: "[appCounterIncBtn]"
})
export class CounterIncBtnDirective {
    constructor(readonly tpl: TemplateRef<ICounterBtnTplContext>) { }
}
