import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray, FormControl } from "@angular/forms";
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
  arrayIndex: number;
  addAddressInput: string;
  inputAddressTheSame: boolean;
  inputAddressIsEmpty: boolean;
  inputContactTheSame: boolean;
  inputContactIsEmpty: boolean;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private readonly afs: AngularFirestore
    ) { 
      this.employeesCollection=afs.collection('employees');
      this.employees = this.employeesCollection.valueChanges();
  }
  
  employeeDetailForm = this.fb.group({
    firstName : ['', Validators.required],
    middleName : [''],
    lastName : ['',Validators.required],
    dobirth : ['', Validators.required],
    gender : ['', Validators.required],
    maritalStatus : [''],
    position : ['', Validators.required],
    dohired : ['', Validators.required],
    primaddress: ['', Validators.required],
    primcontact: ['', Validators.required],
    addresses: this.fb.array([]),
    contacts: this.fb.array([]),
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

addArrayElement(inputValue: string, controlArray: FormArray, primControl: FormControl) {
  if(!inputValue.trim()) { 
    return; 
  }
  for (const item of controlArray.controls) {
    if(inputValue == item.value) {
      return;
    }
  }
  controlArray.push(this.fb.control(inputValue));
  this.isOnlyElementInArray(controlArray, primControl);
}

deleteArrayElement(index: number, controlArray: FormArray, primControl: FormControl) {
  if (controlArray.at(index).value == primControl.value) {
    primControl.setValue('');
  }
  controlArray.removeAt(index);
  this.isOnlyElementInArray(controlArray, primControl);
}

isOnlyElementInArray(controlArray: FormArray, primControl: FormControl) {
  if (controlArray.length == 1) {
    primControl.patchValue(controlArray.at(0).value);
  }
}

  // addContact() {
  //   this.moreContacts.push(this.fb.control(''));
  // }

}