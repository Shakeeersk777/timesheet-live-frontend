import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { NGX_LOADER_TYPE } from './core/constants/constants';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { userReducer } from './store/employee/employee.reducer';
import { EmployeeEffects } from './store/employee/employee.effect';
import { TimesheetEffects } from './store/timesheet/timesheet.effect';
import { timesheetReducer } from './store/timesheet/timesheet.reducer';
import { ProjectEffects } from './store/project/project.effect';
import { projectReducer } from './store/project/project.reducer';
import { TaskEffects } from './store/task/task.effect';
import { taskReducer } from './store/task/task.reducer';
import { AccountsEffects } from './store/accounts/accounts.effect';
import { accountsReducer } from './store/accounts/accounts.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(NgxSpinnerModule.forRoot({ type: NGX_LOADER_TYPE })),
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, errorInterceptor])
    ),
    provideCharts(withDefaultRegisterables()),
    provideStore(),
    provideEffects([
      EmployeeEffects,
      TimesheetEffects,
      ProjectEffects,
      TaskEffects,
      AccountsEffects,
    ]),
    provideState('users', userReducer),
    provideState('timesheets', timesheetReducer),
    provideState('projects', projectReducer),
    provideState('tasks', taskReducer),
    provideState('accounts', accountsReducer),
  ],
};
