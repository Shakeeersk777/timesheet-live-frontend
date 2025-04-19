import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ROUTE_NAMES } from '../../shared/enums/routes.enum';
import { SIDEBAR_LIST } from '../../core/constants/constants';
import { ISidebarItem } from '../../core/models/models.interfece';

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

  private _router = inject(Router);

  sidebarList: ISidebarItem[] = [];

  ngOnInit(): void {
    this.sidebarList = SIDEBAR_LIST.filter(
      (item) => item.isAdmin || item.isCommon
    );

    console.log(this.sidebarList);
    
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
    this.isCollapsed = this.isMobile;
    if (!this.isMobile) this.isMobileSidebarVisible = false;
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMobileSidebar(): void {
    this.isMobileSidebarVisible = !this.isMobileSidebarVisible;
  }

  onSidebarChange(item: ISidebarItem): void {
    this.currentTab = item.key;

    const targetUrl =
      item.key === ROUTE_NAMES.LOGOUT
        ? `/${ROUTE_NAMES.LOGIN}`
        : `${ROUTE_NAMES.APP}/${item.url}`;

    this._router.navigateByUrl(targetUrl);

    if (this.isMobile) {
      this.isMobileSidebarVisible = false;
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.checkScreenSize();
  }
}
