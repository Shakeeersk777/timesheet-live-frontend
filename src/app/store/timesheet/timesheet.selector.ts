import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITimesheetState } from './timesheet.reducer';

//Feature selector: grab the whole UserState slice
export const selectUserState = createFeatureSelector<ITimesheetState>('timesheets');

export const selectTimesheetLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

export const selectTimesheetError = createSelector(
  selectUserState,
  (state) => state.error
);

const selectRawData = createSelector(selectUserState, (state) => state.data);

export const selectAllTimesheets = createSelector(
  selectRawData,
  (res) => res?._data ?? []
);

export const selectTimesheet = createSelector(
  selectRawData,
  (res) => res?._data
);
