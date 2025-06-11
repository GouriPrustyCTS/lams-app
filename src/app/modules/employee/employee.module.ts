import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { EmployeeAppComponent } from './employee-app.component';
import { EmployeeComponent } from './employee.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { routes } from './employee.routes';
import { EmployeeRoutingModule } from './employee.routing.module';

@NgModule({
  declarations: [
    EmployeeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',component: EmployeeComponent,
        children: routes,
      },
    ])
  ]
})
export class EmployeeModule {}


/**

declarations: [LeaveRequestComponent],
  imports: [
    CommonModule, 
    LeaveRequestRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: LeaveRequestComponent,
        children: routes,
      },
    ]),
  ],

 */