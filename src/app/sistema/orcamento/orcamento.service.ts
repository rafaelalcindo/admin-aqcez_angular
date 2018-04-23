import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

// orcamento model
import { Orcamento } from '../models/cadastroOrcamento.model';

import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const headers  = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
headers.append('Accept', 'application/json');
const options  = new RequestOptions({ headers: headers });
const params   = new URLSearchParams();
const formData = new FormData();

@Injectable()
export class OrcamentoService {

  constructor(private http: Http) { }

  private baseUrl: string = 'http://127.0.0.1:8000';

  public puxarDadosParaTela(): Observable<Orcamento> {
    return this.http.get(`${this.baseUrl}/orcamento/listarOrcamentoTela`)
            .map((resposta: any) => resposta.json());
  }

  public puxarDadosParaTabelaOrcamento(): Observable<Orcamento> {
    return this.http.get(`${this.baseUrl}/orcamento/listarOrcamentoParaLigar`)
            .map((resposta: any) => resposta.json());
  }

  public puxarDadosParaTabelaOrcamentoPagina(pagina: number): Observable<Orcamento> {
    return this.http.get(`${this.baseUrl}/orcamento/listarOrcamentoParaLigar?page=${pagina}`)
        .map( (resposta: any) => resposta.json() );
  }



}



