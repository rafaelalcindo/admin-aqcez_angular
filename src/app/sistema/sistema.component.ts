import { Component, OnInit, OnDestroy, ViewChild ,AfterViewInit, trigger, state, style, transition, animate } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Auth } from './../models/login_auth.model';
import { Login_Auth } from './login_auth.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.css'],
  animations: [
    trigger('logintela', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(0,-50px)' }),
        animate('500ms 0s ease-in-out')
      ])
    ])
  ]
})
export class SistemaComponent implements OnInit, OnDestroy, AfterViewInit {

  public estadoLoginTela: string = 'criado';
  public logo_aqcez: string = "/assets/login/logo_aqcez.jpg";

  @ViewChild('formulario') public formulario: NgForm;

  constructor(private login_auth: Login_Auth,
              private activatedRoute: ActivatedRoute,
              private router: Router ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    document.querySelector('body').classList.remove('todo');
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    document.querySelector('body').classList.add('todo');
  }

  public logarUsuario(): void {
    console.log(this.formulario.value.login);
    this.login_auth.logarUsuario(this.formulario.value.login, this.formulario.value.senha)
      .subscribe((resposta: any) => {
        console.log(resposta);
      });
  }

}
