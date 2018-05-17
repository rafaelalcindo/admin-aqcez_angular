import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLigacaoOrcamentoComponent } from './update-ligacao-orcamento.component';

describe('UpdateLigacaoOrcamentoComponent', () => {
  let component: UpdateLigacaoOrcamentoComponent;
  let fixture: ComponentFixture<UpdateLigacaoOrcamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLigacaoOrcamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLigacaoOrcamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
