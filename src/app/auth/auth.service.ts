import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { AuthData } from './auth';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken?: string | null;
  private refreshaccessToken?: string | null;
  private loggedIn = new BehaviorSubject(false);
  user: any;
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  // http:HttpClient;
  constructor(
    private router: Router,
    private http: HttpClient) {
    // this.http = inject(HttpClient)
    this.initSession() 
  }


  login(payload: any): Observable<any> {
    return this.http.post(`/v1/auth/login`, payload)
      
      .pipe(
        map((response: any) => {
     
          this.user = {
            username: response.data.username,
            id: response.data.userId
          }

          const authData: AuthData = {
            token: response.token,
            refresh_token: response.refresh_token,
            expires_in: response.expires_in,
            token_type: response.token_type,
            message: response.message
          };
          this.loggedIn.next(true);
          this.storeAuthData(authData);
          this.storeAuthUser(this.user)
          return authData;
        })
      );;
  }
  // initSession(accessToken?: string, refreshToken?: string): boolean {
  //   // Load the tokens from the storage if not provided.
  //   this.accessToken =
  //     accessToken ||
  //     localStorage.getItem(environment.tokenKey);

  //   this.refreshaccessToken =
  //     refreshToken ||
  //     localStorage.getItem(environment.refreshTokenKey);

  //   if (!this.accessToken) {
  //     return false;
  //   }

  //   return true;
  // }
  initSession() {
    const storedAuthData = this.getStoredAuthData();

    if (storedAuthData && storedAuthData.token) {
      this.accessToken = storedAuthData.token;
      this.refreshaccessToken = storedAuthData.refresh_token;
      this.loggedIn.next(true);
    }
  }

  private storeAuthData(authData: AuthData) {
    localStorage.setItem(environment.tokenKey, authData.token);
    localStorage.setItem(environment.refreshTokenKey, authData.refresh_token);
  }

  private getStoredAuthData(): AuthData | null {
    const token = localStorage.getItem(environment.tokenKey);
    const refreshToken = localStorage.getItem(environment.refreshTokenKey);

    if (token && refreshToken) {
      return {
        token,
        refresh_token: refreshToken,
        expires_in: 0, // You may need to handle token expiration as well
        token_type: '',
        message: ''
      };
    }

    return null;
  }
  
   storeAuthUser(user: any) {
    localStorage.setItem('username', user.username);
    localStorage.setItem('id', user.id);
  }
   getStoredAuthUser():  any {
    let username = localStorage.getItem('username');
    let id = localStorage.getItem('id');
    this.user = {
      username:username,
      id: id
    }
      return this.user
   
  }

  getTokenFromLocalStorage(): string {
    let token = localStorage.getItem('token');
    if (token) {
      return token
   
    }

    return '';
  }
  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem(environment.tokenKey);
    localStorage.removeItem(environment.refreshTokenKey);
    this.router.navigate(['/sign-in']);
  }
}
