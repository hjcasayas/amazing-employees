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

  dataSource: MatTableDataSource<TableData>;
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
        this.dataSource = new MatTableDataSource(data);
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