import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ShiftSwapRequestService } from './shift-swap-request.service';
import { ShiftSwapRequest } from '../models/shift-swap-request'; // Ensure this path is correct
import { HttpParams } from '@angular/common/http';

describe('ShiftSwapRequestService', () => {
  let service: ShiftSwapRequestService;
  let httpMock: HttpTestingController;
  const API_URL = 'http://localhost:2694/swap';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShiftSwapRequestService],
    });
    service = TestBed.inject(ShiftSwapRequestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new shift swap request', () => {
    const newRequest: ShiftSwapRequest = {
      requesterEmployeeId: 101,
      requestedShiftId: 1,
      targetEmployeeId: 102,
      targetShiftId: 2,
      status: 'PENDING',
    };
    const returnedRequest: ShiftSwapRequest = { ...newRequest, id: 1 }; // Simulate backend assigning an ID

    service.createSwapRequest(newRequest).subscribe((request) => {
      expect(request).toEqual(returnedRequest);
    });

    const req = httpMock.expectOne(`${API_URL}/request`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newRequest);
    req.flush(returnedRequest);
  });

  it('should get all shift swap requests without status filter', () => {
    const dummyRequests: ShiftSwapRequest[] = [
      { id: 1, requesterEmployeeId: 101, requestedShiftId: 1, targetEmployeeId: 102, targetShiftId: 2, status: 'PENDING' },
      { id: 2, requesterEmployeeId: 103, requestedShiftId: 3, targetEmployeeId: 104, targetShiftId: 4, status: 'APPROVED' },
    ];

    service.getAllRequests().subscribe((requests) => {
      expect(requests.length).toBe(2);
      expect(requests).toEqual(dummyRequests);
    });

    const req = httpMock.expectOne(`${API_URL}/`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.keys().length).toBe(0); // Ensure no query params
    req.flush(dummyRequests);
  });

  it('should get all shift swap requests filtered by status', () => {
    const status = 'PENDING';
    const dummyPendingRequests: ShiftSwapRequest[] = [
      { id: 1, requesterEmployeeId: 101, requestedShiftId: 1, targetEmployeeId: 102, targetShiftId: 2, status: 'PENDING' },
    ];

    service.getAllRequests(status).subscribe((requests) => {
      expect(requests.length).toBe(1);
      expect(requests).toEqual(dummyPendingRequests);
    });

    const req = httpMock.expectOne((request) =>
      request.url === `${API_URL}/` && request.params.get('status') === status
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('status')).toBe(status);
    req.flush(dummyPendingRequests);
  });

  it('should get a single shift swap request by ID', () => {
    const requestId = 1;
    const dummyRequest: ShiftSwapRequest = {
      id: 1, requesterEmployeeId: 101, requestedShiftId: 1, targetEmployeeId: 102, targetShiftId: 2, status: 'PENDING'
    };

    service.getRequestById(requestId).subscribe((request) => {
      expect(request).toEqual(dummyRequest);
    });

    const req = httpMock.expectOne(`${API_URL}/${requestId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRequest);
  });

  it('should update the status of a shift swap request', () => {
    const requestId = 1;
    const newStatus = 'APPROVED';
    const updatedRequest: ShiftSwapRequest = {
      id: 1, requesterEmployeeId: 101, requestedShiftId: 1, targetEmployeeId: 102, targetShiftId: 2, status: newStatus
    };

    service.updateRequestStatus(requestId, newStatus).subscribe((request) => {
      expect(request).toEqual(updatedRequest);
    });

    // Note the query parameter in the URL for PUT /swap/{id}/status?status=NEW_STATUS
    const req = httpMock.expectOne(`${API_URL}/${requestId}/status?status=${newStatus}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({}); // Empty body as per your service
    req.flush(updatedRequest);
  });

  it('should delete a shift swap request by ID', () => {
    const requestId = 1;

    service.deleteRequest(requestId).subscribe((response) => {
      expect(response).toBeNull(); // For void return type
    });

    const req = httpMock.expectOne(`${API_URL}/${requestId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Simulate successful deletion with no content
  });
});