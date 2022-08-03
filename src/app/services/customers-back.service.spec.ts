import { TestBed } from '@angular/core/testing';

import { CustomersBackService } from './customers-back.service';

describe('CustomersBackService', () => {
  let service: CustomersBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomersBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
