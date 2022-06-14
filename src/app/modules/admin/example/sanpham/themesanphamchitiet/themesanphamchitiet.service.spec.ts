import { TestBed } from '@angular/core/testing';

import { ThemesanphamchitietService } from './themesanphamchitiet.service';

describe('ThemesanphamchitietService', () => {
  let service: ThemesanphamchitietService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemesanphamchitietService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
