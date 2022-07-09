import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TatcasanphamComponent } from './tatcasanpham.component';

describe('TatcasanphamComponent', () => {
  let component: TatcasanphamComponent;
  let fixture: ComponentFixture<TatcasanphamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TatcasanphamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TatcasanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
