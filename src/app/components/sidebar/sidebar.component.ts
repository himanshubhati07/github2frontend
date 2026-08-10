import { Component, ViewEncapsulation, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {
  private router = inject(Router);
  auth = inject(AuthService);
  navItems = [
    { label: 'Dashboard', to: '/dashboard', icon: 'dashboard', roles: ['*'] },
    { label: 'Employees', to: '/employees', icon: 'users', roles: ['admin', 'manager'] },
    { label: 'Face Scan', to: '/face-scan', icon: 'scan', roles: ['*'] },
    { label: 'Attendance', to: '/attendance', icon: 'clock', roles: ['*'] },
    { label: 'Time Cards', to: '/time-cards', icon: 'card', roles: ['admin', 'manager'] },
    { label: 'Reports', to: '/reports', icon: 'report', roles: ['admin', 'manager'] },
    { label: 'Profile', to: '/profile', icon: 'profile', roles: ['*'] },
  ];

  canSee(roles: string[]): boolean {
    const role = this.auth.currentRole();
    return roles.includes('*') || (!!role && roles.includes(role));
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
