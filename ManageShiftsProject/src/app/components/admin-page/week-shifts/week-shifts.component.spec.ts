import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekShiftsComponent } from './week-shifts.component';

describe('WeekShiftsComponent', () => {
  let component: WeekShiftsComponent;
  let fixture: ComponentFixture<WeekShiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekShiftsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
