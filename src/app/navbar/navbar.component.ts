import { Component, OnInit, DoCheck, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Autenticacao } from '../sistema/autenticacoes/autenticacao.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges {

  public logoAqcez: string = "/assets/logo_aqcez.png";
  public usuarioLogado: boolean = false;

  constructor(private autenticacao: Autenticacao, private router: Router ) {
    this.usuarioLogado = this.autenticacao.autenticacao();
  }

  ngOnInit() {
    this.autenticacao.autenticacaofeita.subscribe( autenticado => this.usuarioLogado = autenticado);
  }

  ngOnChanges() {

  }

  public sair(): void {
    this.usuarioLogado = this.autenticacao.sair();
    this.router.navigate(['/']);
  }

}
