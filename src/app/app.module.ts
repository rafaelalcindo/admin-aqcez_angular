import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { RodapeComponent } from './rodape/rodape.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { NoticiasComponent } from './home/noticias/noticias.component';
import { NoticiasgeralComponent } from './home/noticias/noticiasgeral/noticiasgeral.component';
import { SistemaComponent } from './sistema/sistema.component';

// services
import { NoticiasService } from './home/home.service';
import { Login_Auth } from './sistema/login_auth.service';

//pipes
import { DescricaoReduzida } from './util/pipesubstrin';
import { NoticiacadaComponent } from './home/noticias/noticiacada/noticiacada.component';


@NgModule({
  declarations: [
    AppComponent,
    RodapeComponent,
    NavbarComponent,
    HomeComponent,
    NoticiasComponent,
    NoticiasgeralComponent,
    SistemaComponent,
    DescricaoReduzida,
    NoticiacadaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [NoticiasService, Login_Auth],
  bootstrap: [AppComponent]
})
export class AppModule { }
