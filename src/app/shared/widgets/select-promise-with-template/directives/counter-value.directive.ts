import { Directive, TemplateRef } from "@angular/core";
import { ICounterValueTplContext } from "../select-promise-with-template.component";

@Directive({
    selector: "[appCounterValue]"
})
export class CounterValueDirective {
    constructor(readonly tpl: TemplateRef<ICounterValueTplContext>) { }
}
