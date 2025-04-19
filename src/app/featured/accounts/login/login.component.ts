import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  _router: Router = inject(Router);

  onLogin() {
    this._router.navigateByUrl(ROUTE_NAMES.BASE)
  }
}
