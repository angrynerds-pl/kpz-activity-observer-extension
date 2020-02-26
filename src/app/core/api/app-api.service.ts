import {Injectable} from '@angular/core';
import {ApiService} from '@app/core/api/api.service';
import {Observable} from 'rxjs';
import {ApiResponse, Pagination} from '@app/shared/models';
import {HttpMethod} from '@app/shared/enums';

@Injectable({
  providedIn: 'root'
})
export class AppApiService {

  constructor(private apiService: ApiService) {
  }

  // GET:
  // getApps({pageSize, pageNumber}: Pagination): Observable<ApiResponse<SimplifiedApplication[]>> {
  //   return this.apiService.request(
  //     HttpMethod.GET,
  //     'apps',
  //     {
  //       params: {
  //         pageSize: pageSize.toString(),
  //         pageNumber: pageNumber.toString()
  //       }
  //     }
  //   );
  // }
  //
  // getApp(appId: string): Observable<ApiResponse<ApplicationDetails>> {
  //   return this.apiService.request(
  //     HttpMethod.GET,
  //     `apps/${appId}`
  //   );
  // }

  // POST:
  // createApp(newApp: NewApplication): Observable<ApiResponse<void>> {
  //   return this.apiService.request(HttpMethod.POST, 'apps/', {body: newApp});
  // }

  // DELETE:
}
