import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';

//Feature selector: grab the whole UserState slice
export const selectTaskState =
  createFeatureSelector<TaskState>('tasks');

export const selectTasksLoading = createSelector(
  selectTaskState,
  (state) => state.loading
);

export const selectUsersError = createSelector(
  selectTaskState,
  (state) => state.error
);

const selectRawData = createSelector(selectTaskState, (state) => state.data);

export const selectAllTasks = createSelector(
  selectRawData,
  (res) => res?._data ?? []
);

export const selectTask = createSelector(selectRawData, (res) => res?._data);
