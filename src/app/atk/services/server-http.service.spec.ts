import { TestBed, inject } from '@angular/core/testing';

import { ServerHttpService } from './server-http.service';

describe('ServerHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerHttpService]
    });
  });

  it('should be created', inject([ServerHttpService], (service: ServerHttpService) => {
    expect(service).toBeTruthy();
  }));
});
