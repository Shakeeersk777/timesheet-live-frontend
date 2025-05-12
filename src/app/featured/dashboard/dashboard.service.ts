import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private _apiService: ApiService = inject(ApiService);

  getActivityOverview(): Observable<any> {
    return this._apiService.getService('/dashboard/activity-overview');
  }
}
