import { Routes } from '@angular/router';
import { ROUTE_NAMES } from '../../shared/enums/routes.enum';

export const projectsRoutes: Routes = [
  {
    path: ROUTE_NAMES.PROJECT.CREATE,
    loadComponent: () =>
      import('./create-edit-project/create-edit-project.component').then(
        (component) => component.CreateEditProjectComponent
      ),
    title: 'Add Project',
  },
  {
    path: ROUTE_NAMES.PROJECT.LIST,
    loadComponent: () =>
      import('./view-projects/view-projects.component').then(
        (component) => component.ViewProjectsComponent
      ),
    title: 'View Projects',
  },
  {
    path: ROUTE_NAMES.PROJECT.ASSIGN,
    loadComponent: () =>
      import('./assign-project/assign-project.component').then(
        (component) => component.AssignProjectComponent
      ),
    title: 'Assign Projects',
  },
];
