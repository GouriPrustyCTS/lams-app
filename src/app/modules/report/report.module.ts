// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

// --- CORRECTED COMPONENT IMPORTS BASED ON YOUR PATHS ---
import { LeaveChartPageComponent } from './components/leave-chart-page/leave-chart-page.component';
import { LeaveReportPageComponent } from './components/leave-report-page/leave-report-page.component';
import { MonthWiseLeaveChartPageComponent } from './components/month-wise-leave-chart-page/month-wise-leave-chart-page.component';
import { YearWiseLeaveChartPageComponent } from './components/year-wise-leave-chart-page/year-wise-leave-chart-page.component';
import { TruTimeChartPageComponent } from './components/tru-time-chart-page/tru-time-chart-page.component';
import { MyLeaveRecordsPageComponent } from './components/my-leave-records/my-leave-records.component'; // Also added this one

// Main App Component
import { AppComponent } from './app.component';

// Define your routes
const appRoutes: Routes = [
  { path: 'leave-chart', component: LeaveChartPageComponent },
  { path: 'leave-report', component: LeaveReportPageComponent },
  { path: 'month-wise-leave-chart', component: MonthWiseLeaveChartPageComponent },
  { path: 'year-wise-leave-chart', component: YearWiseLeaveChartPageComponent },
  { path: 'tru-time-chart', component: TruTimeChartPageComponent },
  { path: 'my-leave-records/:empId', component: MyLeaveRecordsPageComponent }, // Added route for specific employee records
  { path: '', redirectTo: '/leave-chart', pathMatch: 'full' },
  { path: '**', redirectTo: '/leave-chart' }
];

@NgModule({
  declarations: [
    AppComponent,
    // --- DECLARE ALL YOUR COMPONENTS HERE ---
    LeaveChartPageComponent,
    LeaveReportPageComponent,
    MonthWiseLeaveChartPageComponent,
    YearWiseLeaveChartPageComponent,
    TruTimeChartPageComponent,
    MyLeaveRecordsPageComponent // Declare the MyLeaveRecordsPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }