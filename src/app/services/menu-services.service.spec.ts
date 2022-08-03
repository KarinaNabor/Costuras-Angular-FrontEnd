import { TestBed } from '@angular/core/testing';

import { MenuServicesService } from './menu-services.service';

describe('MenuServicesService', () => {
  let service: MenuServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
