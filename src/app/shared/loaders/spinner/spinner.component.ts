import {Component, Input} from '@angular/core';
import {loaderAnimation} from '@app/shared/animations';

@Component({
  selector: 'app-spinner',
  styleUrls: ['./spinner.component.scss'],
  animations: [loaderAnimation],
  template: `
      <div class="lds-ellipsis {{ color }}" [@loader]="'in'">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
      </div>
  `
})
export class SpinnerComponent {
  @Input() color: 'black' | 'white' | 'primary' | 'accent' = 'primary';
}
