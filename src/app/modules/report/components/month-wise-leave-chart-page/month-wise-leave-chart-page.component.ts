// src/app/components/month-wise-leave-chart-page/month-wise-leave-chart-page.component.ts
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ReportService } from '../../services/report.service'; // Corrected path
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // <--- ADD THIS

@Component({
  selector: 'app-month-wise-leave-chart-page',
  standalone: true, // <--- Ensure this is true
  imports: [CommonModule], // <--- ADD CommonModule here
  templateUrl: './month-wise-leave-chart-page.component.html',
  styleUrls: ['./month-wise-leave-chart-page.component.css']
})
export class MonthWiseLeaveChartPageComponent implements OnInit {
  monthWiseLeaveChartUrl: SafeUrl | null = null;
  errorMessage: string | null = null;

  constructor(private reportService: ReportService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getMonthWiseLeaveChart();
  }

  getMonthWiseLeaveChart(): void {
    this.errorMessage = null;
    this.monthWiseLeaveChartUrl = null;
    this.reportService.getMonthWiseLeaveChart().subscribe({
      next: (imageBlob: Blob) => {
        const objectURL = URL.createObjectURL(imageBlob);
        this.monthWiseLeaveChartUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        console.log('Successfully fetched month-wise leave chart.');
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = `Error fetching month-wise leave chart: ${error.message}`;
        console.error('Error fetching month-wise leave chart:', error);
      }
    });
  }
}