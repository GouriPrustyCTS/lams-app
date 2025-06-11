import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveReportPageComponent } from './leave-report-page.component';

describe('LeaveReportPageComponent', () => {
  let component: LeaveReportPageComponent;
  let fixture: ComponentFixture<LeaveReportPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveReportPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
