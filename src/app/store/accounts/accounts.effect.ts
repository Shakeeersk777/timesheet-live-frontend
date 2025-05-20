import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ACCOUNTS_ACTION } from './accounts.action';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AccountsService } from '../../featured/accounts/accounts.service';
import {
  IApiResponce,
  ILoginResponse,
} from '../../core/models/models.interfece';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../shared/enums/routes.enum';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class AccountsEffects {
  action$ = inject(Actions);
  _accountsService = inject(AccountsService);
  _authService = inject(AuthService);
  router = inject(Router);

  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(ACCOUNTS_ACTION.LOGIN.LOAD),
      mergeMap((action) =>
        this._accountsService.login(action.payload).pipe(
          tap((res: IApiResponce) => {
            if (res._status) {
              const loginData: ILoginResponse = res._data;
              this._authService.setCurrentUser(loginData);
              this._authService.navigateBasedOnPermission();
            }
          }),
          map((res: IApiResponce) =>
            res._status
              ? ACCOUNTS_ACTION.LOGIN.SUCCESS()
              : ACCOUNTS_ACTION.LOGIN.FAILURE({ error: res._msg })
          ),
          catchError((error) =>
            of(
              ACCOUNTS_ACTION.LOGIN.FAILURE({
                error,
              })
            )
          )
        )
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this.action$.pipe(
      ofType(ACCOUNTS_ACTION.RESET_PASSWORD.LOAD),
      mergeMap((action) =>
        this._accountsService.resetPassword(action.payload).pipe(
          map((res: IApiResponce) =>
            res._status
              ? ACCOUNTS_ACTION.RESET_PASSWORD.SUCCESS()
              : ACCOUNTS_ACTION.RESET_PASSWORD.FAILURE({ error: res._msg })
          ),
          catchError((error) =>
            of(
              ACCOUNTS_ACTION.RESET_PASSWORD.FAILURE({
                error,
              })
            )
          )
        )
      )
    )
  );

  forgotPassword$ = createEffect(() =>
    this.action$.pipe(
      ofType(ACCOUNTS_ACTION.FORGOT_PASSWORD.LOAD),
      mergeMap((action) =>
        this._accountsService.forgotPassword(action.payload).pipe(
          tap((res: IApiResponce) => {
            if (res._status) {
              this.router.navigateByUrl(ROUTE_NAMES.AUTH.BASE);
            }
          }),
          map((res: IApiResponce) =>
            res._status
              ? ACCOUNTS_ACTION.FORGOT_PASSWORD.SUCCESS()
              : ACCOUNTS_ACTION.FORGOT_PASSWORD.FAILURE({ error: res._msg })
          ),
          catchError((error) =>
            of(
              ACCOUNTS_ACTION.FORGOT_PASSWORD.FAILURE({
                error,
              })
            )
          )
        )
      )
    )
  );
}
