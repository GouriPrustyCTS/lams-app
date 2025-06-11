import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
//import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
//import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';

export const routes: Routes = [
  { path: 'employees', component: EmployeeListComponent }, // List of all employees
  { path: 'addEmployee', component: AddEmployeeComponent }, // Form for adding a new employee
  //{ path: 'employees/:id', component: EmployeeDetailComponent }, // Details of a specific employee
  { path: 'employees/edit/:id', component: EditEmployeeComponent }, // Form for editing an employee
  { path: 'employees/delete/:id', component: EmployeeListComponent }, // Redirect after deleting an employee

  // Default redirect: go to the employee list when the app starts
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
