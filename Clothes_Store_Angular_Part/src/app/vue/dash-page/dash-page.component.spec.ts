import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashPageComponent } from './dash-page.component';

describe('DashPageComponent', () => {
  let component: DashPageComponent;
  let fixture: ComponentFixture<DashPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashPageComponent]
    });
    fixture = TestBed.createComponent(DashPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
