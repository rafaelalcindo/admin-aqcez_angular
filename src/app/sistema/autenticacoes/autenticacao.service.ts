import { Auth } from './../../models/login_auth.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';



@Injectable()
export class Autenticacao {
  public id_usuario: string;

  constructor(private router: Router) { }

  public autenticacao(): boolean {
    if ( this.id_usuario === undefined && localStorage.getItem('id_usuario') != null){
      this.id_usuario = localStorage.getItem('id_usuario');
    }

    return this.id_usuario !== undefined;
  }

  public sair(): void {
    localStorage.removeItem('id_usuario');
    this.id_usuario = undefined;
    this.router.navigate(['/']);
  }

}
