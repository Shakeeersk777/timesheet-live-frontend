import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private _httpClient = inject(HttpClient);

  getService(url: string, params?: HttpParams): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}${url}`, { params });
  }

  postService(url: string, body: any): Observable<any> {
    return this._httpClient.post(`${this.apiUrl}${url}`, body);
  }

  putService(url: string, body?: any): Observable<any> {
    return this._httpClient.put(`${this.apiUrl}${url}`, body);
  }

  patchService(url: string, body: any): Observable<any> {
    return this._httpClient.patch(`${this.apiUrl}${url}`, body);
  }

  deleteService(url: string): Observable<any> {
    return this._httpClient.delete(`${this.apiUrl}${url}`);
  }
}
