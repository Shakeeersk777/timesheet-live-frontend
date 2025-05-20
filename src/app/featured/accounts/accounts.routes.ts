import { Routes } from '@angular/router';
import { ROUTE_NAMES } from '../../shared/enums/routes.enum';

export const accountRoutes: Routes = [
  {
    path: ROUTE_NAMES.BASE,
    children: [
      {
        path: '',
        redirectTo: ROUTE_NAMES.AUTH.LOGIN,
        pathMatch: 'full',
      },
      {
        path: ROUTE_NAMES.AUTH.LOGIN,
        loadComponent: () =>
          import('./login/login.component').then(
            (component) => component.LoginComponent
          ),
        title: 'Login',
      },
      {
        path: ROUTE_NAMES.AUTH.FORGOT_PASSWORD,
        loadComponent: () =>
          import('./forgot-password/forgot-password.component').then(
            (component) => component.ForgotPasswordComponent
          ),
        title: 'Forgot Password',
      },
    ],
  },
];
