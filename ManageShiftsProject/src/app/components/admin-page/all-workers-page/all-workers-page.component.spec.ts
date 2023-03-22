import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllWorkersPageComponent } from './all-workers-page.component';

describe('AllWorkersPageComponent', () => {
  let component: AllWorkersPageComponent;
  let fixture: ComponentFixture<AllWorkersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllWorkersPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllWorkersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
