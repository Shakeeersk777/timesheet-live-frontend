import { createAction, props } from '@ngrx/store';
import { IApiResponce } from '../../core/models/models.interfece';
import {
  ITimeSheetEntryPayload,
  TimesheetStatus,
} from '../../featured/timesheets/timesheet.modal';

export const TIMESHEET_ACTION_NAMES = {
  LOAD_TIMESHEET: {
    LOAD: '[TIMESHEET] Invoke Load TIMESHEET',
    SUCCESS: '[TIMESHEET] Load TIMESHEET Success',
    FAILURE: '[TIMESHEET] Load TIMESHEET Failure',
  },
  LOAD_TIMESHEETS: {
    LOAD: '[TIMESHEET] Invoke Load TIMESHEETS',
    SUCCESS: '[TIMESHEET] Load TIMESHEETS Success',
    FAILURE: '[TIMESHEET] Load TIMESHEETS Failure',
  },
  ADD_TIMESHEET: {
    LOAD: '[TIMESHEET] Invoke Create TIMESHEET',
    SUCCESS: '[TIMESHEET] Create TIMESHEET Success',
    FAILURE: '[TIMESHEET] Create TIMESHEET Failure',
  },
  UPDATE_TIMESHEET_APPROVAL: {
    LOAD: '[TIMESHEET] Invoke Update TIMESHEET Approval',
    SUCCESS: '[TIMESHEET] Update TIMESHEET Approval Success',
    FAILURE: '[TIMESHEET] Update TIMESHEET Approval Failure',
  },
};

export const TIMESHEET_ACTIONS = {
  LOAD_TIMESHEETS: {
    LOAD: createAction(
      TIMESHEET_ACTION_NAMES.LOAD_TIMESHEETS.LOAD,
      props<{ id: string }>()
    ),
    SUCCESS: createAction(
      TIMESHEET_ACTION_NAMES.LOAD_TIMESHEETS.SUCCESS,
      props<{ data: IApiResponce }>()
    ),
    FAILURE: createAction(
      TIMESHEET_ACTION_NAMES.LOAD_TIMESHEETS.FAILURE,
      props<{ error: any }>()
    ),
  },

  LOAD_TIMESHEET: {
    LOAD: createAction(
      TIMESHEET_ACTION_NAMES.LOAD_TIMESHEET.LOAD,
      props<{ id: string }>()
    ),
    SUCCESS: createAction(
      TIMESHEET_ACTION_NAMES.LOAD_TIMESHEET.SUCCESS,
      props<{ data: IApiResponce }>()
    ),
    FAILURE: createAction(
      TIMESHEET_ACTION_NAMES.LOAD_TIMESHEET.FAILURE,
      props<{ error: any }>()
    ),
  },

  ADD_TIMESHEET: {
    LOAD: createAction(
      TIMESHEET_ACTION_NAMES.ADD_TIMESHEET.LOAD,
      props<{ payload: ITimeSheetEntryPayload }>()
    ),
    SUCCESS: createAction(TIMESHEET_ACTION_NAMES.ADD_TIMESHEET.SUCCESS),
    FAILURE: createAction(
      TIMESHEET_ACTION_NAMES.ADD_TIMESHEET.FAILURE,
      props<{ error: any }>()
    ),
  },

  UPDATE_APPROVAL_STATUS: {
    LOAD: createAction(
      TIMESHEET_ACTION_NAMES.UPDATE_TIMESHEET_APPROVAL.LOAD,
      props<{ id: string; status: TimesheetStatus }>()
    ),
    SUCCESS: createAction(
      TIMESHEET_ACTION_NAMES.UPDATE_TIMESHEET_APPROVAL.SUCCESS
    ),
    FAILURE: createAction(
      TIMESHEET_ACTION_NAMES.UPDATE_TIMESHEET_APPROVAL.FAILURE,
      props<{ error: any }>()
    ),
  },
};
