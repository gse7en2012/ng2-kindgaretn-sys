import { TestBed, inject } from '@angular/core/testing';

import { ExtendedHttpService } from './extended-http.service';

describe('ExtendedHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExtendedHttpService]
    });
  });

  it('should be created', inject([ExtendedHttpService], (service: ExtendedHttpService) => {
    expect(service).toBeTruthy();
  }));
});
