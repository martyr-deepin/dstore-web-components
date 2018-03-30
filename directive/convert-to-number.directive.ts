import { Directive, Input, HostListener, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[appConvertToNumber]',
  providers: [NgModel]
})
export class ConvertToNumberDirective {
  constructor(private el: ElementRef, private model: NgModel) {}
  @HostListener('change')
  change() {
    const v = +this.el.nativeElement.value;
    this.model.viewToModelUpdate(v);
  }
}
