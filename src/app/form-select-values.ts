export interface SelectValuesType {
  value: string;
  viewValue: string;
}

export const GENDER: SelectValuesType[] = [
  {value: 'Female', viewValue: 'Female'},
  {value: 'Male', viewValue: 'Male'},
];

export const MARITAL_STATUS: SelectValuesType[] = [
  {value: 'Single', viewValue: 'Single'},
  {value: 'Maried', viewValue: 'Maried'},
  {value: 'Widowed', viewValue: 'Widowed'},
  {value: 'Separated', viewValue: 'Separated'},
]

export const POSITIONS: SelectValuesType[] = [
  {value: 'Associate', viewValue: 'Associate'},
  {value: 'Junior Developer', viewValue: 'Junior Developer'},
  {value: 'Seniro Developer', viewValue: 'Senior Developer'},
  {value: 'Project Manager', viewValue: 'Project Manager'},
];