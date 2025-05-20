import { createAction, props } from '@ngrx/store';
import { IApiResponce } from '../../core/models/models.interfece';
import { ICreateTaskPayload, ITaskUpdatePayload } from '../../featured/tasks/task.modal';


export const TASK_ACTION_NAMES = {
  LOAD_TASK: {
    LOAD: '[TASK] Invoke Load TASK',
    SUCCESS: '[TASK] Load TASK Success',
    FAILURE: '[TASK] Load TASK Failure',
  },
  LOAD_TASKS: {
    LOAD: '[TASK] Invoke Load TASKS',
    SUCCESS: '[TASK] Load TASKS Success',
    FAILURE: '[TASK] Load TASKS Failure',
  },
  ADD_TASK: {
    LOAD: '[TASK] Invoke Create TASK',
    SUCCESS: '[TASK] Create TASK Success',
    FAILURE: '[TASK] Create TASK Failure',
  },
  UPDATE_TASK: {
    LOAD: '[TASK] Invoke Update TASK',
    SUCCESS: '[TASK] Update TASK Success',
    FAILURE: '[TASK] Update TASK Failure',
  },
  DELETE_TASK: {
    LOAD: '[TASK] Invoke Delete TASK',
    SUCCESS: '[TASK] Delete TASK Success',
    FAILURE: '[TASK] Delete TASK Failure',
  },
  ASSIGN_TASK: {
    LOAD: '[TASK] Invoke ASSIGN TASK',
    SUCCESS: '[TASK] ASSIGN TASK Success',
    FAILURE: '[TASK] ASSIGN TASK Failure',
  },
};

export const TASK_ACTIONS = {
  LOAD_TASKS: {
    LOAD: createAction(TASK_ACTION_NAMES.LOAD_TASKS.LOAD),
    SUCCESS: createAction(
      TASK_ACTION_NAMES.LOAD_TASKS.SUCCESS,
      props<{ data: IApiResponce }>()
    ),
    FAILURE: createAction(
      TASK_ACTION_NAMES.LOAD_TASKS.FAILURE,
      props<{ error: any }>()
    ),
  },

  LOAD_TASK: {
    LOAD: createAction(
      TASK_ACTION_NAMES.LOAD_TASK.LOAD,
      props<{ id: string }>()
    ),
    SUCCESS: createAction(
      TASK_ACTION_NAMES.LOAD_TASK.SUCCESS,
      props<{ data: IApiResponce }>()
    ),
    FAILURE: createAction(
      TASK_ACTION_NAMES.LOAD_TASK.FAILURE,
      props<{ error: any }>()
    ),
  },

  ADD_TASK: {
    LOAD: createAction(
      TASK_ACTION_NAMES.ADD_TASK.LOAD,
      props<{ payload: ICreateTaskPayload }>()
    ),
    SUCCESS: createAction(TASK_ACTION_NAMES.ADD_TASK.SUCCESS),
    FAILURE: createAction(
      TASK_ACTION_NAMES.ADD_TASK.FAILURE,
      props<{ error: any }>()
    ),
  },

  UPDATE_TASK: {
    LOAD: createAction(
      TASK_ACTION_NAMES.UPDATE_TASK.LOAD,
      props<{ id: string; payload: ITaskUpdatePayload }>()
    ),
    SUCCESS: createAction(TASK_ACTION_NAMES.UPDATE_TASK.SUCCESS),
    FAILURE: createAction(
      TASK_ACTION_NAMES.UPDATE_TASK.FAILURE,
      props<{ error: any }>()
    ),
  },

  DELETE_TASK: {
    LOAD: createAction(
      TASK_ACTION_NAMES.DELETE_TASK.LOAD,
      props<{ id: string }>()
    ),
    SUCCESS: createAction(TASK_ACTION_NAMES.DELETE_TASK.SUCCESS),
    FAILURE: createAction(
      TASK_ACTION_NAMES.DELETE_TASK.FAILURE,
      props<{ error: any }>()
    ),
  },

  ASSIGN_TASK: {
    LOAD: createAction(
      TASK_ACTION_NAMES.ASSIGN_TASK.LOAD,
      props<{ id: string; payload: any }>()
    ),
    SUCCESS: createAction(TASK_ACTION_NAMES.ASSIGN_TASK.SUCCESS),
    FAILURE: createAction(
      TASK_ACTION_NAMES.ASSIGN_TASK.FAILURE,
      props<{ error: any }>()
    ),
  },
};
