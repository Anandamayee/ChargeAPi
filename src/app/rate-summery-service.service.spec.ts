import { TestBed, inject } from '@angular/core/testing';

import { RateSummeryServiceService } from './rate-summery-service.service';

describe('RateSummeryServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RateSummeryServiceService]
    });
  });

  it('should be created', inject([RateSummeryServiceService], (service: RateSummeryServiceService) => {
    expect(service).toBeTruthy();
  }));
});
