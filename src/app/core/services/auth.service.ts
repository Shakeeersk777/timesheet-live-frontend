import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../shared/enums/routes.enum';
import { ILoginResponse } from '../models/models.interfece';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _router = inject(Router);

  setCurrentUser(data: ILoginResponse) {
    localStorage.setItem('currentUser', JSON.stringify(data));
  }

  getCurrentUser(): ILoginResponse | null {
    const user = localStorage.getItem('currentUser');
    try {
      return user ? (JSON.parse(user) as ILoginResponse) : null;
    } catch (e) {
      console.error('Error parsing currentUser from localStorage:', e);
      return null;
    }
  }

  isAdmin(): boolean {
    return !!this.getCurrentUser()?.isAdmin;
  }

  getToken(): string | null {
    return this.getCurrentUser()?.token ?? null;
  }

  clearCurrentUser() {
    localStorage.removeItem('currentUser');
  }

  logout() {
    this.clearCurrentUser();
    this._router.navigateByUrl(ROUTE_NAMES.AUTH.BASE);
  }

  navigateBasedOnPermission() {
    if (this.isAdmin()) {
      this._router.navigateByUrl(ROUTE_NAMES.APP);
    } else {
      this._router.navigateByUrl(
        `${ROUTE_NAMES.APP}/${ROUTE_NAMES.PROJECT.BASE}/${ROUTE_NAMES.PROJECT.LIST}`
      );
    }
  }
}
