import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveRequestService } from '../../service/leave-request.service';
import { LeaveRequest } from '../../models/leave-request.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../login/services/auth.service';

@Component({
  selector: 'app-leave-request-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './leave-request-form.component.html',
  styleUrl: './leave-request-form.component.css',
})
export class LeaveRequestFormComponent {
  leaveRequest: LeaveRequest = {
    employeeId: 1,
    startDate: '',
    endDate: '',
    reason: '',
    status: 'PENDING',
    leaveType: '',
    requestDate: '',
  };
  message: string | null = null;
  isSuccess: boolean = false;
  isEditMode: boolean = false;
  requestId: number | null = null;

  constructor(
    private leaveRequestService: LeaveRequestService,
    public router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const employeeId = Number(
      this.authService.getDetailsFromToken(this.authService.getToken())
        .employeeId
    ); 
    this.leaveRequest.employeeId = employeeId;
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.requestId = +idParam;
        this.isEditMode = true;
        this.loadLeaveRequest();
      }
    });
  }

  loadLeaveRequest(): void {
    if (this.requestId) {
      this.leaveRequestService.getById(this.requestId).subscribe(
        (data: LeaveRequest) => {
          this.leaveRequest = data;
        },
        (error: HttpErrorResponse) => {
          console.error('Error loading swap request:', error);
          this.router.navigate(['/leaveRequests']);
        }
      );
    }
  }
  timeValidationError = false;
  dateValidationError = false;
  onSubmit(): void {
    console.log('Attempting to send Leave Request data:', this.leaveRequest);

    this.dateValidationError = false;
    const start = new Date(this.leaveRequest.startDate);
    const end = new Date(this.leaveRequest.endDate);
    if (start > end) {
      this.dateValidationError = true;
      return;
    }

    const now = new Date();
    const todayMidnight = new Date(now);
    todayMidnight.setHours(0, 0, 0, 0);
    const tomorrowMidnight = new Date(todayMidnight);
    tomorrowMidnight.setDate(todayMidnight.getDate() + 1);
    const requestStartDate = new Date(this.leaveRequest.startDate);
    requestStartDate.setHours(0, 0, 0, 0);

    if (requestStartDate < tomorrowMidnight) {
      console.log(
        'Leave Request Start Date (',
        requestStartDate.toDateString(),
        ') is before the minimum valid date (',
        tomorrowMidnight.toDateString(),
        '). It must be from tomorrow or later.'
      );
      this.timeValidationError = true;
      return;
    }

    console.log(
      'Leave Request Start Date (',
      requestStartDate.toDateString(),
      ') is valid. It is on or after (',
      tomorrowMidnight.toDateString(),
      ').'
    );
    this.timeValidationError = false;

    if (this.isEditMode && this.requestId) {
      this.leaveRequest.requestDate = new Date().toISOString();
      this.leaveRequestService
        .update(this.requestId, this.leaveRequest)
        .subscribe(
          () => {
            console.log(
              'Leave request updated successfully',
              this.leaveRequest
            );
            this.router.navigate(['/leaveRequests']);
          },
          (error: HttpErrorResponse) => {
            console.error('Error creating leave request:', error);
          }
        );
    } else {
      this.leaveRequest.requestDate = new Date().toISOString();
      this.leaveRequestService.add(this.leaveRequest).subscribe(
        () => {
          console.log('Leave request created successfully', this.leaveRequest);
          this.router.navigate(['/leaveRequests']);
        },
        (error: HttpErrorResponse) => {
          console.error('Error creating leave request:', error);
        }
      );
    }
  }
}
