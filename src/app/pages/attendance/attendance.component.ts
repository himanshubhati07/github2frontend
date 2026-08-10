import { Component, OnInit, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AttendanceStoreService } from '../../services/attendance-store.service';
import { EmployeeStoreService } from '../../services/employee-store.service';
import { AttendanceRecord, Employee } from '../../types';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './attendance.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AttendanceComponent implements OnInit {
  router = inject(Router);
  private employeesStore = inject(EmployeeStoreService);
  private attendanceStore = inject(AttendanceStoreService);
  employees = signal<Employee[]>([]);
  records = signal<AttendanceRecord[]>([]);
  selectedEmployeeId = signal('');
  message = signal('');
  todayRecord = computed(() => this.records().find((record) => record.employeeId === this.selectedEmployeeId() && record.date === this.attendanceStore.today));
  selectedEmployee = computed(() => this.employees().find((employee) => employee.id === this.selectedEmployeeId()) ?? null);

  ngOnInit(): void { this.load(); }

  load(): void {
    this.employeesStore.getAll().subscribe((employees) => {
      const active = employees.filter((employee) => employee.status === 'Active');
      this.employees.set(active);
      if (!this.selectedEmployeeId()) this.selectedEmployeeId.set(active[0]?.id || '');
    });
    this.attendanceStore.getAll().subscribe((records) => this.records.set(records));
  }

  checkIn(): void {
    const existing = this.todayRecord();
    if (existing?.timeIn) { this.message.set('Already checked in today. Multiple check-ins are prevented.'); return; }
    this.attendanceStore.checkIn(this.selectedEmployeeId(), true).subscribe(() => { this.message.set('Check-in recorded successfully.'); this.load(); });
  }

  checkOut(): void {
    const existing = this.todayRecord();
    if (!existing?.timeIn) { this.message.set('Please check in before checking out.'); return; }
    if (existing.timeOut) { this.message.set('Already checked out today. Multiple check-outs are prevented.'); return; }
    this.attendanceStore.checkOut(this.selectedEmployeeId()).subscribe(() => { this.message.set('Check-out recorded successfully.'); this.load(); });
  }
}
