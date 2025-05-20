import { Component, inject } from '@angular/core';
import {
  TABLE_ACTION_BUTTONS,
  TableViewComponent,
} from '../../../shared/components/table-view/table-view.component';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { LayoutService } from '../../layout/layout.service';
import { ITimesheet, TimesheetStatus } from '../timesheet.modal';
import { AuthService } from '../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { TIMESHEET_ACTIONS } from '../../../store/timesheet/timesheet.action';
import {
  selectAllTimesheets,
  selectTimesheetLoading,
} from '../../../store/timesheet/timesheet.selector';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectDropdownComponent } from '../../../shared/components/select-dropdown/select-dropdown.component';

@Component({
  selector: 'app-view-timesheets',
  standalone: true,
  imports: [TableViewComponent, ReactiveFormsModule, CommonModule, SelectDropdownComponent],
  templateUrl: './view-timesheets.component.html',
  styleUrl: './view-timesheets.component.scss',
})
export class ViewTimesheetsComponent {
  filterForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  filteredTimesheets: ITimesheet[] = [];
  timesheetList: ITimesheet[] = [];

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
    Rejected: 'red',
  };
  statusList = [
    TimesheetStatus.PENDING,
    TimesheetStatus.APPROVED,
    TimesheetStatus.REJECTED,
  ];

  store = inject(Store);
  timesheets$ = this.store.select(selectAllTimesheets);
  loading$ = this.store.select(selectTimesheetLoading);

  _router: Router = inject(Router);
  private _layoutService: LayoutService = inject(LayoutService);
  private _authService: AuthService = inject(AuthService);
  actionBtnPermissions = [TABLE_ACTION_BUTTONS.VIEW];
  isAdmin = false;

  ngOnInit(): void {
    this.initForm();

    const currentLoggedUser = this._authService.getCurrentUser();
    this.isAdmin = currentLoggedUser?.isAdmin ?? false;

    this.getTimesheets();

    this.timesheets$.subscribe((res: ITimesheet[]) => {
      if (!res) return;

      this.timesheetList = res.map((item: ITimesheet) => ({
        ...item,
        StatusBorderColor: `3px solid ${
          this.statusColors[item.Status] || 'gray'
        }`,
      }));

      this.filterByStatus()
    });

    this.loading$.subscribe((state) =>
      this._layoutService.updateTableLoaderState(state)
    );

    this.filterForm.controls['status'].valueChanges.subscribe((value) => {
      this.filterByStatus();
    });
  }

  initForm() {
    this.filterForm = this.formBuilder.group({
      status: new FormControl(TimesheetStatus.PENDING),
    });
  }

  getTimesheets(): void {
    const userId = this._authService.getCurrentUser()?.employeeId ?? '';
    this.store.dispatch(TIMESHEET_ACTIONS.LOAD_TIMESHEETS.LOAD({ id: userId }));
  }

  filterByStatus() {
    const status = this.filterForm.controls['status'].value;
    this.filteredTimesheets = this.timesheetList.filter(
      (res) => res.Status === status
    );
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
