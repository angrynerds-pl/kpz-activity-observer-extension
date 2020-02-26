import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import 'lazysizes/plugins/unveilhooks/ls.unveilhooks';
// @ts-ignore
import * as lazySizes from 'lazysizes';

@Directive({
  selector: '[appBgImage]'
})
export class BgImageDirective implements OnInit {
  @Input() appBgImage: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    lazySizes.init();
    this.setElementBackgroundImage();
  }

  setElementBackgroundImage() {
    const container = this.elementRef.nativeElement;
    this.renderer.addClass(container, 'lazyload');
    this.renderer.setAttribute(container, 'data-bg', this.appBgImage);
  }
}
