import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // <--- Ensure this import is present

import { ShiftSwapRoutingModule } from './shift-swap-routing.module';
import { ShiftSwapComponent } from './shift-swap.component';
import { ShiftListComponent } from './components/shift-list/shift-list.component';
import { ShiftFormComponent } from './components/shift-form/shift-form.component';
import { ShiftDetailComponent } from './components/shift-detail/shift-detail.component';
import { ShiftSwapRequestListComponent } from './components/shift-swap-request-list/shift-swap-request-list.component';
import { ShiftSwapRequestFormComponent } from './components/shift-swap-request-form/shift-swap-request-form.component';
import { ShiftSwapRequestDetailComponent } from './components/shift-swap-request-detail/shift-swap-request-detail.component';
import { ShiftSwapRequestApprovalComponent } from './components/shift-swap-request-approval/shift-swap-request-approval.component';
import { CommonModule } from '@angular/common';
import { routes } from './shift-swap.routes';

@NgModule({
  declarations: [ShiftSwapComponent],
  imports: [
    CommonModule,
    ShiftSwapRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: ShiftSwapComponent,
        children: routes,
      },
    ]),
  ],
})
export class ShiftSwapModule { }
