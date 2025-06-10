import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReportService } from './report.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define LeaveRequestDTO in the test file if it's not globally accessible
// or ensure the import path is correct from your actual project structure.
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
  let httpMock: HttpTestingController;
  const BASE_URL = 'http://localhost:2694/reports';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReportService],
    });
    service = TestBed.inject(ReportService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that no requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test for getLeavePieChart
  it('should get leave pie chart as a Blob', (done) => {
    const dummyBlob = new Blob(['dummy chart data'], { type: 'image/png' });

    service.getLeavePieChart().subscribe((blob) => {
      expect(blob).toEqual(dummyBlob);
      expect(blob.type).toBe('image/png');
      done(); // Call done() for async operations
    });

    const req = httpMock.expectOne(`${BASE_URL}/leave-chart-xchart`);
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('blob');
    req.flush(dummyBlob);
  });

  // Test for getTruTimeBarChart (without empId)
  it('should get tru time bar chart as a Blob without employee ID', (done) => {
    const dummyBlob = new Blob(['dummy bar chart data'], { type: 'image/jpeg' });

    service.getTruTimeBarChart().subscribe((blob) => {
      expect(blob).toEqual(dummyBlob);
      done();
    });

    const req = httpMock.expectOne(`${BASE_URL}/tru-time-bar-chart`);
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('blob');
    req.flush(dummyBlob);
  });

  // Test for getTruTimeBarChart (with empId)
  it('should get tru time bar chart as a Blob with employee ID', (done) => {
    const dummyBlob = new Blob(['dummy bar chart data for emp'], { type: 'image/jpeg' });
    const empId = 123;

    service.getTruTimeBarChart(empId).subscribe((blob) => {
      expect(blob).toEqual(dummyBlob);
      done();
    });

    const req = httpMock.expectOne(`${BASE_URL}/tru-time-bar-chart?empId=${empId}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('blob');
    req.flush(dummyBlob);
  });

  // Test for getMonthWiseLeaveChart
  it('should get month wise leave chart as a Blob', (done) => {
    const dummyBlob = new Blob(['month chart'], { type: 'image/svg+xml' });

    service.getMonthWiseLeaveChart().subscribe((blob) => {
      expect(blob).toEqual(dummyBlob);
      done();
    });

    const req = httpMock.expectOne(`${BASE_URL}/month-wise-leave-chart`);
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('blob');
    req.flush(dummyBlob);
  });

  // Test for getYearWiseLeaveChart
  it('should get year wise leave chart as a Blob', (done) => {
    const dummyBlob = new Blob(['year chart'], { type: 'image/svg+xml' });

    service.getYearWiseLeaveChart().subscribe((blob) => {
      expect(blob).toEqual(dummyBlob);
      done();
    });

    const req = httpMock.expectOne(`${BASE_URL}/year-wise-leave-chart`);
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('blob');
    req.flush(dummyBlob);
  });

  // Test for getLeaveReportData
  it('should get leave report data as LeaveRequestDTO array', (done) => {
    const dummyReportData: LeaveRequestDTO[] = [
      { employeeId: 1, name: 'Emp One', reason: 'Vacation', endDate: '2025-07-05', leaveType: 'Annual', startDate: '2025-07-01', status: 'Approved' },
      { employeeId: 2, name: 'Emp Two', reason: 'Sick', endDate: '2025-07-10', leaveType: 'Sick', startDate: '2025-07-09', status: 'Pending' },
    ];

    service.getLeaveReportData().subscribe((data) => {
      expect(data).toEqual(dummyReportData);
      done();
    });

    const req = httpMock.expectOne(`${BASE_URL}/leave-report-data`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyReportData);
  });

  // Test for downloadLeaveReportXcel
  it('should download leave report Excel as a Blob', (done) => {
    const dummyExcelBlob = new Blob(['excel content'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    service.downloadLeaveReportXcel().subscribe((blob) => {
      expect(blob).toEqual(dummyExcelBlob);
      done();
    });

    const req = httpMock.expectOne(`${BASE_URL}/downloadLeaveReportXcel`);
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('blob');
    req.flush(dummyExcelBlob);
  });

  // Test for downloadLeaveReportPdf
  it('should download leave report PDF as a Blob', (done) => {
    const dummyPdfBlob = new Blob(['pdf content'], { type: 'application/pdf' });

    service.downloadLeaveReportPdf().subscribe((blob) => {
      expect(blob).toEqual(dummyPdfBlob);
      done();
    });

    const req = httpMock.expectOne(`${BASE_URL}/downloadLeaveReportPdf`);
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('blob');
    req.flush(dummyPdfBlob);
  });

  // Test for downloadEmployeeLeaveReportPdf
  it('should download employee leave report PDF as a Blob for a given employee ID', (done) => {
    const empId = 123;
    const dummyPdfBlob = new Blob(['employee pdf content'], { type: 'application/pdf' });

    service.downloadEmployeeLeaveReportPdf(empId).subscribe((blob) => {
      expect(blob).toEqual(dummyPdfBlob);
      done();
    });

    const req = httpMock.expectOne(`${BASE_URL}/downloadEmployeeLeaveReportPdf/${empId}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('blob');
    req.flush(dummyPdfBlob);
  });

  // Test for getEmployeeLeaveRecords
  it('should get employee leave records as LeaveRequestDTO array', (done) => {
    const empId = 123;
    const dummyLeaveRecords: LeaveRequestDTO[] = [
      { employeeId: 123, name: 'Emp A', reason: 'Vacation', endDate: '2025-08-05', leaveType: 'Annual', startDate: '2025-08-01', status: 'Approved' },
    ];

    service.getEmployeeLeaveRecords(empId).subscribe((data) => {
      expect(data).toEqual(dummyLeaveRecords);
      done();
    });

    const req = httpMock.expectOne(`${BASE_URL}/myLeaveRecordsJson/${empId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyLeaveRecords);
  });

  // --- Error Handling Tests ---

  it('should handle client-side error for getLeavePieChart', (done) => {
    const mockError = new ErrorEvent('Network error', {
      message: 'Failed to connect to the server'
    });

    service.getLeavePieChart().subscribe({
      next: () => fail('should have failed with the network error'),
      error: (error: Error) => {
        expect(error.message).toContain('Client Error: Failed to connect to the server');
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE_URL}/leave-chart-xchart`);
    req.error(mockError);
  });

});