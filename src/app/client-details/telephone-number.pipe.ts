import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'propertyReader',
  pure: true
})
export class TelephoneNumberPipe implements PipeTransform {

  transform(value: any, ...args): any {
    return "";
  }

}
