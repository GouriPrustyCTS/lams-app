import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ShiftSwapRequest } from '../../models/shift-swap-request';
import { ShiftSwapRequestService } from '../../services/shift-swap-request.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-shift-swap-request-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shift-swap-request-list.component.html',
  styleUrls: ['./shift-swap-request-list.component.css']
})
export class ShiftSwapRequestListComponent implements OnInit {
  swapRequests: ShiftSwapRequest[] = [];
  currentFilter: string = 'all'; // To keep track of the current filter (e.g., 'all', 'PENDING')
errorMessage: any;
  message: string | null = null;
  isSuccess: boolean = false;

  constructor(
    private swapRequestService: ShiftSwapRequestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // On component initialization, fetch all requests
    this.fetchSwapRequests();
  }

  /**
   * Fetches swap requests based on the given status.
   * If no status is provided, fetches all requests.
   * @param status Optional. The status to filter by (e.g., 'PENDING', 'APPROVED', 'REJECTED').
   */
  fetchSwapRequests(status?: string): void {
    this.currentFilter = status || 'all'; // Update current filter state
    
    // Call the service method. The service handles appending query params or routing to specific endpoints.
    this.swapRequestService.getAllRequests(status).subscribe(
      (data: ShiftSwapRequest[]) => {
        this.swapRequests = data; // Assign the fetched data to the component's array
        console.log(`Fetched ${data.length} requests for status: ${this.currentFilter}`, data);
      },
      (error: HttpErrorResponse) => {
        console.error(`Error fetching swap requests for status ${this.currentFilter}:`, error);
        // Display a user-friendly message if fetching fails
        this.swapRequests = []; // Clear the list on error
      }
    );
  }

  // Action for "Create New Swap Request" button
  addSwapRequest(): void {
    this.router.navigate(['/swap-requests/new']);
  }

  // Action for "View Pending Requests" button
  viewPendingRequests(): void {
    this.fetchSwapRequests('PENDING'); // Fetch only pending requests
  }

  // Action for "Manage Approvals" button - Navigates to the approval component
  manageApprovals(): void {
    this.router.navigate(['/manage-approvals-swaps']); // This path should now work with the updated app.routes.ts
  }

  // Action for "View All Requests" button (already implicitly covered by fetchSwapRequests() without args)
  // This function is redundant if fetchSwapRequests() without args works, but included for clarity.
  viewAllRequests(): void {
    this.fetchSwapRequests(); // Fetch all requests
  }

  // Action for "View" button in the table
  viewRequestDetails(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/swap-requests', id]);
    } else {
      console.warn('Cannot view details: Swap Request ID is undefined.');
    }
  }
}
