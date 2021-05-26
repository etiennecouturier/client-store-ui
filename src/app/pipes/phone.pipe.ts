import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'phone',
  pure: true
})
export class PhonePipe implements PipeTransform {

  private static format(value: string) {
    return value.slice(0, 2) + '/' + value.slice(2, 5) + '-' + value.slice(5, 7) + '-' + value.slice(7, 9);
  }

  transform(value: string): any {
    return value.length >=  9 ? PhonePipe.format(value) : '';
  }
}
