import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireCommandePopupComponent } from './formulaire-commande-popup.component';

describe('FormulaireCommandePopupComponent', () => {
  let component: FormulaireCommandePopupComponent;
  let fixture: ComponentFixture<FormulaireCommandePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormulaireCommandePopupComponent]
    });
    fixture = TestBed.createComponent(FormulaireCommandePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
