import { Injectable } from '@angular/core';
import { Employee } from "./employee";
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from "@angular/fire/firestore";

import { MessageService } from './message.service';
import { catchError, map, tap } from "rxjs/operators";
import { TableData } from './table-data';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  private employeesCollection: AngularFirestoreCollection<Employee>;
  private employee: AngularFirestoreDocument;
  
  constructor(
    private messageService: MessageService,
    private db: AngularFirestore
    ) {
      this.employeesCollection = db.collection('employees');
    }

  getEmployees(): Observable<TableData[]> {
    return this.employeesCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        const employeeFullname = `${data.firstName} ${data.lastName}`;
        const todayYear: number = new Date().getFullYear();
        const todayMonth: number = new Date().getMonth() + 1;
        const dob: Date = new Date(data.dobirth);
        const dobYear: number = dob.getFullYear();
        const doh: Date = new Date(data.dohired);
        const dohYear: number = doh.getFullYear();
        const dohMonth: number = doh.getMonth() + 1;
        const stayYear = (todayYear - dohYear) ? `${(todayYear - dohYear)}y` : '';
        const stayMonth = ((dohMonth - todayMonth) < 0) ? `${12 - Math.abs(dohMonth - todayMonth)}m` : ((dohMonth - todayMonth) == 0) ? '' : `${dohMonth - todayMonth}m`;
        const employeeAge: number = todayYear - dobYear;
        const stayLong = `${stayYear} ${stayMonth}`;

        return {
          id: id, 
          fullname: employeeFullname, 
          address: data.primaddress, 
          contact: data.primcontact,
          age: employeeAge,
          stay: stayLong
        };
        

      })),
      tap(_=>this.log(`getEmployees(): Generated list of employees.`)),
      catchError(this.handleError<TableData[]>('getEmployees', []))
    );
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.db.doc<Employee>(`employees/${id}`).valueChanges().pipe(
      tap(_=>this.log(`getEmployeeById: Generated employee.`)),
      catchError(this.handleError<Employee>('getEmployeeById')),
    );
  }

  addEmployee(employee: Employee): void {
    this.employeesCollection.add(employee);
    this.log(`addEmployee(): added an employee.`);
  }

  updateEmployee(id: string, employee: Employee): void {
    this.employeesCollection.doc(id).set(employee);
    this.log(`updateEmployee(): updated an employee.`);
  }
  
  deleteEmployee(id: string) {
    this.employeesCollection.doc(id).delete()
      .then(function() {
        console.log('Successfully deleted');
      })
      .catch(function(error){
        console.error("deleteEmployee: Error deleting: ", error);
      })
  }

  private handleError<T>(operation = 'operation', result?: T)  {
    return(error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  private log(message: string) {
    this.messageService.logMessage(`EmployeeService: ${message}`);
  }

}
