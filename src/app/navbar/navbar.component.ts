import { Component, OnInit, DoCheck, OnChanges } from '@angular/core';
import { Autenticacao } from '../sistema/autenticacoes/autenticacao.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges {

  public logoAqcez: string = "/assets/logo_aqcez.png";
  public usuarioLogado: boolean = false;

  constructor(private autenticacao: Autenticacao) {
    this.usuarioLogado = this.autenticacao.autenticacao();
  }

  ngOnInit() {

  }

  ngOnChanges() {

  }


}
