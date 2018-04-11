import { Auth } from './../../models/login_auth.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';




@Injectable()
export class Autenticacao {

  public id_usuario: string;
  private autenticacaoFeitaSource = new BehaviorSubject<boolean>(false);
  public autenticacaofeita = this.autenticacaoFeitaSource.asObservable();

  constructor(private router: Router) { }

  public autenticacao(): boolean {
    if ( this.id_usuario === undefined && localStorage.getItem('id_usuario') != null){
      this.id_usuario = localStorage.getItem('id_usuario');
    }
    this.autenticacaoFeitaSource.next(true);
    return this.id_usuario !== undefined;
  }

  public sair(): boolean {
    localStorage.removeItem('id_usuario');
    this.id_usuario = undefined;
    this.autenticacaoFeitaSource.next(false);
    return false;
  }

}
