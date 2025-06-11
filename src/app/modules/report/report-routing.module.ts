import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report.component';
import { CommonModule } from '@angular/common';
import { routes as reportRoutes } from './report.routes';
import { ReportModule } from './report.module';

const routes: Routes = reportRoutes;

@NgModule({
  declarations: [
    ReportRoutingModule
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component:     ReportRoutingModule
        , 
        children: routes
      }
    ])
  ]
})
@NgModule({
  imports: [
    CommonModule,
    ReportRoutingModule,
  RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
// src/app/report-routing.module.ts
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { ReportComponent } from './report.component';

// // Import all your components that will be rendered inside the router-outlet
// import { LeaveChartPageComponent } from './components/leave-chart-page/leave-chart-page.component';
// import { TruTimeChartPageComponent } from './components/tru-time-chart-page/tru-time-chart-page.component';
// import { MonthWiseLeaveChartPageComponent } from './components/month-wise-leave-chart-page/month-wise-leave-chart-page.component';
// import { YearWiseLeaveChartPageComponent } from './components/year-wise-leave-chart-page/year-wise-leave-chart-page.component';
// import { LeaveReportPageComponent } from './components/leave-report-page/leave-report-page.component';
// import { MyLeaveRecordsPageComponent } from './components/my-leave-records/my-leave-records.component';


// const routes: Routes = [
//   {
//     path: '', // This path corresponds to 'localhost:4200/leave-charts' when loaded by a parent module
//     component: ReportComponent, // ReportComponent will display the sidebar and its own router-outlet
//     children: [
//       // Default child route: when at /leave-charts, redirect to /leave-charts/leave-chart
//       { path: '', redirectTo: 'leave-chart', pathMatch: 'full' },
//       { path: 'leave-chart', component: LeaveChartPageComponent },
//       { path: 'tru-time-chart', component: TruTimeChartPageComponent },
//       { path: 'month-wise-leave-chart', component: MonthWiseLeaveChartPageComponent },
//       { path: 'year-wise-leave-chart', component: YearWiseLeaveChartPageComponent },
//       { path: 'leave-report', component: LeaveReportPageComponent },
//       { path: 'my-leave-records/:empId', component: MyLeaveRecordsPageComponent },
//       // Wildcard route for any unhandled child paths within '/leave-charts'
//       { path: '**', redirectTo: 'leave-chart' }
//     ]
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class ReportRoutingModule { }