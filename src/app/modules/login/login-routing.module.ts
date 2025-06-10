import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUiComponent } from './login-ui/login-ui.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard, LoginGuard } from './guards/auth.guard';
import { MyLeaveRequestsComponent } from './my-leave-requests/my-leave-requests.component';
export const routes: Routes = [
  { path: 'login', component: LoginUiComponent, canActivate: [LoginGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-leave-requests',
    component: MyLeaveRequestsComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   // canActivate: [AuthGuard],
  // },
];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class LoginRoutingModule {}
