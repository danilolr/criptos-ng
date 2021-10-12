import { Component, ViewEncapsulation, Input } from '@angular/core';
import { GraphqlService } from '../../services/graphql/graphql.service';
import { AutenticacaoService } from '../../services/autenticacao/autenticacao.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {

  constructor(
    private graphqlService: GraphqlService,
    private authService: AutenticacaoService) {
  }

}
