import { Component, OnInit, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AttendanceStoreService } from '../../services/attendance-store.service';
import { EmployeeStoreService } from '../../services/employee-store.service';
import { AttendanceRecord, Employee } from '../../types';

@Component({
  selector: 'app-attendance-history',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './attendance-history.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AttendanceHistoryComponent implements OnInit {
  private employeesStore = inject(EmployeeStoreService);
  private attendanceStore = inject(AttendanceStoreService);
  employees = signal<Employee[]>([]);
  records = signal<AttendanceRecord[]>([]);
  filterDate = signal(''); filterEmployee = signal(''); filterDepartment = signal(''); filterStatus = signal('');
  filteredRecords = computed(() => this.records().filter((record) => {
    const employee = this.employee(record.employeeId);
    return (!this.filterDate() || record.date === this.filterDate()) && (!this.filterEmployee() || record.employeeId === this.filterEmployee()) && (!this.filterDepartment() || employee?.department === this.filterDepartment()) && (!this.filterStatus() || record.status === this.filterStatus());
  }));
  departments = computed(() => Array.from(new Set(this.employees().map((employee) => employee.department))));
  ngOnInit(): void { this.employeesStore.getAll().subscribe((employees) => this.employees.set(employees)); this.attendanceStore.getAll().subscribe((records) => this.records.set(records)); }
  employee(id: string): Employee | undefined { return this.employees().find((employee) => employee.id === id); }
  reset(): void { this.filterDate.set(''); this.filterEmployee.set(''); this.filterDepartment.set(''); this.filterStatus.set(''); }
}
