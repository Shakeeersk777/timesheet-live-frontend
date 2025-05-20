import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { IForgotPasswordPayload, ILoginPayload, IResetPasswordPayload } from './accounts.modal';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private _apiService: ApiService = inject(ApiService);

  login(payload: ILoginPayload) {
    return this._apiService.postService('/auth/login', payload);
  }

  resetPassword(payload: IResetPasswordPayload) {
    return this._apiService.postService('/auth/reset-password', payload);
  }

  forgotPassword(payload: IForgotPasswordPayload) {
    return this._apiService.postService('/auth/forgot-password', payload);
  }
}
