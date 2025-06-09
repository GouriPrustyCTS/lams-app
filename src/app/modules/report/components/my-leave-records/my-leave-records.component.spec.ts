// src/app/components/my-leave-records/my-leave-records.component.spec.ts

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// --- CORRECTED COMPONENT IMPORT ---
import { MyLeaveRecordsPageComponent } from './my-leave-records.component'; // It's in the same directory!

// --- CORRECTED SERVICE IMPORT ---
// To reach 'src/app/services' from 'src/app/components/my-leave-records/', you need to go up two levels ('../../')
import { ReportService } from '../../services/report.service';

describe('MyLeaveRecordsPageComponent', () => {
  let component: MyLeaveRecordsPageComponent;
  let fixture: ComponentFixture<MyLeaveRecordsPageComponent>;
  let mockReportService: jasmine.SpyObj<ReportService>;
  let mockActivatedRoute: any;

  const mockLeaveRecords = [
    { employeeId: 101, name: 'Alice', reason: 'Vacation', startDate: '2025-06-01', endDate: '2025-06-05', leaveType: 'Casual', status: 'Approved' },
    { employeeId: 101, name: 'Alice', reason: 'Sick', startDate: '2025-05-10', endDate: '2025-05-10', leaveType: 'Sick', status: 'Pending' }
  ];

  beforeEach(async () => {
    mockReportService = jasmine.createSpyObj('ReportService', ['getEmployeeLeaveRecords', 'downloadEmployeeLeaveReportPdf']);
    mockActivatedRoute = {
      paramMap: of({
        get: (key: string) => {
          if (key === 'empId') {
            return '101';
          }
          return null;
        }
      })
    };

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        CommonModule,
        MyLeaveRecordsPageComponent // Import the standalone component directly
      ],
      providers: [
        { provide: ReportService, useValue: mockReportService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyLeaveRecordsPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load employee leave records on init', fakeAsync(() => {
    mockReportService.getEmployeeLeaveRecords.and.returnValue(of(mockLeaveRecords));
    fixture.detectChanges();
    tick();
    expect(mockReportService.getEmployeeLeaveRecords).toHaveBeenCalledWith(101);
    expect(component.leaveRecords).toEqual(mockLeaveRecords);
    expect(component.loading).toBeFalse();
    expect(component.errorMessage).toBeNull();
  }));

  it('should display an error message if fetching records fails', fakeAsync(() => {
    const errorResponse = new Error('Test error: Failed to fetch');
    mockReportService.getEmployeeLeaveRecords.and.returnValue(throwError(() => errorResponse));
    fixture.detectChanges();
    tick();
    expect(component.errorMessage).toContain('Failed to fetch');
    expect(component.leaveRecords).toEqual([]);
    expect(component.loading).toBeFalse();
  }));

  it('should download PDF report', fakeAsync(() => {
    const mockBlob = new Blob(['pdf-content'], { type: 'application/pdf' });
    mockReportService.downloadEmployeeLeaveReportPdf.and.returnValue(of(mockBlob));

    const createObjectURLSpy = spyOn(URL, 'createObjectURL').and.returnValue('blob:http://mock-url');
    const revokeObjectURLSpy = spyOn(URL, 'revokeObjectURL');
    const createElementSpy = spyOn(document, 'createElement').and.callThrough();
    const appendChildSpy = spyOn(document.body, 'appendChild').and.callThrough();
    const removeChildSpy = spyOn(document.body, 'removeChild').and.callThrough();

    component.empId = 101;
    fixture.detectChanges();

    component.downloadEmployeePdfReport();
    tick();

    expect(mockReportService.downloadEmployeeLeaveReportPdf).toHaveBeenCalledWith(101);
    expect(createObjectURLSpy).toHaveBeenCalledWith(mockBlob);
    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(appendChildSpy).toHaveBeenCalled();
    const anchor = createElementSpy.calls.mostRecent().returnValue as HTMLAnchorElement;
    expect(anchor.download).toBe('employee_leave_report_101.pdf');
    expect(anchor.href).toBe('blob:http://mock-url');
    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:http://mock-url');
    expect(removeChildSpy).toHaveBeenCalledWith(anchor);
  }));

  it('should set error message if empId is not found on init', () => {
    mockActivatedRoute.paramMap = of({ get: (key: string) => null });
    TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });
    fixture = TestBed.createComponent(MyLeaveRecordsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Employee ID not provided in the URL.');
    expect(mockReportService.getEmployeeLeaveRecords).not.toHaveBeenCalled();
  });
});