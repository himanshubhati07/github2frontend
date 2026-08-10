import { Component, ViewEncapsulation, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './topbar.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class TopbarComponent {
  private router = inject(Router);
  auth = inject(AuthService);

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
