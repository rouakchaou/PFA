import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitCommandPopupComponent } from './submit-command-popup.component';

describe('SubmitCommandPopupComponent', () => {
  let component: SubmitCommandPopupComponent;
  let fixture: ComponentFixture<SubmitCommandPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitCommandPopupComponent]
    });
    fixture = TestBed.createComponent(SubmitCommandPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
