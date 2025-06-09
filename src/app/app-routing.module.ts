import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
// {
//   path: 'login',
//   loadChildren: () =>
//     import('./modules/login/login.module').then((m) => m.LoginModule),
// },




const routes: Routes = [
  {
    path: 'attendance-employee',
    loadChildren: () =>
      import('./modules/attendance/attendance-app.module').then(
        (m) => m.AttendanceModule
      ),
  },
  {
  path: '',
  loadChildren: () =>
    import('./modules/leave-balance/leave-balance.module').then(
      (m) => m.LeaveBalanceModule
    ),
},
{
  path: '',
  loadChildren: () =>
    import('./modules/leave-request/leave-request.module').then(
      (m) => m.LeaveRequestModule
    ),
},
{
  path: '',
  loadChildren: () =>
    import('./modules/shift-swap/shift-swap.module').then(
      (m) => m.ShiftSwapModule
    ),
},
{
  path: '',
  loadChildren: () =>
    import('./modules/report/report.module').then((m) => m.ReportModule),
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
