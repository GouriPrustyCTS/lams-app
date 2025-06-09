// src/app/components/year-wise-leave-chart-page/year-wise-leave-chart-page.component.ts
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ReportService } from '../../services/report.service'; // Corrected path
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // <--- ADD THIS

@Component({
  selector: 'app-year-wise-leave-chart-page',
  standalone: true, // <--- Ensure this is true
  imports: [CommonModule], // <--- ADD CommonModule here
  templateUrl: './year-wise-leave-chart-page.component.html',
  styleUrls: ['./year-wise-leave-chart-page.component.css']
})
export class YearWiseLeaveChartPageComponent implements OnInit {
  yearWiseLeaveChartUrl: SafeUrl | null = null;
  errorMessage: string | null = null;

  constructor(private reportService: ReportService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getYearWiseLeaveChart();
  }

  getYearWiseLeaveChart(): void {
    this.errorMessage = null;
    this.yearWiseLeaveChartUrl = null;
    this.reportService.getYearWiseLeaveChart().subscribe({
      next: (imageBlob: Blob) => {
        const objectURL = URL.createObjectURL(imageBlob);
        this.yearWiseLeaveChartUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        console.log('Successfully fetched year-wise leave chart.');
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = `Error fetching year-wise leave chart: ${error.message}`;
        console.error('Error fetching year-wise leave chart:', error);
      }
    });
  }
}