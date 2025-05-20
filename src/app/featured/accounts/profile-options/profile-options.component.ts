import { Component, inject, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import { filter } from 'rxjs';

interface IOptions {
  key: string;
  value: string;
  url: string;
}

@Component({
  selector: 'app-profile-options',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule, MatTabsModule],
  templateUrl: './profile-options.component.html',
  styleUrl: './profile-options.component.scss',
})
export class ProfileOptionsComponent implements OnInit {
  router = inject(Router);
  private _authService: AuthService = inject(AuthService);
  userId = '';
  routeNames = ROUTE_NAMES;
  activeTabIndex!: number;

  options: IOptions[] = [];

  ngOnInit(): void {
    const currentUser = this._authService.getCurrentUser();
    if (!currentUser) return;
    this.userId = currentUser.employeeId;

    this.options = [
      {
        key: ROUTE_NAMES.AUTH.OVERVIEW,
        value: 'Profile',
        url: `${ROUTE_NAMES.APP}/${ROUTE_NAMES.AUTH.BASE}/${ROUTE_NAMES.AUTH.PROFILE}/${ROUTE_NAMES.AUTH.OVERVIEW}/${this.userId}`,
      },
      {
        key: ROUTE_NAMES.AUTH.RESET_PASSWORD,
        value: 'Reset Password',
        url: `${ROUTE_NAMES.APP}/${ROUTE_NAMES.AUTH.BASE}/${ROUTE_NAMES.AUTH.PROFILE}/${ROUTE_NAMES.AUTH.RESET_PASSWORD}`,
      },
    ];

    this.updateSelectedTab(this.router.url);

    // Also update on route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateSelectedTab(event.urlAfterRedirects);
      });
  }

  navigateTo(index: number) {
    const url = this.options[index].url;
    this.router.navigateByUrl(url);
  }

  updateSelectedTab(currentUrl: string) {
    console.log(this.options);
    this.activeTabIndex = this.options.findIndex((res) => currentUrl.includes(res.key));
    console.log(this.activeTabIndex);
    
  }
}
