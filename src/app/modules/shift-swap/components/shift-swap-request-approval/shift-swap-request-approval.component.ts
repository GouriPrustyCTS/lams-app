import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ShiftSwapRequest } from '../../models/shift-swap-request';
import { ShiftSwapRequestService } from '../../services/shift-swap-request.service';
import { HttpErrorResponse } from '@angular/common/http'; // Import for error handling

@Component({
  selector: 'app-shift-swap-request-approval',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shift-swap-request-approval.component.html',
  styleUrls: ['./shift-swap-request-approval.component.css']
})
export class ShiftSwapRequestApprovalComponent implements OnInit {
  pendingRequests: ShiftSwapRequest[] = [];

  constructor(
    private swapRequestService: ShiftSwapRequestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchPendingSwapRequests();
  }

  fetchPendingSwapRequests(): void {
    this.swapRequestService.getAllRequests('PENDING').subscribe( // Use service to get pending requests
      (data: ShiftSwapRequest[]) => {
        this.pendingRequests = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching pending swap requests:', error);
      }
    );
  }

  /**
   * Approves a shift swap request.
   * @param requestId The ID of the request to approve.
   */
  approveRequest(requestId: number | undefined): void {
    if (requestId !== undefined) {
      this.swapRequestService.updateRequestStatus(requestId, 'APPROVED').subscribe(
        () => {
          console.log(`Request ${requestId} approved.`);
          this.fetchPendingSwapRequests(); // Refresh list
        },
        (error: HttpErrorResponse) => {
          console.error(`Error approving request ${requestId}:`, error);
          alert('Error approving request. Check console for details.'); // Simple alert for user feedback
        }
      );
    }
  }

  /**
   * Rejects a shift swap request.
   * @param requestId The ID of the request to reject.
   */
  rejectRequest(requestId: number | undefined): void {
    if (requestId !== undefined) {
      this.swapRequestService.updateRequestStatus(requestId, 'REJECTED').subscribe(
        () => {
          console.log(`Request ${requestId} rejected.`);
          this.fetchPendingSwapRequests(); // Refresh list
        },
        (error: HttpErrorResponse) => {
          console.error(`Error rejecting request ${requestId}:`, error);
          alert('Error rejecting request. Check console for details.'); // Simple alert for user feedback
        }
      );
    }
  }

  goBackToSwapRequests(): void {
    this.router.navigate(['/swap-requests']);
  }
}
