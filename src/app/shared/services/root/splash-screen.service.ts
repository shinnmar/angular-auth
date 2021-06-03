import { ElementRef, Injectable } from '@angular/core';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class SplashScreenService {
  private el: ElementRef<HTMLElement>;
  private isShow: boolean = false;
  private animationPlayer: AnimationPlayer;

  constructor(private animationBuilder: AnimationBuilder) { }

  init(element: ElementRef) {
    this.el = element;
  }

  show(message?: string) {
    this.isShow = true;

    this.setMessage(message || 'Cargando');

    const player = this.animationBuilder
      .build([style({ opacity: '0' }), animate(100, style({ opacity: '0.9' }))])
      .create(this.el.nativeElement);

    if (typeof this.el.nativeElement.append === 'function') {
      //this.el.nativeElement.style.display = 'block !important';
      this.el.nativeElement.style.visibility = '';
    } else {
      this.el.nativeElement.style.display = 'block !important';
    }

    player.onDone(() => {
      this.isShow = false;
    });

    setTimeout(() => player.play(), 100);
  }

  hide() {
    const player = this.animationBuilder
      .build([style({ opacity: '1' }), animate(100, style({ opacity: '0' }))])
      .create(this.el.nativeElement);

    player.onDone(() => {
      if (this.isShow) {
        return;
      }

      if (typeof this.el.nativeElement.remove === 'function') {
        //this.el.nativeElement.remove();
        this.el.nativeElement.style.visibility = 'hidden';
      } else {
        this.el.nativeElement.style.display = 'none !important';
      }
    });

    setTimeout(() => player.play(), 100);
  }

  private setMessage(message: string) {
    this.el.nativeElement.lastChild.textContent = `${message} ...`;
  }
}
