import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetOverviewComponent } from './timesheet-overview.component';

describe('TimesheetOverviewComponent', () => {
  let component: TimesheetOverviewComponent;
  let fixture: ComponentFixture<TimesheetOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimesheetOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
