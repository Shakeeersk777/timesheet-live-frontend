import { createAction, props } from '@ngrx/store';
import { IApiResponce } from '../../core/models/models.interfece';
import {
  ICreateProject,
  IUpdateProject,
} from '../../featured/projects/project.modal';

export const PROJECT_ACTION_NAMES = {
  LOAD_PROJECT: {
    LOAD: '[PROJECT] Invoke Load PROJECT',
    SUCCESS: '[PROJECT] Load PROJECT Success',
    FAILURE: '[PROJECT] Load PROJECT Failure',
  },
  LOAD_PROJECTS: {
    LOAD: '[PROJECT] Invoke Load PROJECTS',
    SUCCESS: '[PROJECT] Load PROJECTS Success',
    FAILURE: '[PROJECT] Load PROJECTS Failure',
  },
  ADD_PROJECT: {
    LOAD: '[PROJECT] Invoke Create PROJECT',
    SUCCESS: '[PROJECT] Create PROJECT Success',
    FAILURE: '[PROJECT] Create PROJECT Failure',
  },
  UPDATE_PROJECT: {
    LOAD: '[PROJECT] Invoke Update PROJECT',
    SUCCESS: '[PROJECT] Update PROJECT Success',
    FAILURE: '[PROJECT] Update PROJECT Failure',
  },
  DELETE_PROJECT: {
    LOAD: '[PROJECT] Invoke Delete PROJECT',
    SUCCESS: '[PROJECT] Delete PROJECT Success',
    FAILURE: '[PROJECT] Delete PROJECT Failure',
  },
  ASSIGN_PROJECT: {
    LOAD: '[PROJECT] Invoke ASSIGN PROJECT',
    SUCCESS: '[PROJECT] ASSIGN PROJECT Success',
    FAILURE: '[PROJECT] ASSIGN PROJECT Failure',
  },
};

export const PROJECT_ACTIONS = {
  LOAD_PROJECTS: {
    LOAD: createAction(PROJECT_ACTION_NAMES.LOAD_PROJECTS.LOAD),
    SUCCESS: createAction(
      PROJECT_ACTION_NAMES.LOAD_PROJECTS.SUCCESS,
      props<{ data: IApiResponce }>()
    ),
    FAILURE: createAction(
      PROJECT_ACTION_NAMES.LOAD_PROJECTS.FAILURE,
      props<{ error: any }>()
    ),
  },

  LOAD_PROJECT: {
    LOAD: createAction(
      PROJECT_ACTION_NAMES.LOAD_PROJECT.LOAD,
      props<{ id: string }>()
    ),
    SUCCESS: createAction(
      PROJECT_ACTION_NAMES.LOAD_PROJECT.SUCCESS,
      props<{ data: IApiResponce }>()
    ),
    FAILURE: createAction(
      PROJECT_ACTION_NAMES.LOAD_PROJECT.FAILURE,
      props<{ error: any }>()
    ),
  },

  ADD_PROJECT: {
    LOAD: createAction(
      PROJECT_ACTION_NAMES.ADD_PROJECT.LOAD,
      props<{ payload: ICreateProject }>()
    ),
    SUCCESS: createAction(PROJECT_ACTION_NAMES.ADD_PROJECT.SUCCESS),
    FAILURE: createAction(
      PROJECT_ACTION_NAMES.ADD_PROJECT.FAILURE,
      props<{ error: any }>()
    ),
  },

  UPDATE_PROJECT: {
    LOAD: createAction(
      PROJECT_ACTION_NAMES.UPDATE_PROJECT.LOAD,
      props<{ id: string; payload: IUpdateProject }>()
    ),
    SUCCESS: createAction(PROJECT_ACTION_NAMES.UPDATE_PROJECT.SUCCESS),
    FAILURE: createAction(
      PROJECT_ACTION_NAMES.UPDATE_PROJECT.FAILURE,
      props<{ error: any }>()
    ),
  },

  DELETE_PROJECT: {
    LOAD: createAction(
      PROJECT_ACTION_NAMES.DELETE_PROJECT.LOAD,
      props<{ id: string }>()
    ),
    SUCCESS: createAction(PROJECT_ACTION_NAMES.DELETE_PROJECT.SUCCESS),
    FAILURE: createAction(
      PROJECT_ACTION_NAMES.DELETE_PROJECT.FAILURE,
      props<{ error: any }>()
    ),
  },

  ASSIGN_PROJECT: {
    LOAD: createAction(
      PROJECT_ACTION_NAMES.ASSIGN_PROJECT.LOAD,
      props<{ id: string; payload: any }>()
    ),
    SUCCESS: createAction(PROJECT_ACTION_NAMES.ASSIGN_PROJECT.SUCCESS),
    FAILURE: createAction(
      PROJECT_ACTION_NAMES.ASSIGN_PROJECT.FAILURE,
      props<{ error: any }>()
    ),
  },
};
