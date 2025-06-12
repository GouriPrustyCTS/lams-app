import { Component } from '@angular/core';
import { LeaveBalanceDTO } from '../../models/leave-balance.dto';
import { LeaveBalanceService } from '../../services/leave-balance.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lams-create-leave-balance',
  templateUrl: './create-leave-balance.component.html',
  styleUrls: ['./create-leave-balance.component.css'],
  imports:[CommonModule,FormsModule, RouterModule]
})
export class CreateLeaveBalanceComponent {
  leaveBalance: LeaveBalanceDTO = {
    employeeId: 0,
    leaveType: '',
    balance: 0
  };
  successMessage: string = '';
  errorMessage: string = '';
  message: string | null = null; 
  isSuccess: boolean = false;

  constructor(
    private leaveBalanceService: LeaveBalanceService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.leaveBalanceService.createLeaveBalance(this.leaveBalance).subscribe({
      next: (data) => {
        this.successMessage = 'Leave Balance created successfully!';
        this.leaveBalance = { employeeId: 0, leaveType: '', balance: 0 }; // Reset form
        this.router.navigate(['/leave-balances']); 
      },
      error: (err) => {
        console.error('Error creating leave balance', err);
        this.errorMessage = 'Failed to create leave balance. Please check your input and try again.';
      }
    });
  }

  validateBalance(): void {
    const maxLimit =
      this.leaveBalance.leaveType === 'Sick Leave' || this.leaveBalance.leaveType === 'Casual Leave'
        ? 15
        : this.leaveBalance.leaveType === 'Annual Leave'
        ? 30
        : null;
  
    if (maxLimit !== null && this.leaveBalance.balance > maxLimit) {
      this.leaveBalance.balance = maxLimit; // Restrict to the maximum limit
      this.errorMessage = `The balance for ${this.leaveBalance.leaveType} cannot exceed ${maxLimit}.`;
    } else {
      this.errorMessage = ''; // Clear the error message if within the limit
    }
  }
}