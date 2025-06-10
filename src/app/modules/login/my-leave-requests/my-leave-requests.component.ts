import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // For *ngIf, *ngFor
import { HttpClient } from '@angular/common/http'; // To make API calls
import { Router } from '@angular/router'; // To navigate back

// Define a simple interface for LeaveRequestDTO (adjust based on your actual DTO)
interface LeaveRequestDTO {
  leaveRequestId: number;
  employeeId: number; // Assuming you get employee ID from user details
  leaveType: string;
  startDate: string; // Or Date, depending on your DTO
  endDate: string;   // Or Date
  status: string;
  reason: string;
  // Add other fields from your LeaveRequestDTO
}

@Component({
  standalone: true,
  selector: 'app-my-leave-requests',
  templateUrl: './my-leave-requests.component.html',
  styleUrls: ['./my-leave-requests.component.css'],
  imports: [CommonModule] // Include CommonModule for directives like *ngFor
})
export class MyLeaveRequestsComponent implements OnInit {
  leaveRequests: LeaveRequestDTO[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  private baseUrl = 'http://localhost:2694'; // Your Spring Boot backend URL

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchMyLeaveRequests();
  }

  fetchMyLeaveRequests(): void {
    this.isLoading = true;
    this.error = null;

    // IMPORTANT: You need the employeeId of the logged-in user.
    // This typically comes from the decoded JWT or from a user service.
    // For now, let's assume you can get it from localStorage (if stored by AuthService)
    // or you'd pass it from the dashboard or fetch it from a user service.
    // For a real app, you'd likely have a dedicated LeaveService.
    const employeeId = localStorage.getItem('employeeId'); // Assuming you store employeeId on login

    if (!employeeId) {
      this.error = 'Employee ID not found. Please log in again.';
      this.isLoading = false;
      return;
    }

    // Call your Spring Boot LeaveRequestController's endpoint
    // Example: GET /leaveRequests/employee/{employeeId}
    this.http.get<LeaveRequestDTO[]>(`${this.baseUrl}/leaveRequests/employee/${employeeId}`).subscribe({
      next: (data) => {
        this.leaveRequests = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching leave requests:', err);
        this.error = 'Failed to load leave requests. Please try again.';
        this.isLoading = false;
      }
    });
  }

  backToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}