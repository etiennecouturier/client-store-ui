import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'propertyReader',
  pure: true
})
export class PropertyReaderPipe implements PipeTransform {

  transform(value: any, ...args): any {
    return this.getProperty(args[0], value)
  }

  getProperty(obj, path) {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  }

}
