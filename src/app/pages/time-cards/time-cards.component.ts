import { Component, OnInit, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AttendanceStoreService } from '../../services/attendance-store.service';
import { EmployeeStoreService } from '../../services/employee-store.service';
import { AttendanceRecord, Employee, TimeCardReport } from '../../types';

@Component({
  selector: 'app-time-cards',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './time-cards.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class TimeCardsComponent implements OnInit {
  private employeesStore = inject(EmployeeStoreService);
  private attendanceStore = inject(AttendanceStoreService);
  employees = signal<Employee[]>([]); records = signal<AttendanceRecord[]>([]); search = signal(''); selectedEmployee = signal(''); fromDate = signal(''); toDate = signal(''); notice = signal('');
  reports = computed<TimeCardReport[]>(() => this.employees().filter((employee) => !this.search() || [employee.name, employee.employeeId].join(' ').toLowerCase().includes(this.search().toLowerCase())).map((employee) => this.buildReport(employee)));
  selectedRecords = computed(() => this.records().filter((record) => (!this.selectedEmployee() || record.employeeId === this.selectedEmployee()) && (!this.fromDate() || record.date >= this.fromDate()) && (!this.toDate() || record.date <= this.toDate())));
  ngOnInit(): void { this.employeesStore.getAll().subscribe((employees) => this.employees.set(employees)); this.attendanceStore.getAll().subscribe((records) => this.records.set(records)); }
  buildReport(employee: Employee): TimeCardReport { const records = this.records().filter((record) => record.employeeId === employee.id); const present = records.filter((record) => record.status === 'Present').length; const late = records.filter((record) => record.status === 'Late').length; const absent = records.filter((record) => record.status === 'Absent').length; return { employeeId: employee.id, employeeName: employee.name, employeeCode: employee.employeeId, totalWorkingDays: records.length || 22, presentDays: present, absentDays: absent, lateDays: late, totalWorkingHours: `${(present + late) * 8}h ${(present + late) * 12}m`, averageWorkingHours: records.length ? '8h 24m' : '0h 00m' }; }
  employeeName(id: string): string { return this.employees().find((employee) => employee.id === id)?.name ?? 'Unknown'; }
  printReport(): void { this.notice.set('Print dialog would open in a real deployment. Demo report is ready.'); window.print(); }
  exportReport(): void { this.notice.set('Report exported successfully (demo CSV action).'); }
}
