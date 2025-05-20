import { createAction, props } from '@ngrx/store';
import { IApiResponce } from '../../core/models/models.interfece';

export const DASHBOARD_ACTION_NAMES = {
  ACTIVITY_OVERVIEW: {
    LOAD: '[DASHBOARD] Invoke Load DASHBOARD',
    SUCCESS: '[DASHBOARD] Load DASHBOARD Success',
    FAILURE: '[DASHBOARD] Load DASHBOARD Failure',
  },
};

export const DASHBOARD_ACTIONS = {
  ACTIVITY_OVERVIEW: {
    LOAD: createAction(DASHBOARD_ACTION_NAMES.ACTIVITY_OVERVIEW.LOAD),
    SUCCESS: createAction(
      DASHBOARD_ACTION_NAMES.ACTIVITY_OVERVIEW.SUCCESS,
      props<{ data: IApiResponce }>()
    ),
    FAILURE: createAction(
      DASHBOARD_ACTION_NAMES.ACTIVITY_OVERVIEW.FAILURE,
      props<{ error: string }>()
    ),
  },
};
