import { Directive, ElementRef, HostListener, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[appHmButton]'
})
export class HmButtonDirective {


  constructor(private el: ElementRef) { }

  @HostListener('click') onMouseEnter() {
    this.disable();
  }

  private disable() {
    this.el.nativeElement.style.disabled = true;
    this.el.nativeElement.disabled = true;
  }

}
