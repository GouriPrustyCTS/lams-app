import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceAppComponent } from './attendance-app.component';
import { RouterModule } from '@angular/router';
import { routes } from './attendance-app.routes';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { FormsModule } from '@angular/forms';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
@NgModule({
  declarations: [
    AttendanceAppComponent, // ✅ Add this

  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AttendanceAppComponent }, // Wrapper
      ...routes
    ]),
    FormsModule,
    EmployeeListComponent,
    AttendanceComponent,
    EmployeeFormComponent
  ]
})
export class AttendanceModule {}





