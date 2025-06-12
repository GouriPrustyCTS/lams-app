import { Component } from '@angular/core';
import { AuthService } from '../login/services/auth.service';

@Component({
  selector: 'leave-request-root',
  standalone: false,
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.css',
})
export class LeaveRequestComponent {
  title = 'lams-ui';
}
