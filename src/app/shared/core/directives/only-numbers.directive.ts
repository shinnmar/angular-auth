import { Directive, ElementRef, HostListener, OnInit, OnDestroy, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({ selector: '[only-numbers]' })
export class OnlyNumbersDirective implements OnInit, OnDestroy {

    subscription: Subscription;

    @Input() convertToNumber = true;
    @Input() allowPoint = true;

    constructor(
        private el: ElementRef,
        private ngModel: NgModel
    ) { }

    ngOnInit() {
        this.subscription = this.ngModel.valueChanges.subscribe(value => {
            if (value) {
                value = String(value).replace(/[^0-9.]+/, '');

                if (!this.allowPoint)
                    value = value.replace(/\./g, '');

                this.ngModel.control.setValue(value, { emitEvent: false });

                if (this.convertToNumber) {
                    if (!this.ngModel.errors?.decimal) {
                        this.ngModel.control.setValue(Number(value), { emitEvent: false });
                    }
                }
            }
        });
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }

    @HostListener('keypress', ['$event']) onKeyPress(e: KeyboardEvent) {
        if (isNaN(parseInt(e.key))) return e.key == '.' && this.allowPoint;
        else return parseInt(e.key) >= 0 && parseInt(e.key) <= 9;
        //return this.onlyNumbers(e.key);
    }

    private onlyNumbers(key): boolean {
        //return /^\d{1,10}(\.\d{1,4})?$/.test(key);
        return /^\d+$/.test(key);
    }
}