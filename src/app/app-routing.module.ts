import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

const routes: Routes = [
  {path:'', redirectTo:'employee-list', pathMatch: 'full' },
  {path:'employee-list', component:EmployeeListComponent},
  {path:'add-employee', component:AddEmployeeComponent},
  {path:'add-employee/:id', component:AddEmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
