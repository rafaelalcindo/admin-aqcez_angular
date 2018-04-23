import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Orcamento } from '../../models/cadastroOrcamento.model';
import { OrcamentoService } from './../orcamento.service';



@Component({
  selector: 'app-listar-orcamento',
  templateUrl: './listar-orcamento.component.html',
  styleUrls: ['./listar-orcamento.component.css']
})
export class ListarOrcamentoComponent implements OnInit, OnDestroy, AfterViewInit {

  public orcamentoGeral: Orcamento[];
  public dadosNoticias;
  public dados: any;

  public page: number = 0;
  public pages: Array<number>;
  public lastPage: number = 0;

  constructor(
    private orcamentoService: OrcamentoService,
    private router: Router,
    private routerActive: ActivatedRoute
  ) { }

  ngOnInit() {
    this.orcamentoService.puxarDadosParaTabelaOrcamento()
      .subscribe(( resposta: any ) => {
        console.log('Resposta : ', resposta);
        this.dados = resposta['data'];
        this.pages = new Array(resposta.meta.last_page);
        this.page  = resposta.meta.current_page;
        this.lastPage = resposta.meta.last_page;
      });
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('todo');
  }

  ngAfterViewInit() {
    document.querySelector('body').classList.add('todo');
  }

  public passarPagina(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.orcamentoService.puxarDadosParaTabelaOrcamentoPagina(this.page)
      .subscribe((resposta: any) => {
        this.dados = resposta['data'];
        this.pages = new Array(resposta.meta.last_page);
        this.page = resposta.meta.current_page;
        this.lastPage = resposta.meta.last_page;
      });
  }



}
