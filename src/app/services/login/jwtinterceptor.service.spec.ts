import { TestBed } from '@angular/core/testing';

import { JwtInterceptorService } from './jwtinterceptor.service';

describe('JwtinterceptorService', () => {
  let service: JwtInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
