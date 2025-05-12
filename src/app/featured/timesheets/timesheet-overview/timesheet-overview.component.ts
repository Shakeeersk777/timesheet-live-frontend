import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { IApiResponce } from '../../../core/models/models.interfece';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { LayoutService } from '../../layout/layout.service';
import { TimesheetService } from '../timesheet.service';
import { ITimesheet, TimesheetStatus } from '../timesheet.modal';
import { formatDate } from '../../../core/utils/common-functions';

@Component({
  selector: 'app-timesheet-overview',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './timesheet-overview.component.html',
  styleUrl: './timesheet-overview.component.scss',
})
export class TimesheetOverviewComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private _layoutService: LayoutService = inject(LayoutService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  overviewForm!: FormGroup;
  timesheetOverviewData: ITimesheet | null | undefined;
  approvalStatus = TimesheetStatus;
  private _timesheetService: TimesheetService = inject(TimesheetService);
  timesheetId = '';

  ngOnInit(): void {
    this.initForm();

    this.activatedRoute.paramMap.subscribe((params) => {
      this.timesheetId = params.get('id') ?? '';

      if (!this.timesheetId) return;
      this.getTimesheetOverview();
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
    const onSuccess = (res: IApiResponce): void => {
      if (!res) return;

      this.timesheetOverviewData = res._data;

      if (!res._status) {
        this._layoutService.openSnackBar(res._msg, res._status);
        return;
      }

      if (!this.timesheetOverviewData) return;
      this.setOverview();
    };

    const onError = (error: any) => {
      this._layoutService.onError(error);
    };

    const oberver = {
      next: onSuccess,
      error: onError,
    };

    this._timesheetService
      .getTimesheetOverview(this.timesheetId)
      .subscribe(oberver);
  }

  updateApprovalStatus(approvalStatus: TimesheetStatus) {
    const onSuccess = (res: IApiResponce): void => {
      if (!res) return;

      if (!res._status) {
        this._layoutService.openSnackBar(res._msg, res._status);
        return;
      }

      this.getTimesheetOverview();
    };

    const onError = (error: any) => {
      this._layoutService.onError(error);
    };

    const oberver = {
      next: onSuccess,
      error: onError,
    };

    if (!this.timesheetOverviewData?.Id) return;

    this._timesheetService
      .updateApprovalStatus(this.timesheetId, approvalStatus)
      .subscribe(oberver);
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
