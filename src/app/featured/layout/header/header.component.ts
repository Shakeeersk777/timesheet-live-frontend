import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgbTooltipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  isAdmin: boolean = false;
  userId = '';

  ngOnInit(): void {
    const currentUser = this._authService.getCurrentUser();
    if (!currentUser) return;
    this.userId = currentUser.employeeId;
    this.isAdmin = currentUser.isAdmin;
  }

  onLogout() {
    this._authService.logout();
  }

  onView() {
    this._router.navigateByUrl(
      `${ROUTE_NAMES.APP}/${ROUTE_NAMES.AUTH.BASE}/${ROUTE_NAMES.AUTH.PROFILE}/${ROUTE_NAMES.AUTH.OVERVIEW}/${this.userId}`
    );
  }

  toggleMobileNavbar() {
    document
      .getElementById('mobile-viewer')
      ?.classList.toggle('show-mobile-viewer');
  }
}
