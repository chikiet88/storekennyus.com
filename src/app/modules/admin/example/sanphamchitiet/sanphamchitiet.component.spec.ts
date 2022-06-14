import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanphamchitietComponent } from './sanphamchitiet.component';

describe('SanphamchitietComponent', () => {
  let component: SanphamchitietComponent;
  let fixture: ComponentFixture<SanphamchitietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanphamchitietComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanphamchitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
