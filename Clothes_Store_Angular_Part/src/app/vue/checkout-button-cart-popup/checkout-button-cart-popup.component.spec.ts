import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutButtonCartPopupComponent } from './checkout-button-cart-popup.component';

describe('CheckoutButtonCartPopupComponent', () => {
  let component: CheckoutButtonCartPopupComponent;
  let fixture: ComponentFixture<CheckoutButtonCartPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutButtonCartPopupComponent]
    });
    fixture = TestBed.createComponent(CheckoutButtonCartPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
