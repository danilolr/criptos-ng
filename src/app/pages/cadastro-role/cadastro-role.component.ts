import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Role, Menu } from '../../services/graphql/graphql-base';
import { GraphqlService } from '../../services/graphql/graphql.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { GraphqlServiceCustom } from '../../services/graphql/graphql-custom.service';

@Component({
  selector: 'app-cadastro-role',
  templateUrl: './cadastro-role.component.html',
  styleUrls: ['./cadastro-role.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CadastroRoleComponent implements OnInit {

  public roles: Role[];
  public form: FormGroup;
  public roleEditando: Role;
  public displayModal: boolean;
  public menus: Menu[];
  public opcoesAcesso: any[];

  constructor(private graphqlService: GraphqlService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private graphqlServiceCustom: GraphqlServiceCustom) {
    this.atualizarLista();
    this.graphqlService.menu(`
    id
    descricao`).subscribe(
      m => {
        this.menus = m;
      }
    )
    this.opcoesAcesso = [
      { label: 'Acesso total', value: 'E' },
      { label: 'Apenas leitura', value: 'L' },
    ]
  }

  ngOnInit(): void {
  }

  private atualizarLista(): void {
    this.graphqlService.role(`
    id
    descRole
    role
    listaRoleMenu {
      id
      tipoAcesso
      menu {
        id
  			descricao
      }
    }
    `).subscribe(
      r => {
        this.roles = r;
      }
    )
  }

  public abrirModalInsercao(): void {
    // usado para resetar o form completamente
    this.form = null;
    this.cdr.detectChanges();


    this.form = this.formBuilder.group({
      descRole: ['', Validators.required],
      role: ['', Validators.required],
      menus: [null, Validators.required],
      acessos: this.formBuilder.array(this.menus.map(m => {
        return this.formBuilder.group({
          idMenu: [m.id],
          acesso: [{ value: null, disabled: true }, Validators.required]
        })
      }))
    });
    this.roleEditando = null;
    this.displayModal = true;
  }

  public abrirModalEdicao(r: Role): void {
    // usado para resetar o form completamente
    this.form = null;
    this.cdr.detectChanges();


    this.form = this.formBuilder.group({
      descRole: [r.descRole, Validators.required],
      role: [r.role, Validators.required],
      menus: [r.listaRoleMenu.map(rm => rm.menu.id), Validators.required],
      acessos: this.formBuilder.array(this.menus.map(m => {
        const roleMenu = r.listaRoleMenu.find(rm => rm.menu.id === m.id);
        return this.formBuilder.group({
          idMenu: [m.id],
          acesso: [{ value: roleMenu ? roleMenu.tipoAcesso : null, disabled: !roleMenu }, Validators.required]
        })
      }))
    });
    this.roleEditando = r;
    this.displayModal = true;
  }


  menuChanged(index: number, event: any): void {
    const acesso = (this.form.controls['acessos'] as FormArray).controls[index];
    if (event.checked) {
      acesso.enable()
    } else {
      acesso.disable()
    }
  }

  public inserirEditarRole(): void {
    if (this.roleEditando) {
      return this.editarRole();
    }
    return this.inserirRole();
  }

  public editarRole(): void {
    const role = this.form.value;
    // this.graphqlServiceCustom.atualizarRoleCompleta({
    //   idRole: Number(this.roleEditando.id),
    //   descRole: role.descRole,
    //   role: role.role,
    //   roleMenu: role.acessos.filter(a => a.acesso).map(a => {
    //     return {
    //       id: Number(a.idMenu),
    //       tipoAcesso: a.acesso,
    //     }
    //   }),
    //   ativo: true
    // }).subscribe(
    //   () => {
    //     this.atualizarLista();
    //     this.displayModal = false;
    //     this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'A role foi atualizada com sucesso!' });
    //   }, () => {
    //     this.displayModal = false;
    //     this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Ocorreu um erro inesperado.' });
    //   }
    // )
  }

  public inserirRole(): void {
    const role = this.form.value;
    //  this.graphqlServiceCustom.inserirRoleCompleta({
    //    descRole: role.descRole,
    //    role: role.role,
    //    roleMenu: role.acessos.filter(a => a.acesso).map(a => {
    //      return {
    //        id: Number(a.idMenu),
    //        tipoAcesso: a.acesso,
    //      }
    //    }),
    //    ativo: true
    //  }).subscribe(
    //    () => {
    //      this.atualizarLista();
    //      this.displayModal = false;
    //      this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'A role foi criada com sucesso!' });
    //    }, () => {
    //      this.displayModal = false;
    //      this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Ocorreu um erro inesperado.' });
    //    }
    //  )
  }

  public excluirRole(r: Role) {
    this.confirmationService.confirm({
      header: "Excluir role",
      message: `Você tem certeza que deseja excluir a role "${r.descRole}"?`,
      accept: () => {
        this.graphqlService.excluiRole(r.id).subscribe(
          () => {
            this.atualizarLista();
            this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'A role foi removida com sucesso.' });
          }, () => {
            this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Ocorreu um erro inesperado.' });
          }
        )
      }
    })
  }


}
