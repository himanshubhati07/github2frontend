import { AttendanceRecord, DemoUser, Employee } from '../types';

export const demoUsers: DemoUser[] = [
  { id: 'u1', name: 'Admin User', email: 'admin@example.com', password: 'password123', role: 'admin' },
  { id: 'u2', name: 'HR Manager', email: 'manager@example.com', password: 'password123', role: 'manager' },
  { id: 'u3', name: 'Demo Employee', email: 'demo@example.com', password: 'password123', role: 'employee' },
];

export const mockEmployees: Employee[] = [
  { id: 'emp-1', employeeId: 'EMP-1001', name: 'Rahul Sharma', email: 'rahul.sharma@company.com', phone: '+91 98765 43210', department: 'Engineering', designation: 'Frontend Developer', joiningDate: '2022-04-12', photoUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Rahul%20Sharma', faceRegistered: true, status: 'Active' },
  { id: 'emp-2', employeeId: 'EMP-1002', name: 'Priya Nair', email: 'priya.nair@company.com', phone: '+91 99887 76655', department: 'Human Resources', designation: 'HR Executive', joiningDate: '2021-09-01', photoUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Priya%20Nair', faceRegistered: true, status: 'Active' },
  { id: 'emp-3', employeeId: 'EMP-1003', name: 'Amit Verma', email: 'amit.verma@company.com', phone: '+91 91234 56780', department: 'Sales', designation: 'Sales Manager', joiningDate: '2020-02-18', photoUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Amit%20Verma', faceRegistered: false, status: 'Active' },
  { id: 'emp-4', employeeId: 'EMP-1004', name: 'Sneha Iyer', email: 'sneha.iyer@company.com', phone: '+91 90000 11122', department: 'Finance', designation: 'Accountant', joiningDate: '2023-01-09', photoUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Sneha%20Iyer', faceRegistered: true, status: 'Active' },
  { id: 'emp-5', employeeId: 'EMP-1005', name: 'Karan Mehta', email: 'karan.mehta@company.com', phone: '+91 95555 44433', department: 'Operations', designation: 'Operations Lead', joiningDate: '2019-06-24', photoUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Karan%20Mehta', faceRegistered: true, status: 'Active' },
  { id: 'emp-6', employeeId: 'EMP-1006', name: 'Neha Kapoor', email: 'neha.kapoor@company.com', phone: '+91 94444 88877', department: 'Marketing', designation: 'Content Strategist', joiningDate: '2022-11-15', photoUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Neha%20Kapoor', faceRegistered: false, status: 'Active' },
  { id: 'emp-7', employeeId: 'EMP-1007', name: 'Vikram Rao', email: 'vikram.rao@company.com', phone: '+91 93333 22211', department: 'Engineering', designation: 'QA Engineer', joiningDate: '2021-03-30', photoUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Vikram%20Rao', faceRegistered: true, status: 'Inactive' },
  { id: 'emp-8', employeeId: 'EMP-1008', name: 'Ananya Sen', email: 'ananya.sen@company.com', phone: '+91 92222 33344', department: 'Design', designation: 'Product Designer', joiningDate: '2023-07-03', photoUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Ananya%20Sen', faceRegistered: true, status: 'Active' },
  { id: 'emp-9', employeeId: 'EMP-1009', name: 'Mohit Jain', email: 'mohit.jain@company.com', phone: '+91 91111 55566', department: 'Support', designation: 'Support Specialist', joiningDate: '2024-02-19', photoUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Mohit%20Jain', faceRegistered: false, status: 'Active' },
  { id: 'emp-10', employeeId: 'EMP-1010', name: 'Farah Khan', email: 'farah.khan@company.com', phone: '+91 90123 45678', department: 'Finance', designation: 'Finance Analyst', joiningDate: '2020-12-07', photoUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Farah%20Khan', faceRegistered: true, status: 'Active' },
  { id: 'emp-11', employeeId: 'EMP-1011', name: 'Arjun Menon', email: 'arjun.menon@company.com', phone: '+91 98700 11223', department: 'Engineering', designation: 'Backend Developer', joiningDate: '2021-08-16', photoUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Arjun%20Menon', faceRegistered: true, status: 'Active' },
  { id: 'emp-12', employeeId: 'EMP-1012', name: 'Meera Joshi', email: 'meera.joshi@company.com', phone: '+91 97654 32109', department: 'Human Resources', designation: 'Recruitment Lead', joiningDate: '2022-05-23', photoUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Meera%20Joshi', faceRegistered: true, status: 'Active' },
  { id: 'emp-13', employeeId: 'EMP-1013', name: 'Rohan Das', email: 'rohan.das@company.com', phone: '+91 96543 21098', department: 'Operations', designation: 'Shift Supervisor', joiningDate: '2020-10-11', photoUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Rohan%20Das', faceRegistered: false, status: 'Active' },
  { id: 'emp-14', employeeId: 'EMP-1014', name: 'Isha Malhotra', email: 'isha.malhotra@company.com', phone: '+91 95432 10987', department: 'Design', designation: 'UX Researcher', joiningDate: '2023-03-27', photoUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Isha%20Malhotra', faceRegistered: true, status: 'Active' },
  { id: 'emp-15', employeeId: 'EMP-1015', name: 'Siddharth Pillai', email: 'siddharth.pillai@company.com', phone: '+91 94321 09876', department: 'Support', designation: 'Customer Success Manager', joiningDate: '2019-12-02', photoUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Siddharth%20Pillai', faceRegistered: true, status: 'Inactive' },
  { id: 'emp-16', employeeId: 'EMP-1016', name: 'Tanya Bhatia', email: 'tanya.bhatia@company.com', phone: '+91 93210 98765', department: 'Marketing', designation: 'Campaign Manager', joiningDate: '2024-01-08', photoUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Tanya%20Bhatia', faceRegistered: false, status: 'Active' },
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  { id: 'att-1', employeeId: 'emp-1', date: '2026-08-10', timeIn: '09:32 AM', timeOut: '06:15 PM', workingHours: '8h 43m', status: 'Present', faceVerified: true },
  { id: 'att-2', employeeId: 'emp-2', date: '2026-08-10', timeIn: '09:05 AM', timeOut: null, workingHours: 'In progress', status: 'Present', faceVerified: true },
  { id: 'att-3', employeeId: 'emp-3', date: '2026-08-10', timeIn: '10:18 AM', timeOut: null, workingHours: 'In progress', status: 'Late', faceVerified: true },
  { id: 'att-4', employeeId: 'emp-4', date: '2026-08-10', timeIn: null, timeOut: null, workingHours: '0h 00m', status: 'Absent', faceVerified: false },
  { id: 'att-5', employeeId: 'emp-5', date: '2026-08-10', timeIn: '09:20 AM', timeOut: '05:55 PM', workingHours: '8h 35m', status: 'Present', faceVerified: true },
  { id: 'att-6', employeeId: 'emp-6', date: '2026-08-09', timeIn: '09:50 AM', timeOut: '06:10 PM', workingHours: '8h 20m', status: 'Late', faceVerified: true },
  { id: 'att-7', employeeId: 'emp-8', date: '2026-08-09', timeIn: '09:10 AM', timeOut: '06:03 PM', workingHours: '8h 53m', status: 'Present', faceVerified: true },
  { id: 'att-8', employeeId: 'emp-9', date: '2026-08-09', timeIn: null, timeOut: null, workingHours: '0h 00m', status: 'Absent', faceVerified: false },
  { id: 'att-9', employeeId: 'emp-10', date: '2026-08-08', timeIn: '09:00 AM', timeOut: '05:50 PM', workingHours: '8h 50m', status: 'Present', faceVerified: true },
  { id: 'att-10', employeeId: 'emp-1', date: '2026-08-08', timeIn: '09:42 AM', timeOut: '06:20 PM', workingHours: '8h 38m', status: 'Late', faceVerified: true },
  { id: 'att-11', employeeId: 'emp-2', date: '2026-08-08', timeIn: '09:12 AM', timeOut: '06:00 PM', workingHours: '8h 48m', status: 'Present', faceVerified: true },
  { id: 'att-12', employeeId: 'emp-5', date: '2026-08-07', timeIn: '09:15 AM', timeOut: '06:05 PM', workingHours: '8h 50m', status: 'Present', faceVerified: true },
  { id: 'att-13', employeeId: 'emp-11', date: '2026-08-10', timeIn: '09:08 AM', timeOut: null, workingHours: 'In progress', status: 'Present', faceVerified: true },
  { id: 'att-14', employeeId: 'emp-12', date: '2026-08-10', timeIn: '09:36 AM', timeOut: '06:12 PM', workingHours: '8h 36m', status: 'Present', faceVerified: true },
  { id: 'att-15', employeeId: 'emp-13', date: '2026-08-10', timeIn: '10:05 AM', timeOut: null, workingHours: 'In progress', status: 'Late', faceVerified: false },
  { id: 'att-16', employeeId: 'emp-14', date: '2026-08-10', timeIn: '09:18 AM', timeOut: '05:52 PM', workingHours: '8h 34m', status: 'Present', faceVerified: true },
  { id: 'att-17', employeeId: 'emp-16', date: '2026-08-10', timeIn: null, timeOut: null, workingHours: '0h 00m', status: 'Absent', faceVerified: false },
  { id: 'att-18', employeeId: 'emp-11', date: '2026-08-09', timeIn: '09:22 AM', timeOut: '06:01 PM', workingHours: '8h 39m', status: 'Present', faceVerified: true },
  { id: 'att-19', employeeId: 'emp-12', date: '2026-08-09', timeIn: '09:58 AM', timeOut: '06:25 PM', workingHours: '8h 27m', status: 'Late', faceVerified: true },
  { id: 'att-20', employeeId: 'emp-14', date: '2026-08-08', timeIn: '09:11 AM', timeOut: '05:47 PM', workingHours: '8h 36m', status: 'Present', faceVerified: true },
];
