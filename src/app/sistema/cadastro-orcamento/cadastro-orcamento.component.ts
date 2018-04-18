import { Component, OnInit, ViewChild , OnDestroy, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Orcamento } from '../models/cadastroOrcamento.model';

import { CadastroSistema } from '../sistemaService/cadastros.service';


@Component({
  selector: 'app-cadastro-orcamento',
  templateUrl: './cadastro-orcamento.component.html',
  styleUrls: ['./cadastro-orcamento.component.css'],

})


export class CadastroOrcamentoComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('formulario') public formulario: NgForm;

  private orcamento: Orcamento;
  public mudarTela: boolean = false;
  public botaoDesabilitado: boolean = false;

  constructor(private cadastroOrcamento: CadastroSistema,
              private router: Router) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('todo');
  }

  ngAfterViewInit() {
    document.querySelector('body').classList.add('todo');
  }

  public cadastrarOrcamento(): void {
    this.botaoDesabilitado = true;
    this.cadastroOrcamento.cadastrarOrcamento(this.formulario.value)
        .subscribe((resposta: any) => {
          //console.log('resposta cadastro: ', resposta);
          if ( resposta.orcLista_contato !== undefined ) {
              this.botaoDesabilitado = false;
              this.mudarTela = true;
          }
        });
  }

  public mudarTelaOrcamento(): void {
    this.mudarTela = false;
  }

  public voltarPainel(): void {
    this.router.navigate(['/painel']);
  }

}
