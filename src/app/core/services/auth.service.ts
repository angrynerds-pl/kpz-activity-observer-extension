import {Injectable} from '@angular/core';
import {BehaviorSubject, throwError} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ApiError, NewUser, User, UserCredentials, UserTokens} from '@app/shared/models';
import {IdentityApiService} from '@app/core/api/identity-api.service';
import {MessageService} from '@app/core/services/message.service';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$: BehaviorSubject<User>;
  currentUser: User;

  private jwt: JwtHelperService;

  constructor(private identityApi: IdentityApiService,
              private messageService: MessageService, private router: Router) {
    this.jwt = new JwtHelperService();
    this.currentUser$ = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || null)
    );
    this.currentUser$.subscribe(res => {
      this.currentUser = res;
    });
  }

  saveUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser$.next(user);
  }

  decodeAndSaveUser({refreshToken, token}: UserTokens) {
    let decodedToken;
    let newUser;
    try {
      decodedToken = this.jwt.decodeToken(token);
      newUser = new User({refreshToken, token, ...decodedToken});
      this.saveUser(newUser);
    } catch (err) {
      this.messageService.open('Nieprawidłowy token', 'danger');
    }
    return newUser;
  }

  refreshToken() {
    const {refreshToken} = this.currentUser;
    return this.identityApi.refresh(refreshToken)
      .pipe(map(res => {
        return this.decodeAndSaveUser(res.data);
      }));
  }

  register(newUser: NewUser) {
    return this.identityApi.register(newUser)
      .pipe(map(res => {
        const user = this.decodeAndSaveUser(res.data);
        this.messageService.open(`Miło Cię widzieć ${user.firstName}! 🎉`, 'success');
        return user;
      }))
      .pipe(catchError((err: ApiError) => {
        this.messageService.openErrors(err);
        return throwError(err);
      }));
  }

  login(credentials: UserCredentials) {
    return this.identityApi.login(credentials)
      .pipe(map(res => {
        const user = this.decodeAndSaveUser(res.data);
        this.messageService.open(`Witaj ${user.firstName}! 👋`, 'success');
        return user;
      }))
      .pipe(catchError((err: ApiError) => {
        const errorsToDisplay = ['invalidPassword', 'userDontExist', 'invalidEmailOrPassword'];
        this.messageService.openErrors(err, errorsToDisplay);
        return throwError(err);
      }));
  }

  logout(withoutMessage?: boolean) {
    localStorage.removeItem('currentUser');
    this.currentUser$.next(null);
    if (!withoutMessage) this.messageService.open('Wylogowano', 'success');
    this.router.navigateByUrl('/');
  }
}
