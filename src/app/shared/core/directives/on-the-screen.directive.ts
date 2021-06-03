import { Directive, ElementRef, OnInit, Input, HostListener, AfterViewInit, Output, EventEmitter, DoCheck } from '@angular/core';

@Directive({ selector: '[detect-on-the-screen]' })
export class OnTheScreenDirective implements OnInit {

    isInView = false;
    winX = 0;
    winY = 0;
    //percent = 50;

    @Input() percent = 50;
    @Input() emitEvent = true;
    //@Input() block = false;
    @Output() changeScreen = new EventEmitter<boolean>();

    constructor(
        private elRef: ElementRef
    ) {
    }

    ngOnInit() {
    }

    @HostListener('window:scroll', ['$event']) isScrolledIntoView(event: Event) {
        this.checkIsInView();
    }

    checkIsInView() {
        this.isInView = this.isElementXPercentInViewport();

        // if (this.block) {
        //     window.scrollTo(this.winX, this.winY);
        //     return;
        // }

        if (this.isInView && this.emitEvent) {
            this.winY = window.scrollY;
            this.winX = window.scrollX;
            this.changeScreen.emit(this.isInView);
        }
    }

    isElementXPercentInViewport() {
        let rect = (<HTMLElement>this.elRef.nativeElement).getBoundingClientRect();
        let windowHeight = (window.innerHeight || document.documentElement.clientHeight);

        return !(
            Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-(rect.height / 1)) * 100)) < this.percent ||
            Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < this.percent
        )
    };

    elementInViewport2() {
        let rect = (<HTMLElement>this.elRef.nativeElement).getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)

        );
    }

}