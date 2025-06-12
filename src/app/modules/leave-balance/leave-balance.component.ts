import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Good to include for general directives if needed in app.component.html
import { RouterModule } from '@angular/router'; // PROVIDES routerLink AND router-outlet
import { AuthService } from '../login/services/auth.service';

@Component({
  selector: 'leave-balance-root',
  standalone: false,
  templateUrl: './leave-balance.component.html',
  styleUrls: ['./leave-balance.component.css']
})
export class LeaveBalanceComponent {
  title = 'lams-frontend';
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