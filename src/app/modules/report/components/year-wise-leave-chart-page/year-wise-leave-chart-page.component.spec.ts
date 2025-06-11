import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearWiseLeaveChartPageComponent } from './year-wise-leave-chart-page.component';

describe('YearWiseLeaveChartPageComponent', () => {
  let component: YearWiseLeaveChartPageComponent;
  let fixture: ComponentFixture<YearWiseLeaveChartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearWiseLeaveChartPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearWiseLeaveChartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
