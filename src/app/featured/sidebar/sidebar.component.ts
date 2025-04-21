import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { filter } from 'rxjs';
import { ROUTE_NAMES } from '../../shared/enums/routes.enum';
import { SIDEBAR_LIST } from '../../core/constants/constants';
import { ISidebarItem } from '../../core/models/models.interfece';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  currentTab = 'dashboard';
  isCollapsed = false;
  isMobile = false;
  sidebarList: ISidebarItem[] = [];
  currentLoggedUser: any;

  private _router = inject(Router);
  private _authService = inject(AuthService);

  ngOnInit(): void {
    this.loadUserData();
    this.updateActiveTab();
    this.updateResponsiveState();

    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updateActiveTab());
  }

  private updateActiveTab(): void {
    const currentUrl = this._router.url;
    const matched = this.sidebarList.find(
      (item) => currentUrl === `/app/${item.url}`
    );
    this.currentTab = matched?.key ?? '';
  }

  private loadUserData(): void {
    this.currentLoggedUser = this._authService.getCurrentUser();
    const isAdmin = this.currentLoggedUser?.isAdmin ?? false;
    this.sidebarList = SIDEBAR_LIST.filter(
      (item) => item.isCommon || item.isAdmin === isAdmin
    );
  }

  @HostListener('window:resize')
  updateResponsiveState(): void {
    this.isMobile = window.innerWidth <= 768;
    this.toggleMobileNavbarIcon(!this.isMobile);
    this.isCollapsed = this.isMobile;
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onSidebarChange(item: ISidebarItem): void {
    this.currentTab = item.key;
    this._router.navigateByUrl(`${ROUTE_NAMES.APP}/${item.url}`);
    this.toggleMobileNavbar();
  }

  toggleMobileNavbarIcon(show: boolean) {
    if (show) {
      document
        .getElementById('mobile-nav-bar-icon')
        ?.classList.add('show-mobile-nav-icon');
    } else {
      document
        .getElementById('mobile-nav-bar-icon')
        ?.classList.remove('show-mobile-nav-icon');
    }
  }

  toggleMobileNavbar() {
    document
      .getElementById('mobile-viewer')
      ?.classList.toggle('show-mobile-viewer');
  }

  onLogout(): void {
    this._authService.logout();
  }
}
