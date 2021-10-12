import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCotacaoHistoricoComponent } from './cadastro-cotacao-historico.component';

describe('CadastroCotacaoHistoricoComponent', () => {
  let component: CadastroCotacaoHistoricoComponent;
  let fixture: ComponentFixture<CadastroCotacaoHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroCotacaoHistoricoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroCotacaoHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
