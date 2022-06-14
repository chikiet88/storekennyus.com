import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesanphamchitietComponent } from './themesanphamchitiet.component';

describe('ThemesanphamchitietComponent', () => {
  let component: ThemesanphamchitietComponent;
  let fixture: ComponentFixture<ThemesanphamchitietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemesanphamchitietComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemesanphamchitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
