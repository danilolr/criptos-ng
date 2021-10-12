import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicialComponent } from './pages/inicial/inicial.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { TemplateComponent } from './pages/template/template.component';
import { CadastroRoleComponent } from './pages/cadastro-role/cadastro-role.component';
import { CadastroMenuComponent } from './pages/cadastro-menu/cadastro-menu.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { CadastroAparelhoComponent } from './pages/cadastro-aparelho/cadastro-aparelho.component';
import { BacktestingComponent } from './pages/backtesting/backtesting.component';
import { CadastroCotacaoHistoricoComponent } from './pages/cadastro-cotacao-historico/cadastro-cotacao-historico.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    path: '', component: InicialComponent,
  }, {
    path: 'login', component: LoginComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'app', component: TemplateComponent, children: [
      { path: 'backtesting/:idCotacaoHistorico/:estrategia', component: BacktestingComponent },
      { path: 'cadastro-cotacao-historico', component: CadastroCotacaoHistoricoComponent },
      { path: 'cadastro-role', component: CadastroRoleComponent },
      { path: 'cadastro-menu', component: CadastroMenuComponent },
      { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
      { path: 'cadastro-aparelho', component: CadastroAparelhoComponent }
    ]
  }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
