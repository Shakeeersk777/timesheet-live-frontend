import { createReducer, on } from '@ngrx/store';
import { IApiResponce } from '../../core/models/models.interfece';
import { ACCOUNTS_ACTION } from './accounts.action';
export interface IAccountState {
  data: IApiResponce | null;
  error: string | null;
  loading: boolean;
}

export const AccountIntialState: IAccountState = {
  data: null,
  error: null,
  loading: false,
};

export const accountsReducer = createReducer(
  AccountIntialState,

  //LOGIN
  on(ACCOUNTS_ACTION.LOGIN.LOAD, (state) => ({
    ...state,
    loading: true,
  })),
  on(ACCOUNTS_ACTION.LOGIN.SUCCESS, (state) => ({
    ...state,
    loading: false,
    data: null,
  })),
  on(ACCOUNTS_ACTION.LOGIN.FAILURE, (state, { error }) => ({
    ...state,
    loading: false,
    data: null,
    error,
  })),

  //RESET PASSWORD
  on(ACCOUNTS_ACTION.RESET_PASSWORD.LOAD, (state) => ({
    ...state,
    loading: true,
  })),
  on(ACCOUNTS_ACTION.RESET_PASSWORD.SUCCESS, (state) => ({
    ...state,
    loading: false,
    data: null,
  })),
  on(ACCOUNTS_ACTION.RESET_PASSWORD.FAILURE, (state, { error }) => ({
    ...state,
    loading: false,
    data: null,
    error,
  })),

  //FORGOT PASSWORD
  on(ACCOUNTS_ACTION.FORGOT_PASSWORD.LOAD, (state) => ({
    ...state,
    loading: true,
  })),
  on(ACCOUNTS_ACTION.FORGOT_PASSWORD.SUCCESS, (state) => ({
    ...state,
    loading: false,
    data: null,
  })),
  on(ACCOUNTS_ACTION.FORGOT_PASSWORD.FAILURE, (state, { error }) => ({
    ...state,
    loading: false,
    data: null,
    error,
  }))
);
