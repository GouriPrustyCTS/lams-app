export class Attendance 
{
    attendanceId?: number;
    clockInTime: Date;
    clockOutTime: Date;
    attendanceDate: Date;
    employeeId: number;
    workHours: number;
  
    constructor(
      clockInTime: Date,
      clockOutTime: Date,
      attendanceDate: Date,
      employeeId: number,
      workHours: number,
    ) {
      this.clockInTime = clockInTime;
      this.clockOutTime = clockOutTime;
      this.attendanceDate = attendanceDate;
      this.employeeId = employeeId;
      this.workHours = workHours;
    }
}
  