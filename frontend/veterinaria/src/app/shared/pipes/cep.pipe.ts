import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep'
})
export class CepPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return null;
    } else {
      const cep = value.toString().replace(/^([\d]{2})\.?([\d]{3})\-?([\d]{3})/, "\$1\$2-\$3");
      return cep;
    }
  }
}
