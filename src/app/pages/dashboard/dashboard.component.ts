import { Component, OnInit, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AttendanceStoreService } from '../../services/attendance-store.service';
import { EmployeeStoreService } from '../../services/employee-store.service';
import { AttendanceRecord, Employee } from '../../types';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  router = inject(Router);
  private employeesStore = inject(EmployeeStoreService);
  private attendanceStore = inject(AttendanceStoreService);
  employees = signal<Employee[]>([]);
  records = signal<AttendanceRecord[]>([]);
  today = this.attendanceStore.today;
  todayRecords = computed(() => this.records().filter((record) => record.date === this.today));
  activeEmployees = computed(() => this.employees().filter((employee) => employee.status === 'Active'));
  presentToday = computed(() => this.todayRecords().filter((record) => record.status === 'Present' || record.status === 'Late').length);
  absentToday = computed(() => Math.max(this.activeEmployees().length - this.presentToday(), 0));
  checkedIn = computed(() => this.todayRecords().filter((record) => !!record.timeIn && !record.timeOut).length);

  ngOnInit(): void {
    this.employeesStore.getAll().subscribe((employees) => this.employees.set(employees));
    this.attendanceStore.getAll().subscribe((records) => this.records.set(records));
  }

  employeeName(id: string): string {
    return this.employees().find((employee) => employee.id === id)?.name ?? 'Unknown Employee';
  }
}
