import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Shift } from '../../models/shift';
import { ShiftService } from '../../services/shift.service';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse

@Component({
  selector: 'app-shift-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shift-detail.component.html',
  styleUrls: ['./shift-detail.component.css']
})
export class ShiftDetailComponent implements OnInit {
  shift: Shift | undefined; // Allow shift to be undefined initially
  shiftId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private shiftService: ShiftService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      // CRITICAL: Check if idParam exists AND is a valid number before converting
      if (idParam && !isNaN(+idParam)) {
        this.shiftId = +idParam; // Convert string to number
        this.getShiftDetails(this.shiftId);
      } else {
        console.error('Invalid or missing ID in URL for Shift Detail:', idParam);
        // Redirect to the shifts list if the ID is invalid
        this.router.navigate(['/shifts']);
      }
    });
  }

  getShiftDetails(id: number): void {
    this.shiftService.getShiftById(id).subscribe(
      (data: Shift) => { // Explicitly type data
        this.shift = data;
      },
      (error: HttpErrorResponse) => { // Explicitly type error
        console.error('Error fetching shift details:', error);
        this.shift = undefined; // Clear shift data on error
        this.router.navigate(['/shifts']); // Redirect to list on error
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/shifts']);
  }
}
