import { TestBed } from '@angular/core/testing';

import { PurchaseService } from './purchases.service';

describe('PurchasesService', () => {
  let service: PurchaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
