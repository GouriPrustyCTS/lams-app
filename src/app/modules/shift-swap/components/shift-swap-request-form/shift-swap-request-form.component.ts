import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShiftSwapRequest } from '../../models/shift-swap-request';
import { ShiftSwapRequestService } from '../../services/shift-swap-request.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-shift-swap-request-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shift-swap-request-form.component.html',
  styleUrls: ['./shift-swap-request-form.component.css']
})
export class ShiftSwapRequestFormComponent implements OnInit {
  shiftSwapRequest: ShiftSwapRequest = {
    // requesterEmployeeId will typically be populated from the authenticated user's session/context
    // For now, we'll keep it initialized to 0 and assume it's set before onSubmit in a real app
    // or passed via a service if not handled by auth.
    requesterEmployeeId: 1, // IMPORTANT: This needs to be set from the logged-in user's ID!
                            // Placeholder for where you would get the current user's ID
                            // e.g., this.authService.getCurrentUserId();
    requestedShiftId: 0,    // This is the user's "Current Shift ID"
    targetEmployeeId: 0,
    targetShiftId: 0,
    status: 'PENDING'
  };
  message: string | null = null; 
  isSuccess: boolean = false;
  isEditMode: boolean = false;
  requestId: number | null = null;

  constructor(
    private swapRequestService: ShiftSwapRequestService,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // In a real app, populate requesterEmployeeId here if not done by an interceptor or auth guard
    // Example: this.shiftSwapRequest.requesterEmployeeId = this.authService.getCurrentUserId();

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.requestId = +idParam;
        this.isEditMode = true;
        this.loadSwapRequest();
      }
    });
  }

  loadSwapRequest(): void {
    if (this.requestId) {
      this.swapRequestService.getRequestById(this.requestId).subscribe(
        (data: ShiftSwapRequest) => {
          this.shiftSwapRequest = data;
        },
        (error: HttpErrorResponse) => {
          console.error('Error loading swap request:', error);
          this.router.navigate(['/swap-requests']);
        }
      );
    }
  }

  onSubmit(): void {
    // IMPORTANT: Ensure shiftSwapRequest.requesterEmployeeId is set before submitting!
    // Example: this.shiftSwapRequest.requesterEmployeeId = this.authService.getCurrentUserId();
    if (this.shiftSwapRequest.requesterEmployeeId === 0 && !this.isEditMode) {
      console.error("Requester Employee ID is not set. Cannot create swap request.");
      alert("Please ensure you are logged in. Could not determine your Employee ID.");
      return;
    }


    console.log('Attempting to send Shift Swap Request data:', this.shiftSwapRequest);

    if (this.isEditMode && this.requestId) {
      this.swapRequestService.updateRequestStatus(this.requestId, this.shiftSwapRequest.status).subscribe(
        () => {
          console.log('Shift swap request updated successfully');
          this.router.navigate(['/swap-requests']);
        },
        (error: HttpErrorResponse) => {
          console.error('Error updating swap request:', error);
          if (error.error) {
              console.error('Backend Validation Errors:', error.error);
          }
        }
      );
    } else {
      this.swapRequestService.createSwapRequest(this.shiftSwapRequest).subscribe(
        () => {
          console.log('Shift swap request created successfully');
          this.router.navigate(['/swap-requests']);
        },
        (error: HttpErrorResponse) => {
          console.error('Error creating swap request:', error);
          if (error.error) {
            console.error('Backend Validation Errors:', error.error);
          }
        }
      );
    }
  }
}
