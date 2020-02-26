import {Injectable} from '@angular/core';
import {AppApiService} from '@app/core/api/app-api.service';
import {MessageService} from '@app/core/services/message.service';
import {catchError, map} from 'rxjs/operators';
import {ApiError, Pagination} from '@app/shared/models';
import {Subject, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  // application$: Subject<ApplicationDetails> = new Subject<ApplicationDetails>();
  // application: ApplicationDetails;
  //
  // applicationId$: Subject<string> = new Subject<string>();
  // applicationId: string;

  constructor(private appApi: AppApiService,
              private messageService: MessageService) {
    // this.observeApp();
  }

  // observeApp() {
  //   this.application$.subscribe(res => {
  //     this.applicationId$.next(res.id);
  //     this.application = res;
  //   });
  //   this.applicationId$.subscribe(res => {
  //     this.applicationId = res ? res : this.getApplicationId();
  //   });
  // }

  // getApplicationId() {
  //   if (this.applicationId) return this.applicationId;
  //   const applicationIdFromQueryParams = this.routeService.getParam('applicationId');
  //   if (applicationIdFromQueryParams) return applicationIdFromQueryParams;
  //   this.routeService.redirectToApplicationsList();
  //   return '';
  // }

  // getApplications(pagination: Pagination) {
  //   return this.appApi.getApps(pagination)
  //     .pipe(catchError((err: ApiError) => {
  //       this.messageService.openErrors(err);
  //       return throwError(err);
  //     }));
  // }
  //
  // getApplication() {
  //   const applicationId = this.getApplicationId();
  //   return this.appApi.getApp(applicationId)
  //     .pipe(map(res => {
  //       this.application$.next(res.data);
  //       return res;
  //     }))
  //     .pipe(catchError((err: ApiError) => {
  //       this.routeService.redirectToApplicationsList();
  //       this.messageService.openErrors(err);
  //       return throwError(err);
  //     }));
  // }
  //
  // createApplication(newApplication: NewApplication) {
  //   return this.appApi.createApp(newApplication)
  //     .pipe(map(res => {
  //       this.messageService.open(`Stworzono aplikację! 🎉`, 'success');
  //       return res;
  //     }))
  //     .pipe(catchError((err: ApiError) => {
  //       this.messageService.openErrors(err);
  //       return throwError(err);
  //     }));
  // }
}
