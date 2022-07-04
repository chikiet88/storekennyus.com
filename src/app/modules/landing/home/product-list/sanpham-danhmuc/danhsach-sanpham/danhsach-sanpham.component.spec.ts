import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachSanphamComponent } from './danhsach-sanpham.component';

describe('DanhsachSanphamComponent', () => {
  let component: DanhsachSanphamComponent;
  let fixture: ComponentFixture<DanhsachSanphamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachSanphamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachSanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
