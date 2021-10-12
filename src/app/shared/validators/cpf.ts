import { FormGroup, FormControl } from '@angular/forms';
import { cpf } from 'cpf-cnpj-validator'; 

export function cpfValido(control: FormControl) {
    if (!cpf.isValid(control.value)){
        return {
            cpfInvalido: true
        }
    }
}