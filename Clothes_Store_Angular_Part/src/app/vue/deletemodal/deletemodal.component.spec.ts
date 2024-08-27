import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletemodalComponent } from './deletemodal.component';

describe('DeletemodalComponent', () => {
  let component: DeletemodalComponent;
  let fixture: ComponentFixture<DeletemodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletemodalComponent]
    });
    fixture = TestBed.createComponent(DeletemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
