import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/services/graphql/graphql-base';
import { GraphqlService } from 'src/app/services/graphql/graphql.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  public registros: Usuario[]

  constructor(private graphqlService: GraphqlService) {
  }

  async ngOnInit(): Promise<void> {
    this.registros = await this.graphqlService.query(`
    {
      usuario{
        id,
        nomeUsuario,
        email,
        cpf
       }
    }    
    `, null)
  }

}
