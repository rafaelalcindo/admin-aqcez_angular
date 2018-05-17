import { Component } from '@angular/core';


import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NoticiasComponent } from './home/noticias/noticias.component';
import { NoticiasgeralComponent } from './home/noticias/noticiasgeral/noticiasgeral.component';
import { SistemaComponent } from './sistema/sistema.component';
import { NoticiacadaComponent } from './home/noticias/noticiacada/noticiacada.component';
import { PainelPrincipalComponent } from './sistema/painel-principal/painel-principal.component';

import { CadastroOrcamentoComponent } from './sistema/cadastro-orcamento/cadastro-orcamento.component';
import { TelaOrcamentoComponent } from './sistema/orcamento/tela-orcamento/tela-orcamento.component';
import { ListarOrcamentoComponent } from './sistema/orcamento/listar-orcamento/listar-orcamento.component';
import { LigarOrcamentoComponent } from './sistema/orcamento/ligar-orcamento/ligar-orcamento.component';
import { UpdateLigacaoOrcamentoComponent } from './sistema/orcamento/update-ligacao-orcamento/update-ligacao-orcamento.component';



//sistema
import { AutenticacaoGuard } from './sistema/autenticacoes/autenticacao-guard.service';




export const  ROUTES: Routes = [

  { path: '', component: HomeComponent, children: [
      { path: '', component: NoticiasComponent },
      { path: 'noticiageral', component: NoticiasgeralComponent },
      { path: 'noticiacada/:id', component: NoticiacadaComponent }
    ]
  },
  { path: 'sistema', component: SistemaComponent },
  { path: 'painel', component: PainelPrincipalComponent, canActivate: [AutenticacaoGuard] },

  { path: 'telaOrcamento', component: TelaOrcamentoComponent, canActivate: [AutenticacaoGuard] },
  { path: 'cadastro-orcamento', component: CadastroOrcamentoComponent, canActivate: [AutenticacaoGuard] },
  { path: 'listaOrcamento', component: ListarOrcamentoComponent, canActivate: [AutenticacaoGuard] },
  { path: 'ligarOrcamento/:id', component: LigarOrcamentoComponent, canActivate: [AutenticacaoGuard] },
  { path: 'orcamento/updateLigacaoOrcamento/:id', component: UpdateLigacaoOrcamentoComponent, canActivate: [AutenticacaoGuard]  }


];
