import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftSwapRequestApprovalComponent } from './shift-swap-request-approval.component';

describe('ShiftSwapRequestApprovalComponent', () => {
  let component: ShiftSwapRequestApprovalComponent;
  let fixture: ComponentFixture<ShiftSwapRequestApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShiftSwapRequestApprovalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftSwapRequestApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
