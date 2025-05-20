import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectState } from './project.reducer';

//Feature selector: grab the whole UserState slice
export const selectProjectState =
  createFeatureSelector<ProjectState>('projects');

export const selectProjectsLoading = createSelector(
  selectProjectState,
  (state) => state.loading
);

export const selectUsersError = createSelector(
  selectProjectState,
  (state) => state.error
);

const selectRawData = createSelector(selectProjectState, (state) => state.data);

export const selectAllProjects = createSelector(
  selectRawData,
  (res) => res?._data ?? []
);

export const selectProject = createSelector(selectRawData, (res) => res?._data);
