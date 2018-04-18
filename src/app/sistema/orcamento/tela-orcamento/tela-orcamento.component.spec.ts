import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaOrcamentoComponent } from './tela-orcamento.component';

describe('TelaOrcamentoComponent', () => {
  let component: TelaOrcamentoComponent;
  let fixture: ComponentFixture<TelaOrcamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelaOrcamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaOrcamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
