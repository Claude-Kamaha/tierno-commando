import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthData } from './auth';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken?: string | null;
  private refreshaccessToken?: string | null;
  http = inject(HttpClient)
  constructor(
    private router: Router) { }


  login(payload: any): Observable<any> {
    return this.http.post(`/v1/auth/login`, payload).pipe(
      map((response: any) => {
        const authData: AuthData = {
          token: response.token,
          refresh_token: response.refresh_token,
          expires_in: response.expires_in,
          token_type: response.token_type,
        };

        return authData;
      })
    );;
  }
  initSession(accessToken?: string, refreshToken?: string): boolean {
    // Load the tokens from the storage if not provided.
    this.accessToken =
      accessToken ||
      localStorage.getItem(environment.tokenKey);

    this.refreshaccessToken =
      refreshToken ||
      localStorage.getItem(environment.refreshTokenKey);
    // We need the token to be available
    if (!this.accessToken) {
      return false;
    }

    return true;
  }

  getTokenFromLocalStorage(): string {
    let token = localStorage.getItem('token');
    if (token) {
      return token;
    }

    return '';
  }
}
