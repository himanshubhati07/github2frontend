import { Component, OnInit, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AttendanceStoreService } from '../../services/attendance-store.service';
import { EmployeeStoreService } from '../../services/employee-store.service';
import { AttendanceRecord, Employee } from '../../types';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './reports.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ReportsComponent implements OnInit {
  router = inject(Router);
  private employeesStore = inject(EmployeeStoreService);
  private attendanceStore = inject(AttendanceStoreService);
  employees = signal<Employee[]>([]); records = signal<AttendanceRecord[]>([]); department = signal(''); notice = signal('');
  departments = computed(() => Array.from(new Set(this.employees().map((employee) => employee.department))));
  departmentEmployees = computed(() => this.department() ? this.employees().filter((employee) => employee.department === this.department()) : this.employees());
  present = computed(() => this.records().filter((record) => record.status === 'Present').length); late = computed(() => this.records().filter((record) => record.status === 'Late').length); absent = computed(() => this.records().filter((record) => record.status === 'Absent').length);
  ngOnInit(): void { this.employeesStore.getAll().subscribe((employees) => this.employees.set(employees)); this.attendanceStore.getAll().subscribe((records) => this.records.set(records)); }
  exportSummary(): void { this.notice.set('Attendance summary exported successfully (demo action).'); }
}
