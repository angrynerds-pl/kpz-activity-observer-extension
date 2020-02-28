import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class FormsService {
  constructor() {}

  // Common:

  checkIfFieldIsRequired(control: AbstractControl): boolean {
    if (!control.validator) {
      return false;
    }
    const validator = control.validator({} as AbstractControl);
    return validator && !!validator.required;
  }

  checkIfFieldIsInvalid(control: AbstractControl) {
    return control.touched && control.invalid;
  }

  checkIfValuesMatching(
    value1Key: string,
    value2Key: string,
    type: string = "value"
  ) {
    return (group: FormGroup) => {
      const value1Input = group.controls[value1Key];
      const value2Input = group.controls[value2Key];
      const errorName = `${type}Mismatch`;
      const otherErrors = value2Input.errors;
      return value1Input.value !== value2Input.value
        ? value2Input.setErrors({ [errorName]: true, ...otherErrors })
        : value2Input.setErrors(otherErrors);
    };
  }
}
