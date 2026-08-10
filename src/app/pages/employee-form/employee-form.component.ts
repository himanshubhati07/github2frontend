import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeStoreService } from '../../services/employee-store.service';
import { Employee } from '../../types';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class EmployeeFormComponent implements OnInit {
  router = inject(Router);
  location = inject(Location);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private store = inject(EmployeeStoreService);
  mode = signal<'create' | 'edit'>('create');
  employeeId = signal<string | null>(null);

  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(8)]],
    department: ['', [Validators.required]],
    designation: ['', [Validators.required]],
    joiningDate: ['', [Validators.required]],
    faceRegistered: [false],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mode.set('edit');
      this.employeeId.set(id);
      this.store.getById(id).subscribe((employee) => {
        if (employee) this.form.patchValue(employee);
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    const payload = {
      name: value.name || '', email: value.email || '', phone: value.phone || '', department: value.department || '', designation: value.designation || '', joiningDate: value.joiningDate || '', faceRegistered: !!value.faceRegistered,
    };
    if (this.mode() === 'edit' && this.employeeId()) {
      this.store.update(this.employeeId() as string, payload as Partial<Employee>).subscribe((employee) => this.router.navigate(['/employees', employee?.id ?? this.employeeId()]));
      return;
    }
    this.store.create(payload).subscribe((employee) => this.router.navigate(['/employees', employee.id]));
  }
}
