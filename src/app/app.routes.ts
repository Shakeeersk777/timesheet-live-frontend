import { Routes } from '@angular/router';
import { ROUTE_NAMES } from './shared/enums/routes.enum';
import { authGuard } from './core/guards/auth.guard';
import { ProfileOptionsComponent } from './featured/accounts/profile-options/profile-options.component';

export const routes: Routes = [
  {
    path: ROUTE_NAMES.BASE,
    redirectTo: ROUTE_NAMES.APP,
    pathMatch: 'full',
  },
  {
    path: ROUTE_NAMES.APP,
    canActivate: [authGuard],
    loadComponent: () =>
      import('./featured/layout/layout.component').then(
        (component) => component.LayoutComponent
      ),
    children: [
      {
        path: '',
        redirectTo: ROUTE_NAMES.DASHBOARD,
        pathMatch: 'full',
      },
      {
        path: ROUTE_NAMES.DASHBOARD,
        loadComponent: () =>
          import('./featured/dashboard/components/dashboard.component').then(
            (component) => component.DashboardComponent
          ),
        title: 'Dashboard',
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
      {
        path: `${ROUTE_NAMES.AUTH.BASE}/${ROUTE_NAMES.AUTH.PROFILE}`,
        component: ProfileOptionsComponent,
        children: [
          {
            path: `${ROUTE_NAMES.AUTH.OVERVIEW}/:id`,
            loadComponent: () =>
              import('./featured/accounts/profile/profile.component').then(
                (m) => m.ProfileComponent
              ),
            title: 'Profile',
          },
          {
            path: ROUTE_NAMES.AUTH.RESET_PASSWORD,
            loadComponent: () =>
              import(
                './featured/accounts/reset-password/reset-password.component'
              ).then((m) => m.ResetPasswordComponent),
            title: 'Reset Password',
          },
        ],
      },
    ],
  },
  {
    path: ROUTE_NAMES.AUTH.BASE,
    loadChildren: () =>
      import('./featured/accounts/accounts.routes').then(
        (routes) => routes.accountRoutes
      ),
  },
  {
    path: ROUTE_NAMES.ACCESS_DENIED,
    loadComponent: () =>
      import('./shared/components/access-denied/access-denied.component').then(
        (component) => component.AccessDeniedComponent
      ),
    title: 'Access Denied',
  },
  {
    path: ROUTE_NAMES.WILD_CARD,
    redirectTo: ROUTE_NAMES.BASE,
    pathMatch: 'full',
  },
];
