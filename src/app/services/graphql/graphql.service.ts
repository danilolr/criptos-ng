import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { GraphqlBase } from './graphql-base';
import { Observable } from 'rxjs';
import * as base from '../graphql/graphql-base';

export interface ParamQueryArquivo {
  id?: number
}

export interface ParamQueryCotacaoHistorico {
  id?: number
  idExchange?: number
  idCriptoPar?: number
}

export interface ParamQueryCotacaoHistoricoValor {
  id?: number
  idCotacaoHistorico?: number
}

export interface ParamQueryCriptoPar {
  id?: number
  idCriptoativoOrigem?: number
  idCriptoativoDestino?: number
}

export interface ParamQueryCriptoativo {
  id?: number
}

export interface ParamQueryExchange {
  id?: number
}

export interface ParamQueryMenu {
  id?: number
  idMenuPai?: number
}

export interface ParamQueryRole {
  id?: number
}

export interface ParamQueryRoleMenu {
  id?: number
  idRole?: number
  idMenu?: number
}

export interface ParamQueryRoleUsuario {
  id?: number
  idRole?: number
  idUsuario?: number
}

export interface ParamQueryUsuario {
  id?: number
}

export interface ParamMutationInsereArquivo {
  sha1?: string
  tamanho?: number
  nome?: string
  ativo?: boolean
}

export interface ParamMutationAtualizaArquivo {
  id: number
  sha1?: string
  tamanho?: number
  nome?: string
  ativo?: boolean
}

export interface ParamMutationInsereCotacaoHistorico {
  idExchange?: number
  idCriptoPar?: number
  ativo?: boolean
}

export interface ParamMutationAtualizaCotacaoHistorico {
  id: number
  idExchange?: number
  idCriptoPar?: number
  ativo?: boolean
}

export interface ParamMutationInsereCotacaoHistoricoValor {
  idCotacaoHistorico?: number
  dataHora?: string
  open?: number
  close?: number
  high?: number
  low?: number
  volume?: number
  quoteVolume?: number
  closeTime?: string
  numTrades?: number
  ativo?: boolean
}

export interface ParamMutationAtualizaCotacaoHistoricoValor {
  id: number
  idCotacaoHistorico?: number
  dataHora?: string
  open?: number
  close?: number
  high?: number
  low?: number
  volume?: number
  quoteVolume?: number
  closeTime?: string
  numTrades?: number
  ativo?: boolean
}

export interface ParamMutationInsereCriptoPar {
  idCriptoativoOrigem?: number
  idCriptoativoDestino?: number
  simbolo?: string
  ativo?: boolean
}

export interface ParamMutationAtualizaCriptoPar {
  id: number
  idCriptoativoOrigem?: number
  idCriptoativoDestino?: number
  simbolo?: string
  ativo?: boolean
}

export interface ParamMutationInsereCriptoativo {
  nome?: string
  simbolo?: string
  ativo?: boolean
}

export interface ParamMutationAtualizaCriptoativo {
  id: number
  nome?: string
  simbolo?: string
  ativo?: boolean
}

export interface ParamMutationInsereExchange {
  nome?: string
  ativo?: boolean
}

export interface ParamMutationAtualizaExchange {
  id: number
  nome?: string
  ativo?: boolean
}

export interface ParamMutationInsereMenu {
  descricao?: string
  formulario?: string
  idMenuPai?: number
  ordem?: number
  ativo?: boolean
}

export interface ParamMutationAtualizaMenu {
  id: number
  descricao?: string
  formulario?: string
  idMenuPai?: number
  ordem?: number
  ativo?: boolean
}

export interface ParamMutationInsereRole {
  descRole?: string
  role?: string
  ativo?: boolean
}

export interface ParamMutationAtualizaRole {
  id: number
  descRole?: string
  role?: string
  ativo?: boolean
}

export interface ParamMutationInsereRoleMenu {
  idRole?: number
  idMenu?: number
  tipoAcesso?: string
  ativo?: boolean
}

export interface ParamMutationAtualizaRoleMenu {
  id: number
  idRole?: number
  idMenu?: number
  tipoAcesso?: string
  ativo?: boolean
}

export interface ParamMutationInsereRoleUsuario {
  idRole?: number
  idUsuario?: number
  ativo?: boolean
}

export interface ParamMutationAtualizaRoleUsuario {
  id: number
  idRole?: number
  idUsuario?: number
  ativo?: boolean
}

export interface ParamMutationInsereUsuario {
  cpf?: string
  nomeUsuario?: string
  senha?: string
  email?: string
  ativo?: boolean
}

export interface ParamMutationAtualizaUsuario {
  id: number
  cpf?: string
  nomeUsuario?: string
  senha?: string
  email?: string
  ativo?: boolean
}

export interface ParamMutationAutenticacao {
  emailCpf: string
  senha: string
}

export interface ParamMutationImportacao {
  idCotacaoHistorico: number
  dataHoraInicio?: string
  dataHoraFim?: string
}

export interface ParamMutationExecutaBacktest {
  idCotacaoHistorico: number
  algoritmos: string[]
}

@Injectable({
  providedIn: 'root'
})
export class GraphqlService extends GraphqlBase {

  constructor(protected apollo: Apollo) {
    super(apollo);
  }

  public arquivo(query: string, params?: ParamQueryArquivo): Observable<base.Arquivo[]> {
    return this.watchQuery(`query arquivo($id:Int) {
        arquivo(id:$id) {
          ${query}
        }
      }`, { params });
  }

  public cotacaoHistorico(query: string, params?: ParamQueryCotacaoHistorico): Observable<base.CotacaoHistorico[]> {
    return this.watchQuery(`query cotacaoHistorico($id:Int, $idExchange:Int, $idCriptoPar:Int) {
        cotacaoHistorico(id:$id, idExchange:$idExchange, idCriptoPar:$idCriptoPar) {
          ${query}
        }
      }`, { params });
  }

  public cotacaoHistoricoValor(query: string, params?: ParamQueryCotacaoHistoricoValor): Observable<base.CotacaoHistoricoValor[]> {
    return this.watchQuery(`query cotacaoHistoricoValor($id:Int, $idCotacaoHistorico:Int) {
        cotacaoHistoricoValor(id:$id, idCotacaoHistorico:$idCotacaoHistorico) {
          ${query}
        }
      }`, { params });
  }

  public criptoPar(query: string, params?: ParamQueryCriptoPar): Observable<base.CriptoPar[]> {
    return this.watchQuery(`query criptoPar($id:Int, $idCriptoativoOrigem:Int, $idCriptoativoDestino:Int) {
        criptoPar(id:$id, idCriptoativoOrigem:$idCriptoativoOrigem, idCriptoativoDestino:$idCriptoativoDestino) {
          ${query}
        }
      }`, { params });
  }

  public criptoativo(query: string, params?: ParamQueryCriptoativo): Observable<base.Criptoativo[]> {
    return this.watchQuery(`query criptoativo($id:Int) {
        criptoativo(id:$id) {
          ${query}
        }
      }`, { params });
  }

  public exchange(query: string, params?: ParamQueryExchange): Observable<base.Exchange[]> {
    return this.watchQuery(`query exchange($id:Int) {
        exchange(id:$id) {
          ${query}
        }
      }`, { params });
  }

  public menu(query: string, params?: ParamQueryMenu): Observable<base.Menu[]> {
    return this.watchQuery(`query menu($id:Int, $idMenuPai:Int) {
        menu(id:$id, idMenuPai:$idMenuPai) {
          ${query}
        }
      }`, { params });
  }

  public role(query: string, params?: ParamQueryRole): Observable<base.Role[]> {
    return this.watchQuery(`query role($id:Int) {
        role(id:$id) {
          ${query}
        }
      }`, { params });
  }

  public roleMenu(query: string, params?: ParamQueryRoleMenu): Observable<base.RoleMenu[]> {
    return this.watchQuery(`query roleMenu($id:Int, $idRole:Int, $idMenu:Int) {
        roleMenu(id:$id, idRole:$idRole, idMenu:$idMenu) {
          ${query}
        }
      }`, { params });
  }

  public roleUsuario(query: string, params?: ParamQueryRoleUsuario): Observable<base.RoleUsuario[]> {
    return this.watchQuery(`query roleUsuario($id:Int, $idRole:Int, $idUsuario:Int) {
        roleUsuario(id:$id, idRole:$idRole, idUsuario:$idUsuario) {
          ${query}
        }
      }`, { params });
  }

  public usuario(query: string, params?: ParamQueryUsuario): Observable<base.Usuario[]> {
    return this.watchQuery(`query usuario($id:Int) {
        usuario(id:$id) {
          ${query}
        }
      }`, { params });
  }

  public versao(): Observable<string> {
    return this.watchQuery(`query versao {
        versao 
      }`, { returnObject: false });
  }

  public insereArquivo(params: ParamMutationInsereArquivo): Observable<number> {
    return this.watchMutation(` mutation insereArquivo($sha1:String, $tamanho:Int, $nome:String, $ativo:Boolean){
      insereArquivo(sha1:$sha1, tamanho:$tamanho, nome:$nome, ativo:$ativo) {
        ok
        msg
        id
      }
    }`, { params });
   }

  public atualizaArquivo(params: ParamMutationAtualizaArquivo): Observable<void> {
    return this.watchMutation(` mutation atualizaArquivo($id:Int!, $sha1:String, $tamanho:Int, $nome:String, $ativo:Boolean){
      atualizaArquivo(id:$id, sha1:$sha1, tamanho:$tamanho, nome:$nome, ativo:$ativo) {
        ok
        msg
      }
    }`, { params });
   }

  public excluiArquivo(id: string): Observable<void> {
    return this.watchMutation(` mutation excluiArquivo($id:Int!){
      excluiArquivo(id:$id) {
        ok
        msg
      }
    }`, { params: {id: Number(id)}});
   }

  public insereCotacaoHistorico(params: ParamMutationInsereCotacaoHistorico): Observable<number> {
    return this.watchMutation(` mutation insereCotacaoHistorico($idExchange:Int, $idCriptoPar:Int, $ativo:Boolean){
      insereCotacaoHistorico(idExchange:$idExchange, idCriptoPar:$idCriptoPar, ativo:$ativo) {
        ok
        msg
        id
      }
    }`, { params });
   }

  public atualizaCotacaoHistorico(params: ParamMutationAtualizaCotacaoHistorico): Observable<void> {
    return this.watchMutation(` mutation atualizaCotacaoHistorico($id:Int!, $idExchange:Int, $idCriptoPar:Int, $ativo:Boolean){
      atualizaCotacaoHistorico(id:$id, idExchange:$idExchange, idCriptoPar:$idCriptoPar, ativo:$ativo) {
        ok
        msg
      }
    }`, { params });
   }

  public excluiCotacaoHistorico(id: string): Observable<void> {
    return this.watchMutation(` mutation excluiCotacaoHistorico($id:Int!){
      excluiCotacaoHistorico(id:$id) {
        ok
        msg
      }
    }`, { params: {id: Number(id)}});
   }

  public insereCotacaoHistoricoValor(params: ParamMutationInsereCotacaoHistoricoValor): Observable<number> {
    return this.watchMutation(` mutation insereCotacaoHistoricoValor($idCotacaoHistorico:Int, $dataHora:String, $open:Float, $close:Float, $high:Float, $low:Float, $volume:Float, $quoteVolume:Float, $closeTime:String, $numTrades:Int, $ativo:Boolean){
      insereCotacaoHistoricoValor(idCotacaoHistorico:$idCotacaoHistorico, dataHora:$dataHora, open:$open, close:$close, high:$high, low:$low, volume:$volume, quoteVolume:$quoteVolume, closeTime:$closeTime, numTrades:$numTrades, ativo:$ativo) {
        ok
        msg
        id
      }
    }`, { params });
   }

  public atualizaCotacaoHistoricoValor(params: ParamMutationAtualizaCotacaoHistoricoValor): Observable<void> {
    return this.watchMutation(` mutation atualizaCotacaoHistoricoValor($id:Int!, $idCotacaoHistorico:Int, $dataHora:String, $open:Float, $close:Float, $high:Float, $low:Float, $volume:Float, $quoteVolume:Float, $closeTime:String, $numTrades:Int, $ativo:Boolean){
      atualizaCotacaoHistoricoValor(id:$id, idCotacaoHistorico:$idCotacaoHistorico, dataHora:$dataHora, open:$open, close:$close, high:$high, low:$low, volume:$volume, quoteVolume:$quoteVolume, closeTime:$closeTime, numTrades:$numTrades, ativo:$ativo) {
        ok
        msg
      }
    }`, { params });
   }

  public excluiCotacaoHistoricoValor(id: string): Observable<void> {
    return this.watchMutation(` mutation excluiCotacaoHistoricoValor($id:Int!){
      excluiCotacaoHistoricoValor(id:$id) {
        ok
        msg
      }
    }`, { params: {id: Number(id)}});
   }

  public insereCriptoPar(params: ParamMutationInsereCriptoPar): Observable<number> {
    return this.watchMutation(` mutation insereCriptoPar($idCriptoativoOrigem:Int, $idCriptoativoDestino:Int, $simbolo:String, $ativo:Boolean){
      insereCriptoPar(idCriptoativoOrigem:$idCriptoativoOrigem, idCriptoativoDestino:$idCriptoativoDestino, simbolo:$simbolo, ativo:$ativo) {
        ok
        msg
        id
      }
    }`, { params });
   }

  public atualizaCriptoPar(params: ParamMutationAtualizaCriptoPar): Observable<void> {
    return this.watchMutation(` mutation atualizaCriptoPar($id:Int!, $idCriptoativoOrigem:Int, $idCriptoativoDestino:Int, $simbolo:String, $ativo:Boolean){
      atualizaCriptoPar(id:$id, idCriptoativoOrigem:$idCriptoativoOrigem, idCriptoativoDestino:$idCriptoativoDestino, simbolo:$simbolo, ativo:$ativo) {
        ok
        msg
      }
    }`, { params });
   }

  public excluiCriptoPar(id: string): Observable<void> {
    return this.watchMutation(` mutation excluiCriptoPar($id:Int!){
      excluiCriptoPar(id:$id) {
        ok
        msg
      }
    }`, { params: {id: Number(id)}});
   }

  public insereCriptoativo(params: ParamMutationInsereCriptoativo): Observable<number> {
    return this.watchMutation(` mutation insereCriptoativo($nome:String, $simbolo:String, $ativo:Boolean){
      insereCriptoativo(nome:$nome, simbolo:$simbolo, ativo:$ativo) {
        ok
        msg
        id
      }
    }`, { params });
   }

  public atualizaCriptoativo(params: ParamMutationAtualizaCriptoativo): Observable<void> {
    return this.watchMutation(` mutation atualizaCriptoativo($id:Int!, $nome:String, $simbolo:String, $ativo:Boolean){
      atualizaCriptoativo(id:$id, nome:$nome, simbolo:$simbolo, ativo:$ativo) {
        ok
        msg
      }
    }`, { params });
   }

  public excluiCriptoativo(id: string): Observable<void> {
    return this.watchMutation(` mutation excluiCriptoativo($id:Int!){
      excluiCriptoativo(id:$id) {
        ok
        msg
      }
    }`, { params: {id: Number(id)}});
   }

  public insereExchange(params: ParamMutationInsereExchange): Observable<number> {
    return this.watchMutation(` mutation insereExchange($nome:String, $ativo:Boolean){
      insereExchange(nome:$nome, ativo:$ativo) {
        ok
        msg
        id
      }
    }`, { params });
   }

  public atualizaExchange(params: ParamMutationAtualizaExchange): Observable<void> {
    return this.watchMutation(` mutation atualizaExchange($id:Int!, $nome:String, $ativo:Boolean){
      atualizaExchange(id:$id, nome:$nome, ativo:$ativo) {
        ok
        msg
      }
    }`, { params });
   }

  public excluiExchange(id: string): Observable<void> {
    return this.watchMutation(` mutation excluiExchange($id:Int!){
      excluiExchange(id:$id) {
        ok
        msg
      }
    }`, { params: {id: Number(id)}});
   }

  public insereMenu(params: ParamMutationInsereMenu): Observable<number> {
    return this.watchMutation(` mutation insereMenu($descricao:String, $formulario:String, $idMenuPai:Int, $ordem:Int, $ativo:Boolean){
      insereMenu(descricao:$descricao, formulario:$formulario, idMenuPai:$idMenuPai, ordem:$ordem, ativo:$ativo) {
        ok
        msg
        id
      }
    }`, { params });
   }

  public atualizaMenu(params: ParamMutationAtualizaMenu): Observable<void> {
    return this.watchMutation(` mutation atualizaMenu($id:Int!, $descricao:String, $formulario:String, $idMenuPai:Int, $ordem:Int, $ativo:Boolean){
      atualizaMenu(id:$id, descricao:$descricao, formulario:$formulario, idMenuPai:$idMenuPai, ordem:$ordem, ativo:$ativo) {
        ok
        msg
      }
    }`, { params });
   }

  public excluiMenu(id: string): Observable<void> {
    return this.watchMutation(` mutation excluiMenu($id:Int!){
      excluiMenu(id:$id) {
        ok
        msg
      }
    }`, { params: {id: Number(id)}});
   }

  public insereRole(params: ParamMutationInsereRole): Observable<number> {
    return this.watchMutation(` mutation insereRole($descRole:String, $role:String, $ativo:Boolean){
      insereRole(descRole:$descRole, role:$role, ativo:$ativo) {
        ok
        msg
        id
      }
    }`, { params });
   }

  public atualizaRole(params: ParamMutationAtualizaRole): Observable<void> {
    return this.watchMutation(` mutation atualizaRole($id:Int!, $descRole:String, $role:String, $ativo:Boolean){
      atualizaRole(id:$id, descRole:$descRole, role:$role, ativo:$ativo) {
        ok
        msg
      }
    }`, { params });
   }

  public excluiRole(id: string): Observable<void> {
    return this.watchMutation(` mutation excluiRole($id:Int!){
      excluiRole(id:$id) {
        ok
        msg
      }
    }`, { params: {id: Number(id)}});
   }

  public insereRoleMenu(params: ParamMutationInsereRoleMenu): Observable<number> {
    return this.watchMutation(` mutation insereRoleMenu($idRole:Int, $idMenu:Int, $tipoAcesso:String, $ativo:Boolean){
      insereRoleMenu(idRole:$idRole, idMenu:$idMenu, tipoAcesso:$tipoAcesso, ativo:$ativo) {
        ok
        msg
        id
      }
    }`, { params });
   }

  public atualizaRoleMenu(params: ParamMutationAtualizaRoleMenu): Observable<void> {
    return this.watchMutation(` mutation atualizaRoleMenu($id:Int!, $idRole:Int, $idMenu:Int, $tipoAcesso:String, $ativo:Boolean){
      atualizaRoleMenu(id:$id, idRole:$idRole, idMenu:$idMenu, tipoAcesso:$tipoAcesso, ativo:$ativo) {
        ok
        msg
      }
    }`, { params });
   }

  public excluiRoleMenu(id: string): Observable<void> {
    return this.watchMutation(` mutation excluiRoleMenu($id:Int!){
      excluiRoleMenu(id:$id) {
        ok
        msg
      }
    }`, { params: {id: Number(id)}});
   }

  public insereRoleUsuario(params: ParamMutationInsereRoleUsuario): Observable<number> {
    return this.watchMutation(` mutation insereRoleUsuario($idRole:Int, $idUsuario:Int, $ativo:Boolean){
      insereRoleUsuario(idRole:$idRole, idUsuario:$idUsuario, ativo:$ativo) {
        ok
        msg
        id
      }
    }`, { params });
   }

  public atualizaRoleUsuario(params: ParamMutationAtualizaRoleUsuario): Observable<void> {
    return this.watchMutation(` mutation atualizaRoleUsuario($id:Int!, $idRole:Int, $idUsuario:Int, $ativo:Boolean){
      atualizaRoleUsuario(id:$id, idRole:$idRole, idUsuario:$idUsuario, ativo:$ativo) {
        ok
        msg
      }
    }`, { params });
   }

  public excluiRoleUsuario(id: string): Observable<void> {
    return this.watchMutation(` mutation excluiRoleUsuario($id:Int!){
      excluiRoleUsuario(id:$id) {
        ok
        msg
      }
    }`, { params: {id: Number(id)}});
   }

  public insereUsuario(params: ParamMutationInsereUsuario): Observable<number> {
    return this.watchMutation(` mutation insereUsuario($cpf:String, $nomeUsuario:String, $senha:String, $email:String, $ativo:Boolean){
      insereUsuario(cpf:$cpf, nomeUsuario:$nomeUsuario, senha:$senha, email:$email, ativo:$ativo) {
        ok
        msg
        id
      }
    }`, { params });
   }

  public atualizaUsuario(params: ParamMutationAtualizaUsuario): Observable<void> {
    return this.watchMutation(` mutation atualizaUsuario($id:Int!, $cpf:String, $nomeUsuario:String, $senha:String, $email:String, $ativo:Boolean){
      atualizaUsuario(id:$id, cpf:$cpf, nomeUsuario:$nomeUsuario, senha:$senha, email:$email, ativo:$ativo) {
        ok
        msg
      }
    }`, { params });
   }

  public excluiUsuario(id: string): Observable<void> {
    return this.watchMutation(` mutation excluiUsuario($id:Int!){
      excluiUsuario(id:$id) {
        ok
        msg
      }
    }`, { params: {id: Number(id)}});
   }

}
