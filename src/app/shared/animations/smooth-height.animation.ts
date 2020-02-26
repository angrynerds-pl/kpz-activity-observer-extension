import {animate, style, transition, trigger} from '@angular/animations';

export const smoothHeight = trigger('grow', [
  transition('void <=> *', []),
  transition('* <=> *', [style({height: '{{startHeight}}px'}), animate('.3s ease')], {
    params: {startHeight: 0}
  })
]);
