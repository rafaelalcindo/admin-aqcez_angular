import { Component, OnInit } from '@angular/core';
import { PrimeirasNoticias } from './../../../models/PrimeiraNoticias.model';
import { NoticiasService } from './../../home.service';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-noticiacada',
  templateUrl: './noticiacada.component.html',
  styleUrls: ['./noticiacada.component.css']
})
export class NoticiacadaComponent implements OnInit {

  public noticiaIndividual: PrimeirasNoticias;
  public telaCorreta: boolean = true;

  constructor(private noticiasService: NoticiasService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe((parametro: any) => {
      //console.log(parametro.id);
      this.noticiasService.getNoticiaIndividual(parametro.id)
        .then((noticiaIndividual: PrimeirasNoticias) => {
          //console.log(noticiaIndividual);
          //console.log(Object.keys(noticiaIndividual).length)
          if (Object.keys(noticiaIndividual).length > 0) {
            //this.router.navigate(['/user', 5]);
            this.telaCorreta = true;
            this.noticiaIndividual = noticiaIndividual;
            console.log('Tem dados');
          } else {
            this.telaCorreta = false;
            console.log('Não tem dados');
          }
        });
    });

  }

}
