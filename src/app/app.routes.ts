import { Routes } from '@angular/router';
import { ROUTE_NAMES } from './shared/enums/routes.enum';
import { CanActivateGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: ROUTE_NAMES.BASE,
    redirectTo: ROUTE_NAMES.APP,
    pathMatch: 'full',
  },
  {
    path: ROUTE_NAMES.APP,
    canActivate: [CanActivateGuard],
    loadComponent: () =>
      import('./featured/layout/layout.component').then(
        (component) => component.LayoutComponent
      ),
    children: [
      {
        path: ROUTE_NAMES.DASHBOARD,
        loadComponent: () =>
          import('./featured/dashboard/dashboard.component').then(
            (component) => component.DashboardComponent
          ),
      },
      {
        path: ROUTE_NAMES.EMPLOYEE.BASE,
        loadChildren: () =>
          import('./featured/employees/employees.routes').then(
            (routes) => routes.employeeRoutes
          ),
      },
      {
        path: ROUTE_NAMES.PROJECT.BASE,
        loadChildren: () =>
          import('./featured/projects/project.routes').then(
            (routes) => routes.projectsRoutes
          ),
      },
      {
        path: ROUTE_NAMES.TASK.BASE,
        loadChildren: () =>
          import('./featured/tasks/task.routes').then(
            (routes) => routes.tasksRoutes
          ),
      },
      {
        path: ROUTE_NAMES.TIMESHEET.BASE,
        loadChildren: () =>
          import('./featured/timesheets/timesheet.routes').then(
            (routes) => routes.timesheetRoutes
          ),
      },
      {
        path: ROUTE_NAMES.REPORT.BASE,
        loadChildren: () =>
          import('./featured/reports/report.routes').then(
            (routes) => routes.reportsRoutes
          ),
      },
    ],
  },
  {
    path: ROUTE_NAMES.LOGIN,
    loadComponent: () =>
      import('./featured/accounts/login/login.component').then(
        (component) => component.LoginComponent
      ),
    title: 'Login',
  },
  {
    path: ROUTE_NAMES.WILD_CARD,
    redirectTo: ROUTE_NAMES.BASE,
    pathMatch: 'full',
  },
];
