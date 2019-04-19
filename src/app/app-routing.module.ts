import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'employee-list', component:EmployeeListComponent},
  {path:'add-employee', component:AddEmployeeComponent},
  {path:'add-employee/:id', component:AddEmployeeComponent},
  {path:'', redirectTo:'employee-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
