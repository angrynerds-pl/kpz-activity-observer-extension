import {Component, OnInit} from '@angular/core';
import {fadeIn, fadeOut} from '@app/shared/animations';

@Component({
  selector: 'app-app-wrapper',
  templateUrl: './app-wrapper.component.html',
  styleUrls: ['./app-wrapper.component.scss'],
  animations: [fadeIn, fadeOut]
})
export class AppWrapperComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
