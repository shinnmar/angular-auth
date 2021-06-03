import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[drag-vertical]' })
export class DragVerticalDirective {

    position = { top: 0, left: 0, x: 0, y: 0 };
    mouseUp = false;

    constructor(
        private elementRef: ElementRef
    ) { }

    @HostListener('mousedown', ['$event']) mouseDownListener(event: MouseEvent) {
        let element = <HTMLElement>this.elementRef.nativeElement;
        element.style.cursor = 'grabbing';
        element.style.userSelect = 'none';

        this.position = {
            left: element.scrollLeft,
            top: element.scrollTop,
            // Get the current mouse position
            x: event.clientX,
            y: event.clientY,
        };

        this.mouseUp = true;
    }

    @HostListener('document:mousemove', ['$event']) mouseMoveListener(event: MouseEvent) {
        if (this.mouseUp) {
            let element = <HTMLElement>this.elementRef.nativeElement;

            // How far the mouse has been moved
            const dx = event.clientX - this.position.x;
            const dy = event.clientY - this.position.y;

            // Scroll the element
            element.scrollTop = this.position.top - dy;
            element.scrollLeft = this.position.left - dx;
        }
    }

    @HostListener('document:mouseup', ['$event']) mouseUpListener(event: MouseEvent) {
        if (this.mouseUp) {
            let element = <HTMLElement>this.elementRef.nativeElement;

            element.style.cursor = 'grab';
            element.style.removeProperty('user-select');
        }

        this.mouseUp = false;
    }
}