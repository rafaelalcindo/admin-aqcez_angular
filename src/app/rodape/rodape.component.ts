import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.css']
})
export class RodapeComponent implements OnInit {

  public certificado01: string = "/assets/rodape/ativo.png";
  public cerfificado02: string = "/assets/rodape/dnbregistered.png";

  constructor() { }

  ngOnInit() {
  }

}
