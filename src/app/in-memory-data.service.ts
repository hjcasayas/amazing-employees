import { Injectable } from '@angular/core';
import { Employee } from "./employee";
import { InMemoryDbService } from "angular-in-memory-web-api";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const employees: Employee[] = [
      {id:1, fullname: 'John Doa', primaddress: '123 St. Address 1', contact: '123-4507', age: 31, years: 2, months: 5, edit: 'Modify', delete: 'Delete'},
      {id:2, fullname: 'John Doe', primaddress: '124 St. Address 1', contact: '123-4508', age: 30, years: 3, months: 8, edit: 'Modify', delete: 'Delete'},
      {id:3, fullname: 'John Doi', primaddress: '125 St. Address 1', contact: '123-4509', age: 24, years: 4, months: 0, edit: 'Modify', delete: 'Delete'},
      {id:4, fullname: 'John Doo', primaddress: '126 St. Address 1', contact: '123-4510', age: 26, years: 5, months: 1, edit: 'Modify', delete: 'Delete'},
      {id:5, fullname: 'John Dou', primaddress: '127 St. Address 1', contact: '123-4511', age: 35, years: 6, months: 0, edit: 'Modify', delete: 'Delete'},    
    ]
    return {employees};
  }

  genId(employees: Employee[]): number {
      return employees.length > 0 ? Math.max(...employees.map(employee=>employee.id)) + 1 : 11 ;
  }
}
