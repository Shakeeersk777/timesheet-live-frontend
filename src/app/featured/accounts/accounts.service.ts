import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private _apiService: ApiService = inject(ApiService);

  login(payload: any) {
    return this._apiService.postService('/employee/login', payload);
  }
}
