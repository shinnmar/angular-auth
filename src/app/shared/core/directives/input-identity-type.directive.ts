import { Directive, ElementRef, HostListener, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Constants } from '../../models/constants.model';

@Directive({ selector: '[input-identity-type]' })
export class InputIdentityTypeDirective implements OnInit, OnDestroy, OnChanges {

    subscription: Subscription;

    regexOnlyNumbers = /^\d+$/;
    regexOnlyNumbersAndLetters = /^[a-z0-9]+$/i;

    @Input() identityType = 0;

    constructor(
        private el: ElementRef,
        private ngModel: NgModel
    ) { }

    ngOnInit() {
        this.identityType = this.identityType || 0;
        this.subscription = this.ngModel.valueChanges.subscribe(value => {
            if (value) {
                this.ngModel.control.setValue(this.getValueRegex(value), { emitEvent: false });
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        this.identityType = changes["identityType"].currentValue;
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }

    @HostListener('keypress', ['$event']) onKeyPress(e: KeyboardEvent) {
        if (this.identityType == Constants.IDENTITY_TYPE.Dni)
            return this.regexOnlyNumbers.test(e.key);
        if (this.identityType == Constants.IDENTITY_TYPE.ImmigrationCard)
            return this.regexOnlyNumbersAndLetters.test(e.key);

        return false;
    }

    private getValueRegex(value: string): string {
        if (this.identityType == Constants.IDENTITY_TYPE.Dni)
            return String(value).replace(/[^0-9]+/, '');
        if (this.identityType == Constants.IDENTITY_TYPE.ImmigrationCard)
            return String(value).replace(/[^a-z\d]+/i, '');
        return value;
    }
}