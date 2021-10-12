import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-upload-arquivo',
  templateUrl: './upload-arquivo.component.html',
  styleUrls: ['./upload-arquivo.component.css'],
  providers: [MessageService]
})
export class UploadArquivoComponent implements OnInit {

  public arquivo: File;
  public isFileOver: boolean;
  public isSalvando: boolean;

  constructor(private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  public adicionarArquivo(arquivos: File[]): void {
    this.arquivo = arquivos[0];
  }

  public fecharJanela(resultado?:any): void {
    this.ref.close(resultado);
  }

  public salvar(): void {
    if (this.isSalvando) return;
    this.isSalvando = true;
    this.config.data.accept(this.arquivo).then(
      () => {
        this.isSalvando = false;
        this.fecharJanela({ok: true});
      }, error => {
        this.isSalvando = false;
        this.messageService.add({ severity: 'error', summary: 'Erro!', detail: error || 'Ocorreu um erro inesperado, por favor tente novamente mais tarde.' });
      }
    )
  }
}
