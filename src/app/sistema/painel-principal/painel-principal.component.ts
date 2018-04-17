import { Component, OnInit, OnDestroy, AfterViewInit, HostListener, trigger, state, style, transition, animate } from '@angular/core';


@Component({
  selector: 'app-painel-principal',
  templateUrl: './painel-principal.component.html',
  styleUrls: ['./painel-principal.component.css'],
  animations: [
    trigger('menuPrincipal', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(50px,0)' }),
        animate('500ms 0s ease-in-out')
      ])
    ]),

  trigger('menuLateral', [
    state('criado', style({
      opacity: 1
    })),
    transition('void => criado', [
      style({ opacity: 0, transform: 'translate(-50px, 0)' }),
      animate('500ms 0s ease-in-out')
    ])
  ])

  ]
})
export class PainelPrincipalComponent implements OnInit, OnDestroy, AfterViewInit {

  public innerWidth: any; //pega a resolução da tela
  public hover: boolean = false;
  public estadoImagem: string = "naocriado";

  constructor() { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    console.log('largura: ',this.innerWidth);
    this.estadoImagem = "criado";
  }

  @HostListener('window:resize', ['$event'])
  onresize(event) {
    this.innerWidth = window.innerWidth;
    console.log('largura automatica: ', window.innerWidth);
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('todo');
  }

  ngAfterViewInit() {
    document.querySelector('body').classList.add('todo');
  }

  public mouseEntrou($event) {
    console.log('Evento: ', $event);
    this.hover = true;
  }

  public mouseSaiu() {
    this.hover = false;
  }

}
