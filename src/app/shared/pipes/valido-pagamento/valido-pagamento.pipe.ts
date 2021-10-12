import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validoPagamento'
})
export class ValidoPagamentoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case true:
        return "Sim";
      case false:
        return "Não";
      default:
        return "-";
    }
  }

}
