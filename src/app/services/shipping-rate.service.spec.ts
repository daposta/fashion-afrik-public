import { TestBed, inject } from '@angular/core/testing';

import { ShippingRateService } from './shipping-rate.service';

describe('ShippingRateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShippingRateService]
    });
  });

  it('should be created', inject([ShippingRateService], (service: ShippingRateService) => {
    expect(service).toBeTruthy();
  }));
});
