import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ShiftService } from './shift.service';
import { Shift } from '../models/shift'; // Ensure this path is correct

describe('ShiftService', () => {
  let service: ShiftService;
  let httpMock: HttpTestingController;
  const BASE_URL = 'http://localhost:2694/shift';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShiftService],
    });
    service = TestBed.inject(ShiftService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new shift', () => {
    const newShift: Shift = {
      shiftName: 'Morning Shift',
      shiftDate: '2025-06-11',
      employeeId: 101,
      shiftStartTime: '08:00',
      shiftEndTime: '16:00',
    };
    const returnedShift: Shift = { ...newShift, shiftId: 1 }; // Simulate backend assigning an ID

    service.createShift(newShift).subscribe((shift) => {
      expect(shift).toEqual(returnedShift);
    });

    const req = httpMock.expectOne(`${BASE_URL}/add`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newShift);
    req.flush(returnedShift);
  });

  it('should get all shifts', () => {
    const dummyShifts: Shift[] = [
      {
        shiftId: 1,
        shiftName: 'Morning Shift',
        shiftDate: '2025-06-11',
        employeeId: 101,
        shiftStartTime: '08:00',
        shiftEndTime: '16:00',
      },
      {
        shiftId: 2,
        shiftName: 'Evening Shift',
        shiftDate: '2025-06-11',
        employeeId: 102,
        shiftStartTime: '16:00',
        shiftEndTime: '00:00',
      },
    ];

    service.getAllShifts().subscribe((shifts) => {
      expect(shifts.length).toBe(2);
      expect(shifts).toEqual(dummyShifts);
    });

    const req = httpMock.expectOne(`${BASE_URL}/`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyShifts);
  });

  it('should get shift by ID', () => {
    const shiftId = 1;
    const dummyShift: Shift = {
      shiftId: 1,
      shiftName: 'Morning Shift',
      shiftDate: '2025-06-11',
      employeeId: 101,
      shiftStartTime: '08:00',
      shiftEndTime: '16:00',
    };

    service.getShiftById(shiftId).subscribe((shift) => {
      expect(shift).toEqual(dummyShift);
    });

    const req = httpMock.expectOne(`${BASE_URL}/${shiftId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyShift);
  });

  it('should update an existing shift', () => {
    const shiftId = 1;
    const updatedShift: Shift = {
      shiftId: 1,
      shiftName: 'Updated Morning Shift', // Name changed
      shiftDate: '2025-06-11',
      employeeId: 101,
      shiftStartTime: '08:00',
      shiftEndTime: '17:00', // End time changed
    };

    service.updateShift(shiftId, updatedShift).subscribe((shift) => {
      expect(shift).toEqual(updatedShift);
    });

    const req = httpMock.expectOne(`${BASE_URL}/${shiftId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedShift);
    req.flush(updatedShift);
  });

  it('should delete a shift', () => {
    const shiftId = 2;

    service.deleteShift(shiftId).subscribe((response) => {
      expect(response).toBeNull(); // For void return type
    });

    const req = httpMock.expectOne(`${BASE_URL}/${shiftId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Simulate a successful delete with no content
  });
});