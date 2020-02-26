import {Injectable} from '@angular/core';
import {IHttpOptions} from '@app/shared/interfaces';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@env/environment';
import {HttpMethod} from '@app/shared/enums';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private options: IHttpOptions = {
    responseType: 'json',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  request(method: HttpMethod, path: string, options?: IHttpOptions): Observable<any> {
    return this.http.request(method, `${environment.apiUrl}/${path}`, {...this.options, ...options});
  }

  ping() {
    return this.request(HttpMethod.GET, '');
  }
}
