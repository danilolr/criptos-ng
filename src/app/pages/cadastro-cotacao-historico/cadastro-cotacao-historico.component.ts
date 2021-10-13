import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CotacaoHistorico } from 'src/app/services/graphql/graphql-base';
import { GraphqlService } from 'src/app/services/graphql/graphql.service';

@Component({
  selector: 'app-cadastro-cotacao-historico',
  templateUrl: './cadastro-cotacao-historico.component.html',
  styleUrls: ['./cadastro-cotacao-historico.component.css']
})
export class CadastroCotacaoHistoricoComponent implements OnInit {

  historicos: CotacaoHistorico[];
  displayModal: boolean;
  idCotacaoHistorico: string;
  estrategias: any[] = [];
  estrategiaSelecionada: any = []

  constructor(private graphqlService: GraphqlService, private router: Router) { }

  async ngOnInit() {
    this.historicos = await this.graphqlService.query(`
    {
      cotacaoHistorico {
        id
        exchange {
          nome
        }
        criptoPar {
          simbolo
        }    
        tempo   
      }
    }    
    `, null)
  }

  async executarBacktest(h: CotacaoHistorico) {
    this.estrategias = await this.graphqlService.query<any[]>(`
    {
      listaEstrategia {
        nome
        parametros {
          nome
          tipo
          valorDefault
        }    
      }
    }`, null)
    this.estrategiaSelecionada = this.estrategias[0]
    this.displayModal = true
    this.idCotacaoHistorico = h.id
  }

  executar() {
    this.router.navigate([`/app/backtesting/${this.idCotacaoHistorico}/${this.estrategiaSelecionada.nome}`])
  }

}
