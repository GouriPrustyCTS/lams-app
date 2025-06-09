import { Routes } from '@angular/router';
import { LeaveRequestListComponent } from './components/leave-request-list/leave-request-list.component';
import { LeaveRequestFormComponent } from './components/leave-request-form/leave-request-form.component';
import { LeaveRequestDetailComponent } from './components/leave-request-detail/leave-request-detail.component';
import { LeaveRequestApprovalComponent } from './components/leave-request-approval/leave-request-approval.component';

export const routes: Routes = [
  { path: 'leaveRequests', component: LeaveRequestListComponent }, // List of all swap requests
  { path: 'leaveRequests/add', component: LeaveRequestFormComponent }, // Form for creating new swap requests
  { path: 'leaveRequests/:id', component: LeaveRequestDetailComponent }, // Details of a specific swap request
  { path: 'leaveRequests/edit/:id', component: LeaveRequestFormComponent }, // Details of a specific swap request

  // Route for Managing Approvals (which you have in shift-swap-request-approval)
  // Removed guards as per your file list constraint
  { path: 'manage-approvals', component: LeaveRequestApprovalComponent },

  // Default redirect: go to the shifts list when the app starts
  { path: '', redirectTo: '/leaveRequests', pathMatch: 'full' },
];
  