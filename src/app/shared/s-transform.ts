import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'superscript'
})
export class SuperscriptPipe implements PipeTransform {

  transform(value: string): string {
    const parts = value?.split('^');
    if (parts?.length === 2) {
      return `${parts[0]}<sup>${parts[1]}</sup>`;
    }
    return value;
  }

}
