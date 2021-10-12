import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizaArquivoComponent } from './visualiza-arquivo.component';

describe('VisualizaArquivoComponent', () => {
  let component: VisualizaArquivoComponent;
  let fixture: ComponentFixture<VisualizaArquivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizaArquivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizaArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
