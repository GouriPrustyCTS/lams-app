import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftListComponent } from './components/shift-list/shift-list.component';
import { ShiftFormComponent } from './components/shift-form/shift-form.component';
import { ShiftDetailComponent } from './components/shift-detail/shift-detail.component';
import { ShiftSwapRequestListComponent } from './components/shift-swap-request-list/shift-swap-request-list.component';
import { ShiftSwapRequestFormComponent } from './components/shift-swap-request-form/shift-swap-request-form.component';
import { ShiftSwapRequestDetailComponent } from './components/shift-swap-request-detail/shift-swap-request-detail.component';
import { ShiftSwapRequestApprovalComponent } from './components/shift-swap-request-approval/shift-swap-request-approval.component';
import { ShiftSwapComponent } from './shift-swap.component';

const routes: Routes = [
  { path: '', component: ShiftSwapComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftSwapRoutingModule { }
 