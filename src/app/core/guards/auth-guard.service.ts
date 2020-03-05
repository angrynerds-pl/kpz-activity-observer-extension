import { Injectable, Component } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AuthService } from "@app/core/services/auth.service";
import { MessageService } from "@app/core/services/message.service";
import { AuthWrapperComponent, AppWrapperComponent } from "@app/shared/layout";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkIfCanActivate();
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkIfCanActivate();
  }

  private checkIfCanActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map(user => {
        const canActivate = !!user;
        if (!canActivate) {
          this.messageService.open("Nieautoryzowany dostęp", "warning");
          this.router.navigateByUrl("/");
        }
        return !!user;
      }),
      catchError(() => of(false))
    );
  }
}
