import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ITimesheet, TimesheetStatus } from '../timesheet.modal';
import { formatDate } from '../../../core/utils/common-functions';
import { AuthService } from '../../../core/services/auth.service';
import {
  selectTimesheet,
  selectTimesheetLoading,
} from '../../../store/timesheet/timesheet.selector';
import { Store } from '@ngrx/store';
import { TIMESHEET_ACTIONS } from '../../../store/timesheet/timesheet.action';

@Component({
  selector: 'app-timesheet-overview',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './timesheet-overview.component.html',
  styleUrl: './timesheet-overview.component.scss',
})
export class TimesheetOverviewComponent {
  store = inject(Store);
  timesheets$ = this.store.select(selectTimesheet);
  loading$ = this.store.select(selectTimesheetLoading);

  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  overviewForm!: FormGroup;
  timesheetOverviewData: ITimesheet | null | undefined;
  approvalStatus = TimesheetStatus;
  private _authService: AuthService = inject(AuthService);
  timesheetId = '';
  isAdmin: boolean = false;

  ngOnInit(): void {
    const currentUser = this._authService.getCurrentUser();
    if (!currentUser) return;
    this.isAdmin = currentUser.isAdmin;

    this.initForm();

    this.activatedRoute.paramMap.subscribe((params) => {
      this.timesheetId = params.get('id') ?? '';

      if (!this.timesheetId) return;
      this.getTimesheetOverview();
    });

    this.timesheets$.subscribe((res: ITimesheet) => {
      if (!res) return;
      this.timesheetOverviewData = res;
      this.setOverview();
    });
  }

  initForm() {
    this.overviewForm = this.formBuilder.group({
      projectName: new FormControl(null),
      taskName: new FormControl(null),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      hours: new FormControl(null),
      description: new FormControl(null),
      createdDate: new FormControl(null),
    });
  }

  getTimesheetOverview() {
    this.store.dispatch(
      TIMESHEET_ACTIONS.LOAD_TIMESHEET.LOAD({ id: this.timesheetId })
    );
  }

  updateApprovalStatus(approvalStatus: TimesheetStatus) {
    this.store.dispatch(
      TIMESHEET_ACTIONS.UPDATE_APPROVAL_STATUS.LOAD({
        id: this.timesheetId,
        status: approvalStatus,
      })
    );
  }

  setOverview() {
    const formData = {
      projectName: this.timesheetOverviewData?.Project?.ProjectName ?? 'N/A',
      taskName: this.timesheetOverviewData?.Task?.TaskName ?? 'N/A',
      startDate: this.timesheetOverviewData?.StartDate
        ? formatDate(this.timesheetOverviewData.StartDate)
        : null,
      endDate: this.timesheetOverviewData?.EndDate
        ? formatDate(this.timesheetOverviewData.EndDate)
        : null,
      hours: this.timesheetOverviewData?.Hours ?? 'N/A',
      description: this.timesheetOverviewData?.Description ?? 'N/A',
      createdDate: this.timesheetOverviewData?.CreatedDate
        ? formatDate(this.timesheetOverviewData.CreatedDate)
        : null,
    };
    this.overviewForm.patchValue(formData);
  }

  navigateToList(): void {
    this.router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.TIMESHEET.BASE}/${ROUTE_NAMES.TIMESHEET.LIST}`
    );
  }
}
