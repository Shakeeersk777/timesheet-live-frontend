import { Routes } from '@angular/router';
import { ROUTE_NAMES } from '../../shared/enums/routes.enum';

export const tasksRoutes: Routes = [
  {
    path: ROUTE_NAMES.TASK.CREATE,
    loadComponent: () =>
      import('./create-edit-tasks/create-edit-tasks.component').then(
        (component) => component.CreateEditTasksComponent
      ),
    title: 'Add Task',
  },
  {
    path: ROUTE_NAMES.TASK.LIST,
    loadComponent: () =>
      import('./view-tasks/view-tasks.component').then(
        (component) => component.ViewTasksComponent
      ),
    title: 'View Tasks',
  },
];
