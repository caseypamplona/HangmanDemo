import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'btnFormat'
})
export class BtnFormatPipe implements PipeTransform {

  transform(value: string): string {
    return `[${value}]`;
  }

}
