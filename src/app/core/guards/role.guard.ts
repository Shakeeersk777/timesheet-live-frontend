import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ROUTE_NAMES } from '../../shared/enums/routes.enum';

export const roleGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const router = inject(Router);
  const admin = _authService.isAdmin();

  if (!admin) {
    // Redirect to access denied page
    router.navigate([ROUTE_NAMES.ACCESS_DENIED]);
    return false;
  }

  // Allow route activation
  return true;
};
