import { TestBed, inject } from '@angular/core/testing';

import { ForhimService } from './forhim.service';

describe('ForhimService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForhimService]
    });
  });

  it('should be created', inject([ForhimService], (service: ForhimService) => {
    expect(service).toBeTruthy();
  }));
});
