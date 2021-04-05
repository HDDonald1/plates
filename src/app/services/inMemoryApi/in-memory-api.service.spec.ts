import { TestBed } from '@angular/core/testing';

import { InMemOwnerService } from './in-memory-api.service';

describe('InMemoryApiService', () => {
  let service: InMemOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
