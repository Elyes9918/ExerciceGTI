import { TestBed } from '@angular/core/testing';

import { AuthenticiationService } from './authenticiation.service';

describe('AuthenticiationService', () => {
  let service: AuthenticiationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticiationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
