import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AttendanceStoreService } from '../../services/attendance-store.service';
import { EmployeeStoreService } from '../../services/employee-store.service';
import { AttendanceRecord, Employee } from '../../types';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './employee-detail.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class EmployeeDetailComponent implements OnInit {
  router = inject(Router);
  location = inject(Location);
  private route = inject(ActivatedRoute);
  private employeesStore = inject(EmployeeStoreService);
  private attendanceStore = inject(AttendanceStoreService);
  employee = signal<Employee | null>(null);
  records = signal<AttendanceRecord[]>([]);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.employeesStore.getById(id).subscribe((employee) => this.employee.set(employee ?? null));
    this.attendanceStore.getAll().subscribe((records) => this.records.set(records.filter((record) => record.employeeId === id)));
  }
}
