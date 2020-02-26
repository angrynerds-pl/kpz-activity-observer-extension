import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

@Injectable()
export class DelayInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return timer(500).pipe(mergeMap(() => next.handle(request)));
  }
}
