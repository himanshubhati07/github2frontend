import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { demoUsers } from '../data/mock-data';
import { AuthToken, DemoUser, UserRole } from '../types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  readonly USE_MOCK = true;

  getUsers(): DemoUser[] {
    const raw = localStorage.getItem('app_users');
    const signedUp = raw ? JSON.parse(raw) as DemoUser[] : [];
    return [...demoUsers, ...signedUp];
  }

  private localLogin(email: string, password: string): boolean {
    const user = this.getUsers().find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);
    if (!user) return false;
    localStorage.setItem('auth_token', JSON.stringify({ id: user.id, name: user.name, email: user.email, role: user.role }));
    return true;
  }

  login(email: string, password: string): Observable<boolean> {
    if (this.USE_MOCK) return of(this.localLogin(email, password));
    return this.http.post<AuthToken>('/api/v1/auth/login', { email, password }).pipe(
      tap((res) => localStorage.setItem('auth_token', JSON.stringify(res))),
      map(() => true),
    );
  }

  private localSignup(name: string, email: string, password: string): DemoUser | null {
    if (this.getUsers().some((item) => item.email.toLowerCase() === email.toLowerCase())) return null;
    const user: DemoUser = { id: crypto.randomUUID(), name, email, password, role: 'employee' };
    const raw = localStorage.getItem('app_users');
    const users = raw ? JSON.parse(raw) as DemoUser[] : [];
    users.push(user);
    localStorage.setItem('app_users', JSON.stringify(users));
    localStorage.setItem('auth_token', JSON.stringify({ id: user.id, name: user.name, email: user.email, role: user.role }));
    return user;
  }

  signup(name: string, email: string, password: string): Observable<DemoUser | null> {
    if (this.USE_MOCK) return of(this.localSignup(name, email, password));
    return this.http.post<DemoUser>('/api/v1/auth/signup', { name, email, password }).pipe(
      tap((res) => localStorage.setItem('auth_token', JSON.stringify({ id: res.id, name: res.name, email: res.email, role: res.role }))),
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  currentUser(): AuthToken | null {
    const raw = localStorage.getItem('auth_token');
    return raw ? JSON.parse(raw) as AuthToken : null;
  }

  currentRole(): UserRole | null {
    return this.currentUser()?.role ?? null;
  }
}
