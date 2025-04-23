import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private _apiService: ApiService = inject(ApiService);

  getAllProjects(): Observable<any> {
    return this._apiService.getService('/get/projects');
  }

  getProjectOverview(projectId: string): Observable<any> {
    return this._apiService.getService(`/get/project/${projectId}`);
  }

  addProject(projectData: any): Observable<any> {
    return this._apiService.postService('/add/project', projectData);
  }

  updateProject(projectId: string, projectData: any): Observable<any> {
    return this._apiService.putService(
      `/update/project/${projectId}`,
      projectData
    );
  }

  deleteProject(projectId: string): Observable<any> {
    return this._apiService.deleteService(`/delete/project/${projectId}`);
  }
}
