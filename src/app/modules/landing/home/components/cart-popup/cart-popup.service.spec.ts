import { TestBed } from '@angular/core/testing';

import { CartPopupService } from './cart-popup.service';

describe('CartPopupService', () => {
  let service: CartPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
