import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LeaveRequestService } from '../../service/leave-request.service';
import { LeaveRequest } from '../../models/leave-request.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../login/services/auth.service';

@Component({
  selector: 'app-leave-request-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './leave-request-list.component.html',
  styleUrl: './leave-request-list.component.css',
})
export class LeaveRequestListComponent implements OnInit {
  leaveRequests: LeaveRequest[] = [];
  currentFilter: string = 'all';
  message: string | null = null; 
  isSuccess: boolean = false;

  employeeId!: number;
  fetch(): void {
    const employeeId = Number(
      this.authService.getDetailsFromToken(this.authService.getToken())
        .employeeId
    ); // Assuming you store employeeId on login
    this.employeeId = employeeId;
    console.log(employeeId);
  }

  constructor(
    private leaveRequestService: LeaveRequestService,private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetch();

    this.fetchLeaveRequests();
  }

  fetchLeaveRequests(): void {
    this.leaveRequestService.getAll().subscribe(
      (data: LeaveRequest[]) => {
        this.leaveRequests = data; // Assign the fetched data to the component's array
        console.log(`Fetched ${data.length} requests : `, data);
      },
      (error: HttpErrorResponse) => {
        console.error(`Error fetching leave requests for status :`, error);
        this.leaveRequests = []; // Clear the list on error
      }
    );
  }

  addLeaveRequest(): void {
    this.router.navigate(['/leaveRequests/add']);
  }

  // Action for "View Pending Requests" button
  viewRequests(): void {
    this.leaveRequestService.getAllPendingReq().subscribe(
      (data: LeaveRequest[]) => {
        this.leaveRequests = data; // Assign the fetched data to the component's array
        console.log(`Fetched ${data.length} requests : `, data);
      },
      (error: HttpErrorResponse) => {
        console.error(`Error fetching leave requests for status :`, error);
        this.leaveRequests = []; // Clear the list on error
      }
    );
  }

  // Action for "Manage Approvals" button - Navigates to the approval component
  manageApprovals(): void {
    this.router.navigate(['/manage-approvals']); // This path should now work with the updated app.routes.ts
  }

  viewAllRequests(): void {
    this.fetchLeaveRequests(); // Fetch all requests
  }

  // Action for "View" button in the table
  viewRequestDetails(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/leaveRequests', id]);
    } else {
      console.warn('Cannot view details: Swap Request ID is undefined.');
    }
  }

  edit(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/leaveRequests/edit', id]);
    } else {
      console.warn('Cannot edit: Shift ID is undefined.');
    }
  }

  delete(id: number | undefined) {
    if (id === undefined) {
      console.warn('Cannot delete: Leave Request ID is undefined.');
      return;
    }

    if (confirm('Are you sure you want to delete this leave request?')) {
      this.leaveRequestService.delete(id).subscribe({
        next: () => {
          alert('Leave request deleted successfully.');
          // Refresh list
          this.fetchLeaveRequests();
        },
        error: (err: HttpErrorResponse) => {
          console.error(`Failed to delete request with ID ${id}`, err);
          alert('Failed to delete leave request. Please try again.');
        },
      });
    }
  }

  searchEmployeeId: number | null = null;

  filterByEmployeeId(): void {
    if (this.searchEmployeeId !== null) {
      this.leaveRequestService.getByEmployeeId(this.searchEmployeeId).subscribe(
        (data: LeaveRequest[]) => {
          this.leaveRequests = data;
          console.log(
            `Fetched ${data.length} requests for Employee ID ${this.searchEmployeeId}`
          );
        },
        (error: HttpErrorResponse) => {
          console.error(`Error fetching requests by employee ID:`, error);
          this.leaveRequests = [];
        }
      );
    } else {
      console.warn('Please enter a valid employee ID.');
    }
  }
}
