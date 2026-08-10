import { Component, OnInit, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmployeeStoreService } from '../../services/employee-store.service';
import { Employee } from '../../types';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './employees.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class EmployeesComponent implements OnInit {
  router = inject(Router);
  private store = inject(EmployeeStoreService);
  employees = signal<Employee[]>([]);
  query = signal('');
  message = signal('');
  filteredEmployees = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return this.employees();
    return this.employees().filter((employee) => [employee.name, employee.email, employee.employeeId, employee.department, employee.designation].join(' ').toLowerCase().includes(q));
  });

  ngOnInit(): void { this.load(); }

  load(): void {
    this.store.getAll().subscribe((employees) => this.employees.set(employees));
  }

  deactivate(employee: Employee): void {
    this.store.update(employee.id, { status: employee.status === 'Active' ? 'Inactive' : 'Active' }).subscribe(() => {
      this.message.set(`${employee.name} has been ${employee.status === 'Active' ? 'deactivated' : 'activated'}.`);
      this.load();
    });
  }

  deleteEmployee(employee: Employee): void {
    this.store.delete(employee.id).subscribe(() => {
      this.message.set(`${employee.name} was deleted.`);
      this.load();
    });
  }
}
