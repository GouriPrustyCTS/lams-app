import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftSwapRequestFormComponent } from './shift-swap-request-form.component';

describe('ShiftSwapRequestFormComponent', () => {
  let component: ShiftSwapRequestFormComponent;
  let fixture: ComponentFixture<ShiftSwapRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShiftSwapRequestFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftSwapRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
