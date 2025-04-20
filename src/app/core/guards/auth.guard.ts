import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const CanActivateGuard: CanActivateFn = (route, state) => {
  const _authService: AuthService = inject(AuthService);

  if (!_authService.getCurrentUser()) {
    _authService.logout();
    return false;
  }

  return true;
};
