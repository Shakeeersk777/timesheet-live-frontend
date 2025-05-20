import { Routes } from '@angular/router';
import { ROUTE_NAMES } from '../../shared/enums/routes.enum';
import { roleGuard } from '../../core/guards/role.guard';

export const tasksRoutes: Routes = [
  {
    path: ROUTE_NAMES.TASK.CREATE,
    canActivate: [roleGuard],
    loadComponent: () =>
      import('./create-task/create-task.component').then(
        (component) => component.CreateTaskComponent
      ),
    title: 'Add Task',
  },
  {
    path: `${ROUTE_NAMES.TASK.EDIT}/:id`,
    canActivate: [roleGuard],
    loadComponent: () =>
      import('./edit-task/edit-task.component').then(
        (component) => component.EditTaskComponent
      ),
    title: 'Update Task',
  },
  {
    path: `${ROUTE_NAMES.TASK.OVERVIEW}/:id`,
    loadComponent: () =>
      import('./task-overview/task-overview.component').then(
        (component) => component.TaskOverviewComponent
      ),
    title: 'Task Overview',
  },
  {
    path: ROUTE_NAMES.TASK.LIST,
    loadComponent: () =>
      import('./view-tasks/view-tasks.component').then(
        (component) => component.ViewTasksComponent
      ),
    title: 'View Tasks',
  },
  {
    path: ROUTE_NAMES.TASK.ASSIGN,
    canActivate: [roleGuard],
    loadComponent: () =>
      import('./assign-task/assign-task.component').then(
        (component) => component.AssignTaskComponent
      ),
    title: 'Assign Tasks',
  },
];
