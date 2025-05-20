import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAccountState } from './accounts.reducer';

export const selectAccountState =
  createFeatureSelector<IAccountState>('accounts');

export const selectAccountsLoading = createSelector(
  selectAccountState,
  (state) => state.loading
);

export const selectAccountsError = createSelector(
  selectAccountState,
  (state) => state.error
);
