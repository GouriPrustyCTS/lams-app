import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Shift } from '../../models/shift';
import { ShiftService } from '../../services/shift.service';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse

@Component({
  selector: 'app-shift-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shift-list.component.html',
  styleUrls: ['./shift-list.component.css']
})
export class ShiftListComponent implements OnInit {
  shifts: Shift[] = [];

  constructor(
    private shiftService: ShiftService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllShifts();
  }

  getAllShifts(): void {
    this.shiftService.getAllShifts().subscribe(
      (data: Shift[]) => { // Explicitly type data
        this.shifts = data;
      },
      (error: HttpErrorResponse) => { // Explicitly type error
        console.error('Error fetching shifts:', error);
        // You might want to display a user-friendly message
      }
    );
  }

  // Corrected: Navigates to '/shifts/new' to add a new shift
  addShift(): void {
    this.router.navigate(['/shifts/new']);
  }

  viewShiftDetails(shiftId: number | undefined): void {
    if (shiftId !== undefined) {
      this.router.navigate(['/shifts', shiftId]);
    } else {
      console.warn('Cannot view details: Shift ID is undefined.');
    }
  }

  editShift(shiftId: number | undefined): void {
    if (shiftId !== undefined) {
      this.router.navigate(['/shifts/edit', shiftId]);
    } else {
      console.warn('Cannot edit: Shift ID is undefined.');
    }
  }

  deleteShift(shiftId: number | undefined): void {
    if (shiftId !== undefined && confirm('Are you sure you want to delete this shift?')) {
      this.shiftService.deleteShift(shiftId).subscribe(
        () => {
          console.log('Shift deleted successfully');
          this.getAllShifts(); // Refresh the list
        },
        (error: HttpErrorResponse) => { // Explicitly type error
          console.error('Error deleting shift:', error);
          alert('Error deleting shift. Check console for details.');
        }
      );
    }
  }
}
