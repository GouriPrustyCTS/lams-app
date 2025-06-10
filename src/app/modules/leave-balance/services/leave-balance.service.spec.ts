import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LeaveBalanceService } from './leave-balance.service';
import { LeaveBalanceDTO } from '../models/leave-balance.dto';
import { HttpErrorResponse } from '@angular/common/http';

// Mock the environment for consistent API URL during tests
const mockEnvironment = {
  apiUrl: 'http://localhost:8080' // Use a different port or mock URL if needed
};

describe('LeaveBalanceService', () => {
  let service: LeaveBalanceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LeaveBalanceService,
        { provide: 'environment', useValue: mockEnvironment } // Provide the mocked environment
      ],
    });
    service = TestBed.inject(LeaveBalanceService);
    httpMock = TestBed.inject(HttpTestingController);

    // Manually set the apiUrl since environment is provided, not injected
    // This assumes your service relies on a simple assignment or a constant.
    // If 'environment' is injected, you'd mock it differently.
    (service as any).apiUrl = mockEnvironment.apiUrl + '/leaveBalances';
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that no requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all leave balances', () => {
    const dummyLeaveBalances: LeaveBalanceDTO[] = [
      { leaveBalanceId: 1, employeeId: 101, name: 'Alice', leaveType: 'Casual', balance: 10 },
      { leaveBalanceId: 2, employeeId: 102, name: 'Bob', leaveType: 'Sick', balance: 5 },
    ];

    service.getAllLeaveBalances().subscribe(balances => {
      expect(balances.length).toBe(2);
      expect(balances).toEqual(dummyLeaveBalances);
    });

    const req = httpMock.expectOne(`${mockEnvironment.apiUrl}/leaveBalances/`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyLeaveBalances);
  });

  it('should create a new leave balance', () => {
    const newLeaveBalance: LeaveBalanceDTO = { employeeId: 103, name: 'Charlie', leaveType: 'Annual', balance: 20 };
    const returnedLeaveBalance: LeaveBalanceDTO = { ...newLeaveBalance, leaveBalanceId: 3 };

    service.createLeaveBalance(newLeaveBalance).subscribe(balance => {
      expect(balance).toEqual(returnedLeaveBalance);
    });

    const req = httpMock.expectOne(`${mockEnvironment.apiUrl}/leaveBalances/add`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newLeaveBalance);
    req.flush(returnedLeaveBalance);
  });

  it('should get leave balances by employee ID', () => {
    const employeeId = 101;
    const dummyLeaveBalances: LeaveBalanceDTO[] = [
      { leaveBalanceId: 1, employeeId: 101, name: 'Alice', leaveType: 'Casual', balance: 10 },
      { leaveBalanceId: 4, employeeId: 101, name: 'Alice', leaveType: 'Annual', balance: 15 },
    ];

    service.getLeaveBalancesByEmployeeId(employeeId).subscribe(balances => {
      expect(balances.length).toBe(2);
      expect(balances).toEqual(dummyLeaveBalances);
    });

    const req = httpMock.expectOne(`${mockEnvironment.apiUrl}/leaveBalances/employee/${employeeId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyLeaveBalances);
  });

  it('should get leave balance by leave balance ID', () => {
    const leaveBalanceId = 1;
    const dummyLeaveBalance: LeaveBalanceDTO = { leaveBalanceId: 1, employeeId: 101, name: 'Alice', leaveType: 'Casual', balance: 10 };

    service.getLeaveBalanceByLeaveBalanceId(leaveBalanceId).subscribe(balance => {
      expect(balance).toEqual(dummyLeaveBalance);
    });

    const req = httpMock.expectOne(`${mockEnvironment.apiUrl}/leaveBalances/${leaveBalanceId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyLeaveBalance);
  });

  it('should update leave balance by leave ID', () => {
    const leaveBalanceId = 1;
    const updatedLeaveBalance: LeaveBalanceDTO = { leaveBalanceId: 1, employeeId: 101, name: 'Alice', leaveType: 'Casual', balance: 12 };

    service.updateLeaveBalanceByLeaveId(leaveBalanceId, updatedLeaveBalance).subscribe(balance => {
      expect(balance).toEqual(updatedLeaveBalance);
    });

    const req = httpMock.expectOne(`${mockEnvironment.apiUrl}/leaveBalances/${leaveBalanceId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedLeaveBalance);
    req.flush(updatedLeaveBalance);
  });

  it('should update leave balances by employee ID', () => {
    const employeeId = 101;
    const leaveBalanceUpdate: LeaveBalanceDTO = { employeeId: 101, leaveType: 'Sick', balance: 7 }; // Example update DTO
    const updatedLeaveBalances: LeaveBalanceDTO[] = [
      { leaveBalanceId: 1, employeeId: 101, name: 'Alice', leaveType: 'Casual', balance: 10 },
      { leaveBalanceId: 4, employeeId: 101, name: 'Alice', leaveType: 'Sick', balance: 7 }, // Assuming this one was updated
    ];

    service.updateLeaveBalancesByEmployeeId(employeeId, leaveBalanceUpdate).subscribe(balances => {
      expect(balances).toEqual(updatedLeaveBalances);
    });

    const req = httpMock.expectOne(`${mockEnvironment.apiUrl}/leaveBalances/employee/${employeeId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(leaveBalanceUpdate);
    req.flush(updatedLeaveBalances);
  });

  it('should delete a leave balance', () => {
    const leaveBalanceId = 1;

    service.deleteLeaveBalance(leaveBalanceId).subscribe(response => {
      expect(response).toBeNull(); // For void return type, response is typically undefined
    });

    const req = httpMock.expectOne(`${mockEnvironment.apiUrl}/leaveBalances/${leaveBalanceId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Simulate a successful delete with no content
  });

  // --- Error Handling Tests ---
  it('should handle client-side error for getAllLeaveBalances', () => {
    const mockError = new ErrorEvent('Network error', {
      message: 'Failed to connect to the server'
    });

    service.getAllLeaveBalances().subscribe({
      next: () => fail('should have failed with the network error'),
      error: (error: Error) => {
        expect(error.message).toContain('Error: Failed to connect to the server');
      }
    });

    const req = httpMock.expectOne(`${mockEnvironment.apiUrl}/leaveBalances/`);
    req.error(mockError);
  });

  it('should handle generic backend error if no specific message', () => {
    const employeeId = 101;
    const errorResponse = new HttpErrorResponse({
      error: 'Internal Server Error', // Simple string error
      status: 500,
      statusText: 'Internal Server Error'
    });

    service.getLeaveBalancesByEmployeeId(employeeId).subscribe({
      next: () => fail('should have failed with the 500 error'),
      error: (error: Error) => {
        expect(error.message).toContain('Error 500: Internal Server Error');
      }
    });

    const req = httpMock.expectOne(`${mockEnvironment.apiUrl}/leaveBalances/employee/${employeeId}`);
    req.flush('Error', errorResponse);
  });
});