import { Injectable } from "@angular/core";
import { ApiService } from "@app/core/api/api.service";
import {
  ApiResponse,
  NewUser,
  UserCredentials,
  UserTokens
} from "@app/shared/models";
import { Observable } from "rxjs";
import { HttpMethod } from "@app/shared/enums";

@Injectable({
  providedIn: "root"
})
export class IdentityApiService {
  constructor(private apiService: ApiService) {}

  // GET:
  checkEmail(
    email: string
  ): Observable<ApiResponse<{ isEmailExists: boolean }>> {
    return this.apiService.request(HttpMethod.GET, "identity/checkEmail", {
      params: { email }
    });
  }

  // POST:
  refresh(refreshToken: string): Observable<ApiResponse<UserTokens>> {
    return this.apiService.request(HttpMethod.POST, "identity/refresh", {
      body: { refreshToken }
    });
  }

  register(newUser: NewUser): Observable<ApiResponse<UserTokens>> {
    return this.apiService.request(HttpMethod.POST, "users/", {
      body: newUser
    });
  }

  login(credentials: UserCredentials): Observable<ApiResponse<UserTokens>> {
    return this.apiService.request(HttpMethod.POST, "auth", {
      body: credentials
    });
  }

  // DELETE:
}
