import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { PROJECT_ACTIONS } from './project.action';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../shared/enums/routes.enum';
import { IApiResponce } from '../../core/models/models.interfece';
import { ProjectService } from '../../featured/projects/project.service';

@Injectable()
export class ProjectEffects {
  actions$: Actions = inject(Actions);
  _projectService: ProjectService = inject(ProjectService);
  private router: Router = inject(Router);

  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PROJECT_ACTIONS.LOAD_PROJECTS.LOAD),
      mergeMap(() =>
        this._projectService.getAllProjects().pipe(
          map((data) => PROJECT_ACTIONS.LOAD_PROJECTS.SUCCESS({ data })),
          catchError((error) =>
            of(PROJECT_ACTIONS.LOAD_PROJECTS.FAILURE({ error }))
          )
        )
      )
    )
  );

  loadProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PROJECT_ACTIONS.LOAD_PROJECT.LOAD),
      mergeMap((action) =>
        this._projectService.getProjectOverview(action.id).pipe(
          map((data) => PROJECT_ACTIONS.LOAD_PROJECT.SUCCESS({ data })),
          catchError((error) =>
            of(PROJECT_ACTIONS.LOAD_PROJECT.FAILURE({ error }))
          )
        )
      )
    )
  );

  createProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PROJECT_ACTIONS.ADD_PROJECT.LOAD),
      mergeMap((action) =>
        this._projectService.addProject(action.payload).pipe(
          mergeMap((res: IApiResponce) => {
            if (res._status) {
              // Navigate first (side effect)
              this.router.navigateByUrl(
                `${ROUTE_NAMES.APP}/${ROUTE_NAMES.PROJECT.BASE}/${ROUTE_NAMES.PROJECT.LIST}`
              );
              // Then dispatch SUCCESS action
              return of(PROJECT_ACTIONS.ADD_PROJECT.SUCCESS());
            } else {
              // Dispatch FAILURE action with error message
              return of(
                PROJECT_ACTIONS.ADD_PROJECT.FAILURE({
                  error: res._msg,
                })
              );
            }
          }),
          catchError((error) =>
            of(PROJECT_ACTIONS.ADD_PROJECT.FAILURE({ error }))
          )
        )
      )
    )
  );

  updateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PROJECT_ACTIONS.UPDATE_PROJECT.LOAD),
      mergeMap((action) =>
        this._projectService.updateProject(action.id, action.payload).pipe(
          mergeMap((res: IApiResponce) => {
            if (res._status) {
              this.router.navigateByUrl(
                `${ROUTE_NAMES.APP}/${ROUTE_NAMES.PROJECT.BASE}/${ROUTE_NAMES.PROJECT.LIST}`
              );
              return of(PROJECT_ACTIONS.UPDATE_PROJECT.SUCCESS());
            } else {
              return of(
                PROJECT_ACTIONS.UPDATE_PROJECT.FAILURE({
                  error: res._msg,
                })
              );
            }
          }),
          catchError((error) =>
            of(PROJECT_ACTIONS.UPDATE_PROJECT.FAILURE({ error }))
          )
        )
      )
    )
  );

  deleteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PROJECT_ACTIONS.DELETE_PROJECT.LOAD),
      mergeMap((action) =>
        this._projectService.deleteProject(action.id).pipe(
          mergeMap((res: IApiResponce) => {
            if (res._status) {
              return of(PROJECT_ACTIONS.LOAD_PROJECTS.LOAD());
            } else {
              return of(
                PROJECT_ACTIONS.DELETE_PROJECT.FAILURE({
                  error: res._msg,
                })
              );
            }
          }),
          catchError((error) =>
            of(PROJECT_ACTIONS.DELETE_PROJECT.FAILURE({ error }))
          )
        )
      )
    )
  );

  assignProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PROJECT_ACTIONS.ASSIGN_PROJECT.LOAD),
      mergeMap((action) =>
        this._projectService.updateProject(action.id, action.payload).pipe(
          mergeMap((res: IApiResponce) => {
            if (res._status) {
              this.router.navigateByUrl(
                `${ROUTE_NAMES.APP}/${ROUTE_NAMES.PROJECT.BASE}/${ROUTE_NAMES.PROJECT.LIST}`
              );
              return of(PROJECT_ACTIONS.ASSIGN_PROJECT.SUCCESS());
            } else {
              return of(
                PROJECT_ACTIONS.ASSIGN_PROJECT.FAILURE({
                  error: res._msg,
                })
              );
            }
          }),
          catchError((error) =>
            of(PROJECT_ACTIONS.ASSIGN_PROJECT.FAILURE({ error }))
          )
        )
      )
    )
  );
}
