import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private _authService: AuthService = inject(AuthService);
  onLogout() {
    this._authService.logout();
  }
}
