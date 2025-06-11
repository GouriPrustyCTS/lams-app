// clock-in-clock-out.component.ts
import { Component } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clock-in-out',
  templateUrl: './clock-in-clock-out.component.html',
  styleUrls: ['./clock-in-clock-out.component.css'], // Make sure this CSS file exists or style directly in HTML
  standalone: true,
  imports:[FormsModule, CommonModule]
})
export class ClockInOutComponent {
  employeeId!: number;
  // This property is no longer used for toggling visibility in this standalone HTML
  // but can be kept if you plan to use it for other internal logic.
  showClockInOut = false;

  // Properties for displaying feedback messages to the user
  message: string | null = null;
  isSuccess: boolean = false;

  constructor(private attendanceService: AttendanceService) {}

  // This method might not be needed if the component is always visible or controlled by a router
  // toggleClockInOut(): void {
  //   this.showClockInOut = !this.showClockInOut;
  // }

  /**
   * Handles the clock-in action for an employee.
   * Sends the employee ID to the attendance service and displays feedback.
   */
  clockIn(): void {
    // Basic validation for employeeId
    if (this.employeeId === null || this.employeeId === undefined || isNaN(this.employeeId)) {
      this.setMessage('Please enter a valid Employee ID to clock in.', false);
      return;
    }

    this.attendanceService.clockIn(this.employeeId).subscribe({
      next: (response) => {
        console.log('Clocked in:', response);
        // Assuming the service response has a success message or a way to determine success
        this.setMessage(`Successfully clocked in Employee ID: ${this.employeeId}`, true);
        // Optionally clear employeeId after successful clock-in
        this.employeeId = null as any; // Cast to any to allow null assignment for number type
      },
      error: (error) => {
        console.error('Error clocking in:', error);
        this.setMessage(`Failed to clock in for Employee ID: ${this.employeeId}. Error: ${error.message || 'Unknown error'}`, false);
      }
    });
  }

  /**
   * Handles the clock-out action for an employee.
   * Sends the employee ID to the attendance service and displays feedback.
   */
  clockOut(): void {
    // Basic validation for employeeId
    if (this.employeeId === null || this.employeeId === undefined || isNaN(this.employeeId)) {
      this.setMessage('Please enter a valid Employee ID to clock out.', false);
      return;
    }

    this.attendanceService.clockOut(this.employeeId).subscribe({
      next: (response) => {
        console.log('Clocked out:', response);
        // Assuming the service response has a success message or a way to determine success
        this.setMessage(`Successfully clocked out Employee ID: ${this.employeeId}`, true);
        // Optionally clear employeeId after successful clock-out
        this.employeeId = null as any;
      },
      error: (error) => {
        console.error('Error clocking out:', error);
        this.setMessage(`Failed to clock out for Employee ID: ${this.employeeId}. Error: ${error.message || 'Unknown error'}`, false);
      }
    });
  }

  /**
   * Sets the message to be displayed to the user.
   * @param msg The message string.
   * @param success Boolean indicating if the message is a success or error.
   */
  private setMessage(msg: string, success: boolean): void {
    this.message = msg;
    this.isSuccess = success;
    // Clear message after a few seconds
    setTimeout(() => {
      this.message = null;
    }, 5000); // Message disappears after 5 seconds
  }
}
