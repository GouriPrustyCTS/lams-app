import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRequestRoutingModule } from './leave-request-routing.module';
import { LeaveRequestComponent } from './leave-request.component';
import { RouterModule } from '@angular/router';
import { routes } from './leave-request.routes';

@NgModule({
  declarations: [LeaveRequestComponent],
  imports: [
    CommonModule,
    LeaveRequestRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: LeaveRequestComponent,
        children: routes,
      },
    ]),
  ],
})
export class LeaveRequestModule {}
