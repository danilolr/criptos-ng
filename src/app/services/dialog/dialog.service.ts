import { Injectable } from '@angular/core';
import { DialogService as PDialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { UploadArquivoComponent } from '../../components/upload-arquivo/upload-arquivo.component';
import { Arquivo } from '../graphql/graphql-base';
import { VisualizaArquivoComponent } from '../../components/visualiza-arquivo/visualiza-arquivo.component';

interface InputUploadArquivo {
  header: string
  data: {
    mimeType: string
    accept: Function
  }
}

interface InputVisualizarArquivo {
  header: string
  arquivo: Arquivo
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {

  constructor(private dialog: PDialogService) { }

  public uploadArquivo(dados: InputUploadArquivo): DynamicDialogRef {
    return this.dialog.open(UploadArquivoComponent, {
      header: dados.header,
      width: '500px',
      height: '385px',
      data: dados.data
    });
  }

  public visualizarArquivo(dados: InputVisualizarArquivo): DynamicDialogRef {
    return this.dialog.open(VisualizaArquivoComponent, {
      data: {
        arquivo: dados.arquivo
      },
      header: dados.header,
      width: '70%',
      height: '85%',
    })
  }
}