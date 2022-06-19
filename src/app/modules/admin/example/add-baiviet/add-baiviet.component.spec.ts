import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBaivietComponent } from './add-baiviet.component';

describe('AddBaivietComponent', () => {
  let component: AddBaivietComponent;
  let fixture: ComponentFixture<AddBaivietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBaivietComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBaivietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
