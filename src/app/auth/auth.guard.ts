import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacaoService, Usuario } from '../services/autenticacao/autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private usuarioDadosAutenticacao: Usuario;

  constructor(autenticacaoService: AutenticacaoService, private router: Router) {
    autenticacaoService.$usuario.subscribe((data) => this.usuarioDadosAutenticacao = data);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let resp = this.usuarioDadosAutenticacao != null;
    console.log('AuthGuard#canActivate called ' + resp);
    if (!resp) {
      this.router.navigate(['/login']);
    }
    return resp;
  }

}
