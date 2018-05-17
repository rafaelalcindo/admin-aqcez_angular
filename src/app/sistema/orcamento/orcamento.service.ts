import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

// orcamento model
import { Orcamento } from '../models/cadastroOrcamento.model';
import { Auth } from './../../models/login_auth.model';

import { URL_API } from '../../util/app.api';

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
    return this.http.get(`${URL_API}/orcamento/listarOrcamentoTela`)
            .map((resposta: any) => resposta.json());
  }

  public puxarDadosParaTabelaOrcamento(): Observable<Orcamento> {
    return this.http.get(`${URL_API}/orcamento/listarOrcamentoParaLigar`)
            .map((resposta: any) => resposta.json());
  }

  public puxarDadosParaTabelaOrcamentoPagina(pagina: number): Observable<Orcamento> {
    return this.http.get(`${URL_API}/orcamento/listarOrcamentoParaLigar?page=${pagina}`)
        .map( (resposta: any) => resposta.json() );
  }

  // ================================ puxar funcionarios Orçamento ======================

  public puxarFuncionarioOrcamento(): Observable<Auth> {
    return this.http.get(`${URL_API}/orcamento/listaFuncionarioOrcamento`)
        .map((resposta: any) => resposta.json() );
  }

  public puxarFuncionarioEngenharia(): Observable<Auth> {
    return this.http.get(`${URL_API}/orcamento/listaFuncionarioEngenharia`)
        .map((resposta: any) => resposta.json());
  }
  // ============================ Ligar Orçamento =====================================
  public ligarOrcamento(formulario: any, FuncEng: string, idOrcamento: string, responsavel: any): Observable<any> {
    let responsavel_send: string = responsavel.usuario_nome+" "+responsavel.usuario_sobrenome;
    let vistoria: string;

    if(formulario.vistoria === 'sim') { vistoria = '1'; } else { vistoria = '0'; }

    console.log('responsavel: ', responsavel.usuario_nome);
    console.log('formulario: ', formulario);

    formData.append('responsavel', responsavel_send);
    formData.append('vistoria', vistoria);
    formData.append('responsavel_vistoria', FuncEng);
    formData.append('data_vistoria', formulario.data);
    formData.append('id_orcamento', idOrcamento);
    formData.append('id_usuario', responsavel.usuario_id);
    formData.append('meio_entrega', formulario.meio_entrega);

    return this.http.post(`${URL_API}/orcamento/ligarOrcamento`, formData)
      .map((resposta: any) => resposta.json() );

  }

  public ligarOrcamentoVistoria(idOrcamento: string, responsavel: any): Observable<any> {
    let responsavel_send: string = responsavel.usuario_nome+" "+responsavel.usuario_sobrenome;

    formData.append('responsavel', responsavel_send);
    formData.append('id_orcamento', idOrcamento);
    formData.append('id_usuario', responsavel.usuario_id);

    return this.http.post(`${URL_API}/orcamento/ligarOrcamento`, formData)
      .map((resposta: any) => resposta.json() );

  }

  public pegarOrcamentoLigarUpdate(idOrcamento: string): Observable<any> {
    return this.http.get(`${URL_API}/orcamento/pegarOrcamentoIndividual/${idOrcamento}`)
      .map((resposta: any) => resposta.json());
  }


}



