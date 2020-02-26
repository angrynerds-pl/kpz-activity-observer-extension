import {Component} from '@angular/core';
import {fadeIn, fadeOut} from '@app/shared/animations';

@Component({
  selector: 'app-auth-wrapper',
  templateUrl: './auth-wrapper.component.html',
  styleUrls: ['./auth-wrapper.component.scss'],
  animations: [fadeIn, fadeOut]
})
export class AuthWrapperComponent {
}
