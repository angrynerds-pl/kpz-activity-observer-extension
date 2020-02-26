import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appCountTo]'
})
export class CountToDirective implements OnInit {
  @Input() appCountTo: number;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.elementRef.nativeElement.innerHTML = 0;
    setTimeout(() => this.startCounting(), 1000);
  }

  startCounting(startNumber = 0) {
    this.elementRef.nativeElement.innerHTML = startNumber;
    if (startNumber >= this.appCountTo) return;
    setTimeout(() => {
      startNumber++;
      this.startCounting(startNumber);
    }, 20);
  }
}
