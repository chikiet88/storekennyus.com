import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreLoveComponent } from './more-love.component';

describe('MoreLoveComponent', () => {
  let component: MoreLoveComponent;
  let fixture: ComponentFixture<MoreLoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreLoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreLoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
