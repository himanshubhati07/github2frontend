import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mockAttendanceRecords } from '../data/mock-data';
import { AttendanceRecord } from '../types';

@Injectable({ providedIn: 'root' })
export class AttendanceStoreService {
  private http = inject(HttpClient);
  readonly USE_MOCK = true;
  private readonly key = 'attendance_records';
  readonly today = '2026-08-10';

  private load(): AttendanceRecord[] {
    const raw = localStorage.getItem(this.key);
    if (raw) {
      const stored = JSON.parse(raw) as AttendanceRecord[];
      const missingSeedRecords = mockAttendanceRecords.filter((seedRecord) => !stored.some((record) => record.id === seedRecord.id));
      if (missingSeedRecords.length > 0) {
        const merged = [...stored, ...missingSeedRecords];
        localStorage.setItem(this.key, JSON.stringify(merged));
        return merged;
      }
      return stored;
    }
    localStorage.setItem(this.key, JSON.stringify(mockAttendanceRecords));
    return mockAttendanceRecords;
  }

  private save(records: AttendanceRecord[]): void {
    localStorage.setItem(this.key, JSON.stringify(records));
  }

  private localGetAll(): AttendanceRecord[] {
    return this.load();
  }

  private localGetById(id: string): AttendanceRecord | undefined {
    return this.load().find((record) => record.id === id);
  }

  private localGetTodayByEmployee(employeeId: string): AttendanceRecord | undefined {
    return this.load().find((record) => record.employeeId === employeeId && record.date === this.today);
  }

  private localCreate(input: Omit<AttendanceRecord, 'id'>): AttendanceRecord {
    const records = this.load();
    const record: AttendanceRecord = { ...input, id: crypto.randomUUID() };
    records.unshift(record);
    this.save(records);
    return record;
  }

  private localUpdate(id: string, patch: Partial<AttendanceRecord>): AttendanceRecord | undefined {
    const records = this.load();
    const index = records.findIndex((record) => record.id === id);
    if (index === -1) return undefined;
    records[index] = { ...records[index], ...patch };
    this.save(records);
    return records[index];
  }

  private currentTime(): string {
    return new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date());
  }

  private localCheckIn(employeeId: string, faceVerified = true): AttendanceRecord {
    const existing = this.localGetTodayByEmployee(employeeId);
    if (existing?.timeIn) return existing;
    if (existing) {
      return this.localUpdate(existing.id, { timeIn: this.currentTime(), status: 'Present', faceVerified, workingHours: 'In progress' }) as AttendanceRecord;
    }
    return this.localCreate({ employeeId, date: this.today, timeIn: this.currentTime(), timeOut: null, workingHours: 'In progress', status: 'Present', faceVerified });
  }

  private localCheckOut(employeeId: string): AttendanceRecord | undefined {
    const existing = this.localGetTodayByEmployee(employeeId);
    if (!existing || !existing.timeIn || existing.timeOut) return existing;
    return this.localUpdate(existing.id, { timeOut: this.currentTime(), workingHours: '8h 12m' });
  }

  getAll(): Observable<AttendanceRecord[]> {
    if (this.USE_MOCK) return of(this.localGetAll());
    return this.http.get<AttendanceRecord[]>('/api/v1/attendance');
  }

  getById(id: string): Observable<AttendanceRecord | undefined> {
    if (this.USE_MOCK) return of(this.localGetById(id));
    return this.http.get<AttendanceRecord>(`/api/v1/attendance/${id}`);
  }

  getTodayByEmployee(employeeId: string): Observable<AttendanceRecord | undefined> {
    if (this.USE_MOCK) return of(this.localGetTodayByEmployee(employeeId));
    return this.http.get<AttendanceRecord>(`/api/v1/attendance/today/${employeeId}`);
  }

  create(input: Omit<AttendanceRecord, 'id'>): Observable<AttendanceRecord> {
    if (this.USE_MOCK) return of(this.localCreate(input));
    return this.http.post<AttendanceRecord>('/api/v1/attendance', input);
  }

  update(id: string, patch: Partial<AttendanceRecord>): Observable<AttendanceRecord | undefined> {
    if (this.USE_MOCK) return of(this.localUpdate(id, patch));
    return this.http.patch<AttendanceRecord>(`/api/v1/attendance/${id}`, patch);
  }

  checkIn(employeeId: string, faceVerified = true): Observable<AttendanceRecord> {
    if (this.USE_MOCK) return of(this.localCheckIn(employeeId, faceVerified));
    return this.http.post<AttendanceRecord>('/api/v1/attendance/check-in', { employeeId, faceVerified });
  }

  checkOut(employeeId: string): Observable<AttendanceRecord | undefined> {
    if (this.USE_MOCK) return of(this.localCheckOut(employeeId));
    return this.http.post<AttendanceRecord>('/api/v1/attendance/check-out', { employeeId });
  }
}
