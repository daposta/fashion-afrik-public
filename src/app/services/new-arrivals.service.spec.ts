import { TestBed, inject } from '@angular/core/testing';

import { NewArrivalsService } from './new-arrivals.service';

describe('NewArrivalsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewArrivalsService]
    });
  });

  it('should be created', inject([NewArrivalsService], (service: NewArrivalsService) => {
    expect(service).toBeTruthy();
  }));
});
