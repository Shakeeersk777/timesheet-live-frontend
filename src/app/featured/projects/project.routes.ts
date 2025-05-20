import { Routes } from '@angular/router';
import { ROUTE_NAMES } from '../../shared/enums/routes.enum';
import { roleGuard } from '../../core/guards/role.guard';

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
    path: ROUTE_NAMES.PROJECT.CREATE,
    loadComponent: () =>
      import('./create-project/create-project.component').then(
        (component) => component.CreateProjectComponent
      ),
    title: 'Create Project',
  },
  {
    path: `${ROUTE_NAMES.PROJECT.EDIT}/:id`,
    canActivate: [roleGuard],
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
    canActivate: [roleGuard],
    loadComponent: () =>
      import('./assign-project/assign-project.component').then(
        (component) => component.AssignProjectComponent
      ),
    title: 'Assign Project',
  },
];
