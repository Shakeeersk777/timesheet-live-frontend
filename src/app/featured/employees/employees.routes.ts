import { Routes } from '@angular/router';
import { ROUTE_NAMES } from '../../shared/enums/routes.enum';
import { canActivateFn } from '../../core/guards/auth.guard';

export const employeeRoutes: Routes = [
  {
    path: ROUTE_NAMES.EMPLOYEE.CREATE,
    loadComponent: () =>
      import('./components/create-employee/create-employee.component').then(
        (component) => component.CreateEmployeeComponent
      ),
    title: 'Add Employee',
  },
  {
    path: `${ROUTE_NAMES.EMPLOYEE.EDIT}/:id`,
    canActivate: [canActivateFn],
    loadComponent: () =>
      import('./components/edit-employee/edit-employee.component').then(
        (component) => component.EditEmployeeComponent
      ),
    title: 'Update Employee',
  },
  {
    path: `${ROUTE_NAMES.EMPLOYEE.OVERVIEW}/:id`,
    loadComponent: () =>
      import('./components/employee-overview/employee-overview.component').then(
        (component) => component.EmployeeOverviewComponent
      ),
    title: 'Employee Overview',
  },
  {
    path: ROUTE_NAMES.EMPLOYEE.LIST,
    canActivate: [canActivateFn],
    loadComponent: () =>
      import('./components/view-employees/view-employees.component').then(
        (component) => component.ViewEmployeesComponent
      ),
    title: 'View Employees',
  },
];
