import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProdPopupComponent } from './details-prod-popup.component';

describe('DetailsProdPopupComponent', () => {
  let component: DetailsProdPopupComponent;
  let fixture: ComponentFixture<DetailsProdPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsProdPopupComponent]
    });
    fixture = TestBed.createComponent(DetailsProdPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
