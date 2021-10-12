import { Injectable } from '@angular/core';
import { GraphqlBase } from './graphql-base';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { RetornoAutenticacao } from '../graphql/graphql-base';
import { ParamMutationAutenticacao } from './graphql.service';

export interface ParamMutationInserirRoleCompleta {
  descRole: string
  role: string
  ativo: boolean
  roleMenu: RoleM[]
}

export interface ParamMutationAtualizarRoleCompleta {
  idRole: number
  descRole: string
  role: string
  ativo: boolean
  roleMenu: RoleM[]
}

export interface ParamMutationInserirPerfilCompleto {
  descPerfil: string
  idEscola: number
  perfilHorario: PerfilHorarioM[]
}

export interface ParamMutationAtualizarPerfilCompleto {
  idPerfil: number
  descPerfil: string
  perfilHorario: PerfilHorarioM
}

export interface RoleM {
  id: number
  tipoAcesso: string
}

export interface PerfilHorarioM {
  id?: number
  diaSemana: number
  horaInicial: string
  horaFinal: string
}

@Injectable({
  providedIn: 'root'
})
export class GraphqlServiceCustom extends GraphqlBase {

  constructor(protected apollo: Apollo) {
    super(apollo);
  }

  public listaAparelho(): Promise<any[]> {
    return this.query(`
    {
      listaAparelho {
        id
        descricao
        online
        imagem
      }
    }
    `, null)
  }

  public autenticacao(query: string, params: ParamMutationAutenticacao): Observable<RetornoAutenticacao> {
    return this.watchMutation(` mutation autenticacao($emailCpf:String!, $senha:String!){
          autenticacao(emailCpf:$emailCpf, senha:$senha) {
            ${query}
          }
        }`, { params, returnObject: true });
  }

  // public inserirRoleCompleta(params: ParamMutationInserirRoleCompleta): Observable<RetornoPadrao> {
  //   return this.watchMutation(`mutation inserirRoleCompleta($descRole: String!, $role: String!, $ativo: Boolean!, $roleMenu: [RoleM]!){
  //     inserirRoleCompleta(descRole: $descRole, role: $role, ativo: $ativo, roleMenu: $roleMenu) {
  //       ok
  //       msg
  //       id
  //     }
  //   }`, { params })
  // }


  // public atualizarRoleCompleta(params: ParamMutationAtualizarRoleCompleta): Observable<RetornoPadrao> {
  //   return this.watchMutation(`mutation atualizarRoleCompleta($idRole: Int!, $descRole: String!, $role: String!, $ativo: Boolean!, $roleMenu: [RoleM]!){
  //     atualizarRoleCompleta(idRole: $idRole, descRole: $descRole, role: $role, ativo: $ativo, roleMenu: $roleMenu) {
  //       ok
  //       msg
  //     }
  //   }`, { params })
  // }

}