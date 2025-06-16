import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginRoutingModule, routes } from './login-routing.module';

import { LoginUiComponent } from './login-ui/login-ui.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
 
@NgModule({
  declarations:[LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    LoginRoutingModule,
    LoginUiComponent, 
    DashboardComponent,
    RouterModule.forChild([
      {
        path: '',
        component:DashboardComponent,
        children: routes,
      },
    ]),
  ],
  providers: [

  ],
  bootstrap:[LoginComponent]
})
export class LoginModule {}
