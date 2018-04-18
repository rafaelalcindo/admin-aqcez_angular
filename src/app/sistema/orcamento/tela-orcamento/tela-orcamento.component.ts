import { Orcamento } from './../../models/cadastroOrcamento.model';
import { Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';

//Service
import { OrcamentoService } from '../orcamento.service';


@Component({
  selector: 'app-tela-orcamento',
  templateUrl: './tela-orcamento.component.html',
  styleUrls: ['./tela-orcamento.component.css']
})
export class TelaOrcamentoComponent implements OnInit, OnDestroy , AfterViewInit {

  private orcamento: Orcamento;
  private rowsHtml: any[];

  constructor(private oracamentoService: OrcamentoService) { }

  ngOnInit() {
    this.oracamentoService.puxarDadosParaTela()
      .subscribe((resposta: Orcamento) => {
        console.log('resposta Orcamento: ', resposta);
        this.orcamento = resposta;
        this.inserirLinhas(this.orcamento);
      });
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('todo');
  }

  ngAfterViewInit() {
    document.querySelector('body').classList.add('todo');
  }




  public inserirLinhas(orcamento: Orcamento): void {
    console.log('largura da lista de oraçamento: ', Object.keys(orcamento).length );
    let largura: number = Object.keys(orcamento).length;
    let numeroRows: number = Math.ceil(largura / 4);

    console.log('numero de linhas: ', numeroRows);

  }



}
