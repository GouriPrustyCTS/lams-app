import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveBalanceRoutingModule } from './leave-balance-routing.module';
import { LeaveBalanceComponent } from './leave-balance.component';


@NgModule({
  declarations: [
    LeaveBalanceComponent
  ],
  imports: [
    CommonModule,
    LeaveBalanceRoutingModule
  ]
})
export class LeaveBalanceModule { }
