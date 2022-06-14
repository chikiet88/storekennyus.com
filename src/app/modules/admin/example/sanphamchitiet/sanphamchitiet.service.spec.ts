import { TestBed } from '@angular/core/testing';

import { SanphamchitietService } from './sanphamchitiet.service';

describe('SanphamchitietService', () => {
  let service: SanphamchitietService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SanphamchitietService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
