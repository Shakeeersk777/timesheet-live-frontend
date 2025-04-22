import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {

  private apiUrl = environment.apiUrl;
  private _apiService: ApiService = inject(ApiService);

  login(payload: any) {
    return this._apiService.postService(`${this.apiUrl}/employee/login`, payload)
  }
}
