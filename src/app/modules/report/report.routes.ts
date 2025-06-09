import { Routes } from '@angular/router';
import { LeaveChartPageComponent } from './components/leave-chart-page/leave-chart-page.component';
import { TruTimeChartPageComponent } from './components/tru-time-chart-page/tru-time-chart-page.component';
import { MonthWiseLeaveChartPageComponent } from './components/month-wise-leave-chart-page/month-wise-leave-chart-page.component';
import { YearWiseLeaveChartPageComponent } from './components/year-wise-leave-chart-page/year-wise-leave-chart-page.component';
import { LeaveReportPageComponent } from './components/leave-report-page/leave-report-page.component';
import { MyLeaveRecordsPageComponent } from './components/my-leave-records/my-leave-records.component';

export const routes: Routes = [
  { path: 'leave-chart', component: LeaveChartPageComponent },
  { path: 'tru-time-chart', component: TruTimeChartPageComponent },
  { path: 'month-wise-leave-chart', component: MonthWiseLeaveChartPageComponent },
  { path: 'year-wise-leave-chart', component: YearWiseLeaveChartPageComponent },
  { path: 'leave-report', component: LeaveReportPageComponent },
  { path: 'my-leave-records/:empId', component: MyLeaveRecordsPageComponent },
  { path: '', redirectTo: '/leave-chart', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/leave-chart' } // Wildcard route for 404
];