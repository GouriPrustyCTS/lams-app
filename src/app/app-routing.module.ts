import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/login/guards/auth.guard';

// const routes: Routes = [


// lazy loading
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'employee',
    loadChildren: () =>
      import('./modules/employee/employee.module').then(
        (m) => m.EmployeeModule
      ),
      canActivate: [AuthGuard],
  },
  {
    path: 'attendance',
    loadChildren: () =>
      import('./modules/attendance/attendance-app.module').then(
        (m) => m.AttendanceModule
      ),
      canActivate: [AuthGuard],
  },
  {
  path: '',
  loadChildren: () =>
    import('./modules/leave-balance/leave-balance.module').then(
      (m) => m.LeaveBalanceModule
    ),
    canActivate: [AuthGuard],

},
{
  path: '',
  loadChildren: () =>
    import('./modules/leave-request/leave-request.module').then(
      (m) => m.LeaveRequestModule
    ),
    canActivate: [AuthGuard],
},
{
  path: '',
  loadChildren: () =>
    import('./modules/shift-swap/shift-swap.module').then(
      (m) => m.ShiftSwapModule
    ),
    canActivate: [AuthGuard],
},
{
  path: '',
  loadChildren: () =>
    import('./modules/report/report.module').then((m) => m.ReportModule),
  canActivate: [AuthGuard],
},
{
  path: '',
  loadChildren: () =>
    import('./modules/login/login.module').then((m) => m.LoginModule),
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
