import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveRequestService } from '../../service/leave-request.service';
import { LeaveRequest } from '../../models/leave-request.model';

@Component({
  selector: 'app-leave-request-detail',
  imports: [CommonModule],
  templateUrl: './leave-request-detail.component.html',
  styleUrl: './leave-request-detail.component.css'
})
export class LeaveRequestDetailComponent implements OnInit{

  leaveRequest: LeaveRequest | undefined;
  requestId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private leaveRequestService: LeaveRequestService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam && !isNaN(+idParam)) { // Check if it's not null/undefined and can be converted to a number
        this.requestId = +idParam; // Convert string to number
        this.getLeaveRequestDetails(this.requestId);
      } else {
        console.error('Invalid or missing ID in URL for Leave Request Detail:', idParam);
        // Optionally, redirect to a list or error page if ID is invalid
        this.router.navigate(['/leaveRequests']);
      }
    });
  }

  getLeaveRequestDetails(id: number): void {
    this.leaveRequestService.getById(id).subscribe(
      (data) => {
        this.leaveRequest = data;
      },
      (error) => {
        console.error('Error fetching leave request details:', error);
        // Handle case where specific request is not found or other API error
        this.router.navigate(['/leaveRequests']);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/leaveRequests']);
  }
}
