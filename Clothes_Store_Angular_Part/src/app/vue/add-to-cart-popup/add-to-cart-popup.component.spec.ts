import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartPopupComponent } from './add-to-cart-popup.component';

describe('AddToCartPopupComponent', () => {
  let component: AddToCartPopupComponent;
  let fixture: ComponentFixture<AddToCartPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddToCartPopupComponent]
    });
    fixture = TestBed.createComponent(AddToCartPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
