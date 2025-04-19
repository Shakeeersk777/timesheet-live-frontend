import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTimesheetsComponent } from './view-timesheets.component';

describe('ViewTimesheetsComponent', () => {
  let component: ViewTimesheetsComponent;
  let fixture: ComponentFixture<ViewTimesheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTimesheetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTimesheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
