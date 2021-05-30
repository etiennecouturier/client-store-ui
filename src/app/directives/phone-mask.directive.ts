import {Directive, HostListener} from '@angular/core';
import {NgControl} from '@angular/forms';
import {AsYouType, parsePhoneNumber} from 'libphonenumber-js';

@Directive({
  selector: '[phoneMask]',
})
export class PhoneMaskDirective {

  constructor(public ngControl: NgControl) {
  }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true);
  }

  onInputChange(event, backspace) {
    const asYouType: AsYouType = new AsYouType('HU');

    if (asYouType) {
      let newVal = event.replace(/\D/g, '');

      if (backspace && newVal.length <= 6) {
        newVal = newVal.substring(0, newVal.length - 1);
      }

      newVal = asYouType.input(newVal);
      this.ngControl.valueAccessor.writeValue(
        parsePhoneNumber(newVal, 'HU')
          .formatNational()
      );
    }
  }

}
