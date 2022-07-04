import { TestBed } from '@angular/core/testing';

import { ThuonghieuService } from './thuonghieu.service';

describe('ThuonghieuService', () => {
  let service: ThuonghieuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThuonghieuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
