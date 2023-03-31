import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighestEarningsMonthComponent } from './highest-earnings-month.component';

describe('HighestEarningsMonthComponent', () => {
  let component: HighestEarningsMonthComponent;
  let fixture: ComponentFixture<HighestEarningsMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighestEarningsMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighestEarningsMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
