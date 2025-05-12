import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _apiService: ApiService = inject(ApiService);

  getAllTasks(): Observable<any> {
    return this._apiService.getService('/tasks');
  }

  getProjectTasks(projectId: string): Observable<any> {
    return this._apiService.getService(`/tasks/project/${projectId}`);
  }

  getTaskOverview(taskId: string): Observable<any> {
    return this._apiService.getService(`/tasks/${taskId}`);
  }

  addTask(payload: any): Observable<any> {
    return this._apiService.postService('/tasks', payload);
  }

  assignTask(taskId: string, payload: any): Observable<any> {
    return this._apiService.putService(`/tasks/assign/${taskId}`, payload);
  }

  updateTask(taskId: string, payload: any): Observable<any> {
    return this._apiService.putService(`/tasks/${taskId}`, payload);
  }

  deleteTask(taskId: string): Observable<any> {
    return this._apiService.deleteService(`/tasks/${taskId}`);
  }
}
