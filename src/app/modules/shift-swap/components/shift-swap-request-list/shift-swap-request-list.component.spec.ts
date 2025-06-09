import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftSwapRequestListComponent } from './shift-swap-request-list.component';

describe('ShiftSwapRequestListComponent', () => {
  let component: ShiftSwapRequestListComponent;
  let fixture: ComponentFixture<ShiftSwapRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShiftSwapRequestListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftSwapRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
