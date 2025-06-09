import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestDetailComponent } from './leave-request-detail.component';

describe('LeaveRequestDetailComponent', () => {
  let component: LeaveRequestDetailComponent;
  let fixture: ComponentFixture<LeaveRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveRequestDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
