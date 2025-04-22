import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../shared/enums/routes.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _router = inject(Router);

  setCurrentUser(data: any) {
    const currentUser = {
      isAdmin: true,
    };
    localStorage.setItem('currentUser', JSON.stringify(data));
  }

  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  clearCurrentUser() {
    localStorage.removeItem('currentUser');
  }

  logout() {
    this.clearCurrentUser();
    this._router.navigateByUrl(ROUTE_NAMES.LOGIN);
  }
}
