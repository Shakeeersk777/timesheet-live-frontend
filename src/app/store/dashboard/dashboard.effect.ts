import { inject, Injectable } from '@angular/core';
import { DashboardService } from '../../featured/dashboard/dashboard.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DASHBOARD_ACTIONS } from './dashboard.action';
import { catchError, map, mergeMap, of } from 'rxjs';
import { IApiResponce } from '../../core/models/models.interfece';

@Injectable()
export class DashboardEffects {
  actions$: Actions = inject(Actions);
  _dashboardService: DashboardService = inject(DashboardService);

  activityOverview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DASHBOARD_ACTIONS.ACTIVITY_OVERVIEW.LOAD),
      mergeMap(() =>
        this._dashboardService.getActivityOverview().pipe(
          map((res: IApiResponce) =>
            DASHBOARD_ACTIONS.ACTIVITY_OVERVIEW.SUCCESS({ data: res })
          ),
          catchError((error) =>
            of(DASHBOARD_ACTIONS.ACTIVITY_OVERVIEW.FAILURE({ error }))
          )
        )
      )
    )
  );
}
