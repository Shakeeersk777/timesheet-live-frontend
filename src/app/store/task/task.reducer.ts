import { createReducer, on } from '@ngrx/store';
import { IApiResponce } from '../../core/models/models.interfece';
import { TASK_ACTIONS } from './task.action';

export interface TaskState {
  data: IApiResponce | null;
  error: string | null;
  loading: boolean;
}

export const initialState: TaskState = {
  data: null,
  error: null,
  loading: false,
};

export const taskReducer = createReducer(
  initialState,

  // GET TASKS
  on(TASK_ACTIONS.LOAD_TASKS.LOAD, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TASK_ACTIONS.LOAD_TASKS.SUCCESS, (state, { data }) => ({
    ...state,
    data,
    loading: false,
    error: null,
  })),

  on(TASK_ACTIONS.LOAD_TASKS.FAILURE, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // GET TASK
  on(TASK_ACTIONS.LOAD_TASK.LOAD, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TASK_ACTIONS.LOAD_TASK.SUCCESS, (state, { data }) => ({
    ...state,
    data,
    loading: false,
    error: null,
  })),

  on(TASK_ACTIONS.LOAD_TASK.FAILURE, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ADD TASK
  on(TASK_ACTIONS.ADD_TASK.LOAD, (state) => ({
    ...state,
    loading: true,
    error: null,
    addTASKSuccess: false,
  })),

  on(TASK_ACTIONS.ADD_TASK.SUCCESS, (state) => ({
    ...state,
    data: null,
    loading: false,
    error: null,
    addTASKSuccess: true,
  })),

  on(TASK_ACTIONS.ADD_TASK.FAILURE, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    addTASKSuccess: false,
  })),

  // DELETE TASK
  on(TASK_ACTIONS.DELETE_TASK.LOAD, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TASK_ACTIONS.DELETE_TASK.SUCCESS, (state) => ({
    ...state,
    data: null,
    loading: false,
    error: null,
  })),

  on(TASK_ACTIONS.DELETE_TASK.FAILURE, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
