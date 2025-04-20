import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ROUTE_NAMES } from '../../shared/enums/routes.enum';
import { SIDEBAR_LIST } from '../../core/constants/constants';
import { ISidebarItem } from '../../core/models/models.interfece';
import { filter } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  currentTab: string = 'dashboard';
  isCollapsed = false;
  isMobile = false;
  isMobileSidebarVisible = false;
  currentLoggedUser: any;
  openMobileViewer: boolean = false;

  private _router = inject(Router);
  private _authService: AuthService = inject(AuthService);

  sidebarList: ISidebarItem[] = [];

  ngOnInit(): void {
    this.getCurrentUserData();
    this.setActiveTabBasedOnRoute();
    this.checkScreenSize();

    // Subscribe to route changes
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.setActiveTabBasedOnRoute();
      });
  }

  private setActiveTabBasedOnRoute(): void {
    const currentUrl = this._router.url;
    const matchedItem = this.sidebarList.find(
      (item) => currentUrl === `/app/${item.url}`
    );
    this.currentTab = matchedItem?.key ?? '';
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
    this.isCollapsed = this.isMobile;
    if (!this.isMobile) {
      this.isMobileSidebarVisible = false;
      this.openMobileViewer = false;
    }
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMobileSidebar(): void {
    this.isMobileSidebarVisible = !this.isMobileSidebarVisible;
  }

  onSidebarChange(item: ISidebarItem): void {
    this.currentTab = item.key;

    const targetUrl = `${ROUTE_NAMES.APP}/${item.url}`;

    this._router.navigateByUrl(targetUrl);

    if (this.isMobile) {
      this.isMobileSidebarVisible = false;
    }
  }

  getCurrentUserData() {
    this.currentLoggedUser = this._authService.getCurrentUser();

    const isAdmin = this.currentLoggedUser?.isAdmin ?? false;

    this.sidebarList = SIDEBAR_LIST.filter(
      (item) => item.isCommon || item.isAdmin === isAdmin
    );
  }

  toggleMobileView(): void {
    this.openMobileViewer = !this.openMobileViewer;
  }

  onLogout() {
    this._authService.logout();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.checkScreenSize();
  }
}
