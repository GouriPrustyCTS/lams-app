import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports:[CommonModule, ReactiveFormsModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css', // Keep this if you have specific component CSS, otherwise remove
})
export class EditEmployeeComponent implements OnInit {
  employeeForm!: FormGroup; // Use definite assignment assertion as it's initialized in ngOnInit
  employeeId: number | null = null;
  isLoading: boolean = true;
  employeeNotFound: boolean = false;

  message: string | null = null;
  isSuccess: boolean = false;
  showModal: boolean = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute, // Inject ActivatedRoute to get route parameters
    private router: Router
  ) {
    // Initialize form structure here, but values will be patched later
    this.employeeForm = this.fb.group({
      employeeId: [{ value: '', disabled: true }], // Employee ID is read-only
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]], // Password field
      department: ['', Validators.required],
      jobTitle: ['', Validators.required],
      hireDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Get the employeeId from the route parameters
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.employeeId = +idParam; // Convert string to number
        this.loadEmployeeData(this.employeeId);
      } else {
        this.employeeNotFound = true;
        this.isLoading = false;
        this.setMessage('No employee ID provided in the URL.', false);
      }
    });
  }

  /**
   * Fetches employee data by ID and populates the form.
   * @param id The ID of the employee to load.
   */
  loadEmployeeData(id: number): void {
    this.isLoading = true;
    this.employeeNotFound = false;
    this.employeeService.getEmployeeById(id).subscribe({
      next: (employeeData) => {
        this.isLoading = false;
        // Patch the form with existing employee data
        this.employeeForm.patchValue({
          employeeId: employeeData.employeeId,
          name: employeeData.name,
          email: employeeData.email,
          // Note: Passwords are not usually pre-filled for security.
          // For editing, you might prompt for a new password or leave it blank.
          // Here, we're assuming a simple scenario where it's included.
          password: employeeData.password, // Be cautious with pre-filling passwords
          department: employeeData.department,
          jobTitle: employeeData.jobTitle,
          // Format hireDate to YYYY-MM-DD for date input
          hireDate: employeeData.hireDate ? new Date(employeeData.hireDate).toISOString().split('T')[0] : ''
        });
      },
      error: (error) => {
        console.error('Error loading employee:', error);
        this.isLoading = false;
        this.employeeNotFound = true;
        this.setMessage(`Failed to load employee details. ${error.message || 'Unknown error'}`, false);
      }
    });
  }

  /**
   * Handles the form submission for updating an employee.
   */
  onSubmit(): void {
    this.employeeForm.markAllAsTouched(); // Mark all controls as touched to show validation errors immediately

    if (this.employeeForm.valid && this.employeeId !== null) {
      // Create an employee object with the updated values, including the original ID
      const updatedEmployee: Employee = {
        ...this.employeeForm.getRawValue() // getRawValue() gets values even from disabled controls
      };
      updatedEmployee.employeeId = this.employeeId; // Ensure correct ID is set

      // IMPORTANT: Pass both the ID and the updatedEmployee object to the service
      this.employeeService.updateEmployee(this.employeeId, updatedEmployee).subscribe({
        next: () => {
          console.log('Employee updated successfully!');
          this.setMessage('Employee details updated successfully!', true); // Shows success modal
          // Optionally, navigate back to employee list after a short delay or closing modal
          // setTimeout(() => this.router.navigate(['//employees']), 3000);
          // this.router.navigate(['employee/employees']); // Redirect to employee list after update
        },
        error: (error) => {
          console.error('Error updating employee:', error);
          this.setMessage(`Failed to update employee. Error: ${error.message || 'Unknown error'}`, false); // Shows inline error
        }
      });
    } else {
      console.warn('Form is invalid or employee ID is missing.');
      this.setMessage('Please fill out the form correctly.', false); // Shows inline error
    }
  }

  /**
   * Closes the success modal and optionally navigates back.
   */
  closeModal(): void {
    this.showModal = false;
    this.message = null; // Clear message when modal is closed
    this.router.navigate(['/employee/employees']); // Redirect to employee list after closing modal
  }

  /**
   * Cancels the edit operation and navigates back to the employee list.
   */
  cancelEdit(): void {
    this.router.navigate(['/employees']);
  }

  /**
   * Sets the message to be displayed to the user.
   * @param msg The message string.
   * @param success Boolean indicating if the message is a success or error.
   */
  private setMessage(msg: string, success: boolean): void {
    this.message = msg;
    this.isSuccess = success;

    if (success) {
      this.showModal = true;
    } else {
      // For error messages, clear after timeout
      setTimeout(() => {
        this.message = null;
      }, 5000);
    }
  }
}
