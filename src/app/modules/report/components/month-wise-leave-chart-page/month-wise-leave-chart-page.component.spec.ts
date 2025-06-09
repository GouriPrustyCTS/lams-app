import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthWiseLeaveChartPageComponent } from './month-wise-leave-chart-page.component';

describe('MonthWiseLeaveChartPageComponent', () => {
  let component: MonthWiseLeaveChartPageComponent;
  let fixture: ComponentFixture<MonthWiseLeaveChartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthWiseLeaveChartPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthWiseLeaveChartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
