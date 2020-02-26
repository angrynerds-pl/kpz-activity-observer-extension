import {Directive, OnChanges, Input, HostBinding, ElementRef} from '@angular/core';

@Directive({
  selector: '[appSmoothHeight]',
  host: {'[style.display]': '"block"', '[style.overflow]': '"hidden"'}
})
export class SmoothHeightDirective implements OnChanges {
  @Input()
  appSmoothHeight;
  pulse: boolean;
  startHeight: number;

  constructor(private element: ElementRef) {
  }

  @HostBinding('@grow')
  get grow() {
    return {value: this.pulse, params: {startHeight: this.startHeight}};
  }

  setStartHeight() {
    this.startHeight = this.element.nativeElement.clientHeight;
  }

  ngOnChanges(changes) {
    this.setStartHeight();
    this.pulse = !this.pulse;
  }
}
