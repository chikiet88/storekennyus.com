import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanphamDanhmucComponent } from './sanpham-danhmuc.component';

describe('SanphamDanhmucComponent', () => {
  let component: SanphamDanhmucComponent;
  let fixture: ComponentFixture<SanphamDanhmucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanphamDanhmucComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanphamDanhmucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
