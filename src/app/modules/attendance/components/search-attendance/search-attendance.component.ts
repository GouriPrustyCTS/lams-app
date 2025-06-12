// search-attendance.component.ts
import { Component } from '@angular/core';
import { AttendanceService, Attendance } from '../../services/attendance.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-attendance',
  templateUrl: './search-attendance.component.html',
  styleUrls: ['./search-attendance.component.css'],
  standalone: true, // Mark component as standalone if not already done
  imports:[FormsModule, CommonModule]
})
export class SearchAttendanceComponent {
  attendanceDate!: string;
  employeeId!: number;
  // selectedAttendances is an array, as the service methods return an array of Attendance
  selectedAttendances: Attendance[] = [];
  // Set to true to show the search interface initially, as per your HTML's initial display logic
  showSearch = true;

  // Properties for displaying feedback messages to the user
  message: string | null = null;
  isSuccess: boolean = false;

  constructor(private attendanceService: AttendanceService) {}

  /**
   * Fetches attendance records by the selected date.
   * Clears previous results and populates `selectedAttendances` with new data.
   * This method is triggered by the "Search by Date" button.
   */
  getAttendanceByDate(): void {
    // Check if attendanceDate is valid before making the API call
    if (!this.attendanceDate) {
      console.warn('Please select a date to search.');
      this.selectedAttendances = []; // Clear results if no date is provided
      return;
    }
    this.attendanceService.getAttendanceByDate(this.attendanceDate).subscribe({
      next: (data: Attendance[]) => { // Explicitly type 'data' as Attendance[]
        this.selectedAttendances = data; // Assign the array directly
        console.log('Attendance by Date:', this.selectedAttendances);
      },
      error: (error) => {
        console.error('Error fetching attendance by date:', error);
        this.selectedAttendances = []; // Clear results on error
      }
    });
  }

  /**
   * Fetches attendance records by the entered employee ID.
   * Clears previous results and populates `selectedAttendances` with new data.
   * This method is triggered by the "Search by Employee" button.
   */
  getAttendanceByEmployee(): void {
    // Check if employeeId is valid before making the API call
    // Ensure it's a number and not null/undefined
    if (this.employeeId === null || this.employeeId === undefined || isNaN(this.employeeId)) {
      console.warn('Please enter a valid Employee ID to search.');
      this.selectedAttendances = []; // Clear results if no valid ID
      return;
    }
    this.attendanceService.getAttendanceByEmployee(this.employeeId).subscribe({
      next: (data: Attendance[]) => { // Explicitly type 'data' as Attendance[]
        this.selectedAttendances = data; // Assign the array directly
        console.log('Attendance by Employee:', this.selectedAttendances);
      },
      error: (error) => {
        console.error('Error fetching attendance by employee ID:', error);
        this.selectedAttendances = []; // Clear results on error
      }
    });
  }
}