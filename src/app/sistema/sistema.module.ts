import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//componentes
import { TelaOrcamentoComponent } from './orcamento/tela-orcamento/tela-orcamento.component';

//routes
import { RouterModule } from '@angular/router';
import { ROUTES } from '../app.routes';
import { CadastroOrcamentoComponent } from './cadastro-orcamento/cadastro-orcamento.component';

//services
import { CadastroSistema } from './sistemaService/cadastros.service';
import { OrcamentoService } from './orcamento/orcamento.service';
import { LigarOrcamentoComponent } from './orcamento/ligar-orcamento/ligar-orcamento.component';
import { ListarOrcamentoComponent } from './orcamento/listar-orcamento/listar-orcamento.component';




@NgModule({

  declarations: [
    CadastroOrcamentoComponent,
    TelaOrcamentoComponent,
    LigarOrcamentoComponent,
    ListarOrcamentoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [CadastroSistema, OrcamentoService],
  bootstrap: []
})
export class SistemaModule { }
