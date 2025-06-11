import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Keep this import for RouterModule

import { LeaveRequestRoutingModule } from './leave-request-routing.module';
import { LeaveRequestComponent } from './leave-request.component';
import { routes } from './leave-request.routes';
import { LeaveRequestLayoutComponent } from './layout/leave-request-layout/leave-request-layout.component'; // Keep this import

@NgModule({
  declarations: [
    LeaveRequestComponent // ONLY declare components that are NOT standalone here
  ],
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
    LeaveRequestLayoutComponent // <-- IMPORT the standalone component here
  ],
})
export class LeaveRequestModule {}