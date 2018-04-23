import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Orcamento } from '../../models/cadastroOrcamento.model';
import { CadastroSistema } from './../../sistemaService/cadastros.service';


@Component({
  selector: 'app-ligar-orcamento',
  templateUrl: './ligar-orcamento.component.html',
  styleUrls: ['./ligar-orcamento.component.css']
})
export class LigarOrcamentoComponent implements OnInit, OnDestroy, AfterViewInit {

  private routeParaGravar: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((parametro: any) => {
      //console.log(parametro.id);
      this.routeParaGravar = parametro.id;
    })
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

}
