import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestLayoutComponent } from './leave-request-layout.component';

describe('LeaveRequestLayoutComponent', () => {
  let component: LeaveRequestLayoutComponent;
  let fixture: ComponentFixture<LeaveRequestLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveRequestLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveRequestLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
