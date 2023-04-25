import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataPropertyGetter'
})
export class DataPropertyGetterPipe implements PipeTransform {
  transform(obj: any, key: string): any {
    if (!obj || !key) {
      return null;
    }
    return obj[key];
  }
}
