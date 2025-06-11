import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReportService } from './report.service';
import { HttpErrorResponse } from '@angular/common/http';

// Assuming LeaveRequestDTO is defined here or in a shared types file.
// For testing purposes, we can redefine it or ensure it's available.
interface LeaveRequestDTO {
  employeeId: number;
  name: string;
  reason: string;
  endDate: string;
  leaveType: string;
  startDate: string;
  status: string;
}

describe('ReportService', () => {
  let service: ReportService;
  let httpTestingController: HttpTestingController;
  const baseUrl = 'http://localhost:2694/reports';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule to mock HTTP requests
      providers: [ReportService] // Provide the service to be tested
    });

    service = TestBed.inject(ReportService); // Inject the service
    httpTestingController = TestBed.inject(HttpTestingController); // Inject HttpTestingController
  });

  afterEach(() => {
    // After each test, verify that there are no outstanding requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    // Basic test to ensure the service is instantiated
    expect(service).toBeTruthy();
  });

  // Test case for getLeavePieChart method
  it('should retrieve leave pie chart as a Blob', () => {
    const mockBlob = new Blob(['mock chart data'], { type: 'image/png' });

    service.getLeavePieChart().subscribe(blob => {
      // Assert that the received blob matches the mock blob
      expect(blob).toEqual(mockBlob);
    });

    // Expect a single GET request to the correct URL
    const req = httpTestingController.expectOne(`${baseUrl}/leave-chart-xchart`);
    // Assert the request method is GET and responseType is blob
    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual('blob');

    // Respond to the request with the mock data
    req.flush(mockBlob);
  });

  // Test case for getLeavePieChart error handling
  it('should handle error when retrieving leave pie chart', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 500 error',
      status: 500,
      statusText: 'Internal Server Error',
      url: `${baseUrl}/leave-chart-xchart`
    });

    service.getLeavePieChart().subscribe({
      next: () => fail('should have failed with the 500 error'),
      error: (error: Error) => {
        // Assert that the error message contains the expected server error details
        expect(error.message).toContain('Server Error Code: 500');
        expect(error.message).toContain('Message: Http failure response for http://localhost:2694/reports/leave-chart-xchart: 500 Internal Server Error');
      }
    });

    const req = httpTestingController.expectOne(`${baseUrl}/leave-chart-xchart`);
    expect(req.request.method).toEqual('GET');

    // Respond with an error
    req.error(new ProgressEvent('error'), errorResponse);
  });

  // Test case for getTruTimeBarChart method without empId
  it('should retrieve tru time bar chart without empId as a Blob', () => {
    const mockBlob = new Blob(['mock bar chart data'], { type: 'image/jpeg' });

    service.getTruTimeBarChart().subscribe(blob => {
      expect(blob).toEqual(mockBlob);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/tru-time-bar-chart`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual('blob');
    req.flush(mockBlob);
  });

  // Test case for getTruTimeBarChart method with empId
  it('should retrieve tru time bar chart with empId as a Blob', () => {
    const mockBlob = new Blob(['mock bar chart data with empId'], { type: 'image/jpeg' });
    const empId = 123;

    service.getTruTimeBarChart(empId).subscribe(blob => {
      expect(blob).toEqual(mockBlob);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/tru-time-bar-chart?empId=${empId}`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual('blob');
    req.flush(mockBlob);
  });

  // Test case for getTruTimeBarChart error handling
  it('should handle error when retrieving tru time bar chart', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'Network error',
      status: 0, // 0 for network errors
      statusText: 'Unknown Error',
      url: `${baseUrl}/tru-time-bar-chart`
    });

    service.getTruTimeBarChart().subscribe({
      next: () => fail('should have failed with a network error'),
      error: (error: Error) => {
        expect(error.message).toContain('Client Error: ');
      }
    });

    const req = httpTestingController.expectOne(`${baseUrl}/tru-time-bar-chart`);
    expect(req.request.method).toEqual('GET');
    // Simulate a network error (ErrorEvent)
    req.error(new ErrorEvent('error', { message: 'simulated network error' }), errorResponse);
  });

  // Test case for getMonthWiseLeaveChart method
  it('should retrieve month wise leave chart as a Blob', () => {
    const mockBlob = new Blob(['mock month chart data'], { type: 'image/svg+xml' });

    service.getMonthWiseLeaveChart().subscribe(blob => {
      expect(blob).toEqual(mockBlob);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/month-wise-leave-chart`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual('blob');
    req.flush(mockBlob);
  });



  // Test case for getYearWiseLeaveChart method
  it('should retrieve year wise leave chart as a Blob', () => {
    const mockBlob = new Blob(['mock year chart data'], { type: 'image/svg+xml' });

    service.getYearWiseLeaveChart().subscribe(blob => {
      expect(blob).toEqual(mockBlob);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/year-wise-leave-chart`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual('blob');
    req.flush(mockBlob);
  });


  // Test case for getLeaveReportData method
  it('should retrieve leave report data as LeaveRequestDTO[]', () => {
    const mockLeaveData: LeaveRequestDTO[] = [
      { employeeId: 1, name: 'John Doe', reason: 'Vacation', endDate: '2025-06-15', leaveType: 'Casual', startDate: '2025-06-10', status: 'Approved' },
      { employeeId: 2, name: 'Jane Smith', reason: 'Sick Leave', endDate: '2025-06-12', leaveType: 'Sick', startDate: '2025-06-11', status: 'Pending' }
    ];

    service.getLeaveReportData().subscribe(data => {
      expect(data).toEqual(mockLeaveData);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/leave-report-data`);
    expect(req.request.method).toEqual('GET');
    // Default responseType for get<T> is json, so no need to assert explicitly here.
    req.flush(mockLeaveData);
  });

  // Test case for getLeaveReportData error handling
  it('should handle error when retrieving leave report data', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'Forbidden',
      status: 403,
      statusText: 'Forbidden',
      url: `${baseUrl}/leave-report-data`
    });

    service.getLeaveReportData().subscribe({
      next: () => fail('should have failed with 403 error'),
      error: (error: Error) => {
        expect(error.message).toContain('Server Error Code: 403');
      }
    });

    const req = httpTestingController.expectOne(`${baseUrl}/leave-report-data`);
    expect(req.request.method).toEqual('GET');
    req.flush('Forbidden', errorResponse);
  });

  // Test case for downloadLeaveReportXcel method
  it('should download leave report excel as a Blob', () => {
    const mockBlob = new Blob(['excel data'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    service.downloadLeaveReportXcel().subscribe(blob => {
      expect(blob).toEqual(mockBlob);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/downloadLeaveReportXcel`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual('blob');
    req.flush(mockBlob);
  });



  // Test case for downloadLeaveReportPdf method
  it('should download leave report PDF as a Blob', () => {
    const mockBlob = new Blob(['pdf data'], { type: 'application/pdf' });

    service.downloadLeaveReportPdf().subscribe(blob => {
      expect(blob).toEqual(mockBlob);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/downloadLeaveReportPdf`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual('blob');
    req.flush(mockBlob);
  });



  // Test case for downloadEmployeeLeaveReportPdf method
  it('should download employee leave report PDF as a Blob', () => {
    const mockBlob = new Blob(['employee pdf data'], { type: 'application/pdf' });
    const empId = 456;

    service.downloadEmployeeLeaveReportPdf(empId).subscribe(blob => {
      expect(blob).toEqual(mockBlob);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/downloadEmployeeLeaveReportPdf/${empId}`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual('blob');
    req.flush(mockBlob);
  });



  // Test case for getEmployeeLeaveRecords method
  it('should retrieve employee leave records as LeaveRequestDTO[]', () => {
    const mockEmployeeLeaveRecords: LeaveRequestDTO[] = [
      { employeeId: 101, name: 'Alice', reason: 'Personal', endDate: '2025-07-01', leaveType: 'Sick', startDate: '2025-06-28', status: 'Approved' }
    ];
    const empId = 101;

    service.getEmployeeLeaveRecords(empId).subscribe(data => {
      expect(data).toEqual(mockEmployeeLeaveRecords);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/myLeaveRecordsJson/${empId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockEmployeeLeaveRecords);
  });

  // Test case for getEmployeeLeaveRecords error handling
  it('should handle error when retrieving employee leave records', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'Internal Server Error',
      status: 500,
      statusText: 'Internal Server Error',
      url: `${baseUrl}/myLeaveRecordsJson/999`
    });
    const empId = 999;

    service.getEmployeeLeaveRecords(empId).subscribe({
      next: () => fail('should have failed with 500 error'),
      error: (error: Error) => {
        expect(error.message).toContain('Server Error Code: 500');
      }
    });

    const req = httpTestingController.expectOne(`${baseUrl}/myLeaveRecordsJson/${empId}`);
    expect(req.request.method).toEqual('GET');
    req.flush('Internal Server Error', errorResponse);
  });
});