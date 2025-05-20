import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { ROUTE_NAMES } from '../../../shared/enums/routes.enum';
import { SIDEBAR_LIST } from '../../../core/constants/constants';
import { ISidebarItem } from '../../../core/models/models.interfece';
import { AuthService } from '../../../core/services/auth.service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, NgbTooltipModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  currentTab = '';
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
    const matchedRoute = this.sidebarList.find((item) =>
      currentUrl.includes(item.key)
    );
    this.currentTab = matchedRoute?.key ?? '';
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
    if (this.isMobile) {
      this.toggleMobileNavbar();
    }
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
