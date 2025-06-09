import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // <--- Ensure this import is present

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShiftListComponent } from './components/shift-list/shift-list.component';
import { ShiftFormComponent } from './components/shift-form/shift-form.component';
import { ShiftDetailComponent } from './components/shift-detail/shift-detail.component';
import { ShiftSwapRequestListComponent } from './components/shift-swap-request-list/shift-swap-request-list.component';
import { ShiftSwapRequestFormComponent } from './components/shift-swap-request-form/shift-swap-request-form.component';
import { ShiftSwapRequestDetailComponent } from './components/shift-swap-request-detail/shift-swap-request-detail.component';
import { ShiftSwapRequestApprovalComponent } from './components/shift-swap-request-approval/shift-swap-request-approval.component';

@NgModule({
  declarations: [
    AppComponent,
    ShiftListComponent,
    ShiftFormComponent,
    ShiftDetailComponent,
    ShiftSwapRequestListComponent,
    ShiftSwapRequestFormComponent,
    ShiftSwapRequestDetailComponent,
    ShiftSwapRequestApprovalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule // <--- CRITICAL: Ensure RouterModule is in the imports array
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
