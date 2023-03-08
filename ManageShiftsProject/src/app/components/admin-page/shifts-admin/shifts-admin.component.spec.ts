import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsAdminComponent } from './shifts-admin.component';

describe('ShiftsAdminComponent', () => {
  let component: ShiftsAdminComponent;
  let fixture: ComponentFixture<ShiftsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
