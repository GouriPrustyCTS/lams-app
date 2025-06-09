
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EmployeeService } from '../services/employee.service';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class EmployeeFormComponent {
  employeeForm: FormGroup;
  employeeId: number | null = null;
  isUpdateMode = false;


  EmployeeService = inject(EmployeeService);


  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.employeeForm = this.fb.group({
      hireDate: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      jobTitle: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
   formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];  // "yyyy-MM-dd"
  };
  

  loadEmployee(): void {
    if (!this.employeeId) {
      alert('Please enter a valid employee ID');
      return;
    }
  
  
    this.EmployeeService.getEmployeeById(this.employeeId).subscribe({
      next: (data) => {
        const formattedDate = data.hireDate ? this.formatDate(new Date(data.hireDate)) : '';
  
  
        this.employeeForm.patchValue({
          ...data,
          hireDate: formattedDate
        });
  
  
        this.isUpdateMode = true;
        console.log("Loaded employee:", data);
      },
      error: (err) => {
        alert('Employee not found.');
        console.error(err);
      }
    });
  
  
  }


  onSubmit(): void {
    if (this.employeeForm.invalid) {
      console.log("Form is invalid.");
      return;
    }


    if (this.isUpdateMode && this.employeeId != null) {
      this.EmployeeService.updateEmployee(this.employeeId, this.employeeForm.value).subscribe({
        next: (res) => {
          alert('Employee updated successfully');
          console.log("Updated employee:", res);
        },
        error: (err) => {
          console.error("Update error:", err);
        }
      });
    } else {
      this.EmployeeService.addEmployee(this.employeeForm.value).subscribe({
        next: (res) => {
          alert('Employee created successfully');
          console.log("Created employee:", res);
        },
        error: (err) => {
          console.error("Create error:", err);
        }
      });
    }
  }
}



