import { AbstractControl } from '@angular/forms';

export function isPrimaryEmpty(control: AbstractControl): {[key: string]: any} | null {
  const valueString = control.value.trim();
  return (valueString.length) ? {'emptyPrimary': {value: control.value}} : null;
}