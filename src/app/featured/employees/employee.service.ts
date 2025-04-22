import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private _apiService: ApiService = inject(ApiService);

  getAllEmployees(): Observable<any> {
    return this._apiService.getService('/get/employees');
  }

  getEmployeeOverview(employeeId: string): Observable<any> {
    return this._apiService.getService(`/get/employee/${employeeId}`);
  }

  addEmployee(employeeData: any): Observable<any> {
    return this._apiService.postService('/add/employee', employeeData);
  }

  updateEmployee(employeeId: string, employeeData: any): Observable<any> {
    return this._apiService.putService(
      `/update/employees/${employeeId}`,
      employeeData
    );
  }

  deleteEmployee(employeeId: string): Observable<any> {
    return this._apiService.deleteService(`/delete/employee/${employeeId}`);
  }
}
