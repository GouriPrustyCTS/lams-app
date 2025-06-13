import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { UserDetails } from '../models/user-details.model';
import { Router } from '@angular/router'; // Import Router for navigation
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule],
})
export class DashboardComponent implements OnInit {
  showUserMenu = false;
  employeeId!: number;

  fetch(): void {
    const employeeId = Number(
      this.authService.getDetailsFromToken(this.authService.getToken())
        .employeeId
    ); // Assuming you store employeeId on login
    this.employeeId = employeeId;
    console.log(employeeId);
  }


  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  } 
  viewEmployee() {
    this.router.navigate(['/employee/employees']);
  }
  viewAttendance() {
    if(this.employeeId === 0){
      this.router.navigate(['/attendance/list']); 
    }else{
      this.router.navigate(['/attendance/search-attendance']); 
    }
  }
  viewLeaveCharts() {
    this.router.navigate(['/leave-chart']);
  }
  viewShiftSwap() {
    this.router.navigate(['/swap-requests']);
  }
  viewShift() {
    this.router.navigate(['/shift']);
  }
  viewLeaveRequest() {
    this.router.navigate(['/leaveRequests']);
  }
  viewLeaveBalance() {
    if(this.employeeId === 0){
      this.router.navigate(['/leave-balances']);
    }else{
      this.router.navigate(['/search-leave-by-employee']); 
    }
  }
  viewAttendanceEmployee() {
    this.router.navigate(['/attendance-employee']);
  }

  userDetails: UserDetails | null = null;
  errorMessage: string | null = null;
  isBrowser: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.fetchUserDetails();
    this.fetch();

  }

  fetchUserDetails(): void {
    this.authService.getUserDetails().subscribe({
      next: (data) => {
        this.userDetails = data;
        this.errorMessage = null;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching user details:', error);
        this.errorMessage = 'Failed to load user details.';
        this.userDetails = null;
        if (error.status === 401 || error.status === 403) {
          this.authService.logout().subscribe(() => {
            this.router.navigate(['/login']);
          });
        }
      },
    });
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (message) => {
        console.log(message);
        if (this.isBrowser) {
          localStorage.clear(); // ✅ Clear after successful logout
        }
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Logout failed:', error);
        // Optional: Still clear localStorage even if backend fails
        if (this.isBrowser) {
          localStorage.clear();
        }
        this.router.navigate(['/login']);
      },
    });
  }

  // --- Common User Actions ---
  viewMyLeaveRequests(): void {
    console.log('Navigating to view my leave requests...');
    // Example: this.router.navigate(['/my-leave-requests']); // Uncomment and create component/route
  }

  applyForLeave(): void {
    console.log('Navigating to apply for leave...');
    // Example: this.router.navigate(['/apply-leave']); // Uncomment and create component/route
  }

  viewMyLeaveBalance(): void {
    console.log('Navigating to view my leave balance...');
    // Example: this.router.navigate(['/my-leave-balance']); // Uncomment and create component/route
  }

  requestShiftSwap(): void {
    console.log('Navigating to request shift swap...');
    // Example: this.router.navigate(['/request-shift-swap']); // Uncomment and create component/route
  }

  viewAllShifts(): void {
    console.log('Navigating to view all shifts...');
    // Example: this.router.navigate(['/all-shifts']); // Uncomment and create component/route
  }

  viewMyAttendance(): void {
    console.log('Navigating to view my attendance...');
    // Example: this.router.navigate(['/my-attendance']); // Uncomment and create component/route
  }

  calculateMyWorkHours(): void {
    console.log('Calculating my work hours...');
    // This might be an API call directly, or part of the attendance view
    // Example: this.authService.calculateWorkHours(this.userDetails.employeeId).subscribe(...)
  }

  // --- Admin Actions ---
  manageEmployees(): void {
    console.log('Navigating to manage employees...');
    // Example: this.router.navigate(['/admin/employees']); // Uncomment and create component/route
  }

  reviewLeaveRequests(): void {
    console.log('Navigating to review leave requests...');
    // Example: this.router.navigate(['/admin/review-leaves']); // Uncomment and create component/route
  }

  manageLeaveBalances(): void {
    console.log('Navigating to manage leave balances...');
    // Example: this.router.navigate(['/admin/leave-balances']); // Uncomment and create component/route
  }

  manageShifts(): void {
    console.log('Navigating to manage shifts...');
    // Example: this.router.navigate(['/admin/shifts']); // Uncomment and create component/route
  }

  manageShiftSwapRequests(): void {
    console.log('Navigating to manage shift swap requests...');
    // Example: this.router.navigate(['/admin/shift-swaps']); // Uncomment and create component/route
  }

  manageAttendance(): void {
    console.log('Navigating to manage attendance...');
    // Example: this.router.navigate(['/admin/attendance']); // Uncomment and create component/route
  }

  generateReports(): void {
    console.log('Navigating to generate reports...');
    // Example: this.router.navigate(['/admin/reports']); // Uncomment and create component/route
  }
}
