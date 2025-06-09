import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeaveRequest } from '../models/leave-request.model';

const BASE_URL = 'http://localhost:8080/leaveRequests';

@Injectable({
  providedIn: 'root',
})
export class LeaveRequestService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${BASE_URL}/`);
  }

  getById(id: number): Observable<LeaveRequest> {
    return this.http.get<LeaveRequest>(`${BASE_URL}/${id}`);
  }

  getByEmployeeId(employeeId: number): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(
      `${BASE_URL}/employee/${employeeId}`
    );
  }

  add(request: LeaveRequest): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(`${BASE_URL}/add`, request);
  }

  update(id: number, data: LeaveRequest): Observable<LeaveRequest> {
    return this.http.put<LeaveRequest>(`${BASE_URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${id}`);
  }

  updateStatus(id: number, status: string): Observable<LeaveRequest> {
    return this.http.patch<LeaveRequest>(`${BASE_URL}/${id}/status`, {
      status,
    });
  }

  getAllPendingReq():Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${BASE_URL}/pending`);
  }
}
