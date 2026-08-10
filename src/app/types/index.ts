export type UserRole = 'admin' | 'manager' | 'employee';

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface AuthToken {
  id?: string;
  name?: string;
  email: string;
  role: UserRole;
}

export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joiningDate: string;
  photoUrl: string;
  faceRegistered: boolean;
  status: 'Active' | 'Inactive';
}

export type AttendanceStatus = 'Present' | 'Absent' | 'Late';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  timeIn: string | null;
  timeOut: string | null;
  workingHours: string;
  status: AttendanceStatus;
  faceVerified: boolean;
}

export interface TimeCardReport {
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  totalWorkingDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  totalWorkingHours: string;
  averageWorkingHours: string;
}
