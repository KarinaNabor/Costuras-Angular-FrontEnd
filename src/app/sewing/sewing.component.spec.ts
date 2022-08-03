import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SewingComponent } from './sewing.component';

describe('SewingComponent', () => {
  let component: SewingComponent;
  let fixture: ComponentFixture<SewingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SewingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SewingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
