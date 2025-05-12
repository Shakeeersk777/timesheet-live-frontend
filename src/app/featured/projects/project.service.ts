import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private _apiService: ApiService = inject(ApiService);

  getAllProjects(): Observable<any> {
    return this._apiService.getService('/projects');
  }

  getProjectOverview(projectId: string): Observable<any> {
    return this._apiService.getService(`/projects/${projectId}`);
  }

  addProject(projectData: any): Observable<any> {
    return this._apiService.postService('/projects', projectData);
  }

  assignProject(projectId: string, projectData: any): Observable<any> {
    return this._apiService.putService(
      `/projects/assign/${projectId}`,
      projectData
    );
  }

  updateProject(projectId: string, projectData: any): Observable<any> {
    return this._apiService.putService(`/projects/${projectId}`, projectData);
  }

  deleteProject(projectId: string): Observable<any> {
    return this._apiService.deleteService(`/projects/${projectId}`);
  }
}
