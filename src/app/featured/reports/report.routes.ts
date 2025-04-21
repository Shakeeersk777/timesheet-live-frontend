import { Routes } from '@angular/router';
import { ROUTE_NAMES } from '../../shared/enums/routes.enum';

export const reportsRoutes: Routes = [
  {
    path: ROUTE_NAMES.REPORT.LIST,
    loadComponent: () =>
      import('./view-reports/view-reports.component').then(
        (component) => component.ViewReportsComponent
      ),
    title: 'View Reports',
  },
];
