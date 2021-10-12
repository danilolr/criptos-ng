import { Component, OnInit } from '@angular/core';
import { GraphqlService } from '../../services/graphql/graphql.service';
import { Menu } from '../../services/graphql/graphql-base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-cadastro-menu',
  templateUrl: './cadastro-menu.component.html',
  styleUrls: ['./cadastro-menu.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class CadastroMenuComponent implements OnInit {

  public menus: Menu[];
  public displayModal: boolean;
  public form: FormGroup;
  public menuEditando: Menu;

  constructor(private graphqlService: GraphqlService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
    this.atualizarLista();
  }

  ngOnInit(): void {
  }

  private atualizarLista(): void {
    this.graphqlService.menu(`
    id
    descricao
    formulario
    ordem`).subscribe(
      m => {
        this.menus = m;
      }
    )
  }


  public abrirModalInsercao(): void {
    this.form = this.formBuilder.group({
      descricao: ['', Validators.required],
      formulario: ['', Validators.required],
      ordem: [null, Validators.required]
    });
    this.menuEditando = null;
    this.displayModal = true;
  }

  public abrirModalEdicao(m: Menu): void {
    this.form = this.formBuilder.group({
      descricao: [m.descricao, Validators.required],
      formulario: [m.formulario, Validators.required],
      ordem: [m.ordem, Validators.required]
    });
    this.menuEditando = m;
    this.displayModal = true;
  }

  public inserirEditarMenu(): void {
    if (this.menuEditando) {
      return this.editarMenu();
    }
    return this.inserirMenu();
  }

  public editarMenu(): void {
    this.graphqlService.atualizaMenu({
      id: Number(this.menuEditando.id),
      descricao: this.form.value.descricao,
      formulario: this.form.value.formulario,
      ordem: this.form.value.ordem
    }).subscribe(
      () => {
        this.atualizarLista();
        this.displayModal = false;
        this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'O menu foi criado com sucesso!' });
      }, () => {
        this.displayModal = false;
        this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Ocorreu um erro inesperado.' });
      }
    )
  }

  public inserirMenu(): void {
    const menu = this.form.value;
    this.graphqlService.insereMenu({
      descricao: menu.descricao,
      formulario: menu.formulario,
      ordem: menu.ordem,
      ativo: true
    }).subscribe(
      () => {
        this.atualizarLista();
        this.displayModal = false;
        this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'O menu foi criado com sucesso!' });
      }, () => {
        this.displayModal = false;
        this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Ocorreu um erro inesperado.' });
      }
    )
  }

  public excluirMenu(m: Menu) {
    this.confirmationService.confirm({
      header: "Excluir menu",
      message: `Você tem certeza que deseja excluir o menu "${m.descricao}"?`,
      accept: () => {
        this.graphqlService.excluiMenu(m.id).subscribe(
          () => {
            this.atualizarLista();
            this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'O menu foi removido com sucesso.' });
          }, () => {
            this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Ocorreu um erro inesperado.' });
          }
        )
      }
    })
  }
}
