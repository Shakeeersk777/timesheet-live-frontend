import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private _authService: AuthService = inject(AuthService);

  onLogout() {
    this._authService.logout();
  }

  toggleMobileNavbar() {
    document
      .getElementById('mobile-viewer')
      ?.classList.toggle('show-mobile-viewer');
  }

}
