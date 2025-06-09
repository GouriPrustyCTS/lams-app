// src/app/components/leave-report-page/leave-report-page.component.ts
import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service'; // Corrected path
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // <--- ADD THIS
import { FormsModule } from '@angular/forms'; // <--- ADD THIS if you add forms later

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
  selector: 'app-leave-report-page',
  standalone: true, // <--- Ensure this is true if it's a standalone component
  imports: [CommonModule, FormsModule], // <--- ADD CommonModule and FormsModule here
  templateUrl: './leave-report-page.component.html',
  styleUrls: ['./leave-report-page.component.css']
})
export class LeaveReportPageComponent implements OnInit {
  leaveReportData: LeaveRequestDTO[] = [];
  errorMessage: string | null = null;
  loading: boolean = false;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.fetchLeaveReportData();
  }

  fetchLeaveReportData(): void {
    this.loading = true;
    this.errorMessage = null;
    this.reportService.getLeaveReportData().subscribe({
      next: (data: LeaveRequestDTO[]) => {
        this.leaveReportData = data;
        this.loading = false;
        console.log('Successfully fetched leave report data.');
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = `Error fetching leave report data: ${error.message}`;
        this.loading = false;
        console.error('Error fetching leave report data:', error);
      }
    });
  }

  downloadExcelReport(): void {
    this.reportService.downloadLeaveReportXcel().subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'leave_report_sorted_by_month.xlsx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        console.log('Excel report downloaded successfully.');
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = `Error downloading Excel report: ${error.message}`;
        console.error('Error downloading Excel report:', error);
      }
    });
  }

  downloadPdfReport(): void {
    this.reportService.downloadLeaveReportPdf().subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'leave_report_sorted_by_month.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        console.log('PDF report downloaded successfully.');
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = `Error downloading PDF report: ${error.message}`;
        console.error('Error downloading PDF report:', error);
      }
    });
  }
}