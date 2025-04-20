import { ROUTE_NAMES } from "../../shared/enums/routes.enum";
import { ISidebarItem } from "../models/models.interfece";

export const SIDEBAR_LIST: ISidebarItem[] = [
    {
      key: 'dashboard',
      value: 'Dashboard',
      icon: 'fa fa-line-chart',
      url: ROUTE_NAMES.DASHBOARD,
      isCommon: true,
    },
    {
      key: 'projects',
      value: 'Projects',
      icon: 'fa fa-folder-open',
      url: `${ROUTE_NAMES.PROJECT.BASE}/${ROUTE_NAMES.PROJECT.LIST}`,
      isAdmin: true,
      isCommon: false,
    },
    {
      key: 'viewProjects',
      value: 'View Projects',
      icon: 'fa fa-eye',
      url: `${ROUTE_NAMES.PROJECT.BASE}/${ROUTE_NAMES.PROJECT.LIST}`,
      isAdmin: false,
    },
    {
      key: 'tasks',
      value: 'Tasks',
      icon: 'fa fa-tasks',
      url: `${ROUTE_NAMES.TASK.BASE}/${ROUTE_NAMES.TASK.LIST}`,
      isAdmin: true,
      isCommon: false,
    },
    {
      key: 'viewTasks',
      value: 'View Tasks',
      icon: 'fa fa-eye',
      url: `${ROUTE_NAMES.TASK.BASE}/${ROUTE_NAMES.TASK.LIST}`,
      isAdmin: false,
    },
    {
      key: 'fillTimesheet',
      value: 'Fill Timesheet',
      icon: 'fa fa-clock',
      url: `${ROUTE_NAMES.TIMESHEET.BASE}/${ROUTE_NAMES.TIMESHEET.CREATE}`,
      isAdmin: false,
    },
    {
      key: 'timesheets',
      value: 'Timesheets',
      icon: 'fa fa-calendar-alt',
      url: `${ROUTE_NAMES.TIMESHEET.BASE}/${ROUTE_NAMES.TIMESHEET.LIST}`,
      isAdmin: true,
      isCommon: false,
    },
    {
      key: 'reports',
      value: 'Reports',
      icon: 'fa fa-chart-bar',
      url: `${ROUTE_NAMES.TIMESHEET.BASE}/reports`,
      isAdmin: true,
      isCommon: false,
    },
  ];

  export enum SNACKBAR_RESPONSE_TYPE {
    SUCCESS = 'snackbar-success',
    ERROR = 'snackbar-error'
  }