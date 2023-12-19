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
  user:any;
  get isLoggedIn() {
    return this.loggedIn.asObservable(); 
  }
// http:HttpClient;
  constructor(
    private router: Router,
    private http:HttpClient) {
      // this.http = inject(HttpClient)
     }


  login(payload: any): Observable<any> {
    return this.http.post(`/v1/auth/login`, payload)
    // .pipe(
    //   // this.loggedIn.next(true);
    //   tap({
    //     error: e => console.log(e)
    //   }),
    // );
    .pipe(
      map((response: any) => {
        console.log(response);
        this.user={
          username: response.data.username,
          id:response.data.userId
        }
        
        const authData: AuthData = {
          token: response.token,
          refresh_token: response.refresh_token,
          expires_in: response.expires_in,
          token_type: response.token_type,
          message: response.message
        };
        this.loggedIn.next(true);

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
  logout() {                            
    this.loggedIn.next(false);
    this.router.navigate(['/sign-in']);
  }
}
