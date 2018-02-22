import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NoticiasComponent } from './home/noticias/noticias.component';
import { NoticiasgeralComponent } from './home/noticias/noticiasgeral/noticiasgeral.component';

export const  ROUTES: Routes = [
  { path: '', component: HomeComponent, children: [
      { path: '', component: NoticiasComponent },
      { path: 'noticiageral', component: NoticiasgeralComponent }
    ]
  }
];
