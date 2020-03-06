import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { catchError, switchMap, filter, take } from "rxjs/operators";
import { Observable, throwError, BehaviorSubject, EMPTY } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "@app/core/services/message.service";
import { ApiError, User } from "@app/shared/models";
import { AuthService } from "@app/core/services/auth.service";
import { environment } from "@env/environment";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string> = new BehaviorSubject<
    any
  >(null);

  constructor(
    public router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError(res => {
        const parsedError = new ApiError(res.error);

        // Log:
        if (!environment.production) {
          console.log(parsedError);
        }

        // Handle invalid token:
        parsedError.errors.forEach(error => {
          if (error.param === "token") {
            if (error.message === "INVALID_TOKEN") {
              return this.handleInvalidAccessToken();
            }
          }
        });

        // && this.authService.currentUser
        // TODO: Handle refresh token

        // Handle 401:
        if (parsedError.status === 401) {
          return this.handle401Error();
        }

        // Handle 403:
        if (parsedError.status === 403) {
          return this.handle403Error();
        }

        // Handle 500:
        if (parsedError.status === 500) {
          return this.handle500Error();
        }

        return throwError(parsedError);
      })
    );
  }

  private addTokenToRequest(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  private refreshToken(request: HttpRequest<any>, next: HttpHandler) {
    // if (!this.isRefreshing) {
    //   this.isRefreshing = true;
    //   this.refreshTokenSubject.next(null);
    //   return this.authService
    //     .refreshToken()
    //     .pipe(
    //       switchMap((user: User) => {
    //         this.refreshTokenSubject.next(user.token);
    //         this.isRefreshing = false;
    //         return next.handle(this.addTokenToRequest(request, user.token));
    //       })
    //     )
    //     .pipe(catchError(() => this.handleInvalidRefreshToken()));
    // } else {
    //   return this.refreshTokenSubject
    //     .pipe(
    //       filter(token => token !== null),
    //       take(1),
    //       switchMap(token =>
    //         next.handle(this.addTokenToRequest(request, token))
    //       )
    //     )
    //     .pipe(catchError(() => this.handleInvalidRefreshToken()));
    // }
  }

  private handle401Error() {
    this.messageService.open("Nieautoryzowany dostęp ✋", "danger");
    this.authService.logout(true);
    return EMPTY;
  }

  private handle403Error() {
    this.messageService.open("Nieautoryzowany dostęp ✋", "danger");
    return EMPTY;
  }

  private handle500Error() {
    this.messageService.open("Wystąpił wewnętrzny błąd serwera 🤖", "danger");
    return EMPTY;
  }

  private handleInvalidAccessToken() {
    this.messageService.open("Sesja wygasła, wylogowywanie!", "warning");
    this.authService.logout(true);
    return EMPTY;
  }

  private handleInvalidRefreshToken() {
    this.isRefreshing = false;
    this.messageService.open(
      "Niepoprawny token, nastąpiło wylogowanie",
      "warning"
    );
    this.authService.logout();
    return EMPTY;
  }
}
