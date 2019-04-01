import { Injectable } from '@angular/core';
import { Employee } from "./employee";
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";

import { MessageService } from './message.service';
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  employees: Observable<any>;

  constructor(
    private messageService: MessageService,
    private db: AngularFirestore
    ) { 
    }

  private log(message: string) {
    this.messageService.addMessage(`EmployeeService: ${message}`);
  }

}
