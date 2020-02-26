import {Component, Input, OnChanges} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {IInput} from '@app/shared/interfaces';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html'
})
export class SelectComponent implements OnChanges {
  @Input() formControlNameValue: string;
  @Input() formSubmitted: boolean;
  @Input() formGroup: FormGroup;
  @Input() autofocus = false;
  @Input() disabled: boolean;
  @Input() options: IInput;

  isRequired: boolean;

  ngOnChanges() {
    this.checkIfFieldIsRequired();
  }

  checkIfFieldIsRequired() {
    if (!this.formGroup.get(this.formControlNameValue).validator) return false;
    const validator = this.formGroup.get(this.formControlNameValue).validator({} as AbstractControl);
    this.isRequired = validator && !!validator.required;
  }
}
