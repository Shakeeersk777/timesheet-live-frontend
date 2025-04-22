import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _httpClient = inject(HttpClient);

  getService(url: string, params?: any): Observable<any> {
    return this._httpClient.get(url, { params });
  }

  postService(url: string, body: any): Observable<any> {
    return this._httpClient.post(url, body);
  }

  putService(url: string, body: any): Observable<any> {
    return this._httpClient.put(url, body);
  }

  patchService(url: string, body: any): Observable<any> {
    return this._httpClient.patch(url, body);
  }

  deleteService(url: string): Observable<any> {
    return this._httpClient.delete(url);
  }
}
