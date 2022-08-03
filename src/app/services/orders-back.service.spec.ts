import { TestBed } from '@angular/core/testing';

import { OrdersBackService } from './orders-back.service';

describe('OrdersBackService', () => {
  let service: OrdersBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
