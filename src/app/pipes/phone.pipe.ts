import {Pipe, PipeTransform} from '@angular/core';
import {parsePhoneNumber} from 'libphonenumber-js';

@Pipe({
  name: 'phone',
  pure: true
})
export class PhonePipe implements PipeTransform {

  transform(phoneValue: string): string {
    if (phoneValue == null || phoneValue === '') {
      return '';
    }
    return parsePhoneNumber(phoneValue, 'HU')
      .formatNational();
  }

}
