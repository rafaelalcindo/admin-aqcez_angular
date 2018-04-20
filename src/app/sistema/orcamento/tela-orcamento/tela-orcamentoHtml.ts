import { Component, Injectable } from '@angular/core';
import { Orcamento } from './../../models/cadastroOrcamento.model';

@Injectable()
export class TelaOrcamentoHTML {

  private buildHTML: string;
  private buildConstruir: any[] = [];
  private buildCorpo: string;


  constructor() { }

  /*public InserirLinhas(num: number): string {
    let count:number = 0;
    this.buildHTML = "<div class='row' id='buildRow"+num+"'   >";
    this.buildHTML += this.buildConstruir[0];
    this.buildHTML += this.buildConstruir[1];

    this.buildHTML += "</div>";
    //console.log('resul build construir: ', this.buildConstruir);
    return this.buildHTML;
  } */

  public InserirQuadros(num: number, orcamento: Orcamento): string {
    return '';
  }



  // ---------------------- Construindo HTML de quadros -----------------------

  public construirQuadros(orcamento: Orcamento): Array<string> {
    console.log('Orçamento em service: ', orcamento);

    for ( let i = 0; i < Object.keys(orcamento).length; i++ ) {
      this.buildHtml(orcamento[i]);
    }
   /*orcamento.forEach(orcament => {
      this.buildHtml(orcament);
    }); */
    console.log('Contruido: ', this.buildConstruir);
    return this.buildConstruir;
  }


  public buildHtml(orcamento: Orcamento): void {
    //console.log('orcamento list: ', orcamento);

    this.buildConstruir.push(orcamento);

  }

  public getArrayBuildConstruido(): Array<any> {
    return this.buildConstruir;
  }

}
