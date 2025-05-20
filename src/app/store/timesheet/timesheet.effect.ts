import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { TIMESHEET_ACTIONS } from './timesheet.action';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../shared/enums/routes.enum';
import { IApiResponce } from '../../core/models/models.interfece';
import { TimesheetService } from '../../featured/timesheets/timesheet.service';

@Injectable()
export class TimesheetEffects {
  actions$: Actions = inject(Actions);
  _timesheetService: TimesheetService = inject(TimesheetService);
  private router: Router = inject(Router);

  loadTimesheets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TIMESHEET_ACTIONS.LOAD_TIMESHEETS.LOAD),
      mergeMap((action) =>
        this._timesheetService.getEmployeeTimesheets(action.id).pipe(
          map((data) => TIMESHEET_ACTIONS.LOAD_TIMESHEETS.SUCCESS({ data })),
          catchError((error) =>
            of(TIMESHEET_ACTIONS.LOAD_TIMESHEETS.FAILURE({ error }))
          )
        )
      )
    )
  );

  loadTimesheet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TIMESHEET_ACTIONS.LOAD_TIMESHEET.LOAD),
      mergeMap((action) =>
        this._timesheetService.getTimesheetOverview(action.id).pipe(
          map((data) => TIMESHEET_ACTIONS.LOAD_TIMESHEET.SUCCESS({ data })),
          catchError((error) =>
            of(TIMESHEET_ACTIONS.LOAD_TIMESHEET.FAILURE({ error }))
          )
        )
      )
    )
  );

  createTimesheet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TIMESHEET_ACTIONS.ADD_TIMESHEET.LOAD),
      mergeMap((action) =>
        this._timesheetService.addTimesheet(action.payload).pipe(
          mergeMap((res: IApiResponce) => {
            if (res._status) {
              // Navigate first (side effect)
              this.router.navigateByUrl(
                `${ROUTE_NAMES.APP}/${ROUTE_NAMES.TIMESHEET.BASE}/${ROUTE_NAMES.TIMESHEET.LIST}`
              );
              // Then dispatch SUCCESS action
              return of(TIMESHEET_ACTIONS.ADD_TIMESHEET.SUCCESS());
            } else {
              // Dispatch FAILURE action with error message
              return of(
                TIMESHEET_ACTIONS.ADD_TIMESHEET.FAILURE({
                  error: res._msg,
                })
              );
            }
          }),
          catchError((error) =>
            of(TIMESHEET_ACTIONS.ADD_TIMESHEET.FAILURE({ error }))
          )
        )
      )
    )
  );

  updateApprovalStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TIMESHEET_ACTIONS.UPDATE_APPROVAL_STATUS.LOAD),
      mergeMap((action) =>
        this._timesheetService
          .updateApprovalStatus(action.id, action.status)
          .pipe(
            mergeMap((res: IApiResponce) => {
              if (res._status) {
                // Then dispatch SUCCESS action
                return of(
                  TIMESHEET_ACTIONS.LOAD_TIMESHEET.LOAD({ id: action.id })
                );
              } else {
                // Dispatch FAILURE action with error message
                return of(
                  TIMESHEET_ACTIONS.UPDATE_APPROVAL_STATUS.FAILURE({
                    error: res._msg,
                  })
                );
              }
            }),
            catchError((error) =>
              of(TIMESHEET_ACTIONS.UPDATE_APPROVAL_STATUS.FAILURE({ error }))
            )
          )
      )
    )
  );
}
