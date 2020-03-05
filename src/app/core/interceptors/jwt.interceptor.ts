import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "@app/core/services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headersConfig = {};
    const currentUser = this.authService.currentUser;
    if (currentUser) {
      headersConfig["x-auth-token"] = currentUser.accessToken;
    }
    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
