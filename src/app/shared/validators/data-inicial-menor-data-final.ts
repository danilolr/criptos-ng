import { FormGroup } from '@angular/forms';

export function dataInicialMenorDataFinal(dataInicialKey: string, dataFinalKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
        const campoDataInicial = group.controls[dataInicialKey];
        const campoDdataFinal = group.controls[dataFinalKey];

        const dataIncial = campoDataInicial.value as Date;
        const dataFinal = campoDdataFinal.value as Date;

        if (!dataIncial || !dataFinal) {
            return {
                dataInvalida: true
            }
        }
        
        if ( dataIncial.getTime() > dataFinal.getTime() ) {
          return {
            dataInicialMaiorQueFinal: true
          };
        }
      }
}