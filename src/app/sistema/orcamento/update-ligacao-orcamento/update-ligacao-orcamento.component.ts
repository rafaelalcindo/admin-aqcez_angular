import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';

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
    'responsavel': new FormControl(null, [Validators.required]),
    'data': new FormControl(null),
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
  public atualDados: any = [];

  public nomesEngenheiros: any[];
  public PossuiVistoria: boolean = false;


  //dados do formulário

  public responsavel_compare: any[] = [];
  public data_compare: any[] = [];
  public responsavel_vistoria_compare: any[] = [];
  public revisao_compare1: boolean = false;
  public revisao_compare2: boolean = true;
  public meio_entrega_compare: string = '';

  public meio_entrega_list: any[] = [
    { nome: 'Projeto', valor: 'projeto'},
    { nome: 'Kit no E-mail', valor: 'Kit no E-mail' }
  ];

  public mensagemErro: any[] = [];

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
        console.log('atualDados: ', this.atualDados[0]);
        this.responsavel_compare  = this.atualDados[0].responsavel.split(" ",2);
        this.data_compare         = this.atualDados[0].data;
        this.responsavel_vistoria_compare = this.atualDados[0].reponsavel_vistoria.split(", ");

        this.preencherFormulário( this.atualDados[0] , this.responsavel_vistoria_compare, this.responsavel_compare);

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

  public preencherFormulário( dadosAtual: any, responVistoria: any[], responsavel_compare): void {
    if (dadosAtual.vistoria == true) {
      this.revisao_compare1 = true
      this.revisao_compare2 = false
      this.formulario.get('vistoria').setValue('sim');
    } else {
      this.revisao_compare1 = false
      this.revisao_compare2 = true
      this.formulario.get('vistoria').setValue('nao');
    }

    if ( dadosAtual.usuario_nome === responsavel_compare[0] ) {
      this.formulario.get('responsavel').setValue(dadosAtual.id);
    }

    if ( dadosAtual.data!== null && dadosAtual.data !== '' ) {
      this.formulario.get('data').setValue(dadosAtual.data);
    }

    if (dadosAtual.meio_entrega !== null && dadosAtual.meio_entrega !== '') {
      this.meio_entrega_compare = dadosAtual.meio_entrega;
      this.formulario.get('meio_entrega').setValue(dadosAtual.meio_entrega);
    }

  }


  public atualizarLigacaoFormulario(): void {
      let responsavel: any[];
      let vistorias_responsavel: string =  "";
      console.log('formulario: ',this.formulario);

      this.botaoDesabilitado = true;


      if ( this.formulario.value.vistoria === 'sim') {

        if(this.FuncArrayEngenharia.length <= 0){ this.seleVistoria = false; }
        if( this.formulario.value.data.trim() === '' || this.formulario.value.data === null ){ this.seleData     = false; }
        if ( this.FuncArrayEngenharia.length > 0 && (this.formulario.value.data.trim() !== '' && this.formulario.value.data !== null) ) {

          this.LigarOrcamentoSitema(responsavel, vistorias_responsavel)

        } else {

          this.botaoDesabilitado = false;
        }
      } else if (this.formulario.value.vistoria === 'nao') {
        this.LigarOrcamentoSitemaSemVistoria(responsavel, vistorias_responsavel)
      } else {
        this.PossuiVistoria = true;
        this.botaoDesabilitado = false;
      }

  }

  public listarErros(funcEngenharia: any[], data: string, meio_entrega: string) {
    if( funcEngenharia.length <= 0 ){
      this.mensagemErro = [{campo: 'responsavel Vistoria', mensagem: 'Por favor selecione o responsável' }];
    }
    if ( data === null || data.trim() === '' ) {
      this.mensagemErro = [{ campo: 'Data', mensagem: 'Por favor coloque a data' }];
    }
    if ( meio_entrega === null || meio_entrega.trim() === '' ) {
      this.mensagemErro = [{ campo: 'Meio Entrega', mensagem: 'Por favor selecione o meio de entrega' }];
    }

  }

  public LigarOrcamentoSitema(responsavel: any[], vistorias_responsavel): void {
    responsavel = this.FuncOrcamento[this.formulario.value.responsavel];
    for ( let i = 0; i < this.FuncArrayEngenharia.length; i++) {
      vistorias_responsavel += this.FuncArrayEngenharia[i].usuario_nome + " " + this.FuncArrayEngenharia[i].usuario_sobrenome+", ";
    }
    console.log('chegou para gravar');
     this.orcamentoService.ligarOrcamentoUpdate(this.formulario.value, vistorias_responsavel, this.routeParaGravar, responsavel)
      .subscribe((resposta: any) => {
        console.log('resposta do API ligacao: ', resposta);
        if(resposta[0].resultado === '1' ) {
          this.botaoDesabilitado = false;
          this.router.navigate(['/listaOrcamento']);
        }
      });
  }

  public LigarOrcamentoSitemaSemVistoria(responsavel: any[], vistorias_responsavel){
    responsavel = this.FuncOrcamento[this.formulario.value.responsavel];
    this.orcamentoService.ligarOrcamentoVistoriaUpdate(this.routeParaGravar, responsavel)
      .subscribe((resposta: any) => {
        //console.log('resposta do API ligacao: ', resposta);
        if(resposta[0].resultado === '1' ) {
          this.botaoDesabilitado = false;
          this.router.navigate(['/listaOrcamento']);
        }
      })
  }

}
