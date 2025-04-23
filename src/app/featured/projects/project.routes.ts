import { Routes } from '@angular/router';
import { ROUTE_NAMES } from '../../shared/enums/routes.enum';

export const projectsRoutes: Routes = [
  {
    path: ROUTE_NAMES.PROJECT.LIST,
    loadComponent: () =>
      import('./view-projects/view-projects.component').then(
        (component) => component.ViewProjectsComponent
      ),
    title: 'View Projects',
  },

  {
    path: `${ROUTE_NAMES.PROJECT.EDIT}/:id`,
    loadComponent: () =>
      import('./edit-project/edit-project.component').then(
        (component) => component.EditProjectComponent
      ),
    title: 'Edit Project',
  },
];
