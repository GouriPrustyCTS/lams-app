// src/app/services/report.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Assuming LeaveRequestDTO is defined here or in a shared types file.
// If it's defined within a component's .ts file, you might need to import it,
// but it's better to put DTOs in a shared location (e.g., src/app/models/ or src/app/shared/interfaces/).
interface LeaveRequestDTO {
  employeeId: number;
  name: string;
  reason: string;
  endDate: string;
  leaveType: string;
  startDate: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = 'http://localhost:2694/reports';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}\nURL: ${error.url}`;
      if (error.error && typeof error.error === 'string') {
        errorMessage += `\nBackend Message: ${error.error}`;
      } else if (error.error && error.error.message) {
        errorMessage += `\nBackend Message: ${error.error.message}`;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  getLeavePieChart(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/leave-chart-xchart`, { responseType: 'blob' }).pipe(catchError(this.handleError));
  }

  getTruTimeBarChart(empId?: number): Observable<Blob> {
    let url = `${this.baseUrl}/tru-time-bar-chart`;
    if (empId) {
      url += `?empId=${empId}`;
    }
    return this.http.get(url, { responseType: 'blob' }).pipe(catchError(this.handleError));
  }

  getMonthWiseLeaveChart(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/month-wise-leave-chart`, { responseType: 'blob' }).pipe(catchError(this.handleError));
  }

  getYearWiseLeaveChart(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/year-wise-leave-chart`, { responseType: 'blob' }).pipe(catchError(this.handleError));
  }

  getLeaveReportData(): Observable<LeaveRequestDTO[]> {
    return this.http.get<LeaveRequestDTO[]>(`${this.baseUrl}/leave-report-data`).pipe(catchError(this.handleError));
  }

  downloadLeaveReportXcel(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/downloadLeaveReportXcel`, { responseType: 'blob' }).pipe(catchError(this.handleError));
  }

  downloadLeaveReportPdf(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/downloadLeaveReportPdf`, { responseType: 'blob' }).pipe(catchError(this.handleError));
  }

  downloadEmployeeLeaveReportPdf(empId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/downloadEmployeeLeaveReportPdf/${empId}`, { responseType: 'blob' }).pipe(catchError(this.handleError));
  }

  getEmployeeLeaveRecords(empId: number): Observable<LeaveRequestDTO[]> {
    return this.http.get<LeaveRequestDTO[]>(`${this.baseUrl}/myLeaveRecordsJson/${empId}`).pipe(catchError(this.handleError));
  }
}