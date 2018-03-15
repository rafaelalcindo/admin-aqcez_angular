import { Component, OnInit, AfterViewInit , trigger, state, style, transition, animate  } from '@angular/core';
import { PrimeirasNoticias } from './../../models/PrimeiraNoticias.model';
import { NoticiasService } from './../home.service';



@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'],
  providers: [NoticiasService],
  animations: [


    trigger('imagem01', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(-50px,0)' }),
        animate('500ms 0s ease-in-out')
      ])
    ]),

    trigger('imagem02', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 1, transform: 'translate(50px,0)' }),
        animate('900ms 0s ease-in-out')
      ])
    ]),

    trigger('imagem03', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 1, transform: 'translate(50px,0)' }),
        animate('500ms 0s ease-in-out')
      ])
    ]),

    trigger('imagem04', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 1, transform: 'translate(0,50px)' }),
        animate('500ms 0s ease-in-out')
      ])
    ]),

    trigger('imagem05', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 1, transform: 'translate(0,50px)' }),
        animate('600ms 0s ease-in-out')
      ])
    ]),

    trigger('imagem06', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 1, transform: 'translate(0,50px)' }),
        animate('700ms 0s ease-in-out')
      ])
    ])

  ]
})
export class NoticiasComponent implements OnInit {

  public estadoImagem: string = "naocriado";
  public estadoImagem02: string = "naocriado";

  public primeirasNoticias02: PrimeirasNoticias[];
  public primeirasNoticias03: PrimeirasNoticias[];
  private resultado02: any[];

  constructor(private noticiasService: NoticiasService) { }

  ngOnInit() {
     //this.resultado = this.noticiasService.getPrimeirasTelasNoticias()
    this.noticiasService.getPrimeirasTelasNoticias()
      .then((primeiraNoticia: PrimeirasNoticias[]) => {
        console.log('noticias', primeiraNoticia);
        this.estadoImagem = "criado";
        this.primeirasNoticias02 = primeiraNoticia;
      });

    this.noticiasService.getPrimeirasTelasNoticias02()
      .then((primeiraNoticia02: PrimeirasNoticias[]) => {
        console.log('noticias', primeiraNoticia02);
        this.estadoImagem02 = "criado";
        this.primeirasNoticias03 = primeiraNoticia02;
      });

  }



}
