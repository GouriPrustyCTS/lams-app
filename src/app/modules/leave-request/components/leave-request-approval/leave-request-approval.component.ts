import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LeaveRequestService } from '../../service/leave-request.service';
import { LeaveRequest } from '../../models/leave-request.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-leave-request-approval',
  imports: [CommonModule],
  templateUrl: './leave-request-approval.component.html',
  styleUrl: './leave-request-approval.component.css'
})
export class LeaveRequestApprovalComponent {
  pendingRequests: LeaveRequest[] = [];
  message: string | null = null; 
  isSuccess: boolean = false;
  constructor(
    private leaveRequestService: LeaveRequestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchPendingLeaveRequests();
  }

  fetchPendingLeaveRequests(): void {
    this.leaveRequestService.getAllPendingReq().subscribe( // Use service to get pending requests
      (data: LeaveRequest[]) => {
        this.pendingRequests = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching pending leave requests:', error);
      }
    );
  }


  approveRequest(requestId: number | undefined): void {
    if (requestId !== undefined) {
      this.leaveRequestService.updateStatus(requestId, 'APPROVED').subscribe(
        () => {
          console.log(`Request ${requestId} approved.`);
          this.fetchPendingLeaveRequests(); // Refresh list
        },
        (error: HttpErrorResponse) => {
          console.error(`Error approving request ${requestId}:`, error);
          alert('Error approving request. Check console for details.'); // Simple alert for user feedback
        }
      );
    }
  }


  rejectRequest(requestId: number | undefined): void {
    if (requestId !== undefined) {
      this.leaveRequestService.updateStatus(requestId, 'REJECTED').subscribe(
        () => {
          console.log(`Request ${requestId} rejected.`);
          this.fetchPendingLeaveRequests(); // Refresh list
        },
        (error: HttpErrorResponse) => {
          console.error(`Error rejecting request ${requestId}:`, error);
          alert('Error rejecting request. Check console for details.'); // Simple alert for user feedback
        }
      );
    }
  }

  goBackToLeaveRequests(): void {
    this.router.navigate(['/leaveRequests']);
  }
}
