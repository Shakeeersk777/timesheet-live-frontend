import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { AuthService } from '../../../core/services/auth.service';
import { LayoutService } from '../../layout/layout.service';
import { SNACKBAR_RESPONSE_TYPE } from '../../../core/constants/constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  _router: Router = inject(Router);
  _authService: AuthService = inject(AuthService);
  _layoutService: LayoutService = inject(LayoutService);

  onLogin() {
    this._layoutService.openSnackBar('logged in successfully',  SNACKBAR_RESPONSE_TYPE.SUCCESS)
    this.setLocalStorage();
    this._router.navigateByUrl(ROUTE_NAMES.APP);
  }

  setLocalStorage() {
    this._authService.setCurrentUser();
  }
}
