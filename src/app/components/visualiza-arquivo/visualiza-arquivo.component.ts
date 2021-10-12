import { Component, OnInit } from '@angular/core'
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog'
import { Arquivo } from '../../services/graphql/graphql-base'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-visualiza-arquivo',
  templateUrl: './visualiza-arquivo.component.html',
  styleUrls: ['./visualiza-arquivo.component.css']
})
export class VisualizaArquivoComponent {

  public arquivo: Arquivo;
  public urlVisualizacao: any;
  public isQrCode: boolean;

  constructor(private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    domSanitizer: DomSanitizer) {
    this.arquivo = this.config.data.arquivo;
    this.isQrCode = this.config.data.isQrCode;
    //this.urlVisualizacao = domSanitizer.bypassSecurityTrustResourceUrl(this.arquivo.linkVisualizacao)
  }

  public fecharJanela(resultado?: any): void {
    this.ref.close(resultado);
  }

  public fazerDownload(): void {
    //window.open(this.arquivo.linkDownload, '_self');
  }


}
