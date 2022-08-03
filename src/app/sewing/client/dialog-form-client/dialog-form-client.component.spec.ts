import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormClientComponent } from './dialog-form-client.component';

describe('DialogFormClientComponent', () => {
  let component: DialogFormClientComponent;
  let fixture: ComponentFixture<DialogFormClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFormClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFormClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
