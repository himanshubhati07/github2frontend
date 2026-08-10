import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterModule, SidebarComponent, TopbarComponent],
  template: `
    <div class="min-h-screen bg-muted-light lg:flex">
      <app-sidebar />
      <div class="min-w-0 flex-1">
        <app-topbar />
        <main class="p-4 sm:p-6 lg:p-8">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ShellComponent {}
