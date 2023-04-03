import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerOfTheMonthComponent } from './worker-of-the-month.component';

describe('WorkerOfTheMonthComponent', () => {
  let component: WorkerOfTheMonthComponent;
  let fixture: ComponentFixture<WorkerOfTheMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerOfTheMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerOfTheMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
