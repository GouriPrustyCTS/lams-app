// src/app/components/my-leave-records/my-leave-records.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../../services/report.service'; // Corrected path
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // <--- ADD THIS
import { FormsModule } from '@angular/forms'; // <--- ADD THIS (even if not used in this specific template, good practice for similar components)
import { RouterModule } from '@angular/router'; // <--- ADD THIS if using routerLink or ActivatedRoute in template

interface LeaveRequestDTO {
  employeeId: number;
  name: string;
  reason: string;
  endDate: string;
  leaveType: string;
  startDate: string;
  status: string;
}

@Component({
  selector: 'app-my-leave-records-page',
  standalone: true, // <--- Ensure this is true
  imports: [CommonModule, FormsModule, RouterModule], // <--- ADD CommonModule, FormsModule, RouterModule
  templateUrl: './my-leave-records.component.html', // <--- CORRECTED: Changed from my-leave-records-page.component.html
  styleUrls: ['./my-leave-records.component.css']
})
export class MyLeaveRecordsPageComponent implements OnInit {
  leaveRecords: LeaveRequestDTO[] = [];
  empId: number | null = null;
  errorMessage: string | null = null;
  loading: boolean = false;

  constructor(
    private reportService: ReportService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('empId');
      if (id) {
        this.empId = +id;
        this.fetchMyLeaveRecords();
      } else {
        this.errorMessage = 'Employee ID not provided in the URL.';
      }
    });
  }

  fetchMyLeaveRecords(): void {
    if (!this.empId) {
      this.errorMessage = 'Employee ID is required to fetch records.';
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.reportService.getEmployeeLeaveRecords(this.empId).subscribe({
      next: (data: LeaveRequestDTO[]) => {
        this.leaveRecords = data;
        this.loading = false;
        console.log(`Successfully fetched leave records for Employee ID: ${this.empId}`);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = `Error fetching leave records: ${error.message}`;
        this.loading = false;
        console.error('Error fetching leave records:', error);
      }
    });
  }

  downloadEmployeePdfReport(): void {
    if (!this.empId) {
      this.errorMessage = 'Employee ID is required to download PDF.';
      return;
    }
    this.reportService.downloadEmployeeLeaveReportPdf(this.empId).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `employee_leave_report_${this.empId}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        console.log(`PDF report downloaded successfully for Employee ID: ${this.empId}`);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = `Error downloading employee PDF report: ${error.message}`;
        console.error('Error downloading employee PDF report:', error);
      }
    });
  }
}