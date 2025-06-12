import { Component } from '@angular/core';
import { AuthService } from '../login/services/auth.service';
import { AttendanceService } from './services/attendance.service';
@Component({
  selector: 'attendance-app-root',
  standalone: false,
  templateUrl: './attendance-app.component.html',
  styleUrl: './attendance-app.component.css',
})
export class AttendanceAppComponent {
  title = 'LAMS';
  employeeId!: number;

  fetch(): void {
    const employeeId = Number(
      this.authService.getDetailsFromToken(this.authService.getToken())
        .employeeId
    ); // Assuming you store employeeId on login
    this.employeeId = employeeId;
    console.log(employeeId);
  }

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.fetch();
  }
}
