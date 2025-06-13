import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Shift } from '../../models/shift';
import { ShiftService } from '../../services/shift.service';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse
import { AuthService } from '../../../login/services/auth.service';

@Component({
  selector: 'app-shift-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shift-list.component.html',
  styleUrls: ['./shift-list.component.css'],
})
export class ShiftListComponent implements OnInit {
  employeeId!: number;
  message: string | null = null; 
  isSuccess: boolean = false;
  fetch(): void {
    const employeeId = Number(
      this.authService.getDetailsFromToken(this.authService.getToken())
        .employeeId
    ); // Assuming you store employeeId on login
    this.employeeId = employeeId;
    console.log(employeeId);
  }
  deleteLeaveBalance(arg0: number | undefined) {
    throw new Error('Method not implemented.');
  }
  shifts: Shift[] = [];
  errorMessage: any;

  constructor(
    private shiftService: ShiftService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllShifts();
    this.fetch();
  }

  getAllShifts(): void {
    this.shiftService.getAllShifts().subscribe(
      (data: Shift[]) => {
        // Explicitly type data
        this.shifts = data;
      },
      (error: HttpErrorResponse) => {
        // Explicitly type error
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
    if (
      shiftId !== undefined &&
      confirm('Are you sure you want to delete this shift?')
    ) {
      this.shiftService.deleteShift(shiftId).subscribe(
        () => {
          console.log('Shift deleted successfully');
          this.getAllShifts(); // Refresh the list
        },
        (error: HttpErrorResponse) => {
          // Explicitly type error
          console.error('Error deleting shift:', error);
          alert('Error deleting shift. Check console for details.');
        }
      );
    }
  }
}
