import { Injectable } from '@angular/core';
import { Employee } from "./employee";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

  employeesUrl = 'api/employees';

  getEmployees(): Observable<Employee[]> {
    this.messageService.addMessage('EmployeeService: Fetched Employees.');
    return this.http.get<Employee[]>(this.employeesUrl)
    .pipe(
      catchError(this.handleError<Employee[]>('getHeroes', []))
      );
  }

  private handleError<T>(operation='operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.addMessage(`EmployeeService: ${message}`);
  }

  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<Employee>(url).pipe(
      tap(_=> this.log(`Fetched hero id=${id}`)),
      catchError(this.handleError<Employee>(`getHero id=${id}`))
    );
  }

}
