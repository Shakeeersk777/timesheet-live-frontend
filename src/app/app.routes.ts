import { Routes } from '@angular/router';
import { LoginComponent } from './featured/accounts/login/login.component';
import { CreateTimesheetComponent } from './featured/timesheets/create-timesheet/create-timesheet.component';
import { LayoutComponent } from './featured/layout/layout.component';
import { ViewTimesheetsComponent } from './featured/timesheets/view-timesheets/view-timesheets.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full',
  },
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      {
        path: 'add-timesheet',
        component: CreateTimesheetComponent,
        title: 'Fill Timesheet'
      },
      {
        path: 'view-timesheet',
        component: ViewTimesheetsComponent,
        title: 'View Timesheets'
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  },
];
