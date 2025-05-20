import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './employee.reducer';

//Feature selector: grab the whole UserState slice
export const selectUserState = createFeatureSelector<UserState>('users');

export const selectUsersLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

export const selectUsersError = createSelector(
  selectUserState,
  (state) => state.error
);

const selectRawData = createSelector(selectUserState, (state) => state.data);

export const selectAllEmployees = createSelector(
  selectRawData,
  (res) => res?._data ?? []
);

export const selectEmployee = createSelector(
  selectRawData,
  (res) => res?._data
);
