import { Component } from '@angular/core';

@Component({
  selector: 'app-page-loader',
  styleUrls: ['./page-loader.component.scss'],
  template: `
      <div class="page-loader">
          <div class="page-loader__content">
              <app-spinner></app-spinner>
          </div>
      </div>
  `
})
export class PageLoaderComponent {
}
