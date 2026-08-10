import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  saved = signal('');
  user = this.auth.currentUser();
  form = this.fb.group({ name: [this.user?.name || '', [Validators.required]], email: [this.user?.email || '', [Validators.required, Validators.email]], role: [this.user?.role || '', [Validators.required]] });
  onSubmit(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } this.saved.set('Profile saved locally for demo purposes.'); }
  logout(): void { this.auth.logout(); this.router.navigate(['/login']); }
}
