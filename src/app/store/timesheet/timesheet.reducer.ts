import { createReducer, on } from '@ngrx/store';
import { IApiResponce } from '../../core/models/models.interfece';
import { TIMESHEET_ACTIONS } from './timesheet.action';

export interface ITimesheetState {
  data: IApiResponce | null;
  error: string | null;
  loading: boolean;
}

export const initialState: ITimesheetState = {
  data: null,
  error: null,
  loading: false,
};

export const timesheetReducer = createReducer(
  initialState,

  // GET TIMESHEETS
  on(TIMESHEET_ACTIONS.LOAD_TIMESHEETS.LOAD, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TIMESHEET_ACTIONS.LOAD_TIMESHEETS.SUCCESS, (state, { data }) => ({
    ...state,
    data,
    loading: false,
    error: null,
  })),

  on(TIMESHEET_ACTIONS.LOAD_TIMESHEETS.FAILURE, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // GET TIMESHEET
  on(TIMESHEET_ACTIONS.LOAD_TIMESHEET.LOAD, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TIMESHEET_ACTIONS.LOAD_TIMESHEET.SUCCESS, (state, { data }) => ({
    ...state,
    data,
    loading: false,
    error: null,
  })),

  on(TIMESHEET_ACTIONS.LOAD_TIMESHEET.FAILURE, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ADD TIMESHEET
  on(TIMESHEET_ACTIONS.ADD_TIMESHEET.LOAD, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TIMESHEET_ACTIONS.ADD_TIMESHEET.SUCCESS, (state) => ({
    ...state,
    data: null,
    loading: false,
    error: null,
  })),

  on(TIMESHEET_ACTIONS.ADD_TIMESHEET.FAILURE, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // UPDATE TIMESHEET APPROVAL
  on(TIMESHEET_ACTIONS.UPDATE_APPROVAL_STATUS.LOAD, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TIMESHEET_ACTIONS.UPDATE_APPROVAL_STATUS.SUCCESS, (state) => ({
    ...state,
    data: null,
    loading: false,
    error: null,
  })),

  on(TIMESHEET_ACTIONS.UPDATE_APPROVAL_STATUS.FAILURE, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
