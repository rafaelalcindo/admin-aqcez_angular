
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { PrimeirasNoticias } from '../models/PrimeiraNoticias.model';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class NoticiasService {

    constructor(private http: Http) {}

    public getPrimeirasTelasNoticias(): Promise<PrimeirasNoticias[]> {
      return this.http.get('http://127.0.0.1:8000/primeirasNoticias')
        .toPromise()
        .then((resposta: any) => resposta.json() );
    }

    public  getPrimeirasTelasNoticias02(): Promise<PrimeirasNoticias[]> {
        return this.http.get('http://127.0.0.1:8000/primeirasNoticiasSecound')
            .toPromise()
            .then((resposta: any) => resposta.json());
    }

    public getNoticiaIndividual(id: number): Promise<PrimeirasNoticias> {
        return this.http.get(`http://127.0.0.1:8000/noticiaindividual/${id}`)
            .toPromise()
            .then((resposta: any) => resposta.json() )
            .catch((error: any) => {
                error.json();
            })
    }

}

