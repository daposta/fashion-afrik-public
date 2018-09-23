import { TestBed, inject } from '@angular/core/testing';

import { ForherService } from './forher.service';

describe('ForherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForherService]
    });
  });

  it('should be created', inject([ForherService], (service: ForherService) => {
    expect(service).toBeTruthy();
  }));
});
