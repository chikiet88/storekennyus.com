import { TestBed } from '@angular/core/testing';

import { BaivietService } from './baiviet.service';

describe('BaivietService', () => {
  let service: BaivietService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaivietService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
