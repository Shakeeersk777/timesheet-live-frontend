import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { AuthService } from '../../../core/services/auth.service';

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

  onLogin() {
    this.setLocalStorage();
    this._router.navigateByUrl(ROUTE_NAMES.APP);
  }

  setLocalStorage() {
    this._authService.setCurrentUser();
  }
}
