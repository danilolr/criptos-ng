import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { RetornoAutenticacao, Menu } from '../graphql/graphql-base';
import { GraphqlServiceCustom } from '../graphql/graphql-custom.service';
const jwt_decode = require('jwt-decode');

export interface Usuario {
    id: string
    nome: string
    email: string
    menus: Menu[]
    roles: string[]
}

@Injectable({
    providedIn: 'root'
})
export class AutenticacaoService {

    private _$usuario = new BehaviorSubject<Usuario>(null);

    constructor(private router: Router,
        private graphqlService: GraphqlServiceCustom) {
    }

    get $usuario(): Observable<Usuario> {
        return this._$usuario;
    }

    get usuario(): Usuario | null {
        return this._$usuario.value;
    }

    public login(email: string, senha: string): Observable<RetornoAutenticacao> {
        return new Observable<RetornoAutenticacao>(
            o => {
                this.graphqlService.autenticacao(`
                ok
                token
                msg
                `, { emailCpf: email, senha: senha }).subscribe(
                    (u: RetornoAutenticacao) => {
                        const usuario = jwt_decode(u.token);
                        this._$usuario.next(usuario);
                        o.next(usuario);
                        o.complete();
                    }, error => {
                        o.error(error);
                        o.complete();
                    }
                )
            }
        );
    }

    public logout() {
        this._$usuario.next(null);
        this.router.navigate(['/']);
    }

    public listMenu(): any[] {
        const menu = [];
        menu.push({
            texto: 'Relatório',
            link: '/relatorio/relatorio-estatistica',
        });
        menu.push({
            texto: 'Sair',
            link: '/login',
        });
        return menu;
    }

}

