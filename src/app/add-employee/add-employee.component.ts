import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray, FormControl, FormGroup } from "@angular/forms";
import { EmployeeService } from "../employee.service";
import { Employee } from "../employee";
import { GENDER, MARITAL_STATUS, POSITIONS } from "../form-select-values";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

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
  arrayIndex: number;
  addAddressInput: string;
  inputAddressTheSame: boolean;
  inputAddressIsEmpty: boolean;
  inputContactTheSame: boolean;
  inputContactIsEmpty: boolean;
  isAnUpdate: boolean;
  employeeId: string;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private location: Location
    ) {}
  
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

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.getEmployee(this.employeeId);
  }

  getEmployee(id: string):void {
    if(!id) {
      this.isAnUpdate = false;
      return;
    }
    this.employeeService.getEmployeeById(id)
      .subscribe(
        employee=>{
          for (const address of employee.addresses) {
            this.addresses.push(this.fb.control(address));            
          }
          for (const contact of employee.contacts) {
            this.contacts.push(this.fb.control(contact));            
          }
          this.employeeDetailForm.patchValue(employee);
        
        },        
      );
    this.isAnUpdate = true;
  }

  saveEmployeeDetails(employee: Employee): void {
    this.employeeService.addEmployee(employee);
    this.employeeDetailForm.reset();
  }

  updateEmployeeDetails(employee: Employee): void {
    this.employeeService.updateEmployee(this.employeeId, employee);
    this.location.back();
  }

  onSubmit() {
    console.warn(this.employeeDetailForm.value);
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

}