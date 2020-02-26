import {Component, Input, OnChanges} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormsService} from '@app/core/services/forms.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html'
})
export class CheckboxComponent implements OnChanges {
  @Input() labelPosition: 'before' | 'after' = 'after';
  @Input() formControlNameValue: string;
  @Input() formSubmitted: boolean;
  @Input() formGroup: FormGroup;
  @Input() autofocus = false;
  @Input() disabled: boolean;
  @Input() options: any;

  required: boolean;
  invalid: boolean;

  constructor(private formsService: FormsService) {
  }

  ngOnChanges() {
    this.required = this.formsService.checkIfFieldIsRequired(this.formGroup.controls[this.formControlNameValue]);
    this.invalid = this.formsService.checkIfFieldIsInvalid(this.formGroup.controls[this.formControlNameValue]);
  }
}
