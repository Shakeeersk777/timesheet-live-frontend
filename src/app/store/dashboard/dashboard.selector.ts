import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';

export const dashboardState =
  createFeatureSelector<DashboardState>('dashboard');

const selectRawData = createSelector(dashboardState, (state) => state.data);

export const selectActivityOverview = createSelector(
  selectRawData,
  (res) => res?._data ?? null
);
