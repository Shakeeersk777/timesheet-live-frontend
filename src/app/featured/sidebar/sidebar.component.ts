import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  currentTab: string = 'dashboard';
  isCollapsed: boolean = false;
  isMobile: boolean = false;
  isMobileSidebarVisible: boolean = false;

  private router: Router = inject(Router);

  sidebarList = [
    {
      key: 'dashboard',
      value: 'Dashboard',
      icon: 'fa fa-line-chart',
      url: '/app/timesheet/dashboard',
      isAdmin: false
    },
    {
      key: 'projects',
      value: 'Projects',
      icon: 'fa fa-folder-open',
      url: '/app/timesheet/projects',
      isAdmin: false
    },
    {
      key: 'viewProjects',
      value: 'View Projects',
      icon: 'fa fa-eye',
      url: '/app/timesheet/view-projects',
      isAdmin: false
    },
    {
      key: 'tasks',
      value: 'Tasks',
      icon: 'fa fa-tasks',
      url: '/app/timesheet/tasks',
      isAdmin: false
    },
    {
      key: 'viewTasks',
      value: 'View Tasks',
      icon: 'fa fa-eye',
      url: '/app/timesheet/view-tasks',
      isAdmin: false
    },
    {
      key: 'fillTimesheet',
      value: 'Fill Timesheet',
      icon: 'fa fa-clock',
      url: '/app/timesheet/fill',
      isAdmin: false
    },
    {
      key: 'viewTimesheet',
      value: 'View Timesheet',
      icon: 'fa fa-calendar-alt',
      url: '/app/timesheet/view',
      isAdmin: false
    },
    {
      key: 'reports',
      value: 'Reports',
      icon: 'fa fa-chart-bar',
      url: '/app/timesheet/reports',
      isAdmin: false
    },
    {
      key: 'settings',
      value: 'Settings',
      icon: 'fa fa-cogs',
      url: '/app/timesheet/settings',
      isAdmin: false
    },
    {
      key: 'logout',
      value: 'Logout',
      icon: 'fa fa-sign-out-alt',
      url: '/logout',
      isAdmin: false
    }
  ];

  ngOnInit(): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) {
      this.isMobileSidebarVisible = false;
      this.isCollapsed = false;
    } else {
      this.isCollapsed = true;
    }
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMobileSidebar(): void {
    this.isMobileSidebarVisible = !this.isMobileSidebarVisible;
  }

  onSidebarChange(sidebar: any): void {
    this.currentTab = sidebar.Key;
    this.router.navigateByUrl(sidebar.url);
    if (this.isMobile) {
      this.isMobileSidebarVisible = false;
    }
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.checkScreenSize();
  }

}
