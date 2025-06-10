import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Import HttpParams
import { Observable } from 'rxjs';
import { ShiftSwapRequest } from '../models/shift-swap-request';

@Injectable({
  providedIn: 'root'
})
export class ShiftSwapRequestService {
  private apiUrl = 'http://localhost:8888/swap'; // Base URL for swap requests

  constructor(private http: HttpClient) { }

  /**
   * Creates a new shift swap request.
   * @param request The ShiftSwapRequest object to create.
   * @returns An Observable of the created ShiftSwapRequest.
   */
  createSwapRequest(request: ShiftSwapRequest): Observable<ShiftSwapRequest> {
    return this.http.post<ShiftSwapRequest>(`${this.apiUrl}/request`, request);
  }

  /**
   * Retrieves all shift swap requests or requests filtered by status.
   * @param status Optional. The status to filter by (e.g., 'PENDING', 'APPROVED', 'REJECTED').
   * @returns An Observable of an array of ShiftSwapRequest.
   */
  getAllRequests(status?: string): Observable<ShiftSwapRequest[]> {
    let params = new HttpParams();
    if (status) {
      // Assuming backend /swap/ endpoint can take a 'status' query parameter for filtering
      // If your backend has a specific /swap/pending endpoint, the controller will route to it.
      params = params.set('status', status);
    }
    return this.http.get<ShiftSwapRequest[]>(`${this.apiUrl}/`, { params });
  }

  /**
   * Retrieves a single shift swap request by its ID.
   * @param id The ID of the shift swap request.
   * @returns An Observable of the ShiftSwapRequest.
   */
  getRequestById(id: number): Observable<ShiftSwapRequest> {
    return this.http.get<ShiftSwapRequest>(`${this.apiUrl}/${id}`);
  }

  /**
   * Updates the status of a shift swap request.
   * @param id The ID of the shift swap request to update.
   * @param status The new status (e.g., 'APPROVED', 'REJECTED').
   * @returns An Observable of the updated ShiftSwapRequest.
   */
  updateRequestStatus(id: number, status: string): Observable<ShiftSwapRequest> {
    // Assuming backend endpoint is PUT /swap/{id}/status?status=NEW_STATUS
    return this.http.put<ShiftSwapRequest>(`${this.apiUrl}/${id}/status?status=${status}`, {});
  }

  /**
   * Deletes a shift swap request by its ID.
   * @param id The ID of the shift swap request to delete.
   * @returns An Observable of the HTTP response.
   */
  deleteRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
