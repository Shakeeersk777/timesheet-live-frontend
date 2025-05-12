import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { ITimeSheetEntryPayload, TimesheetStatus } from './timesheet.modal';

@Injectable({
  providedIn: 'root',
})
export class TimesheetService {
  private _apiService: ApiService = inject(ApiService);

  getTimesheetOverview(timesheetId: string): Observable<any> {
    return this._apiService.getService(`/timesheets/${timesheetId}`);
  }

  getEmployeeTimesheets(employeeId: string): Observable<any> {
    return this._apiService.getService(`/timesheets/employee/${employeeId}`);
  }

  addTimesheet(payload: ITimeSheetEntryPayload): Observable<any> {
    return this._apiService.postService('/timesheets', payload);
  }

  updateApprovalStatus(id: string, status: TimesheetStatus) {
    return this._apiService.putService(
      `/timesheets/approval-status/${id}/${status}`
    );
  }
}
