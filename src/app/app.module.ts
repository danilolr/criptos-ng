import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicialComponent } from './pages/inicial/inicial.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData, CurrencyPipe } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { TemplateComponent } from './pages/template/template.component';

import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { enderecoServidorGraphql } from './configuracao';
import { MenuModule } from 'primeng/menu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SpinnerModule } from 'primeng/spinner';
import { CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ListboxModule } from 'primeng/listbox';
import { SortablejsModule } from 'ngx-sortablejs';
import { PickListModule } from 'primeng/picklist';
import { TabViewModule } from 'primeng/tabview';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { UploadArquivoComponent } from './components/upload-arquivo/upload-arquivo.component';
import { DragDropModule } from 'primeng/dragdrop';
import { DragDropDirective } from './shared/directives/drag-drop/drag-drop.directive';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { StepsModule } from 'primeng/steps';
import { NgxMaskModule } from 'ngx-mask';
import { TipoPagamentoPipe } from './shared/pipes/tipo-pagamento/tipo-pagamento.pipe';
import { ValidoPagamentoPipe } from './shared/pipes/valido-pagamento/valido-pagamento.pipe';
import { CadastroMenuComponent } from './pages/cadastro-menu/cadastro-menu.component';
import { CadastroRoleComponent } from './pages/cadastro-role/cadastro-role.component';
import { VisualizaArquivoComponent } from './components/visualiza-arquivo/visualiza-arquivo.component'
import { MenubarModule } from 'primeng/menubar';
import { DialogService } from 'primeng/dynamicdialog';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CadastroAparelhoComponent } from './pages/cadastro-aparelho/cadastro-aparelho.component';
import { CadastroCotacaoHistoricoComponent } from './pages/cadastro-cotacao-historico/cadastro-cotacao-historico.component';
import { BacktestingComponent } from './pages/backtesting/backtesting.component';

registerLocaleData(localePt, 'pt-BR');

const defaultOptionsApollo = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

@NgModule({
  declarations: [
    AppComponent,
    InicialComponent,
    HeaderComponent,
    LoginComponent,
    TemplateComponent,
    UploadArquivoComponent,
    DragDropDirective,
    TipoPagamentoPipe,
    ValidoPagamentoPipe,
    CadastroMenuComponent,
    CadastroRoleComponent,
    VisualizaArquivoComponent,
    CadastroUsuarioComponent,
    CadastroAparelhoComponent,
    CadastroCotacaoHistoricoComponent,
    BacktestingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    PanelMenuModule,
    CalendarModule,
    CardModule,
    ToolbarModule,
    ReactiveFormsModule,
    ToastModule,
    ChartModule,
    ApolloModule,
    HttpLinkModule,
    DropdownModule,
    TableModule,
    TreeTableModule,
    DialogModule,
    CheckboxModule,
    InputTextareaModule,
    ConfirmDialogModule,
    MenuModule,
    RadioButtonModule,
    SpinnerModule,
    CurrencyMaskModule,
    ProgressSpinnerModule,
    DynamicDialogModule,
    ListboxModule,
    SortablejsModule,
    PickListModule,
    TabViewModule,
    OverlayPanelModule,
    DragDropModule,
    CKEditorModule,
    MessagesModule,
    MessageModule,
    StepsModule,
    NgxMaskModule.forRoot(),
    MenubarModule,
  ],
  providers: [
    DialogService,
    MessageService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: `${enderecoServidorGraphql}/graphql`
          }),
          defaultOptions: defaultOptionsApollo
        }
      },
      deps: [HttpLink]
    },
    {
      provide: CURRENCY_MASK_CONFIG, useValue: {
        align: "left",
        allowNegative: false,
        decimal: ",",
        precision: 2,
        prefix: "R$ ",
        suffix: "",
        thousands: "."
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
