# face id ui — Routes & Navigation

## How to run
cd /home/ryzen/frontend_generator_backend/frontend_runs/run_7677c557_20260810_132629/project
npm install && ng serve --port 44873
Then open http://localhost:44873

## Routes

| Route | Component file | Description |
|-------|----------------|-------------|
| / | redirects | Redirects to the main screen |
| /login | src/app/pages/login/login.component.ts | Public login screen with validation and mock authentication |
| /signup | src/app/pages/signup/signup.component.ts | Public account creation screen with validation |
| /dashboard | src/app/pages/dashboard/dashboard.component.ts | Protected dashboard with employee and attendance summary cards |
| /employees | src/app/pages/employees/employees.component.ts | Employee management list with search, view, edit, deactivate and delete actions |
| /employees/new | src/app/pages/employee-form/employee-form.component.ts | Add new employee form with validation and localStorage persistence |
| /employees/:id | src/app/pages/employee-detail/employee-detail.component.ts | Employee detail view loaded from the route id |
| /employees/:id/edit | src/app/pages/employee-form/employee-form.component.ts | Edit employee form loaded from the route id |
| /face-scan | src/app/pages/face-scan/face-scan.component.ts | Mock face verification flow that records attendance |
| /attendance | src/app/pages/attendance/attendance.component.ts | Time In / Time Out page with duplicate action prevention |
| /attendance/history | src/app/pages/attendance-history/attendance-history.component.ts | Attendance history table with date, employee, department and status filters |
| /time-cards | src/app/pages/time-cards/time-cards.component.ts | Employee time card reports with search, date filters, print and export demo actions |
| /reports | src/app/pages/reports/reports.component.ts | Management reports and department summary page |
| /profile | src/app/pages/profile/profile.component.ts | Current user profile form and logout action |
| ** | src/app/pages/not-found/not-found.component.ts | Unknown URL fallback with Go Home link |

## Navigation map
- Login -> Dashboard (successful login form submit)
- Login -> Signup (create account link)
- Signup -> Dashboard (successful signup form submit)
- Signup -> Login (back to login link)
- Any protected route -> Login (auth guard when signed out)
- Sidebar -> Dashboard (sidebar link)
- Sidebar -> Employees (sidebar link for admin/manager roles)
- Sidebar -> Face Scan (sidebar link)
- Sidebar -> Attendance (sidebar link)
- Sidebar -> Time Cards (sidebar link for admin/manager roles)
- Sidebar -> Reports (sidebar link for admin/manager roles)
- Sidebar -> Profile (sidebar link)
- Sidebar -> Login (logout button)
- Topbar -> Face Scan (Quick Face Scan link)
- Dashboard -> Face Scan (Start Face Scan button)
- Dashboard -> Attendance History (View History button)
- Dashboard -> Add Employee (quick action button)
- Dashboard -> Attendance (quick action button)
- Dashboard -> Time Cards (quick action button)
- Employees -> EmployeeDetail (click employee table row)
- Employees -> EmployeeForm create (Add new employee button)
- Employees -> EmployeeForm edit (Edit button)
- Employees -> Employees (Deactivate/Activate/Delete actions update list)
- EmployeeForm create -> EmployeeDetail (valid form submit after persisting employee)
- EmployeeForm edit -> EmployeeDetail (valid form submit after updating employee)
- EmployeeDetail -> Employees or previous page (Back button)
- EmployeeDetail -> EmployeeForm edit (Edit employee button)
- EmployeeDetail -> Face Scan (Start face scan button with employee query parameter)
- Face Scan -> Attendance (Go to Time In / Time Out button)
- Face Scan -> Face Scan recorded state (Record attendance button after mock verification)
- Attendance -> Attendance History (Attendance History button)
- Attendance -> Face Scan (Verify with Face Scan button with employee query parameter)
- Attendance -> Attendance updated state (Check In / Check Out buttons)
- Time Cards -> browser print dialog (Print Report button)
- Time Cards -> exported notice (Download / Export Report button)
- Reports -> EmployeeDetail (click department employee card)
- Reports -> exported notice (Export Report button)
- Profile -> Login (Logout button)
- Profile -> saved notice (valid profile form submit)
- Any page -> NotFound (unknown URL)

## Shared components
- src/app/components/sidebar/sidebar.component.ts — Desktop and mobile sidebar navigation with RBAC filtering, active routerLink styling, inline SVG icons and logout.
- src/app/components/topbar/topbar.component.ts — Desktop top header with current user identity and Quick Face Scan navigation.
- src/app/layout/shell/shell.component.ts — Protected app layout that renders sidebar, topbar and child router outlet.

## Design tokens
- primary: #2563EB
- primary-dark: #1E40AF
- accent: #14B8A6
- surface: #FFFFFF
- muted: #64748B
- muted-light: #F1F5F9
- ink: #0F172A
- line: #E2E8F0
- success: #16A34A
- warning: #F59E0B
- danger: #DC2626
- info: #0EA5E9
