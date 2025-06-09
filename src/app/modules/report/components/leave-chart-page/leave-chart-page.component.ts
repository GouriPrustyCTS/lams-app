import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/report.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-leave-chart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leave-chart-page.component.html',
  styleUrl: './leave-chart-page.component.css'
})
export class LeaveChartPageComponent implements OnInit {
  chartImageUrl: SafeUrl | undefined;
  isLoading = true;
  error: string | null = null;

  constructor(private reportService: ReportService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getLeavePieChart();
  }

  getLeavePieChart(): void {
    this.isLoading = true;
    this.error = null;
    this.reportService.getLeavePieChart().subscribe({
      next: (imageBlob: Blob) => {
        const objectUrl = URL.createObjectURL(imageBlob);
        this.chartImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching leave pie chart:', err);
        this.error = 'Failed to load leave chart. Please try again later.';
        this.isLoading = false;
      }
    });
  }
}