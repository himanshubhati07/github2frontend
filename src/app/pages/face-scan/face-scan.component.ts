import { Component, OnInit, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AttendanceStoreService } from '../../services/attendance-store.service';
import { EmployeeStoreService } from '../../services/employee-store.service';
import { Employee } from '../../types';

@Component({
  selector: 'app-face-scan',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './face-scan.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class FaceScanComponent implements OnInit {
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private employeesStore = inject(EmployeeStoreService);
  private attendanceStore = inject(AttendanceStoreService);
  employees = signal<Employee[]>([]);
  selectedEmployeeId = signal('');
  scanState = signal<'idle' | 'scanning' | 'verified' | 'recorded' | 'error'>('idle');
  message = signal('Select an employee and start the mock face scan.');
  selectedEmployee = computed(() => this.employees().find((employee) => employee.id === this.selectedEmployeeId()) ?? null);

  ngOnInit(): void {
    this.employeesStore.getAll().subscribe((employees) => {
      this.employees.set(employees.filter((employee) => employee.status === 'Active'));
      const fromQuery = this.route.snapshot.queryParamMap.get('employee');
      this.selectedEmployeeId.set(fromQuery || employees[0]?.id || '');
    });
  }

  startScan(): void {
    if (!this.selectedEmployeeId()) {
      this.scanState.set('error');
      this.message.set('Please select an employee before scanning.');
      return;
    }
    this.scanState.set('scanning');
    this.message.set('Scanning face points... this is a mock demo flow.');
    setTimeout(() => {
      this.scanState.set('verified');
      this.message.set('Face Verified. Attendance can now be recorded.');
    }, 900);
  }

  recordAttendance(): void {
    if (this.scanState() !== 'verified') return;
    this.attendanceStore.checkIn(this.selectedEmployeeId(), true).subscribe(() => {
      this.scanState.set('recorded');
      this.message.set('Attendance recorded successfully. Multiple check-ins are prevented for today.');
    });
  }
}
