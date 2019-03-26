import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from "../employee";
import { EmployeeService } from '../employee.service';
import { MatTableModule, MatTable } from "@angular/material/table";
import { MatButtonModule } from "@angular/material";
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})


export class EmployeeListComponent implements OnInit {
  
  constructor(private employeeService: EmployeeService) { }
  
  employees;
  displayedColumns: string[] = ['fullname', 'primaddress', 'contact', 'age', 'years', 'months', 'id' ];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void{
    this.employeeService.getEmployees()
      .subscribe(
        employees => {
          this.employees = new MatTableDataSource(employees);
          this.employees.paginator = this.paginator;
        }
      );
  }
    

}