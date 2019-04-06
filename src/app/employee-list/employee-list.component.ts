import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from "../employee";
import { TableData } from "../table-data";
import { EmployeeService } from '../employee.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { Observable } from "rxjs";

export interface EmployeeId extends Employee { id: string; }

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})


export class EmployeeListComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: MatTableDataSource<any>;
  employees: TableData[];
  displayedColumns: string[] = ['fullname', 'address', 'contact', 'age', 'stay', 'id' ];
  emps: Observable<any[]>;

  constructor(
    private employeeService: EmployeeService, 
  ) {}
  
  ngOnInit() {
    this.getEmployees();
  } 

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      data => { 
        this.employees = data.map(d => {
          const employeeFullname = `${d.firstName} ${d.lastName}`;
          const todayYear: number = new Date().getFullYear();
          const todayMonth: number = new Date().getMonth() + 1;
          const dob: Date = new Date(d.dobirth);
          const dobYear: number = dob.getFullYear();
          const doh: Date = new Date(d.dohired);
          const dohYear: number = doh.getFullYear();
          const dohMonth: number = doh.getMonth() + 1;
          const stayYear = (todayYear - dohYear) ? `${(todayYear - dohYear)}y` : '';
          const stayMonth = ((dohMonth - todayMonth) < 0) ? `${12 - Math.abs(dohMonth - todayMonth)}m` : ((dohMonth - todayMonth) == 0) ? '' : `${dohMonth - todayMonth}m`;
          const employeeAge: number = todayYear - dobYear;
          const stayLong = `${stayYear} ${stayMonth}`;

          return {
            id: d.id, 
            fullname: employeeFullname, 
            address: d.primaddress, 
            contact: d.primcontact,
            age: employeeAge,
            stay: stayLong
          };
        });
        this.dataSource = new MatTableDataSource(this.employees);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  deleteEmployee(id: string): void {
    this.employeeService.getEmployeeById(id)
      .subscribe(employee => {
          if(!employee) {return;}
          const fullname = `${employee.firstName} ${employee.lastName}`;
          const toDelete = confirm('Are you sure you want to delete ' + fullname + ' details?' );
          if (toDelete) {
            this.employeeService.deleteEmployee(id);
          }
        }
      );
  }
}