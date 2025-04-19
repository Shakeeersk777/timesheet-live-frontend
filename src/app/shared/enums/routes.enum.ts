export const ROUTE_NAMES = {
  BASE: '',
  WILD_CARD: '**',
  APP: 'app',
  LOGIN: 'login',
  LOGOUT: 'logout',
  DASHBOARD: 'dashboard',
  TIMESHEET: {
    BASE: 'timesheets',
    CREATE: 'create-timesheet',
    EDIT: 'edit-timesheet',
    LIST: 'manage-timesheets',
  },
  PROJECT: {
    BASE: 'timesheets',
    CREATE: 'create-project',
    EDIT: 'edit-project',
    LIST: 'manage-projects',
    ASSIGN: 'assign-project'
  },
  TASK: {
    BASE: 'timesheets',
    CREATE: 'create-task',
    EDIT: 'edit-task',
    LIST: 'manage-tasks',
  },
} as const;
