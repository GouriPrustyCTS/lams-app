import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthService } from '../login/services/auth.service';

@Component({
  selector: 'shift-swap-root',
  standalone: false,
  templateUrl: './shift-swap.component.html',
  styleUrls: ['./shift-swap.component.css'],
})
export class ShiftSwapComponent {
  title = 'lams-app';
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
