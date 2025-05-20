import { createReducer, on } from '@ngrx/store';
import { PROJECT_ACTIONS } from './project.action';
import { IApiResponce } from '../../core/models/models.interfece';

export interface ProjectState {
  data: IApiResponce | null;
  error: string | null;
  loading: boolean;
  addProjectSuccess: boolean;
}

export const initialState: ProjectState = {
  data: null,
  error: null,
  loading: false,
  addProjectSuccess: false,
};

export const projectReducer = createReducer(
  initialState,

  // GET PROJECTS
  on(PROJECT_ACTIONS.LOAD_PROJECTS.LOAD, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(PROJECT_ACTIONS.LOAD_PROJECTS.SUCCESS, (state, { data }) => ({
    ...state,
    data,
    loading: false,
    error: null,
  })),

  on(PROJECT_ACTIONS.LOAD_PROJECTS.FAILURE, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // GET PROJECT
  on(PROJECT_ACTIONS.LOAD_PROJECT.LOAD, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(PROJECT_ACTIONS.LOAD_PROJECT.SUCCESS, (state, { data }) => ({
    ...state,
    data,
    loading: false,
    error: null,
  })),

  on(PROJECT_ACTIONS.LOAD_PROJECT.FAILURE, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ADD PROJECT
  on(PROJECT_ACTIONS.ADD_PROJECT.LOAD, (state) => ({
    ...state,
    loading: true,
    error: null,
    addProjectSuccess: false,
  })),

  on(PROJECT_ACTIONS.ADD_PROJECT.SUCCESS, (state) => ({
    ...state,
    data: null,
    loading: false,
    error: null,
    addProjectSuccess: true,
  })),

  on(PROJECT_ACTIONS.ADD_PROJECT.FAILURE, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    addProjectSuccess: false,
  })),

  // DELETE PROJECT
  on(PROJECT_ACTIONS.DELETE_PROJECT.LOAD, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(PROJECT_ACTIONS.DELETE_PROJECT.SUCCESS, (state) => ({
    ...state,
    data: null,
    loading: false,
    error: null,
  })),

  on(PROJECT_ACTIONS.DELETE_PROJECT.FAILURE, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
