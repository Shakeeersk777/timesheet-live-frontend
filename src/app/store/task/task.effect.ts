import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { TASK_ACTIONS } from './task.action';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../shared/enums/routes.enum';
import { IApiResponce } from '../../core/models/models.interfece';
import { TaskService } from '../../featured/tasks/task.service';

@Injectable()
export class TaskEffects {
  actions$: Actions = inject(Actions);
  _taskService: TaskService = inject(TaskService);
  private router: Router = inject(Router);

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TASK_ACTIONS.LOAD_TASKS.LOAD),
      mergeMap(() =>
        this._taskService.getAllTasks().pipe(
          map((data) => TASK_ACTIONS.LOAD_TASKS.SUCCESS({ data })),
          catchError((error) =>
            of(TASK_ACTIONS.LOAD_TASKS.FAILURE({ error }))
          )
        )
      )
    )
  );

  loadTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TASK_ACTIONS.LOAD_TASK.LOAD),
      mergeMap((action) =>
        this._taskService.getTaskOverview(action.id).pipe(
          map((data) => TASK_ACTIONS.LOAD_TASK.SUCCESS({ data })),
          catchError((error) =>
            of(TASK_ACTIONS.LOAD_TASK.FAILURE({ error }))
          )
        )
      )
    )
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TASK_ACTIONS.ADD_TASK.LOAD),
      mergeMap((action) =>
        this._taskService.addTask(action.payload).pipe(
          mergeMap((res: IApiResponce) => {
            if (res._status) {
              // Navigate first (side effect)
              this.router.navigateByUrl(
                `${ROUTE_NAMES.APP}/${ROUTE_NAMES.TASK.BASE}/${ROUTE_NAMES.TASK.LIST}`
              );
              // Then dispatch SUCCESS action
              return of(TASK_ACTIONS.ADD_TASK.SUCCESS());
            } else {
              // Dispatch FAILURE action with error message
              return of(
                TASK_ACTIONS.ADD_TASK.FAILURE({
                  error: res._msg,
                })
              );
            }
          }),
          catchError((error) =>
            of(TASK_ACTIONS.ADD_TASK.FAILURE({ error }))
          )
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TASK_ACTIONS.UPDATE_TASK.LOAD),
      mergeMap((action) =>
        this._taskService.updateTask(action.id, action.payload).pipe(
          mergeMap((res: IApiResponce) => {
            if (res._status) {
              this.router.navigateByUrl(
                `${ROUTE_NAMES.APP}/${ROUTE_NAMES.TASK.BASE}/${ROUTE_NAMES.TASK.LIST}`
              );
              return of(TASK_ACTIONS.UPDATE_TASK.SUCCESS());
            } else {
              return of(
                TASK_ACTIONS.UPDATE_TASK.FAILURE({
                  error: res._msg,
                })
              );
            }
          }),
          catchError((error) =>
            of(TASK_ACTIONS.UPDATE_TASK.FAILURE({ error }))
          )
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TASK_ACTIONS.DELETE_TASK.LOAD),
      mergeMap((action) =>
        this._taskService.deleteTask(action.id).pipe(
          mergeMap((res: IApiResponce) => {
            if (res._status) {
              return of(TASK_ACTIONS.LOAD_TASKS.LOAD());
            } else {
              return of(
                TASK_ACTIONS.DELETE_TASK.FAILURE({
                  error: res._msg,
                })
              );
            }
          }),
          catchError((error) =>
            of(TASK_ACTIONS.DELETE_TASK.FAILURE({ error }))
          )
        )
      )
    )
  );

  assignTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TASK_ACTIONS.ASSIGN_TASK.LOAD),
      mergeMap((action) =>
        this._taskService.assignTask(action.id, action.payload).pipe(
          mergeMap((res: IApiResponce) => {
            if (res._status) {
              this.router.navigateByUrl(
                `${ROUTE_NAMES.APP}/${ROUTE_NAMES.TASK.BASE}/${ROUTE_NAMES.TASK.LIST}`
              );
              return of(TASK_ACTIONS.ASSIGN_TASK.SUCCESS());
            } else {
              return of(
                TASK_ACTIONS.ASSIGN_TASK.FAILURE({
                  error: res._msg,
                })
              );
            }
          }),
          catchError((error) =>
            of(TASK_ACTIONS.ASSIGN_TASK.FAILURE({ error }))
          )
        )
      )
    )
  );
}
