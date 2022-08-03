import { TestBed } from '@angular/core/testing';

import { ProductServicesBackService } from './product-services-back.service';

describe('ProductServicesBackService', () => {
  let service: ProductServicesBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductServicesBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
