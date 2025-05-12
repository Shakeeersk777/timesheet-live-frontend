export const ROUTE_NAMES = {
  BASE: '',
  WILD_CARD: '**',
  APP: 'app',
  LOGIN: 'login',
  LOGOUT: 'logout',
  DASHBOARD: 'dashboard',
  ACCESS_DENIED: 'access-denied',
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
    OVERVIEW: 'overview',
  },
  PROJECT: {
    BASE: 'projects',
    CREATE: 'create',
    EDIT: 'edit',
    LIST: 'manage',
    ASSIGN: 'assign',
    OVERVIEW: 'overview'
  },
  TASK: {
    BASE: 'tasks',
    CREATE: 'create',
    EDIT: 'edit',
    LIST: 'manage',
    OVERVIEW: 'overview',
    ASSIGN: 'assign',
  },
  REPORT: {
    BASE: 'reports',
    LIST: 'manage',
  },
} as const;
