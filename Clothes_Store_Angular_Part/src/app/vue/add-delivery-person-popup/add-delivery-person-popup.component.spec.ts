import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeliveryPersonPopupComponent } from './add-delivery-person-popup.component';

describe('AddDeliveryPersonPopupComponent', () => {
  let component: AddDeliveryPersonPopupComponent;
  let fixture: ComponentFixture<AddDeliveryPersonPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDeliveryPersonPopupComponent]
    });
    fixture = TestBed.createComponent(AddDeliveryPersonPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
