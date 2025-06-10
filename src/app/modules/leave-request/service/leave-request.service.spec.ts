import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LeaveRequestService } from './leave-request.service';
import { LeaveRequest } from '../models/leave-request.model'; // Ensure this path is correct

describe('LeaveRequestService', () => {
  let service: LeaveRequestService;
  let httpMock: HttpTestingController;
  const BASE_URL = 'http://localhost:2694/leaveRequests';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LeaveRequestService],
    });
    service = TestBed.inject(LeaveRequestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that no requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all leave requests', () => {
    const dummyLeaveRequests: LeaveRequest[] = [
      {
        leaveRequestId: 1,
        startDate: '2025-07-01',
        endDate: '2025-07-05',
        reason: 'Vacation',
        status: 'Pending',
        employeeId: 101,
        leaveType: 'Annual Leave',
        requestDate: '2025-06-01',
      },
      {
        leaveRequestId: 2,
        startDate: '2025-08-10',
        endDate: '2025-08-10',
        reason: 'Sick day',
        status: 'Approved',
        employeeId: 102,
        leaveType: 'Sick Leave',
        requestDate: '2025-08-08',
      },
    ];

    service.getAll().subscribe((requests) => {
      expect(requests.length).toBe(2);
      expect(requests).toEqual(dummyLeaveRequests);
    });

    const req = httpMock.expectOne(`${BASE_URL}/`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyLeaveRequests);
  });

  it('should get leave request by ID', () => {
    const dummyLeaveRequest: LeaveRequest = {
      leaveRequestId: 1,
      startDate: '2025-07-01',
      endDate: '2025-07-05',
      reason: 'Vacation',
      status: 'Pending',
      employeeId: 101,
      leaveType: 'Annual Leave',
      requestDate: '2025-06-01',
    };

    service.getById(1).subscribe((request) => {
      expect(request).toEqual(dummyLeaveRequest);
    });

    const req = httpMock.expectOne(`${BASE_URL}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyLeaveRequest);
  });

  it('should get leave requests by employee ID', () => {
    const employeeId = 101;
    const dummyLeaveRequests: LeaveRequest[] = [
      {
        leaveRequestId: 1,
        startDate: '2025-07-01',
        endDate: '2025-07-05',
        reason: 'Vacation',
        status: 'Pending',
        employeeId: 101,
        leaveType: 'Annual Leave',
        requestDate: '2025-06-01',
      },
    ];

    service.getByEmployeeId(employeeId).subscribe((requests) => {
      expect(requests.length).toBe(1);
      expect(requests).toEqual(dummyLeaveRequests);
    });

    const req = httpMock.expectOne(`${BASE_URL}/employee/${employeeId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyLeaveRequests);
  });

  it('should add a new leave request', () => {
    const newRequest: LeaveRequest = {
      startDate: '2025-09-01',
      endDate: '2025-09-03',
      reason: 'Personal leave',
      status: 'Pending',
      employeeId: 103,
      leaveType: 'Personal Leave',
      requestDate: '2025-08-15',
    };
    const returnedRequest: LeaveRequest = { ...newRequest, leaveRequestId: 3 };

    service.add(newRequest).subscribe((request) => {
      expect(request).toEqual(returnedRequest);
    });

    const req = httpMock.expectOne(`${BASE_URL}/add`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newRequest);
    req.flush(returnedRequest);
  });

  it('should update a leave request', () => {
    const updatedRequest: LeaveRequest = {
      leaveRequestId: 1,
      startDate: '2025-07-01',
      endDate: '2025-07-06', // End date changed
      reason: 'Vacation extension',
      status: 'Pending',
      employeeId: 101,
      leaveType: 'Annual Leave',
      requestDate: '2025-06-01',
    };

    service.update(1, updatedRequest).subscribe((request) => {
      expect(request).toEqual(updatedRequest);
    });

    const req = httpMock.expectOne(`${BASE_URL}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedRequest);
    req.flush(updatedRequest);
  });

  it('should delete a leave request', () => {
    const idToDelete = 2;

    service.delete(idToDelete).subscribe((response) => {
      expect(response).toBeNull(); // For void return type
    });

    const req = httpMock.expectOne(`${BASE_URL}/${idToDelete}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Simulate a successful delete with no content
  });

  it('should update the status of a leave request', () => {
    const leaveRequestId = 1;
    const newStatus = 'Approved';
    const updatedRequest: LeaveRequest = {
      leaveRequestId: 1,
      startDate: '2025-07-01',
      endDate: '2025-07-05',
      reason: 'Vacation',
      status: newStatus, // Status changed
      employeeId: 101,
      leaveType: 'Annual Leave',
      requestDate: '2025-06-01',
    };

    service.updateStatus(leaveRequestId, newStatus).subscribe((request) => {
      expect(request).toEqual(updatedRequest);
    });

    const req = httpMock.expectOne(`${BASE_URL}/${leaveRequestId}/status`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ status: newStatus });
    req.flush(updatedRequest);
  });

  it('should get all pending leave requests', () => {
    const dummyPendingRequests: LeaveRequest[] = [
      {
        leaveRequestId: 1,
        startDate: '2025-07-01',
        endDate: '2025-07-05',
        reason: 'Vacation',
        status: 'Pending',
        employeeId: 101,
        leaveType: 'Annual Leave',
        requestDate: '2025-06-01',
      },
      {
        leaveRequestId: 4,
        startDate: '2025-09-10',
        endDate: '2025-09-12',
        reason: 'Medical appointment',
        status: 'Pending',
        employeeId: 105,
        leaveType: 'Sick Leave',
        requestDate: '2025-09-01',
      },
    ];

    service.getAllPendingReq().subscribe((requests) => {
      expect(requests.length).toBe(2);
      expect(requests).toEqual(dummyPendingRequests);
    });

    const req = httpMock.expectOne(`${BASE_URL}/pending`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPendingRequests);
  });
});