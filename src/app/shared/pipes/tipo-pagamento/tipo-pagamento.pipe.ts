import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoPagamento'
})
export class TipoPagamentoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case "CA":
        return "Cartão";
      case "BO":
        return "Boleto";
      case "PX":
        return "Pix";
    }
  }

}
