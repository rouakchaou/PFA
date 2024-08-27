import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategPopupComponent } from './list-categ-popup.component';

describe('ListCategPopupComponent', () => {
  let component: ListCategPopupComponent;
  let fixture: ComponentFixture<ListCategPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCategPopupComponent]
    });
    fixture = TestBed.createComponent(ListCategPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
