import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../employee-list/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  private baseURL = "http://localhost:8080/employee/"; // Ensure proper URL format

  constructor(private httpClient: HttpClient) {}

  getEmployeeList(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseURL);
  }
  getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseURL}${id}`);
  }
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(`${this.baseURL}${id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}${id}`);
  }
  
  addEmployee(employee: any): Observable<Employee> {
    return this.httpClient.post<Employee>(`${this.baseURL}add`, employee, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
}
