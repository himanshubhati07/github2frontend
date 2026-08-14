import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mockEmployees } from '../data/mock-data';
import { Employee } from '../types';

@Injectable({ providedIn: 'root' })
export class EmployeeStoreService {
  private http = inject(HttpClient);
  readonly USE_MOCK = true;
  private readonly key = 'attendance_employees';

  private load(): Employee[] {
    const raw = localStorage.getItem(this.key);
    if (raw) {
      const stored = JSON.parse(raw) as Employee[];
      const missingSeedEmployees = mockEmployees.filter((seedEmployee) => !stored.some((employee) => employee.id === seedEmployee.id));
      if (missingSeedEmployees.length > 0) {
        const merged = [...stored, ...missingSeedEmployees];
        localStorage.setItem(this.key, JSON.stringify(merged));
        return merged;
      }
      return stored;
    }
    localStorage.setItem(this.key, JSON.stringify(mockEmployees));
    return mockEmployees;
  }

  private save(items: Employee[]): void {
    localStorage.setItem(this.key, JSON.stringify(items));
  }

  private localGetAll(): Employee[] {
    return this.load();
  }

  private localGetById(id: string): Employee | undefined {
    return this.load().find((employee) => employee.id === id);
  }

  private localCreate(input: Omit<Employee, 'id' | 'employeeId' | 'photoUrl' | 'status'> & Partial<Pick<Employee, 'photoUrl' | 'status'>>): Employee {
    const all = this.load();
    const nextNumber = all.length + 1001;
    const employee: Employee = {
      ...input,
      id: crypto.randomUUID(),
      employeeId: `EMP-${nextNumber}`,
      photoUrl: input.photoUrl || `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(input.name)}`,
      status: input.status || 'Active',
    };
    all.unshift(employee);
    this.save(all);
    return employee;
  }

  private localUpdate(id: string, patch: Partial<Employee>): Employee | undefined {
    const all = this.load();
    const index = all.findIndex((employee) => employee.id === id);
    if (index === -1) return undefined;
    all[index] = { ...all[index], ...patch };
    this.save(all);
    return all[index];
  }

  private localDelete(id: string): boolean {
    const all = this.load();
    const next = all.filter((employee) => employee.id !== id);
    this.save(next);
    return next.length !== all.length;
  }

  getAll(): Observable<Employee[]> {
    if (this.USE_MOCK) return of(this.localGetAll());
    return this.http.get<Employee[]>('/api/v1/employees');
  }

  getById(id: string): Observable<Employee | undefined> {
    if (this.USE_MOCK) return of(this.localGetById(id));
    return this.http.get<Employee>(`/api/v1/employees/${id}`);
  }

  create(input: Omit<Employee, 'id' | 'employeeId' | 'photoUrl' | 'status'> & Partial<Pick<Employee, 'photoUrl' | 'status'>>): Observable<Employee> {
    if (this.USE_MOCK) return of(this.localCreate(input));
    return this.http.post<Employee>('/api/v1/employees', input);
  }

  update(id: string, patch: Partial<Employee>): Observable<Employee | undefined> {
    if (this.USE_MOCK) return of(this.localUpdate(id, patch));
    return this.http.patch<Employee>(`/api/v1/employees/${id}`, patch);
  }

  delete(id: string): Observable<boolean> {
    if (this.USE_MOCK) return of(this.localDelete(id));
    return this.http.delete<void>(`/api/v1/employees/${id}`).pipe(() => of(true));
  }
}
