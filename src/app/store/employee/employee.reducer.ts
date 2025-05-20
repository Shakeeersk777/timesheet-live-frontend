import { createReducer, on } from '@ngrx/store';
import { EMPLOYEE_ACTIONS } from './employee.action';
import { IApiResponce } from '../../core/models/models.interfece';

export interface UserState {
  data: IApiResponce | null;
  error: string | null;
  loading: boolean;
}

export const initialState: UserState = {
  data: null,
  error: null,
  loading: false,
};

export const userReducer = createReducer(
  initialState,

  // GET EMPLOYEES
  on(EMPLOYEE_ACTIONS.LOAD_EMPLOYEES.LOAD, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(EMPLOYEE_ACTIONS.LOAD_EMPLOYEES.SUCCESS, (state, { data }) => ({
    ...state,
    data,
    loading: false,
    error: null,
  })),

  on(EMPLOYEE_ACTIONS.LOAD_EMPLOYEES.FAILURE, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // GET EMPLOYEE
  on(EMPLOYEE_ACTIONS.LOAD_EMPLOYEE.LOAD, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(EMPLOYEE_ACTIONS.LOAD_EMPLOYEE.SUCCESS, (state, { data }) => ({
    ...state,
    data,
    loading: false,
    error: null,
  })),

  on(EMPLOYEE_ACTIONS.LOAD_EMPLOYEE.FAILURE, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ADD EMPLOYEE
  on(EMPLOYEE_ACTIONS.ADD_EMPLOYEE.LOAD, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(EMPLOYEE_ACTIONS.ADD_EMPLOYEE.SUCCESS, (state) => ({
    ...state,
    data: null,
    loading: false,
    error: null,
  })),

  on(EMPLOYEE_ACTIONS.ADD_EMPLOYEE.FAILURE, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // DELETE EMPLOYEE
  on(EMPLOYEE_ACTIONS.DELETE_EMPLOYEE.LOAD, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(EMPLOYEE_ACTIONS.DELETE_EMPLOYEE.SUCCESS, (state) => ({
    ...state,
    data: null,
    loading: false,
    error: null,
  })),

  on(EMPLOYEE_ACTIONS.DELETE_EMPLOYEE.FAILURE, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
