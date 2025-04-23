import { Routes } from '@angular/router';
import { ROUTE_NAMES } from '../../shared/enums/routes.enum';

export const employeeRoutes: Routes = [
  {
    path: ROUTE_NAMES.EMPLOYEE.CREATE,
    loadComponent: () =>
      import('./create-edit-employee/create-edit-employee.component').then(
        (component) => component.CreateEditEmployeeComponent
      ),
    title: 'Add Employee',
  },
  {
    path: `${ROUTE_NAMES.EMPLOYEE.EDIT}/:id`,
    loadComponent: () =>
      import('./create-edit-employee/create-edit-employee.component').then(
        (component) => component.CreateEditEmployeeComponent
      ),
    title: 'Update Employee',
  },
  {
    path: ROUTE_NAMES.EMPLOYEE.OVERVIEW,
    loadComponent: () =>
        import('./employee-overview/employee-overview.component').then(
          (component) => component.EmployeeOverviewComponent
        ),
    title: 'Employee Overview',
  },
  {
    path: ROUTE_NAMES.EMPLOYEE.LIST,
    loadComponent: () =>
        import('./view-employees/view-employees.component').then(
          (component) => component.ViewEmployeesComponent
        ),
    title: 'View Employees',
  },
];
