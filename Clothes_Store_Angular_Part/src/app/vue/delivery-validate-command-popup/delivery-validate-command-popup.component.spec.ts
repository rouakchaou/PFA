import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryValidateCommandPopupComponent } from './delivery-validate-command-popup.component';

describe('DeliveryValidateCommandPopupComponent', () => {
  let component: DeliveryValidateCommandPopupComponent;
  let fixture: ComponentFixture<DeliveryValidateCommandPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryValidateCommandPopupComponent]
    });
    fixture = TestBed.createComponent(DeliveryValidateCommandPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
