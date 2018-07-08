import { TestBed, inject } from '@angular/core/testing';

import { ReportsHttpService } from './reports-http.service';

describe('ReportsHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportsHttpService]
    });
  });

  it('should be created', inject([ReportsHttpService], (service: ReportsHttpService) => {
    expect(service).toBeTruthy();
  }));
});
