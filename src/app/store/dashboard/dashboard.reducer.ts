import { createReducer, on } from '@ngrx/store';
import { DASHBOARD_ACTIONS } from './dashboard.action';
import { IApiResponce } from '../../core/models/models.interfece';

export interface DashboardState {
  error: string | null;
  loading: boolean;
  data: IApiResponce | null;
}

export const initialState: DashboardState = {
  error: null,
  data: null,
  loading: false,
};

export const dashboardReducer = createReducer(
  initialState,
  on(DASHBOARD_ACTIONS.ACTIVITY_OVERVIEW.LOAD, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(DASHBOARD_ACTIONS.ACTIVITY_OVERVIEW.SUCCESS, (state, { data }) => ({
    ...state,
    data,
    loading: true,
    error: null,
  })),
  on(DASHBOARD_ACTIONS.ACTIVITY_OVERVIEW.FAILURE, (state) => ({
    ...state,
    loading: true,
    error: null,
  }))
);
