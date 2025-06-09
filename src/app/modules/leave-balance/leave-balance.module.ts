import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveBalanceRoutingModule } from './leave-balance-routing.module';
import { LeaveBalanceComponent } from './leave-balance.component';
import { RouterModule } from '@angular/router';
import { routes } from './leave-balance.routes';


@NgModule({
  declarations: [
    LeaveBalanceComponent
  ],
  imports: [
    CommonModule,
    LeaveBalanceRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: LeaveBalanceComponent, 
        children: routes
      }
    ])
  ]
})
export class LeaveBalanceModule { }
  