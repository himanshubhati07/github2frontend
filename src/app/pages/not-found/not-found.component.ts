import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule],
  template: `<main class="flex min-h-screen items-center justify-center bg-muted-light p-4"><section class="card max-w-lg p-10 text-center"><p class="text-6xl font-bold text-primary">404</p><h1 class="mt-4 text-2xl font-bold">Page not found</h1><p class="mt-2 text-muted">The page you are looking for does not exist.</p><a routerLink="/" class="btn-primary mt-6">Go Home</a></section></main>`,
  encapsulation: ViewEncapsulation.None,
})
export class NotFoundComponent {}
