import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import { PrimeirasNoticias } from '../models/PrimeiraNoticias.model';
import { Auth } from '../models/login_auth.model';

import { Observable } from 'rxjs/Observable';



import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
const options = new RequestOptions({ headers: headers });
const params  = new URLSearchParams();
const formData = new FormData();
@Injectable()
export class Login_Auth {

  constructor(private http: Http) { }

  private baseUrl: string = 'http://127.0.0.1:8000';

  public logarUsuario(usuario: string, senha: string): Observable<Auth> {
    formData.append('usuario', usuario);
    formData.append('senha', senha);
    //let body: string = 'usuario=admin&senha=admin';

    return this.http.post(`${this.baseUrl}/logarUsuario`, formData )
            .map((resposta: any) => resposta );
  }
//JSON.stringify({usuario: 'admin', senha: 'admin'})

}



