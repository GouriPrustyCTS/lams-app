import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceAppComponent } from './attendance-app.component';
import { RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { FormsModule } from '@angular/forms';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
 
@NgModule({
  declarations: [
    AttendanceAppComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    EmployeeListComponent,
    AttendanceComponent,
    EmployeeFormComponent,
    RouterModule.forChild([
      {
        path: '',
        component: AttendanceAppComponent, 
        children: [
          { path: '', component: EmployeeListComponent },
          { path: 'add-employee', component: EmployeeFormComponent },
          { path: 'attendance', component: AttendanceComponent },
        ]
      }
    ])
  ]
})
export class AttendanceModule {}



 


