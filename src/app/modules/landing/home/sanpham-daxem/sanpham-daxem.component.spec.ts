import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanphamDaxemComponent } from './sanpham-daxem.component';

describe('SanphamDaxemComponent', () => {
  let component: SanphamDaxemComponent;
  let fixture: ComponentFixture<SanphamDaxemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanphamDaxemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanphamDaxemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
