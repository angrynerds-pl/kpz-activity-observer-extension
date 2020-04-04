import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import {
  ApiError,
  NewUser,
  User,
  UserCredentials,
  UserTokens
} from "@app/shared/models";
import { IdentityApiService } from "@app/core/api/identity-api.service";
import { MessageService } from "@app/core/services/message.service";
import { catchError, map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  currentUser$: BehaviorSubject<User>;
  currentUser: User;

  private jwt: JwtHelperService;

  constructor(
    private identityApi: IdentityApiService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.jwt = new JwtHelperService();
    const user = JSON.parse(localStorage.getItem("currentUser") || null);

    this.currentUser$ = new BehaviorSubject<User>(user);
    this.currentUser$.subscribe(res => {
      this.currentUser = res;
    });
  }

  saveUser(user: User) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    this.currentUser$.next(user);
  }

  decodeAndSaveUser({ accessToken }: UserTokens) {
    let decodedToken;
    let newUser;
    try {
      decodedToken = this.jwt.decodeToken(accessToken);
      newUser = new User({ accessToken, ...decodedToken });
      this.saveUser(newUser);
    } catch (err) {
      this.messageService.open("Nieprawidłowy token", "danger");
    }
    return newUser;
  }

  refreshToken() {
    // const { refreshToken } = this.currentUser;
    // return this.identityApi.refresh(refreshToken).pipe(
    //   map(res => {
    //     return this.decodeAndSaveUser(res.data);
    //   })
    // );
  }

  register(newUser: NewUser) {
    return this.identityApi
      .register(newUser)
      .pipe(
        map(res => {
          this.messageService.open(
            "Utworzono konto, możesz się teraz zalogować!",
            "success"
          );
          return res;
        })
      )
      .pipe(
        catchError((err: ApiError) => {
          this.messageService.open(
            "Ups, coś poszło nie tak! Spróbuj ponownie",
            "warning"
          );
          return throwError(err);
        })
      );
  }

  login(credentials: UserCredentials) {
    return this.identityApi
      .login(credentials)
      .pipe(
        map(res => {
          const user = this.decodeAndSaveUser(res.data);
          this.messageService.open(`Zalogowano: ${user.email}`, "success");
          return res.data;
        })
      )
      .pipe(
        catchError((err: ApiError) => {
          // const errorsToDisplay = [
          //   "invalidPassword",
          //   "userDontExist",
          //   "invalidEmailOrPassword"
          // ];
          this.messageService.open("Ups, coś poszło nie tak!", "warning");
          return throwError(err);
        })
      );
  }

  update(userData) {
    return this.identityApi
      .update(userData)
      .pipe(
        map(res => {
          this.messageService.open(
            "Zaktualizowano dane użytkownika!",
            "success"
          );
          return true;
        })
      )
      .pipe(
        catchError((err: ApiError) => {
          this.messageService.open("Ups, coś poszło nie tak!", "warning");
          return throwError(err);
        })
      );
  }

  logout(withoutMessage?: boolean) {
    localStorage.removeItem("currentUser");
    this.currentUser$.next(null);
    if (!withoutMessage) {
      this.messageService.open("Wylogowano", "success");
    }
    this.router.navigateByUrl("/");
  }
}
