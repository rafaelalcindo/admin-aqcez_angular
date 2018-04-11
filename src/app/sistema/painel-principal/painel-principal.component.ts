import { Component, OnInit, OnDestroy, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-painel-principal',
  templateUrl: './painel-principal.component.html',
  styleUrls: ['./painel-principal.component.css']
})
export class PainelPrincipalComponent implements OnInit, OnDestroy, AfterViewInit {

  public innerWidth: any; //pega a resolução da tela

  constructor() { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    console.log('largura: ',this.innerWidth);
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

}
