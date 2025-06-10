import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Attendance {
  attendanceId?: number;
  clockInTime: Date;
  clockOutTime: Date;
  attendanceDate: Date;
  employeeId: number;
  workHours: number;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private baseUrl = 'http://localhost:2694/attendance'; // Update with your backend API URL

  constructor(private http: HttpClient) {}

  // Get all attendance records
  getAllAttendances(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.baseUrl}/all`);
  }

  // Get attendance by ID
  getAttendanceById(id: number): Observable<Attendance> {
    return this.http.get<Attendance>(`${this.baseUrl}/${id}`);
  }

  // Add attendance
  addAttendance(attendance: Attendance): Observable<Attendance> {
    return this.http.post<Attendance>(`${this.baseUrl}/add`, attendance);
  }

  // Update attendance
  updateAttendance(id: number, attendance: Attendance): Observable<Attendance> {
    return this.http.put<Attendance>(`${this.baseUrl}/${id}`, attendance);
  }

  // Delete attendance
  deleteAttendance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Clock in an employee
  clockIn(employeeId: number): Observable<string> {
    return this.http.post(`${this.baseUrl}/clock-in/${employeeId}`, {}, { responseType: 'text'});
  }
  
  clockOut(employeeId: number): Observable<string> {
    return this.http.post(`${this.baseUrl}/clock-out/${employeeId}`, {}, { responseType: 'text' });
  }
  

  // Get attendance by employee ID
  getAttendanceByEmployee(employeeId: number): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.baseUrl}/employee/${employeeId}`);
  }

  // Get attendance by date
  getAttendanceByDate(date: string): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.baseUrl}/date/${date}`);
  }

  // Calculate work hours
  calculateWorkHours(attendanceId: number): Observable<number> {
    console.log("called");
    
    return this.http.get<number>(`${this.baseUrl}/hours/${attendanceId}`);
  }

  // Get logged-in employee's attendance
  getMyAttendance(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.baseUrl}/emp/my-attendance`);
  }
}
