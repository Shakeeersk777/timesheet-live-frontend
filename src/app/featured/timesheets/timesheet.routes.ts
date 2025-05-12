import { Routes } from '@angular/router';
import { ROUTE_NAMES } from '../../shared/enums/routes.enum';

export const timesheetRoutes: Routes = [
  {
    path: ROUTE_NAMES.TIMESHEET.CREATE,
    loadComponent: () =>
      import('./create-timesheet/create-timesheet.component').then(
        (component) => component.CreateTimesheetComponent
      ),
    title: 'Fill Timesheet',
  },
  {
    path: ROUTE_NAMES.TIMESHEET.LIST,
    loadComponent: () =>
      import('./view-timesheets/view-timesheets.component').then(
        (component) => component.ViewTimesheetsComponent
      ),
    title: 'View Timesheets',
  },
  {
    path: `${ROUTE_NAMES.TIMESHEET.OVERVIEW}/:id`,
    loadComponent: () =>
      import('./timesheet-overview/timesheet-overview.component').then(
        (component) => component.TimesheetOverviewComponent
      ),
    title: 'Timesheet Overview',
  },
];
