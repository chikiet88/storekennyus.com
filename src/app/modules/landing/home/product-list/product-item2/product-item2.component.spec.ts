import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItem2Component } from './product-item2.component';

describe('ProductItem2Component', () => {
  let component: ProductItem2Component;
  let fixture: ComponentFixture<ProductItem2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductItem2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItem2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
