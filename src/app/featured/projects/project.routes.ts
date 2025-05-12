import { Routes } from '@angular/router';
import { ROUTE_NAMES } from '../../shared/enums/routes.enum';
import { canActivateFn } from '../../core/guards/auth.guard';

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
    canActivate: [canActivateFn],
    loadComponent: () =>
      import('./edit-project/edit-project.component').then(
        (component) => component.EditProjectComponent
      ),
    title: 'Edit Project',
  },
  {
    path: `${ROUTE_NAMES.PROJECT.OVERVIEW}/:id`,
    loadComponent: () =>
      import('./project-overview/project-overview.component').then(
        (component) => component.ProjectOverviewComponent
      ),
    title: 'Project Overview',
  },
  {
    path: ROUTE_NAMES.PROJECT.ASSIGN,
    canActivate: [canActivateFn],
    loadComponent: () =>
      import('./assign-project/assign-project.component').then(
        (component) => component.AssignProjectComponent
      ),
    title: 'Assign Project',
  },
];
