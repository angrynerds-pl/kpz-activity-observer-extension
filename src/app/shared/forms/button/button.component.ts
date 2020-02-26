import {Component, Input} from '@angular/core';

type ButtonTypeTypes = 'mat-button' | 'mat-raised-button' | 'mat-stroked-button' | 'mat-flat-button' | 'mat-fab';
type ButtonColorTypes = 'primary' | 'accent' | 'warn';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() buttonType: ButtonTypeTypes = 'mat-raised-button';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() color: ButtonColorTypes = 'accent';
  @Input() required: boolean;
  @Input() disabled: boolean;
  @Input() pending: boolean;
  @Input() invalid: boolean;
  @Input() label: string;
  @Input() icon: string;
}
