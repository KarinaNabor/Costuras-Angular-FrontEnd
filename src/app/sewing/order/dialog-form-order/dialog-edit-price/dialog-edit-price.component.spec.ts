import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditPriceComponent } from './dialog-edit-price.component';

describe('DialogEditPriceComponent', () => {
  let component: DialogEditPriceComponent;
  let fixture: ComponentFixture<DialogEditPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
