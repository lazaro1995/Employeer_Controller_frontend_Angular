import { Routes } from '@angular/router';
import LoginComponent from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout.component'),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./components/pages/dashboard/dashboard.component'),
      },
      {
        path: 'timecard',
        loadComponent: () =>
          import('./components/pages/timecard/timecard.component'),
      },
      {
        path: 'timecard/:id',
        loadComponent: () =>
          import('./components/pages/timecard/employee-hours/employee-hours.component'),
      },

      {
        path: 'employee',
        loadComponent: () =>
          import('./components/pages//employee/employee.component'),
      },
      {
        path: 'employee/newEmployee',
        loadComponent: () =>
          import('./components/pages/employee/new-employee/new-employee.component'),
      },
      {
        path: 'employee/:id',
        loadComponent: () =>
          import('./components/pages/employee/find-employee/find-employee.component'),
      },
      {
        path: 'report',
        loadComponent: () =>
          import('./components/pages/report/report.component'),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '**', component: NotFoundComponent
  },
];
