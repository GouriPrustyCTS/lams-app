import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceAppComponent } from './attendance-app.component';
import { RouterModule } from '@angular/router';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { FormsModule } from '@angular/forms';
import { SearchAttendanceComponent } from './components/search-attendance/search-attendance.component';
import { DeleteAttendanceComponent } from './components/delete-attendance/delete-attendance.component';
import { ClockInOutComponent } from './components/clock-in-clock-out/clock-in-clock-out.component'; 
@NgModule({
  declarations: [
    AttendanceAppComponent,
    // AttendanceComponent, // Corrected from AttendancesComponent
    // DeleteAttendanceComponent,
    // ClockInOutComponent,
  ],
  imports: [
    SearchAttendanceComponent,
    DeleteAttendanceComponent,
    ClockInOutComponent,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AttendanceAppComponent,
        children: [
          { path: '', component: AttendanceComponent },
          { path: 'search-attendance', component: SearchAttendanceComponent },
          { path: 'delete-attendance', component: DeleteAttendanceComponent },
          { path: 'clock-in-out', component: ClockInOutComponent },
        ],
      },
    ]),
  ],
})
export class AttendanceModule {}


 


