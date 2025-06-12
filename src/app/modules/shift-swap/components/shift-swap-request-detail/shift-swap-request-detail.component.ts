import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ActivatedRoute, Router } from '@angular/router';
import { ShiftSwapRequest } from '../../models/shift-swap-request';
import { ShiftSwapRequestService } from '../../services/shift-swap-request.service';

@Component({
  selector: 'app-shift-swap-request-detail',
  standalone: true, // Mark as standalone
  imports: [CommonModule], // Add CommonModule here
  templateUrl: './shift-swap-request-detail.component.html',
  styleUrls: ['./shift-swap-request-detail.component.css']
})
export class ShiftSwapRequestDetailComponent implements OnInit {
  swapRequest: ShiftSwapRequest | undefined;
  requestId: number | null = null;
  message: string | null = null; 
  isSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private swapRequestService: ShiftSwapRequestService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      // CRITICAL: Check if idParam is a valid number before converting
      if (idParam && !isNaN(+idParam)) { // Check if it's not null/undefined and can be converted to a number
        this.requestId = +idParam; // Convert string to number
        this.getSwapRequestDetails(this.requestId);
      } else {
        console.error('Invalid or missing ID in URL for Shift Swap Request Detail:', idParam);
        // Optionally, redirect to a list or error page if ID is invalid
        this.router.navigate(['/swap-requests']);
      }
    });
  }

  getSwapRequestDetails(id: number): void {
    this.swapRequestService.getRequestById(id).subscribe(
      (data) => {
        this.swapRequest = data;
      },
      (error) => {
        console.error('Error fetching swap request details:', error);
        // Handle case where specific request is not found or other API error
        this.router.navigate(['/swap-requests']);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/swap-requests']);
  }
}
