import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroRoleComponent } from './cadastro-role.component';

describe('CadastroRoleComponent', () => {
  let component: CadastroRoleComponent;
  let fixture: ComponentFixture<CadastroRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
