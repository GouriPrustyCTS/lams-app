import { TestBed } from '@angular/core/testing';
import { AttendanceService, Attendance } from './attendance.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('AttendanceService', () => {
  let service: AttendanceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AttendanceService],
    });
    service = TestBed.inject(AttendanceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all attendances', () => {
    const dummyAttendances: Attendance[] = [
      {
        clockInTime: new Date(),
        clockOutTime: new Date(),
        attendanceDate: new Date(),
        employeeId: 1,
        workHours: 8,
      },
    ];

    service.getAllAttendances().subscribe((attendances) => {
      expect(attendances.length).toBe(1);
      expect(attendances).toEqual(dummyAttendances);
    });

    const req = httpMock.expectOne('http://localhost:2694/attendance/all');
    expect(req.request.method).toBe('GET');
    req.flush(dummyAttendances);
  });

  it('should add attendance', () => {
    const newAttendance: Attendance = {
      clockInTime: new Date(),
      clockOutTime: new Date(),
      attendanceDate: new Date(),
      employeeId: 2,
      workHours: 7,
    };

    service.addAttendance(newAttendance).subscribe((response) => {
      expect(response).toEqual(newAttendance);
    });

    const req = httpMock.expectOne('http://localhost:2694/attendance/add');
    expect(req.request.method).toBe('POST');
    req.flush(newAttendance);
  });

  it('should delete attendance by ID', () => {
    const id = 4;

    service.deleteAttendance(id).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`http://localhost:2694/attendance/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should get attendance by ID', () => {
    const dummyAttendance: Attendance = {
      clockInTime: new Date(),
      clockOutTime: new Date(),
      attendanceDate: new Date(),
      employeeId: 1,
      workHours: 8,
    };

    service.getAttendanceById(1).subscribe((data) => {
      expect(data).toEqual(dummyAttendance);
    });

    const req = httpMock.expectOne('http://localhost:2694/attendance/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyAttendance);
  });

  it('should clock in an employee', () => {
    const employeeId = 1;
    const mockResponse = 'Clock-in successful';

    service.clockIn(employeeId).subscribe((response) => {
      expect(response).toBe(mockResponse);
    });

    const req = httpMock.expectOne(
      `http://localhost:2694/attendance/clock-in/${employeeId}`
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should clock out an employee', () => {
    const employeeId = 1;
    const mockResponse = 'Clock-out successful';

    service.clockOut(employeeId).subscribe((response) => {
      expect(response).toBe(mockResponse);
    });

    const req = httpMock.expectOne(
      `http://localhost:2694/attendance/clock-out/${employeeId}`
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should get attendance by employee ID', () => {
    const employeeId = 2;
    const dummyAttendance: Attendance[] = [
      {
        clockInTime: new Date(),
        clockOutTime: new Date(),
        attendanceDate: new Date(),
        employeeId,
        workHours: 6,
      },
    ];

    service.getAttendanceByEmployee(employeeId).subscribe((data) => {
      expect(data).toEqual(dummyAttendance);
    });

    const req = httpMock.expectOne(
      `http://localhost:2694/attendance/employee/${employeeId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyAttendance);
  });

  it('should get logged-in employee attendance', () => {
    const dummyAttendance: Attendance[] = [
      {
        clockInTime: new Date(),
        clockOutTime: new Date(),
        attendanceDate: new Date(),
        employeeId: 3,
        workHours: 9,
      },
    ];

    service.getMyAttendance().subscribe((data) => {
      expect(data).toEqual(dummyAttendance);
    });

    const req = httpMock.expectOne(
      'http://localhost:2694/attendance/emp/my-attendance'
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyAttendance);
  });

  it('should calculate work hours', () => {
    const attendanceId = 1;
    const mockHours = 8;

    service.calculateWorkHours(attendanceId).subscribe((hours) => {
      expect(hours).toBe(mockHours);
    });

    const req = httpMock.expectOne(
      `http://localhost:2694/attendance/hours/${attendanceId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockHours);
  });
});
