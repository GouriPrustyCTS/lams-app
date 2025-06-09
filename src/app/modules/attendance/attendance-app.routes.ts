import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
export const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'add-employee', component: EmployeeFormComponent },
];
 