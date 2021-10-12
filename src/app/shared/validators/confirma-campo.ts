import { FormGroup } from '@angular/forms';

export function confirmaCampo(campoKey: string, confirmaCampoKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
        const campo = group.controls[campoKey].value as string;
        const confirmaCampo = group.controls[confirmaCampoKey].value as string;

        if (campo !== confirmaCampo) {
            return {
                [confirmaCampoKey]: {
                    mismatch: true
                }
            };
        }
    }
}