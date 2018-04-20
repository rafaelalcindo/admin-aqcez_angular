import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
//import {  } from '@angular/core';
import { query, stagger, style, trigger, state,  transition, animate } from '@angular/animations';
import { Orcamento } from './../../models/cadastroOrcamento.model';
import { TelaOrcamentoHTML } from './tela-orcamentoHtml';
import { Observable } from 'rxjs/Rx';
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";


//Service
import { OrcamentoService } from '../orcamento.service';


@Component({
  selector: 'app-tela-orcamento',
  templateUrl: './tela-orcamento.component.html',
  styleUrls: ['./tela-orcamento.component.css'],
  providers: [TelaOrcamentoHTML],
  animations: [
    trigger('efeitoEntrada', [

      transition('* => *', [
        query('.col-sm-3',  style({ opacity: 0, transform: 'translate(0, 50px)'}) ),
        query('.col-sm-3',
          stagger('200ms', [
          animate('400ms', style({ opacity: 1, transform: 'translate(0, 0px)'}))
          ] )
      )
    ] )
  ])
]
})
export class TelaOrcamentoComponent implements OnInit, OnDestroy , AfterViewInit {

  public orcamentos: Orcamento;
  private rowsHtml: any[];
  private TelaObservable: Subscription;
  private conteudoCardHtml: any[]= [];
  public inseriHtmlRow: string = "";

  public estadoCardCriado: string = 'naocriado';

  constructor(private oracamentoService: OrcamentoService,
              private orcamentoHtml: TelaOrcamentoHTML,
              private elementRef: ElementRef) { }

  ngOnInit() {
    this.oracamentoService.puxarDadosParaTela()
      .subscribe((resposta: Orcamento) => {
        console.log('resposta Orcamento: ', resposta);
        this.orcamentos = resposta;
        this.estadoCardCriado = 'criado';
        this.initiateTimer();
       // this.inserirLinhas(this.orcamentos);
      });


  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('todo');
  }

  ngAfterViewInit() {
    document.querySelector('body').classList.add('todo');
  }




  public inserirLinhas(orcamento: Orcamento): void {

   // console.log('largura da lista de oraçamento: ', Object.keys(orcamento).length );
   // let largura: number = Object.keys(orcamento).length;
   // let numeroRows: number = Math.ceil(largura / 4);

    //console.log('numero de linhas: ', numeroRows);
   //this.conteudoCardHtml = this.orcamentoHtml.construirQuadros(orcamento);
   //console.log('conteudo', this.conteudoCardHtml);
    /*
    if(numeroRows >= 0) {
      for (let i = 2; i <= numeroRows; i++){
        this.inseriHtmlRow += this.orcamentoHtml.InserirLinhas(i);
      }


    }
    console.log('inserir Linhas', this.inseriHtmlRow);
    //this.inserirCards();
    */

  }

  private initiateTimer(): void {
    let iguais: boolean;
    let timer = TimerObservable.create(2000, 10000);
    this.TelaObservable = timer.subscribe( () => {
       this.oracamentoService.puxarDadosParaTela()
        .subscribe((resposta: Orcamento) => {
          iguais = this.comparaArrays(this.orcamentos, resposta);
          //console.log(iguais);
          if (!iguais) {
            this.orcamentos = resposta;
          }
        });
    });
  }


  private comparaArrays(orcArrayInicio: Orcamento, orcRequestArray: Orcamento): boolean {

    if ( Object.keys(orcArrayInicio).length !== Object.keys(orcRequestArray).length ) {
      console.log('entrou comparar length');
      return false;
    }

    for (let i = Object.keys(orcRequestArray).length; i--; ) {

        if ( orcArrayInicio[i] !== orcRequestArray[i] ) {

          if ( orcArrayInicio[i].data !== orcRequestArray[i].data ) {
            return false;
          } else if ( orcArrayInicio[i].hora !== orcRequestArray[i].hora ){
            return false;
          } else if (orcArrayInicio[i].responsavel !== orcRequestArray[i].responsavel) {
            return false;
          } else if (orcArrayInicio[i].empresa !== orcRequestArray[i].empresa) {
            return false;
          } else if (orcArrayInicio[i].contato !== orcRequestArray[i].contato) {
            return false;
          } else if (orcArrayInicio[i].observacao !== orcRequestArray[i].observacao) {
            return false;
          }

        }
    }

    return true;

  }


}
