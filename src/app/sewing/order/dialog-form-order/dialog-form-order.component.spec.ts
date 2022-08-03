import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormOrderComponent } from './dialog-form-order.component';

describe('DialogFormOrderComponent', () => {
  let component: DialogFormOrderComponent;
  let fixture: ComponentFixture<DialogFormOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFormOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFormOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
