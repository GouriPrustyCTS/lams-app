import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shift } from '../models/shift';

@Injectable({
  providedIn: 'root'
})
export class ShiftService { // Ensure 'export' is present here
  private baseUrl = 'http://localhost:8888/shift'; // Adjust if your backend runs on a different port/context

  constructor(private http: HttpClient) { }

  createShift(shift: Shift): Observable<Shift> {
    return this.http.post<Shift>(`${this.baseUrl}/add`, shift);
  }

  getAllShifts(): Observable<Shift[]> {
    return this.http.get<Shift[]>(`${this.baseUrl}/`);
  }

  getShiftById(shiftID: number): Observable<Shift> {
    return this.http.get<Shift>(`${this.baseUrl}/${shiftID}`);
  }

  updateShift(id: number, shift: Shift): Observable<Shift> {
    return this.http.put<Shift>(`${this.baseUrl}/${id}`, shift);
  }

  deleteShift(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
