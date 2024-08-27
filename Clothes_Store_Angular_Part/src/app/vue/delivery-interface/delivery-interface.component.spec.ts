import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryInterfaceComponent } from './delivery-interface.component';

describe('DeliveryInterfaceComponent', () => {
  let component: DeliveryInterfaceComponent;
  let fixture: ComponentFixture<DeliveryInterfaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryInterfaceComponent]
    });
    fixture = TestBed.createComponent(DeliveryInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
