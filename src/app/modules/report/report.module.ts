// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  Routes,
} from '@angular/router';
import { FormsModule } from '@angular/forms';

// --- CORRECTED COMPONENT IMPORTS BASED ON YOUR PATHS ---
import { LeaveChartPageComponent } from './components/leave-chart-page/leave-chart-page.component';
import { LeaveReportPageComponent } from './components/leave-report-page/leave-report-page.component';
import { MonthWiseLeaveChartPageComponent } from './components/month-wise-leave-chart-page/month-wise-leave-chart-page.component';
import { YearWiseLeaveChartPageComponent } from './components/year-wise-leave-chart-page/year-wise-leave-chart-page.component';
import { TruTimeChartPageComponent } from './components/tru-time-chart-page/tru-time-chart-page.component';
import { MyLeaveRecordsPageComponent } from './components/my-leave-records/my-leave-records.component'; // Also added this one

// Main App Component
import { ReportComponent } from './report.component';
import { CommonModule } from '@angular/common';

// Define your routes
const appRoutes: Routes = [
  { path: 'leave-charts', component: ReportComponent },
  { path: 'leave-chart', component: LeaveChartPageComponent },
  { path: 'leave-report', component: LeaveReportPageComponent },
  {
    path: 'month-wise-leave-chart',
    component: MonthWiseLeaveChartPageComponent,
  },
  { path: 'year-wise-leave-chart', component: YearWiseLeaveChartPageComponent },
  { path: 'tru-time-chart', component: TruTimeChartPageComponent },
  { path: 'my-leave-records/:empId', component: MyLeaveRecordsPageComponent }, // Added route for specific employee records
  // { path: '', redirectTo: '/leave-chart', pathMatch: 'full' },
  // { path: '**', redirectTo: '/leave-chart' },
];

@NgModule({
  declarations: [
    ReportComponent,
    // --- DECLARE ALL YOUR COMPONENTS HERE ---
    // Declare the MyLeaveRecordsPageComponent
  ],
  imports: [
    // BrowserModule,
    HttpClientModule,
    FormsModule,
    LeaveChartPageComponent,
    RouterOutlet,
    RouterLink, 
    RouterLinkActive,
    CommonModule,
    LeaveReportPageComponent,
    MonthWiseLeaveChartPageComponent,
    YearWiseLeaveChartPageComponent,
    TruTimeChartPageComponent,
    MyLeaveRecordsPageComponent,
    RouterModule.forChild([
      {
        path:'',
        component: ReportComponent,
        children: appRoutes // Use the defined routes here
      }
  ]),
  ],
  providers: []
})
export class ReportModule {}

// // imports: [],
// src/app/report.module.ts
// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common'; // Important for ngIf, ngFor etc.
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// // Ensure RouterLink, RouterLinkActive, RouterOutlet are imported if used directly in ReportComponent's template
// import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

// import { ReportComponent } from './report.component';
// import { ReportRoutingModule } from './report-routing.module'; // Import your routing module here

// // Import all your standalone components here if they are not part of other modules
// // or declared in this module.
// // Assuming these are standalone components, they are correctly imported here.
// import { LeaveChartPageComponent } from './components/leave-chart-page/leave-chart-page.component';
// import { LeaveReportPageComponent } from './components/leave-report-page/leave-report-page.component';
// import { MonthWiseLeaveChartPageComponent } from './components/month-wise-leave-chart-page/month-wise-leave-chart-page.component';
// import { YearWiseLeaveChartPageComponent } from './components/year-wise-leave-chart-page/year-wise-leave-chart-page.component';
// import { TruTimeChartPageComponent } from './components/tru-time-chart-page/tru-time-chart-page.component';
// import { MyLeaveRecordsPageComponent } from './components/my-leave-records/my-leave-records.component';


// @NgModule({
//   declarations: [
//     ReportComponent,
//     // If your page components (LeaveChartPageComponent, etc.) are NOT standalone,
//     // they MUST be declared here or in a module imported by ReportModule.
//     // Given your original 'imports' array, they are likely standalone, so no changes needed here for them.
//   ],
//   imports: [
//     CommonModule, // Provides common Angular directives
//     HttpClientModule,
//     FormsModule,

//     // Include Router modules for directives used in ReportComponent's HTML
//     RouterOutlet,
//     RouterLink,
//     RouterLinkActive,

//     ReportRoutingModule, // Your feature routing module

//     // Import your standalone components here. Since they are routed *into* ReportComponent,
//     // they don't strictly *need* to be imported here if they are only rendered via router-outlet
//     // and are standalone, but it doesn't hurt and clarifies dependencies for standalone components.
//     LeaveChartPageComponent,
//     LeaveReportPageComponent,
//     MonthWiseLeaveChartPageComponent,
//     YearWiseLeaveChartPageComponent,
//     TruTimeChartPageComponent,
//     MyLeaveRecordsPageComponent,
//   ],
//   providers: [],
//   // This 'bootstrap' is typical for the root application module.
//   // If ReportModule is a lazy-loaded feature module, it typically won't have a bootstrap array.
//   bootstrap: [ReportComponent], // Keep this if ReportComponent is the root of your application
// })
// export class ReportModule {}