import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private _apiService: ApiService = inject(ApiService);

  getAllEmployees(): Observable<any> {
    return this._apiService.getService('/users');
  }

  getEmployeeOverview(employeeId: string): Observable<any> {
    return this._apiService.getService(`/users/${employeeId}`);
  }

  addEmployee(employeeData: any): Observable<any> {
    return this._apiService.postService('/users', employeeData);
  }

  updateEmployee(employeeId: string, employeeData: any): Observable<any> {
    return this._apiService.putService(`/users/${employeeId}`, employeeData);
  }

  deleteEmployee(employeeId: string): Observable<any> {
    return this._apiService.deleteService(`/users/${employeeId}`);
  }
}
