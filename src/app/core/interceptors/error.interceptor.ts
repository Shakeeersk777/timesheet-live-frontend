import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../shared/enums/routes.enum';
import { LayoutService } from '../../featured/layout/layout.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const _layoutService: LayoutService = inject(LayoutService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const err = error.error?._msg || 'An unknown error occurred.';
      _layoutService.openSnackBar(err, false);

      if (error.status === 401) {
        router.navigate(['/login']);
      } else if (error.status === 403) {
        router.navigateByUrl(ROUTE_NAMES.ACCESS_DENIED);
      }

      return throwError(() => error);
    })
  );
};
