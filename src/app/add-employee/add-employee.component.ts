import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray } from "@angular/forms";
import { EmployeeService } from "../employee.service";
import { Location } from "@angular/common";
import { Employee } from "../employee";
import { ActivatedRoute } from "@angular/router";
import { Gender } from "../gender";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  genders: Gender[] = [
    {value: 'female', viewValue: 'Female'},
    {value: 'male', viewValue: 'Male'},
  ];

  maritalStats: Gender[] = [
    {value: 'single', viewValue: 'Single'},
    {value: 'maried', viewValue: 'Maried'},
    {value: 'widowed', viewValue: 'Widowed'},
    {value: 'separated', viewValue: 'Separated'},
  ];

  positions: Gender[] = [
    {value: 'associate', viewValue: 'Associate'},
    {value: 'junior', viewValue: 'Junior Developer'},
    {value: 'senior', viewValue: 'Senior Developer'},
    {value: 'manager', viewValue: 'Project Manager'},
  ];

  employee: Employee;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private location: Location,
    ) { }

  
  employeeDetailForm = this.fb.group({
    firstName : ['', Validators.required],
    middleName : ['', Validators.required],
    lastName : ['', Validators.required],
    dob : ['', Validators.required],
    gender : ['', Validators.required],
    maritalStatus : ['', Validators.required],
    position : ['', Validators.required],
    dateHired : ['', Validators.required],
    primaddress : [''],
    age : [''],
    // address : this.fb.group({
    //   address: [''],
    // }),
    // moreadds: this.fb.array([
    //   this.fb.control(''),
    // ]),
    // contact: this.fb.group({
    //   phone: [''],
    // }),
    // morecontacts: this.fb.array([
    //   this.fb.control(''),
    // ]),
  });

  ngOnInit() {
    this.getEmployee();
    console.log(this.employee);
  }

  onSubmit() {
    console.warn(this.employeeDetailForm.value);
  }

  initilizeSomeEmployeeDetails(employee: Employee) {
    this.employeeDetailForm.patchValue({
      fullname: 'John Doa',
      address: {
        address: 'Bacayan'
      }
    });
  }

  // get moreAdds() {
  //   return this.employeeDetailForm.get('moreadds') as FormArray;
  // }

  // get moreContacts() {
  //   return this.employeeDetailForm.get('morecontacts') as FormArray;
  // }

  // addAddress() {
  //   this.moreAdds.push(this.fb.control(''));
  // }

  // addContact() {
  //   this.moreContacts.push(this.fb.control(''));
  // }

  getEmployee() {
    const id = +this.route.snapshot.paramMap.get('id');
    if(id) {
      this.employeeService.getEmployee(id)
        .subscribe(employee=>this.employee=employee);
    }
  }

}