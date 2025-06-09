import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { EmployeeService } from '../services/employee.service';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { AttendanceComponent } from "../components/attendance/attendance.component";
@Component({
  selector: 'app-employee-list',
  standalone: true, // If using Angular Standalone Components
  imports: [NgFor, EmployeeFormComponent, NgIf, DatePipe, AttendanceComponent],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = []; // Added missing property

    showForm = false; // Initialize it

  
  constructor(private employeeService: EmployeeService) {}
  toggleForm(): void {
    this.showForm = !this.showForm;
  }
  
  ngOnInit(): void {
   // this.getEmployees();
  }

  getEmployees(): void {
    if (this.employees.length > 0) {
      // Hide the list by clearing the array
      this.employees = [];
    } else {
      // Fetch employees when the list is empty
      this.employeeService.getEmployeeList().subscribe(
        (data) => this.employees = data,
        (error) => console.error('Error fetching employees', error)
      );
    }
  }
  
  // getEmployeeById(id: number): void {
  //   this.employeeService.getEmployeeById(id).subscribe(
  //     (employee) => {
  //       console.log('Employee Details:', employee);
  //     },
  //     (error) => {
  //       console.error('Error fetching employee details', error);
  //     }
  //   );
  // }
  
  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      console.log('Employee deleted:', id);
      this.employees = this.employees.filter(emp => emp.employeeId !== id); // Update UI
    });
  }

  selectedEmployee: Employee | null = null;
showPopup = false;


getEmployeeById(id: number): void {
  this.employeeService.getEmployeeById(id).subscribe(
    (employee) => {
      this.selectedEmployee = employee;
      this.showPopup = true;  // Show popup
    },
    (error) => {
      console.error('Error fetching employee details', error);
    }
  );
}


closePopup(): void {
  this.showPopup = false;
}

    
}
