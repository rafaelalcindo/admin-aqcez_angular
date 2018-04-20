import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Orcamento } from './../models/cadastroOrcamento.model';


import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
headers.append('Accept', 'application/json')
const options = new RequestOptions({ headers: headers });
const formData = new FormData();
@Injectable()
export class CadastroSistema {

  constructor(private http: Http) { }

  private baseUrl: string = 'http://127.0.0.1:8000';

  public cadastrarOrcamento(orcamento: any): Observable<any> {

    formData.append('empresa', orcamento.empresa);
    formData.append('data', orcamento.data);
    formData.append('hora', orcamento.hora);
    formData.append('contato', orcamento.contato);
    formData.append('telefone', orcamento.telefone);
    formData.append('observacao', orcamento.observacao);
    formData.append('entregue', '0');


    return this.http.post(`${this.baseUrl}/orcamento/inserirOrcamento`, formData)
          .map((resposta: any) => resposta.json() );
  }

}
