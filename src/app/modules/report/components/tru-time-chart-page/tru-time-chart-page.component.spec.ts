import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruTimeChartPageComponent } from './tru-time-chart-page.component';

describe('TruTimeChartPageComponent', () => {
  let component: TruTimeChartPageComponent;
  let fixture: ComponentFixture<TruTimeChartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruTimeChartPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruTimeChartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
