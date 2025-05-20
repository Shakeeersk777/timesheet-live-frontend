import { createAction, props } from '@ngrx/store';
import {
  IForgotPasswordPayload,
  ILoginPayload,
  IResetPasswordPayload,
} from '../../featured/accounts/accounts.modal';

export const ACCOUNTS_ACTION_NAMES = {
  LOGIN: {
    LOAD: '[ACCOUNTS] Invoke Login',
    SUCCESS: '[ACCOUNTS] Login Success',
    FAILURE: '[ACCOUNTS] Login Failure',
  },
  FORGOT_PASSWORD: {
    LOAD: '[ACCOUNTS] Invoke Forgot Password',
    SUCCESS: '[ACCOUNTS] Forgot Password Success',
    FAILURE: '[ACCOUNTS] Forgot Password Failure',
  },
  RESET_PASSWORD: {
    LOAD: '[ACCOUNTS] Invoke Reset Password',
    SUCCESS: '[ACCOUNTS] Reset Password Success',
    FAILURE: '[ACCOUNTS] Reset Password Failure',
  },
};

export const ACCOUNTS_ACTION = {
  LOGIN: {
    LOAD: createAction(
      ACCOUNTS_ACTION_NAMES.LOGIN.LOAD,
      props<{ payload: ILoginPayload }>()
    ),
    SUCCESS: createAction(ACCOUNTS_ACTION_NAMES.LOGIN.SUCCESS),
    FAILURE: createAction(
      ACCOUNTS_ACTION_NAMES.LOGIN.FAILURE,
      props<{ error: string }>()
    ),
  },
  FORGOT_PASSWORD: {
    LOAD: createAction(
      ACCOUNTS_ACTION_NAMES.FORGOT_PASSWORD.LOAD,
      props<{ payload: IForgotPasswordPayload }>()
    ),
    SUCCESS: createAction(ACCOUNTS_ACTION_NAMES.FORGOT_PASSWORD.SUCCESS),
    FAILURE: createAction(
      ACCOUNTS_ACTION_NAMES.FORGOT_PASSWORD.FAILURE,
      props<{ error: string }>()
    ),
  },
  RESET_PASSWORD: {
    LOAD: createAction(
      ACCOUNTS_ACTION_NAMES.RESET_PASSWORD.LOAD,
      props<{ payload: IResetPasswordPayload }>()
    ),
    SUCCESS: createAction(ACCOUNTS_ACTION_NAMES.RESET_PASSWORD.SUCCESS),
    FAILURE: createAction(
      ACCOUNTS_ACTION_NAMES.RESET_PASSWORD.FAILURE,
      props<{ error: string }>()
    ),
  },
};
