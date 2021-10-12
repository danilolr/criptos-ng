import { FormGroup } from '@angular/forms';

export interface inputRangeData {
    dataInicial: Date
    dataFinal: Date
}

export function rangeData(campoKey: string, params: inputRangeData) {
    return (group: FormGroup): { [key: string]: any } => {
        const campoData = group.controls[campoKey];
        const data = campoData.value as Date;

        if (!data) {
            return {
                dataInvalida: true
            }
        }

        if (data.getTime() > params.dataFinal.getTime() || data.getTime() < params.dataInicial.getTime()) {
            return {
                dataForaRange: true
            };
        }
    }
}