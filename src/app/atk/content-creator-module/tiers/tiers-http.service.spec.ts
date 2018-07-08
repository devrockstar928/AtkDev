import { TestBed, inject } from '@angular/core/testing';

import { TiersHttpService } from './tiers-http.service';

describe('TiersHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TiersHttpService]
    });
  });

  it('should be created', inject([TiersHttpService], (service: TiersHttpService) => {
    expect(service).toBeTruthy();
  }));
});
