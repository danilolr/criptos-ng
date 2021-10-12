import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enderecoServidorGraphql } from '../../configuracao'

interface RetornoUpload {
  id: number
  url: string
}

@Injectable({
  providedIn: 'root'
})
export class ArquivoService {

  constructor(private http: HttpClient) { }

  public upload(file: File): Promise<RetornoUpload> {
    const formData = new FormData()
    formData.append("arquivo", file)
    formData.append("nome", file.name)
    return new Promise<RetornoUpload>((resolve, reject) => {
      this.http.post(`${enderecoServidorGraphql}/upload`, formData).subscribe(
        (r: any) => {
          if (r.ok) {
            return resolve({
              id: r.id,
              url: r.url
            })
          }
          reject(r.msg)
        }, err => {
          reject(err)
        }
      )
    });
  }


  public importacao(file: File): Promise<RetornoUpload> {
    const formData = new FormData()
    formData.append("arquivo", file)
    formData.append("nome", file.name)
    return new Promise<RetornoUpload>((resolve, reject) => {
      this.http.post(`${enderecoServidorGraphql}/importacao`, formData).subscribe(
        (r: any) => {
          if (r.ok) {
            return resolve()
          }
          reject(r.msg)
        }, err => {
          reject(err)
        }
      )
    });
  }
}