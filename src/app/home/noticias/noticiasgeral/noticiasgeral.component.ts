import { any } from 'codelyzer/util/function';
import { Component, OnInit } from '@angular/core';
import { PrimeirasNoticias } from './../../../models/PrimeiraNoticias.model';
import { NoticiasService } from './../../home.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-noticiasgeral',
  templateUrl: './noticiasgeral.component.html',
  styleUrls: ['./noticiasgeral.component.css']
})
export class NoticiasgeralComponent implements OnInit {

  public noticiasGeral: PrimeirasNoticias[];
  public dadosNoticias;
  public dados: any[];
  
  private page: number = 0;
  private pages: Array<number>;


  constructor(private noticiaService: NoticiasService,
              private route: ActivatedRoute,
              private router: Router ) { }

  ngOnInit() {
    this.noticiaService.getNoticiaGeral()
      .then((NoticiasGeral: any) => {

        this.dadosNoticias = NoticiasGeral;
        console.log( this.dadosNoticias);
        console.log( this.dadosNoticias['data']);
        this.dados = this.dadosNoticias['data'];
        this.pages = new Array( this.dadosNoticias.meta.last_page);
        this.page  = this.dadosNoticias.meta.current_page;
        console.log('quant_paginas: ', this.pages);

      });
  }

  public passarPagina(i, event: any){
    event.preventDefault();
    this.page = i;
    this.noticiaService.getNoticiaGeralPagina(this.page)
      .then((NoticiaGeral: any) => {
        this.dadosNoticias = NoticiaGeral;
        this.dados = this.dadosNoticias['data'];
        window.scrollTo(0,0);
      })
  }


/*
  public PreencherDados(dados_noticia: any): any{
    let dados: any = [];
    for(let i =0; i <= dados_noticia.data.length; i++){
      //console.log(dados_noticia.data[i]);
      dados.push(dados_noticia.data[i]);
    }

    return dados;
  }

  public PreencherDadosPaginacao(dados_num_pagina: number): Array<number> {
    let numeros: any = [];
    for(let i = 1; i <= dados_num_pagina; i++){
      numeros.push(i);
    }
    return numeros;
  }*/


}


