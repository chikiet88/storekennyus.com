import { TestBed } from '@angular/core/testing';

import { AddBaivietService } from './add-baiviet.service';

describe('AddBaivietService', () => {
  let service: AddBaivietService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddBaivietService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
