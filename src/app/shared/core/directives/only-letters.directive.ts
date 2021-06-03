import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[only-letters]' })
export class OnlyLettersDirective {

    constructor(private el: ElementRef) { }

    @HostListener('keypress', ['$event']) onKeyPress(e: KeyboardEvent) {
        return this.onlyLettersAndSpace(e.key);
    }

    private onlyLettersAndSpace(key): boolean {
        //return /^[a-zA-Z\s]*$/.test(key);
        return /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(key);
    }
}