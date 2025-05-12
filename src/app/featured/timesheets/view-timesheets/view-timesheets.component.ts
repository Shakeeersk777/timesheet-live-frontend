import { Component, inject } from '@angular/core';
import {
  TABLE_ACTION_BUTTONS,
  TableViewComponent,
} from '../../../shared/components/table-view/table-view.component';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { LayoutService } from '../../layout/layout.service';
import { TimesheetService } from '../timesheet.service';
import { IApiResponce } from '../../../core/models/models.interfece';
import { ITimesheet } from '../timesheet.modal';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-view-timesheets',
  standalone: true,
  imports: [TableViewComponent],
  templateUrl: './view-timesheets.component.html',
  styleUrl: './view-timesheets.component.scss',
})
export class ViewTimesheetsComponent {
  columns = [
    { key: 'StartDate', header: 'Start Date' },
    { key: 'EndDate', header: 'End Date' },
    { key: 'Hours', header: 'Hours Worked' },
    { key: 'Status', header: 'Status' },
    { key: 'Description', header: 'Description' },
    { key: 'CreatedDate', header: 'Submitted On' },
  ];

  statusColors = {
    Pending: 'orange',
    Approved: 'green',
    Rejected: 'red'
  }

  _router: Router = inject(Router);
  private _layoutService: LayoutService = inject(LayoutService);
  private _timesheetService: TimesheetService = inject(TimesheetService);
  private _authService: AuthService = inject(AuthService);
  timesheetList: ITimesheet[] = [];
  actionBtnPermissions = [TABLE_ACTION_BUTTONS.VIEW];
  isAdmin = false;

  ngOnInit(): void {
    const currentLoggedUser = this._authService.getCurrentUser();
    this.isAdmin = currentLoggedUser?.isAdmin ?? false;

    this.getTimesheets();
  }

  getTimesheets(): void {
    const onSuccess = (res: IApiResponce): void => {
      if (!res) return;

      if (res._status) {
        this.timesheetList = res._data.map((item: ITimesheet) => ({
          ...item,
          StatusBorderColor: `3px solid ${this.statusColors[item.Status] || 'gray'}`
        }));
      } else {
        this.timesheetList = [];
        this._layoutService.openSnackBar(res._msg, res._status);
      }

      this._layoutService.stopTableLoaderState();
    };

    const onError = (error: any): void => {
      this._layoutService.onError(error);
    };

    const observer = {
      next: onSuccess,
      error: onError,
    };
    const userId = this._authService.getCurrentUser()?.employeeId ?? '';
    this._timesheetService.getEmployeeTimesheets(userId).subscribe(observer);
  }

  onAdd() {
    this._router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.TIMESHEET.BASE}/${ROUTE_NAMES.TIMESHEET.CREATE}`
    );
  }

  onView(timesheet: ITimesheet) {
    this._router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.TIMESHEET.BASE}/${ROUTE_NAMES.TIMESHEET.OVERVIEW}/${timesheet.Id}`
    );
  }
}
