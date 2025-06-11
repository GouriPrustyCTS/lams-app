import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveRequestService } from '../../service/leave-request.service';
import { LeaveRequest } from '../../models/leave-request.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../login/services/auth.service';

@Component({
  selector: 'app-leave-request-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './leave-request-form.component.html',
  styleUrl: './leave-request-form.component.css'
})
export class LeaveRequestFormComponent {
  leaveRequest: LeaveRequest = {
    employeeId: 1,
    startDate: '',
    endDate: '',
    reason: '',
    status: 'PENDING',
    leaveType: '',
    requestDate: ''
  };
  isEditMode: boolean = false;
  requestId: number | null = null;

  constructor(
    private leaveRequestService: LeaveRequestService,
    public router: Router,
    private route: ActivatedRoute,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    // In a real app, populate requesterEmployeeId here if not done by an interceptor or auth guard
    // Example: this.shiftSwapRequest.requesterEmployeeId = this.authService.getCurrentUserId();
    const employeeId = Number(this.authService.getDetailsFromToken(this.authService.getToken()).employeeId); // Assuming you store employeeId on login
    this.leaveRequest.employeeId = employeeId;
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) { 
        this.requestId = +idParam;
        this.isEditMode = true;
        this.loadLeaveRequest();
      }
    });
  }

  loadLeaveRequest(): void {
    if (this.requestId) {
      this.leaveRequestService.getById(this.requestId).subscribe(
        (data: LeaveRequest) => {
          this.leaveRequest = data;
        },
        (error: HttpErrorResponse) => {
          console.error('Error loading swap request:', error);
          this.router.navigate(['/leaveRequests']);
        }
      );
    }
  }

  // onSubmit(): void {
  //   // IMPORTANT: Ensure shiftSwapRequest.requesterEmployeeId is set before submitting!
  //   // Example: this.shiftSwapRequest.requesterEmployeeId = this.authService.getCurrentUserId();
  //   if (this.leaveRequest.employeeId === 0 && !this.isEditMode) {
  //     console.error("Requester Employee ID is not set. Cannot leave request.");
  //     alert("Please ensure you are logged in. Could not determine your Employee ID.");
  //     return;
  //   }

 
  //   console.log('Attempting to send Leave Request data:', this.leaveRequest);

  //   if (this.isEditMode && this.requestId) {
  //     this.leaveRequestService.updateStatus(this.requestId, this.leaveRequest.status).subscribe(
  //       () => {
  //         console.log('Leave request updated successfully');
  //         this.router.navigate(['/leaveRequests']);
  //       },
  //       (error: HttpErrorResponse) => {
  //         console.error('Error updating leave request:', error);
  //         if (error.error) {
  //             console.error('Backend Validation Errors:', error.error);
  //         }
  //       }
  //     );
  //   } else {
  //     this.leaveRequest.requestDate = new Date().toISOString().split('T')[0]; 
  //     this.leaveRequestService.add(this.leaveRequest).subscribe(
  //       () => {
  //         console.log('Leave request created successfully',this.leaveRequest);
  //         this.router.navigate(['/leaveRequests']);
  //       },
  //       (error: HttpErrorResponse) => {
  //         console.error('Error creating leave request:', error);
  //         if (error.error) {
  //           console.error('Backend Validation Errors:', error.error);
  //         }
  //       }
  //     );
  //   }
  // }
  timeValidationError = false;
  dateValidationError = false;
  onSubmit(): void {
    this.dateValidationError = false;
    const start = new Date(this.leaveRequest.startDate);
    const end = new Date(this.leaveRequest.endDate);
    if (start >= end) {
      this.dateValidationError = true;
      return;
    }

    const now = new Date();
    const shiftDateTime = new Date(this.leaveRequest.startDate);
    shiftDateTime.setHours(0, 0, 0, 0);  // just date comparison
    const minValidDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // now + 24h
    minValidDate.setHours(0, 0, 0, 0);

    if (shiftDateTime < minValidDate) {
      this.timeValidationError = true;
      return;
    }

    // Existing submission logic
    if (this.isEditMode && this.requestId) {
      // Update logic
    } else {
      this.leaveRequest.requestDate = new Date().toISOString().split('T')[0];
      this.leaveRequestService.add(this.leaveRequest).subscribe(
        () => {
          console.log('Leave request created successfully', this.leaveRequest);
          this.router.navigate(['/leaveRequests']);
        },
        (error: HttpErrorResponse) => {
          console.error('Error creating leave request:', error);
        }
      );
    }
  }

}
