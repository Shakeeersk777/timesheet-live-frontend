import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ROUTE_NAMES } from '../../shared/enums/routes.enum';

export const authGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const router = inject(Router);
  const token = _authService.getToken();

  if (!token) {
    // Redirect to login page
    router.navigateByUrl(ROUTE_NAMES.AUTH.BASE);
    return false;
  }

  // Allow route activation
  return true;
};
