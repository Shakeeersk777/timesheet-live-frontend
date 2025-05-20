import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { EmployeeService } from '../../featured/employees/employee.service';
import { EMPLOYEE_ACTIONS } from './employee.action';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../shared/enums/routes.enum';
import { IApiResponce } from '../../core/models/models.interfece';

@Injectable()
export class EmployeeEffects {
  actions$: Actions = inject(Actions);
  _userService: EmployeeService = inject(EmployeeService);
  private router: Router = inject(Router);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EMPLOYEE_ACTIONS.LOAD_EMPLOYEES.LOAD),
      mergeMap(() =>
        this._userService.getAllEmployees().pipe(
          map((data) => EMPLOYEE_ACTIONS.LOAD_EMPLOYEES.SUCCESS({ data })),
          catchError((error) =>
            of(EMPLOYEE_ACTIONS.LOAD_EMPLOYEES.FAILURE({ error }))
          )
        )
      )
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EMPLOYEE_ACTIONS.LOAD_EMPLOYEE.LOAD),
      mergeMap((action) =>
        this._userService.getEmployeeOverview(action.id).pipe(
          map((data) => EMPLOYEE_ACTIONS.LOAD_EMPLOYEE.SUCCESS({ data })),
          catchError((error) =>
            of(EMPLOYEE_ACTIONS.LOAD_EMPLOYEE.FAILURE({ error }))
          )
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EMPLOYEE_ACTIONS.ADD_EMPLOYEE.LOAD),
      mergeMap((action) =>
        this._userService.addEmployee(action.payload).pipe(
          mergeMap((res: IApiResponce) => {
            if (res._status) {
              // Navigate first (side effect)
              this.router.navigateByUrl(
                `${ROUTE_NAMES.APP}/${ROUTE_NAMES.EMPLOYEE.BASE}/${ROUTE_NAMES.EMPLOYEE.LIST}`
              );
              // Then dispatch SUCCESS action
              return of(EMPLOYEE_ACTIONS.ADD_EMPLOYEE.SUCCESS());
            } else {
              // Dispatch FAILURE action with error message
              return of(
                EMPLOYEE_ACTIONS.ADD_EMPLOYEE.FAILURE({
                  error: res._msg,
                })
              );
            }
          }),
          catchError((error) =>
            of(EMPLOYEE_ACTIONS.ADD_EMPLOYEE.FAILURE({ error }))
          )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EMPLOYEE_ACTIONS.UPDATE_EMPLOYEE.LOAD),
      mergeMap((action) =>
        this._userService.updateEmployee(action.id, action.payload).pipe(
          mergeMap((res: IApiResponce) => {
            if (res._status) {
              this.router.navigateByUrl(
                `${ROUTE_NAMES.APP}/${ROUTE_NAMES.EMPLOYEE.BASE}/${ROUTE_NAMES.EMPLOYEE.LIST}`
              );
              return of(EMPLOYEE_ACTIONS.UPDATE_EMPLOYEE.SUCCESS());
            } else {
              return of(
                EMPLOYEE_ACTIONS.UPDATE_EMPLOYEE.FAILURE({
                  error: res._msg,
                })
              );
            }
          }),
          catchError((error) =>
            of(EMPLOYEE_ACTIONS.UPDATE_EMPLOYEE.FAILURE({ error }))
          )
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EMPLOYEE_ACTIONS.DELETE_EMPLOYEE.LOAD),
      mergeMap((action) =>
        this._userService.deleteEmployee(action.id).pipe(
          mergeMap((res: IApiResponce) => {
            if (res._status) {
              return of(EMPLOYEE_ACTIONS.LOAD_EMPLOYEES.LOAD());
            } else {
              return of(
                EMPLOYEE_ACTIONS.DELETE_EMPLOYEE.FAILURE({
                  error: res._msg,
                })
              );
            }
          }),
          catchError((error) =>
            of(EMPLOYEE_ACTIONS.DELETE_EMPLOYEE.FAILURE({ error }))
          )
        )
      )
    )
  );
}
