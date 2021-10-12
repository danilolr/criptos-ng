import { Component, OnInit } from '@angular/core'
import { AutenticacaoService } from '../../services/autenticacao/autenticacao.service'
import { MessageService } from 'primeng/api'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  public usuario = ""
  public senha = ""
  public nomeCliente = ""

  constructor(private autenticacaoService: AutenticacaoService,
    private messageService: MessageService,
    private router: Router) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  public entrar(): void {
    this.autenticacaoService.login(this.usuario, this.senha).subscribe(
      usuario => {
        this.router.navigate(['/app/cadastro-role'])
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error })
      }
    )
  }

}
