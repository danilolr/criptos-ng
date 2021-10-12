import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';

export interface Arquivo {
    id: string
    sha1: string
    tamanho: number
    nome: string
    ativo: boolean
}

export interface CotacaoHistorico {
    id: string
    exchange: Exchange
    criptoPar: CriptoPar
    ativo: boolean
    listaCotacaoHistoricoValor: CotacaoHistoricoValor[]
}

export interface Exchange {
    id: string
    nome: string
    ativo: boolean
    listaCotacaoHistorico: CotacaoHistorico[]
}

export interface CriptoPar {
    id: string
    criptoativoOrigem: Criptoativo
    criptoativoDestino: Criptoativo
    simbolo: string
    ativo: boolean
    listaCotacaoHistorico: CotacaoHistorico[]
}

export interface Criptoativo {
    id: string
    nome: string
    simbolo: string
    ativo: boolean
    listaCriptoParDestino: CriptoPar[]
    listaCriptoParOrigem: CriptoPar[]
}

export interface CotacaoHistoricoValor {
    id: string
    cotacaoHistorico: CotacaoHistorico
    dataHora: string
    open: number
    close: number
    high: number
    low: number
    volume: number
    quoteVolume: number
    closeTime: string
    numTrades: number
    ativo: boolean
}

export interface Menu {
    id: string
    descricao: string
    formulario: string
    menuPai: Menu
    ordem: number
    ativo: boolean
    listaMenu: Menu[]
    listaRoleMenu: RoleMenu[]
}

export interface RoleMenu {
    id: string
    role: Role
    menu: Menu
    tipoAcesso: string
    ativo: boolean
}

export interface Role {
    id: string
    descRole: string
    role: string
    ativo: boolean
    listaRoleMenu: RoleMenu[]
    listaRoleUsuario: RoleUsuario[]
}

export interface RoleUsuario {
    id: string
    role: Role
    usuario: Usuario
    ativo: boolean
}

export interface Usuario {
    id: string
    cpf: string
    nomeUsuario: string
    senha: string
    email: string
    ativo: boolean
    listaRoleUsuario: RoleUsuario[]
}

export interface RetornoInsercaoAtualizacao {
    id: number
    ok: boolean
    msg: string
}

export interface RetornoAutenticacao {
    ok: boolean
    token: string
    msg: string
}

export interface RetornoBacktest {
    ok: boolean
    msg: string
    cotacoes: CotacaoHistoricoValor[]
    operacoes: Operacao[]
}

export interface Operacao {
    dataHora: string
    tipo: string
    valor: number
}

interface Extra {
    params?: any
    returnObject?: boolean
    returnObjectOnError?: boolean
}

export class GraphqlBase {

    constructor(protected apollo: Apollo) { }

    protected watchMutation<T>(mutation: string, extra: Extra): Observable<T> {
        return new Observable(
            o => {
                this.apollo.mutate({
                    mutation: gql(mutation),
                    variables: extra.params
                }).subscribe(
                    res => {
                        const dados = res.data[Object.keys(res.data)[0]] as any;
                        if (Array.isArray(dados)) {
                            o.next(dados as any);
                        } else {
                            if (dados.ok) {
                                if (extra.returnObject) {
                                    o.next(dados);
                                } else {
                                    delete dados["msg"];
                                    delete dados["ok"];
                                    if (Object.keys(dados).length > 0) {
                                        o.next(dados[Object.keys(dados)[0]]);
                                    } else {
                                        o.next();
                                    }
                                }
                            } else {
                                if (extra.returnObjectOnError) {
                                    o.error(dados);
                                } else {
                                    o.error(dados.msg);
                                }
                            }
                        }
                        o.complete()
                    }, error => {
                        o.error(error);
                        o.complete();
                    }
                )
            }
        )
    }

    protected watchQuery<T>(query: string, extra: Extra = {}): Observable<T> {
        if (extra.returnObject === undefined) {
            extra.returnObject = true;
        }
        return new Observable(
            o => {
                this.apollo.watchQuery({
                    query: gql(query),
                    variables: extra.params
                }).valueChanges.subscribe(
                    res => {
                        const result = res.data[Object.keys(res.data)[0]];
                        if (Array.isArray(result) || !extra.returnObject){
                            o.next(result as any);
                        } else {
                            o.next(res.data as T);
                        }
                        o.complete()
                    }, error => {
                        o.error(error);
                        o.complete();
                    }
                )
            }
        );
    }

    public query<T>(query: string, params: any): Promise<T> {
        const obs = new Observable(
            o => {
                this.apollo.query({
                    query: gql(query),
                    variables: params
                }).subscribe(
                    res => {
                        const dados = res.data[Object.keys(res.data)[0]] as any;
                        o.next(dados as any);
                    }, error => {
                        o.error(error);
                        o.complete();
                    }
                )
            }
        )
        return new Promise<T>((resolve, reject) => {
            obs.subscribe((data: T) => {
                resolve(data)
            })
        })
    }

    public mutation<T>(query: string, params: any): Promise<T> {
        const obs = new Observable(
            o => {
                this.apollo.mutate({
                    mutation: gql(query),
                    variables: params
                }).subscribe(
                    res => {
                        const dados = res.data[Object.keys(res.data)[0]] as any;
                        o.next(dados as any);
                    }, error => {
                        o.error(error);
                        o.complete();
                    }
                )
            }
        )
        return new Promise<T>((resolve, reject) => {
            obs.subscribe((data: T) => {
                resolve(data)
            })
        })
    }
}