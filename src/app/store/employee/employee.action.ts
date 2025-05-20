import { createAction, props } from '@ngrx/store';
import {
  ICreateEmployee,
  IEditEmployee,
  IEmployee,
} from '../../featured/employees/employee.model';
import { IApiResponce } from '../../core/models/models.interfece';

export const EMPLOYEE_ACTION_NAMES = {
  LOAD_EMPLOYEE: {
    LOAD: '[EMPLOYEE] Invoke Load EMPLOYEE',
    SUCCESS: '[EMPLOYEE] Load EMPLOYEE Success',
    FAILURE: '[EMPLOYEE] Load EMPLOYEE Failure',
  },
  LOAD_EMPLOYEES: {
    LOAD: '[EMPLOYEE] Invoke Load EMPLOYEEs',
    SUCCESS: '[EMPLOYEE] Load EMPLOYEEs Success',
    FAILURE: '[EMPLOYEE] Load EMPLOYEEs Failure',
  },
  ADD_EMPLOYEE: {
    LOAD: '[EMPLOYEE] Invoke Create EMPLOYEE',
    SUCCESS: '[EMPLOYEE] Create EMPLOYEE Success',
    FAILURE: '[EMPLOYEE] Create EMPLOYEE Failure',
  },
  UPDATE_EMPLOYEE: {
    LOAD: '[EMPLOYEE] Invoke Update EMPLOYEE',
    SUCCESS: '[EMPLOYEE] Update EMPLOYEE Success',
    FAILURE: '[EMPLOYEE] Update EMPLOYEE Failure',
  },
  DELETE_EMPLOYEE: {
    LOAD: '[EMPLOYEE] Invoke Delete EMPLOYEE',
    SUCCESS: '[EMPLOYEE] Delete EMPLOYEE Success',
    FAILURE: '[EMPLOYEE] Delete EMPLOYEE Failure',
  },
};

export const EMPLOYEE_ACTIONS = {
  LOAD_EMPLOYEES: {
    LOAD: createAction(EMPLOYEE_ACTION_NAMES.LOAD_EMPLOYEES.LOAD),
    SUCCESS: createAction(
      EMPLOYEE_ACTION_NAMES.LOAD_EMPLOYEES.SUCCESS,
      props<{ data: IApiResponce }>()
    ),
    FAILURE: createAction(
      EMPLOYEE_ACTION_NAMES.LOAD_EMPLOYEES.FAILURE,
      props<{ error: any }>()
    ),
  },

  LOAD_EMPLOYEE: {
    LOAD: createAction(
      EMPLOYEE_ACTION_NAMES.LOAD_EMPLOYEE.LOAD,
      props<{ id: string }>()
    ),
    SUCCESS: createAction(
      EMPLOYEE_ACTION_NAMES.LOAD_EMPLOYEE.SUCCESS,
      props<{ data: IApiResponce }>()
    ),
    FAILURE: createAction(
      EMPLOYEE_ACTION_NAMES.LOAD_EMPLOYEE.FAILURE,
      props<{ error: any }>()
    ),
  },

  ADD_EMPLOYEE: {
    LOAD: createAction(
      EMPLOYEE_ACTION_NAMES.ADD_EMPLOYEE.LOAD,
      props<{ payload: ICreateEmployee }>()
    ),
    SUCCESS: createAction(EMPLOYEE_ACTION_NAMES.ADD_EMPLOYEE.SUCCESS),
    FAILURE: createAction(
      EMPLOYEE_ACTION_NAMES.ADD_EMPLOYEE.FAILURE,
      props<{ error: any }>()
    ),
  },

  UPDATE_EMPLOYEE: {
    LOAD: createAction(
      EMPLOYEE_ACTION_NAMES.UPDATE_EMPLOYEE.LOAD,
      props<{ id: string; payload: IEditEmployee }>()
    ),
    SUCCESS: createAction(EMPLOYEE_ACTION_NAMES.UPDATE_EMPLOYEE.SUCCESS),
    FAILURE: createAction(
      EMPLOYEE_ACTION_NAMES.UPDATE_EMPLOYEE.FAILURE,
      props<{ error: any }>()
    ),
  },

  DELETE_EMPLOYEE: {
    LOAD: createAction(
      EMPLOYEE_ACTION_NAMES.DELETE_EMPLOYEE.LOAD,
      props<{ id: string }>()
    ),
    SUCCESS: createAction(EMPLOYEE_ACTION_NAMES.DELETE_EMPLOYEE.SUCCESS),
    FAILURE: createAction(
      EMPLOYEE_ACTION_NAMES.DELETE_EMPLOYEE.FAILURE,
      props<{ error: any }>()
    ),
  },
};
