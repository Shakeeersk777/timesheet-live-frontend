import { ROUTE_NAMES } from '../../shared/enums/routes.enum';
import { ISidebarItem } from '../models/models.interfece';
export const NGX_LOADER_TYPE = 'ball-clip-rotate-multiple';
export const SIDEBAR_LIST: ISidebarItem[] = [
  {
    key: 'dashboard',
    value: 'Dashboard',
    icon: 'fa fa-line-chart',
    url: ROUTE_NAMES.DASHBOARD,
    isCommon: true,
  },
  {
    key: 'employees',
    value: 'Employees',
    icon: 'fa fa-users',
    url: `${ROUTE_NAMES.EMPLOYEE.BASE}/${ROUTE_NAMES.EMPLOYEE.LIST}`,
    isAdmin: true,
  },
  {
    key: 'projects',
    value: 'Projects',
    icon: 'fa fa-folder-open',
    url: `${ROUTE_NAMES.PROJECT.BASE}/${ROUTE_NAMES.PROJECT.LIST}`,
    isCommon: true,
  },
  {
    key: 'tasks',
    value: 'Tasks',
    icon: 'fa fa-tasks',
    url: `${ROUTE_NAMES.TASK.BASE}/${ROUTE_NAMES.TASK.LIST}`,
    isCommon: true,
  },
  {
    key: 'timesheets',
    value: 'Timesheets',
    icon: 'fa fa-calendar-alt',
    url: `${ROUTE_NAMES.TIMESHEET.BASE}/${ROUTE_NAMES.TIMESHEET.LIST}`,
    isCommon: true,
  },
  {
    key: 'reports',
    value: 'Reports',
    icon: 'fa fa-chart-bar',
    url: `${ROUTE_NAMES.REPORT.BASE}/${ROUTE_NAMES.REPORT.LIST}`,
    isAdmin: true,
  },
];

export enum SNACKBAR_RESPONSE_TYPE {
  SUCCESS = 'snackbar-success',
  ERROR = 'snackbar-error',
}

export enum BUTTON_NAMES {
  ADD = 'Add',
  UPDATE = 'Update',
  EDIT = 'Edit',
  BACK = 'Back',
  ASSIGN = 'Assign',
}
