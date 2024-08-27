import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcommandesComponent } from './viewcommandes.component';

describe('ViewcommandesComponent', () => {
  let component: ViewcommandesComponent;
  let fixture: ComponentFixture<ViewcommandesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewcommandesComponent]
    });
    fixture = TestBed.createComponent(ViewcommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
