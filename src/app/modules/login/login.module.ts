import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginRoutingModule } from './login-routing.module';

import { LoginUiComponent } from './login-ui/login-ui.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyLeaveRequestsComponent } from './my-leave-requests/my-leave-requests.component';
import { JwtInterceptor } from './services/jwt.interceptor';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    LoginRoutingModule,
    LoginUiComponent,
    DashboardComponent,
    MyLeaveRequestsComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
})
export class LoginModule {}
