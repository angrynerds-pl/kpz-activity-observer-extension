import { Component } from '@angular/core';

@Component({
  selector: 'app-infinite-scroll-loader',
  styleUrls: ['./infinite-scroll-loader.component.scss'],
  template: `
      <div class="loader">
          <div class="loader__content">
              <app-spinner></app-spinner>
          </div>
      </div>
  `
})
export class InfiniteScrollLoaderComponent {
}
