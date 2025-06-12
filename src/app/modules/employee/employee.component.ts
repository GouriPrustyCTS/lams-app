import { Component } from '@angular/core';
import { AuthService } from '../login/services/auth.service';

@Component({
  selector: 'app-employee',
  standalone: false,
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
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
