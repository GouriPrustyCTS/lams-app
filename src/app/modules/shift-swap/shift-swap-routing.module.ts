import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftListComponent } from './components/shift-list/shift-list.component';
import { ShiftFormComponent } from './components/shift-form/shift-form.component';
import { ShiftDetailComponent } from './components/shift-detail/shift-detail.component';
import { ShiftSwapRequestListComponent } from './components/shift-swap-request-list/shift-swap-request-list.component';
import { ShiftSwapRequestFormComponent } from './components/shift-swap-request-form/shift-swap-request-form.component';
import { ShiftSwapRequestDetailComponent } from './components/shift-swap-request-detail/shift-swap-request-detail.component';
import { ShiftSwapRequestApprovalComponent } from './components/shift-swap-request-approval/shift-swap-request-approval.component';

const routes: Routes = [
  { path: 'shifts', component: ShiftListComponent },
  { path: 'shifts/add', component: ShiftFormComponent },
  { path: 'shifts/edit/:id', component: ShiftFormComponent },
  { path: 'shifts/:id', component: ShiftDetailComponent },
  { path: 'swap-requests', component: ShiftSwapRequestListComponent },
  { path: 'swap-requests/add', component: ShiftSwapRequestFormComponent },
  { path: 'swap-requests/:id', component: ShiftSwapRequestDetailComponent },
  { path: 'swap-requests/pending', component: ShiftSwapRequestListComponent }, // Re-use list for pending, or create a specific one if UI differs
  { path: 'swap-requests/approve', component: ShiftSwapRequestApprovalComponent },
  { path: '', redirectTo: '/shifts', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftSwapRoutingModule { }
 