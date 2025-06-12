import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { Router, RouterLink } from '@angular/router'; // Import RouterLink for [routerLink] directive
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf, *ngFor, date pipe
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AuthService } from '../../../login/services/auth.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Add HttpClientModule to imports
})
export class EmployeeListComponent implements OnInit {
  employeeId!: number;

  fetch(): void {
    const employeeId = Number(
      this.authService.getDetailsFromToken(this.authService.getToken())
        .employeeId
    ); // Assuming you store employeeId on login
    this.employeeId = employeeId;
    console.log(employeeId);
  }

  ngOnInit(): void {
    this.fetch();
    this.getAllEmployees();
  }
  edit(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['employee/employees/edit/', id]); // Navigate to edit page with employee ID
    }
  }
  employees: Employee[] = [];
  errorMessage: string = ''; // Property for general errors
  message: string | null = null; // Property for success/error messages after actions
  isSuccess: boolean = false; // Flag to determine message type

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private authService: AuthService
  ) {}

  /**
   * Fetches all employees from the service.
   * Handles success and error scenarios, updating the employee list and error messages.
   */
  getAllEmployees(): void {
    this.employeeService.getEmployeeList().subscribe({
      next: (data) => {
        this.employees = data;
        this.errorMessage = ''; // Clear any previous general error
      },
      error: (err) => {
        console.error('Error fetching employees', err);
        this.errorMessage = 'Failed to load employees. Please try again later.';
        this.employees = []; // Clear list on error
      },
    });
  }

  /**
   * Deletes an employee by ID after user confirmation.
   * Refreshes the list and displays feedback upon success or failure.
   * @param id The ID of the employee to delete.
   */
  deleteEmployee(id: number): void {
    // Confirm deletion with the user (consider a custom modal for better UX)
    if (!confirm('Are you sure you want to delete this employee record?')) {
      return; // User cancelled the deletion
    }

    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        console.log('Employee deleted successfully');
        this.setMessage(`Employee with ID ${id} deleted successfully.`, true);
        this.getAllEmployees(); // Refresh the list after deletion
      },
      error: (err) => {
        console.error('Error deleting employee', err);
        this.setMessage(
          `Failed to delete employee with ID ${id}. Error: ${
            err.message || 'Unknown error'
          }`,
          false
        );
      },
    });
  }

  /**
   * Sets the message to be displayed to the user and controls its visibility.
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
