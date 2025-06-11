import { Component } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-attendance',
  templateUrl: './delete-attendance.component.html',
  styleUrls: ['./delete-attendance.component.css'], // Ensure this CSS file exists or styles are in HTML
  standalone: true,
  imports:[FormsModule,CommonModule]
})
export class DeleteAttendanceComponent {
  attendanceId!: number;
  // `showDelete` property is typically used for toggling visibility of the component
  // or a section within it. In this standalone HTML, the component is always visible,
  // so this property might be vestigial unless used for other internal logic.
  showDelete = false;

  // Properties for displaying feedback messages to the user
  message: string | null = null;
  isSuccess: boolean = false;

  constructor(private attendanceService: AttendanceService) {}

  // This method might not be needed if the component is always visible or controlled by a router
  toggleDelete(): void {
    this.showDelete = !this.showDelete;
  }

  /**
   * Initiates the deletion of an attendance record based on the provided attendance ID.
   * Provides user feedback via a message.
   */
  deleteAttendance(): void {
    // Basic validation for attendanceId
    if (this.attendanceId === null || this.attendanceId === undefined || isNaN(this.attendanceId)) {
      this.setMessage('Please enter a valid Attendance ID to delete.', false);
      return;
    }

    // Confirm deletion with the user (using a custom modal or simple confirm as a placeholder)
    // Note: window.confirm() is generally avoided in production Angular apps for better UX.
    // Consider replacing this with a custom Angular modal for a better user experience.
    if (!confirm('Are you sure you want to delete this attendance record?')) {
        return; // User cancelled the deletion
    }

    this.attendanceService.deleteAttendance(this.attendanceId).subscribe({
      next: (response) => {
        console.log('Attendance record deleted:', response);
        // Assuming your service response indicates success
        this.setMessage(`Attendance record with ID ${this.attendanceId} deleted successfully.`, true);
        // Optionally clear the input field after successful deletion
        this.attendanceId = null as any; // Cast to any to allow null assignment for number type
      },
      error: (error) => {
        console.error('Error deleting attendance record:', error);
        this.setMessage(`Failed to delete attendance record with ID ${this.attendanceId}. Error: ${error.message || 'Unknown error'}`, false);
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
