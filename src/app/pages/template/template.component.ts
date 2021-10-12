import { Component, ViewEncapsulation } from '@angular/core';
import { AutenticacaoService } from '../../services/autenticacao/autenticacao.service';
import { MenuItem } from 'primeng/api/menuitem';
import { Router } from '@angular/router';
import { Menu } from '../../services/graphql/graphql-base';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TemplateComponent {

  public items: MenuItem[];
  public nomeCliente: string;

  constructor(private autenticacaoService: AutenticacaoService,
    private route: Router) {
    this.autenticacaoService.$usuario.subscribe(
      dados => {
        if (dados) {
          this.nomeCliente = dados.nome;
          this.carregaMenu(dados.menus);
        }
      }
    )
  }

  carregaMenu(menu: Menu[]) {
    this.items = [];
    for (const m of menu) {
      this.items.push({label: m.descricao, routerLink: m.formulario})
    }
    this.items.push({ label: 'Sair', command: () => this.autenticacaoService.logout()})
    if (this.items.length > 0 && this.items[0].routerLink) {
      this.route.navigateByUrl(this.items[0].routerLink);
    }
  }


}
