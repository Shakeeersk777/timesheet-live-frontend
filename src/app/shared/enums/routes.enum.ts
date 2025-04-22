export const ROUTE_NAMES = {
  BASE: '',
  WILD_CARD: '**',
  APP: 'app',
  LOGIN: 'login',
  LOGOUT: 'logout',
  DASHBOARD: 'dashboard',
  EMPLOYEE: {
    BASE: 'employees',
    CREATE: 'create',
    EDIT: 'edit',
    LIST: 'manage',
    OVERVIEW: 'overview'
  },
  TIMESHEET: {
    BASE: 'timesheets',
    CREATE: 'create',
    EDIT: 'edit',
    LIST: 'manage',
  },
  PROJECT: {
    BASE: 'projects',
    CREATE: 'create',
    EDIT: 'edit',
    LIST: 'manage',
    ASSIGN: 'assign',
  },
  TASK: {
    BASE: 'tasks',
    CREATE: 'create',
    EDIT: 'edit',
    LIST: 'manage',
  },
  REPORT: {
    BASE: 'reports',
    LIST: 'manage',
  },
} as const;
