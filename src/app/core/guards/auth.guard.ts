import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ROUTE_NAMES } from '../../shared/enums/routes.enum';

export const canActivateFn: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAdmin = authService.isAdmin();
  return isAdmin ? true : router.createUrlTree([ROUTE_NAMES.ACCESS_DENIED]);
};

export const canActivateChildFn: CanActivateChildFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAdmin = authService.isAdmin();
  return isAdmin ? true : router.createUrlTree([ROUTE_NAMES.ACCESS_DENIED]);
};
