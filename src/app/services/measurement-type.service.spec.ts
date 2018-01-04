import { TestBed, inject } from '@angular/core/testing';

import { MeasurementTypeService } from './measurement-type.service';

describe('MeasurementTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeasurementTypeService]
    });
  });

  it('should be created', inject([MeasurementTypeService], (service: MeasurementTypeService) => {
    expect(service).toBeTruthy();
  }));
});
