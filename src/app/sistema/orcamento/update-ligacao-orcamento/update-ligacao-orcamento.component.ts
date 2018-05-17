import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { Orcamento } from '../../models/cadastroOrcamento.model';
import { CadastroSistema } from './../../sistemaService/cadastros.service';
import { OrcamentoService } from './../orcamento.service';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-update-ligacao-orcamento',
  templateUrl: './update-ligacao-orcamento.component.html',
  styleUrls: ['./update-ligacao-orcamento.component.css']
})
export class UpdateLigacaoOrcamentoComponent implements OnInit, OnDestroy, AfterViewInit {

  public formulario: FormGroup = new FormGroup({
    'responsavel': new FormControl(null),
    'data_vistoria': new FormControl(null),
    'meio_entrega': new FormControl(null),
    'vistoria': new FormControl(null),
    'responsavel_vistoria': new FormControl(null),
  });

  private routeParaGravar: string;
  public FuncOrcamento: any[];
  public FuncEngenharia: any[];

  public botaoDesabilitado: boolean = true;
  public FuncArrayEngenharia: any[] = [];

  public seleVistoria: boolean = true;
  public seleData: boolean = true;
  public atualDados: any;

  public nomesEngenheiros: any[];
  public PossuiVistoria: boolean = false;

  //dados do formulário

  public responsavel_compare: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orcamentoService: OrcamentoService
  ) { }



  ngOnInit() {
    this.activatedRoute.params.subscribe((parametro: any) => {
      this.routeParaGravar = parametro.id;
    });

    this.orcamentoService.puxarFuncionarioOrcamento()
      .subscribe((resposta: any) => {
        this.FuncOrcamento = resposta;
        console.log('Func Orcamento: ', this.FuncOrcamento)
        
      });

    this.orcamentoService.puxarFuncionarioEngenharia()
      .subscribe((resposta: any) => {
        this.FuncEngenharia = resposta;
        
      });

    this.orcamentoService.pegarOrcamentoLigarUpdate(this.routeParaGravar)
      .subscribe((resposta: any) => {
        this.atualDados = resposta;
        console.log('atualDados: ', this.atualDados);
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    document.querySelector('body').classList.remove('todo');
  }

  ngAfterViewInit() {
    document.querySelector('body').classList.add('todo');
  }

  public temVistoria (valor: string): void {
    if(valor === 'sim') {
      this.PossuiVistoria = false;
    } else {
      this.PossuiVistoria = true;
    }
  }

  public responsavelSelecionado(): void {
    if( this.formulario.value.responsavel !== null ) {
      this.botaoDesabilitado = false;
    }
  }

  public selecionaFuncVistoria(index: number): void {
    
    this.FuncArrayEngenharia.push(this.FuncEngenharia[index]);
    this.FuncEngenharia.splice(index, 1); 
  }

  public eliminarSelecionadoFuncVistoria(index: number): void {
    
    this.FuncEngenharia.push(this.FuncArrayEngenharia[index]);
    this.FuncArrayEngenharia.splice(index, 1); 
  }

  public preencherFormulário(): void {

  }


  public atualizarLigacaoFormulario(): void {
      
  }

}
