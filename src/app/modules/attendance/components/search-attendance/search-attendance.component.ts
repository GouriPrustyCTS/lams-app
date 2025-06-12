// search-attendance.component.ts
import { Component } from '@angular/core';
import { AttendanceService, Attendance } from '../../services/attendance.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../login/services/auth.service';

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
  inputEmployeeId!: number; // For two-way binding with input field
  
    fetch(): void {
      const employeeId = Number(
        this.authService.getDetailsFromToken(this.authService.getToken())
        .employeeId
      ); // Assuming you store employeeId on login
      this.employeeId = employeeId;
      localStorage.setItem('employeeId', employeeId.toString()); // Initialize employeeId in localStorage
      console.log(employeeId);
    }
  
    ngOnInit(): void {
      this.fetch();
      this.getMyAttendance()
    }
  // selectedAttendances is an array, as the service methods return an array of Attendance
  selectedAttendances: Attendance[] = [];
  // Set to true to show the search interface initially, as per your HTML's initial display logic
  showSearch = true;

  constructor(private attendanceService: AttendanceService,private authService: AuthService) {}

  getMyAttendance(): void {
    this.attendanceService.getMyAttendance().subscribe({
      next: (data: Attendance[]) => {
        this.selectedAttendances = data;
        console.log('Attendance by Date:', this.selectedAttendances);
      },
      error: (error) => {
        console.error('Error fetching attendance by date:', error);
        this.selectedAttendances = [];
      }
    });
  }
  /**
   * Fetches attendance records by the selected date.
   * Clears previous results and populates `selectedAttendances` with new data.
   * This method is triggered by the "Search by Date" button.
   */
  getAttendanceByDate(): void {
    // Check if attendanceDate is valid before making the API call
    if (!this.attendanceDate) {
      console.warn('Please select a date to search.');
      alert('Please select a date to search.'); // User-friendly alert
      this.selectedAttendances = [];
      return;
    }

    // Convert selected date string to a Date object for comparison
    const selectedDate = new Date(this.attendanceDate);
    // Get today's date and set hours, minutes, seconds, milliseconds to 0 for accurate day comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Set the selected date's hours, minutes, seconds, milliseconds to 0 for accurate day comparison
    selectedDate.setHours(0, 0, 0, 0);


    // Validate that the selected date is not in the future
    if (this.employeeId===0 && selectedDate > today) {
      console.warn('Attendance date cannot be in the future. Please select a past or current date.');
      alert('Attendance date cannot be in the future. Please select a past or current date.'); // User-friendly alert
      this.selectedAttendances = [];
      return;
    }

    this.attendanceService.getAttendanceByDate(this.attendanceDate).subscribe({
      next: (data: Attendance[]) => {
        this.selectedAttendances = data;
        console.log('Attendance by Date:', this.selectedAttendances);
      },
      error: (error) => {
        console.error('Error fetching attendance by date:', error);
        this.selectedAttendances = [];
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


    this.attendanceService.getAttendanceByEmployee(this.inputEmployeeId).subscribe({
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