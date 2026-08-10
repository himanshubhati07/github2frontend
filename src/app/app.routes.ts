import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { ShellComponent } from './layout/shell/shell.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent) },
  { path: 'signup', loadComponent: () => import('./pages/signup/signup.component').then((m) => m.SignupComponent) },
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent) },
      { path: 'employees', loadComponent: () => import('./pages/employees/employees.component').then((m) => m.EmployeesComponent) },
      { path: 'employees/new', loadComponent: () => import('./pages/employee-form/employee-form.component').then((m) => m.EmployeeFormComponent) },
      { path: 'employees/:id', loadComponent: () => import('./pages/employee-detail/employee-detail.component').then((m) => m.EmployeeDetailComponent) },
      { path: 'employees/:id/edit', loadComponent: () => import('./pages/employee-form/employee-form.component').then((m) => m.EmployeeFormComponent) },
      { path: 'face-scan', loadComponent: () => import('./pages/face-scan/face-scan.component').then((m) => m.FaceScanComponent) },
      { path: 'attendance', loadComponent: () => import('./pages/attendance/attendance.component').then((m) => m.AttendanceComponent) },
      { path: 'attendance/history', loadComponent: () => import('./pages/attendance-history/attendance-history.component').then((m) => m.AttendanceHistoryComponent) },
      { path: 'time-cards', loadComponent: () => import('./pages/time-cards/time-cards.component').then((m) => m.TimeCardsComponent) },
      { path: 'reports', loadComponent: () => import('./pages/reports/reports.component').then((m) => m.ReportsComponent) },
      { path: 'profile', loadComponent: () => import('./pages/profile/profile.component').then((m) => m.ProfileComponent) },
    ],
  },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent) },
];
