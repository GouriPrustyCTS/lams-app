import { Component } from '@angular/core';
import { AuthService } from '../login/services/auth.service';

@Component({
  selector: 'report-root',
  standalone: false,
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
})
export class ReportComponent {
  title = 'lams-reports-ui';
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
