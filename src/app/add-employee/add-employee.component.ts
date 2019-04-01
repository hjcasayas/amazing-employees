import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray } from "@angular/forms";
import { EmployeeService } from "../employee.service";
import { Employee } from "../employee";
import { SelectValuesType, GENDER, MARITAL_STATUS, POSITIONS } from "../form-select-values";
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from "rxjs";


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  genders = GENDER;
  maritalStats = MARITAL_STATUS;
  positions = POSITIONS;
  employee: Employee;
  private employeesCollection: AngularFirestoreCollection<Employee>;
  employees: Observable<Employee[]>;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private readonly afs: AngularFirestore
    ) { 
      this.employeesCollection=afs.collection('employees');
      this.employees = this.employeesCollection.valueChanges();
  }
  
  employeeDetailForm = this.fb.group({
    firstName : [''],
    middleName : [''],
    lastName : [''],
    dobirth : [''],
    gender : [''],
    maritalStatus : [''],
    position : [''],
    dohired : [''],
    primaddress: [''],
    primcontact: [''],
    addresses: this.fb.array([this.fb.control(''),]),
    contacts: this.fb.array([this.fb.control(''),]),
  });

  ngOnInit() {}

  saveEmployeeDetails(employee: Employee): void {
    this.employeesCollection.add(employee);
    this.employeeDetailForm.reset();
  }

  onSubmit() {
    console.warn(this.employeeDetailForm.value);
  }

  initilizeSomeEmployeeDetails(employee: Employee[]) {
    this.employeeDetailForm.patchValue({
      fullname: '',
      address: {
        address: ''
      }
    });
  }

  get addresses() {
    return this.employeeDetailForm.get('addresses') as FormArray;
  }

  get contacts() {
    return this.employeeDetailForm.get('contacts') as FormArray;
  }

  get primaddress() {
    return this.employeeDetailForm.get('primaddress');
  }
  get primcontact() {
    return this.employeeDetailForm.get('primcontact');
  }

addArrayElement(controlArray: FormArray, fromDeleteArrayMethod?: boolean) {
  const arrayLastIndex = controlArray.length - 1;
  if((!((controlArray.at(arrayLastIndex).value.trim()) === '')) || fromDeleteArrayMethod){
    controlArray.push(this.fb.control(''));
  }
}

deleteArrayElement(index: number, controlArray: FormArray) {
  const arrayLength = controlArray.length;
  if(arrayLength <= 1) {
    this.addArrayElement(controlArray, true);
  }
  controlArray.removeAt(index);
}



  // addContact() {
  //   this.moreContacts.push(this.fb.control(''));
  // }

}