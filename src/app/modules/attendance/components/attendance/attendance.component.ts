import { Component, NgModule, OnInit, signal } from '@angular/core';
import { AttendanceService, Attendance } from '../../services/attendance.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
  standalone:true,
  imports:[FormsModule,NgIf,NgFor]
})
export class AttendanceComponent implements OnInit {
  showSearch: boolean = false;

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }
  showClockInOut: boolean = false;

  toggleClockInOut() {
    this.showClockInOut = !this.showClockInOut;
  }
  showUpdate: boolean = false;

  toggleUpdate() {
    this.showUpdate = !this.showUpdate;
  }
  showDelete: boolean = false;

  toggleDelete() {
    this.showDelete = !this.showDelete;
  }
  attendances: Attendance[] = [];
  selectedAttendance?: Attendance ;
  employeeId!: number;
  attendanceDate!: string;
  newAttendance: Attendance = {} as Attendance;
  attendanceId!: number;
  workHours!: number;
  message: string = '';

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit(): void {
    this.getAllAttendances();
  }

  // Get all attendance records
  getAllAttendances(): void {
    this.attendances.length > 0 ? this.attendances = [] : this.attendanceService.getAllAttendances().subscribe(
      (data) => this.attendances = data,
      (error) => console.error('Error fetching attendances:', error)
    );
  }
  
  

  // Get attendance by ID
  getAttendanceById(): void {
    if (this.selectedAttendance) {
      this.selectedAttendance = undefined;
    } else {
      this.attendanceService.getAttendanceById(this.attendanceId).subscribe(
        (data) => this.selectedAttendance = data,
        (error) => console.error('Error fetching attendance by ID:', error)
      );
    }
  }
  

  // Add new attendance
  addAttendance(): void {
    this.attendanceService.addAttendance(this.newAttendance).subscribe(
      (data) => {
        this.attendances.push(data);
        this.message = "Attendance added successfully!";
      },
      (error) => console.error('Error adding attendance:', error)
    );
  }

  // Update attendance
  // Fetch attendance details before updating
fetchAttendance(): void {
  if (!this.attendanceId) {
    this.message = "Please enter a valid attendance ID.";
    return;
  }

  this.attendanceService.getAttendanceById(this.attendanceId).subscribe(
    (data) => {
      this.selectedAttendance = { ...data }; // Clone to prevent binding issues
    },
    (error) => console.error('Error fetching attendance:', error)
  );
}

// Update attendance details
updateAttendance(): void {
  if (!this.selectedAttendance) {
    this.message = "No attendance record selected for update.";
    return;
  }

  this.attendanceService.updateAttendance(this.attendanceId, this.selectedAttendance).subscribe(
    (data) => {
      this.message = "Attendance updated successfully!";
      this.attendances = this.attendances.map(att => 
        att.attendanceId === this.attendanceId ? { ...data } : att
      );
    },
    (error) => console.error('Error updating attendance:', error)
  );
}


  // Delete attendance
  deleteAttendance(): void {
    if (!this.attendanceId) {
      this.message = "Please enter an attendance ID.";
      return;
    }
  
    console.log('Deleting attendance with ID:', this.attendanceId); // Debugging log
  
    this.attendanceService.deleteAttendance(this.attendanceId).subscribe(
      () => {
        this.attendances = this.attendances.filter(att => att.attendanceId !== this.attendanceId);
        this.message = "Attendance deleted successfully!";
      },
      (error) => console.error('Error deleting attendance:', error)
    );
  }
  

  // Clock in an employee
  clockIn(): void {
    this.attendanceService.clockIn(this.employeeId).subscribe(
      (data) => {
        this.message = data;
        console.log(data);  
      },
      (error) => console.error('Error clocking in:', error)
    );
  }

  // Clock out an employee
  clockOut(): void {
    this.attendanceService.clockOut(this.employeeId).subscribe(
      (data) => this.message = data,
      (error) => console.error('Error clocking out:', error)
    );
  }

  // Get attendance for a specific employee
  getAttendanceByEmployee(): void {
    this.attendanceService.getAttendanceByEmployee(this.employeeId).subscribe(
      (data) => this.attendances = data,
      (error) => console.error('Error fetching employee attendance:', error)
    );
  }

// Get attendance by date
getAttendanceByDate(): void {
  if (!this.attendanceDate) {
    this.message = "Please select a date.";
    return;
  }

  this.attendanceService.getAttendanceByDate(this.attendanceDate).subscribe(
    (data) => {
      this.attendances = data;
      this.message = data.length ? "Attendance data loaded." : "No records found for selected date.";
    },
    (error) => {
      console.error('Error fetching attendance by date:', error);
      this.message = "Error occurred while fetching data.";
    }
  );
}


  // Calculate work hours
  calculateWorkHours(): void {
    this.attendanceService.calculateWorkHours(this.attendanceId).subscribe(
      (data) => this.workHours = data,
      (error) => console.error('Error calculating work hours:', error)
    );
  }

  // Get logged-in user's attendance
  getMyAttendance(): void {
    this.attendanceService.getMyAttendance().subscribe(
      (data) => this.attendances = data,
      (error) => console.error('Error fetching my attendance:', error)
    );
  }
}
