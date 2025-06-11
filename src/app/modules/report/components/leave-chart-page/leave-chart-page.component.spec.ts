import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveChartPageComponent } from './leave-chart-page.component';

describe('LeaveChartPageComponent', () => {
  let component: LeaveChartPageComponent;
  let fixture: ComponentFixture<LeaveChartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveChartPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveChartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
