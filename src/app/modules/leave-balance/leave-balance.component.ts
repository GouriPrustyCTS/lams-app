import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Good to include for general directives if needed in app.component.html
import { RouterModule } from '@angular/router'; // PROVIDES routerLink AND router-outlet

@Component({
  selector: 'leave-balance-root',
  standalone: false,
  templateUrl: './leave-balance.component.html',
  styleUrls: ['./leave-balance.component.css']
})
export class LeaveBalanceComponent {
  title = 'lams-frontend';
}   