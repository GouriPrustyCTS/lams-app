import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftSwapRequestDetailComponent } from './shift-swap-request-detail.component';

describe('ShiftSwapRequestDetailComponent', () => {
  let component: ShiftSwapRequestDetailComponent;
  let fixture: ComponentFixture<ShiftSwapRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShiftSwapRequestDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftSwapRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
