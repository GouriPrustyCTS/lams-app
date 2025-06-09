import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) }, { path: 'attendance', loadChildren: () => import('./modules/attendance/attendance.module').then(m => m.AttendanceModule) }, { path: 'leave-balance', loadChildren: () => import('./modules/leave-balance/leave-balance.module').then(m => m.LeaveBalanceModule) }, { path: 'leave-request', loadChildren: () => import('./modules/leave-request/leave-request.module').then(m => m.LeaveRequestModule) }, { path: 'report', loadChildren: () => import('./modules/report/report.module').then(m => m.ReportModule) }, { path: 'shift-swap', loadChildren: () => import('./modules/shift-swap/shift-swap.module').then(m => m.ShiftSwapModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
