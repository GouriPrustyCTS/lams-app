import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee'; // Ensure this path is correct

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports:[CommonModule, ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css', // Keep this if you have specific component CSS, otherwise remove
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;

  message: string | null = null;
  isSuccess: boolean = false;
  showModal: boolean = false; // Controls the visibility of the success modal

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]], // Password field with validators
      department: ['', Validators.required],
      jobTitle: ['', Validators.required],
      hireDate: ['', Validators.required],
    });
  }

  /**
   * Handles the form submission.
   * If the form is valid, it attempts to add the employee via the service
   * and provides user feedback (either inline for errors or via modal for success).
   */
  onSubmit(): void {
    // Mark all controls as touched to ensure validation messages are shown on submit
    this.employeeForm.markAllAsTouched();

    if (this.employeeForm.valid) {
      const employee: Employee = this.employeeForm.value;
      this.employeeService.addEmployee(employee).subscribe({
        next: () => {
          console.log('Employee added successfully!');
          this.setMessage('Employee added successfully!', true); // This will open the modal
          this.resetForm(); // Reset the form after successful submission
          // Optionally, navigate after a short delay, perhaps after modal is closed
          // setTimeout(() => this.router.navigate(['/employees']), 2000);
        },
        error: (error) => {
          console.error('Error adding employee:', error);
          this.setMessage(`Failed to add employee. Error: ${error.message || 'Unknown error'}`, false); // This will show an inline error message
        }
      });
    } else {
      console.warn('Form is invalid. Please fill out all required fields correctly.');
      this.setMessage('Please fill out the form correctly.', false); // Show inline error for invalid form
    }
  }

  /**
   * Sets the message to be displayed to the user and controls its visibility.
   * If `success` is true, it triggers the modal to open.
   * @param msg The message string.
   * @param success Boolean indicating if the message is a success or error.
   */
  private setMessage(msg: string, success: boolean): void {
    this.message = msg;
    this.isSuccess = success;

    if (success) {
      this.showModal = true; // For success, show the modal
    }

    // Set a timeout to clear the message and close the modal (if open)
    setTimeout(() => {
      this.message = null;
      if (!this.isSuccess) { // Only clear modal if it was an error message that used it
        this.showModal = false;
      }
      // If it was a success modal, it's typically closed by the user or navigation
    }, 5000); // Message/modal state resets after 5 seconds for errors, or acts as a fallback for success
  }

  /**
   * Closes the success modal manually when the user clicks the close button.
   */
  closeModal(): void {
    this.showModal = false;
    this.message = null; // Clear the message when the modal is explicitly closed
    this.router.navigate(['/employee/employees']); // Optional: Navigate to employee list after closing modal
  }

  /**
   * Resets the form to its initial state (clears all input fields).
   */
  private resetForm(): void {
    this.employeeForm.reset();
    // You might want to set initial values after reset if needed, e.g., to empty strings
    // this.employeeForm.patchValue({ name: '', email: '', password: '', department: '', jobTitle: '', hireDate: '' });
  }
}
