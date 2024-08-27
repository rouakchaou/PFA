import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateCommandPopupComponent } from './validate-command-popup.component';

describe('ValidateCommandPopupComponent', () => {
  let component: ValidateCommandPopupComponent;
  let fixture: ComponentFixture<ValidateCommandPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidateCommandPopupComponent]
    });
    fixture = TestBed.createComponent(ValidateCommandPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
