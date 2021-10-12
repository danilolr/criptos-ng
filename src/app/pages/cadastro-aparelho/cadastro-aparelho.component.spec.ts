import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAparelhoComponent } from './cadastro-aparelho.component';

describe('CadastroAparelhoComponent', () => {
  let component: CadastroAparelhoComponent;
  let fixture: ComponentFixture<CadastroAparelhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroAparelhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroAparelhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
