import { Component, OnInit, OnDestroy, ViewChild,AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Orcamento } from '../../models/cadastroOrcamento.model';
import { CadastroSistema } from './../../sistemaService/cadastros.service';
import { OrcamentoService } from './../orcamento.service';

import {Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/switchMap';




@Component({
  selector: 'app-ligar-orcamento',
  templateUrl: './ligar-orcamento.component.html',
  styleUrls: ['./ligar-orcamento.component.css']
})
export class LigarOrcamentoComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('formulario') public formulario: NgForm;

  private routeParaGravar: string;
  public FuncOrcamento: any[];
  public FuncEngenharia: any[];

  public botaoDesabilitado: boolean = true;


  public FuncArrayEngenharia: any[] = [];


  //private subjectPesquisa: Subject<string> = new Subject<string>();

  private nomesEngenheiros: any[];

  public PossuiVistoria: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orcamentoService: OrcamentoService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((parametro: any) => {
      //console.log(parametro.id);
      this.routeParaGravar = parametro.id;
    })

    this.orcamentoService.puxarFuncionarioOrcamento()
      .subscribe((resposta: any) => {
        this.FuncOrcamento = resposta;
        //console.log('funcionario: ', this.FuncOrcamento);
      });

    this.orcamentoService.puxarFuncionarioEngenharia()
      .subscribe((resposta: any) => {
        this.FuncEngenharia = resposta;
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    document.querySelector('body').classList.remove('todo');
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    document.querySelector('body').classList.add('todo');
  }

  public temVistoria (valor: string): void {

    if ( valor === 'sim' ) {
      this.PossuiVistoria = false;
    } else {
       this.PossuiVistoria = true;
    }
  }

  public responsavelSelecionado(): void {
    if ( this.formulario.value.responsavel !==   null) {
        this.botaoDesabilitado = false;
    }
  }

  public selecionaFuncVistoria(index: number): void {
    this.FuncArrayEngenharia.push(this.FuncEngenharia[index]);
    this.FuncEngenharia.splice(index, 1);

  }

  public eliminarSelecionadoFuncVistoria(index: number): void {
    console.log('index fechar: ', index);
    this.FuncEngenharia.push(this.FuncArrayEngenharia[index]);
    this.FuncArrayEngenharia.splice(index, 1);
  }


  public LigarOrcamento(): void {
    let responsavel: any[];
    let vistorias_responsavel: string =  "";
    //console.log(this.formulario);

    if ( this.formulario.value.vistoria === 'sim') {
      if ( this.FuncArrayEngenharia.length > 0) {

        responsavel = this.FuncOrcamento[this.formulario.value.responsavel];
        for ( let i = 0; i < this.FuncArrayEngenharia.length; i++) {
          vistorias_responsavel += this.FuncArrayEngenharia[i].usuario_nome + " " + this.FuncArrayEngenharia[i].usuario_sobrenome+", ";
        }
        this.orcamentoService.ligarOrcamento(this.formulario.value, vistorias_responsavel, this.routeParaGravar, responsavel)
          .subscribe((resposta: any) => {
            console.log('resposta do API ligacao: ', resposta);
            if(resposta[0].resultado === '1' ) {
              this.router.navigate(['/listaOrcamento']);
            }
          });
      }
    }


  }

}
