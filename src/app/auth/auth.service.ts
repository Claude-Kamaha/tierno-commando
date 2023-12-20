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
      return token
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImRhdGVfY3JlYXRpb24iOjE2ODY3NTc3OTgxNjEsImRhdGVfdXBkYXRlIjoxNzAyOTEzMjMyMjQ0LCJpZCI6MTM5MDMxLCJ1c2VybmFtZSI6ImVqYXJhSm9lbGxlIiwicGhvbmVOdW1iZXIiOiIrMjMzMDI0NjQyOTk3NCIsInJlZmVyYWxDb2RlIjoiZWphci1HSC1DVCIsImxhc3RTZWVuQXQiOjE3MDI5MTMyMzIyNDQsInRvc0FjY2VwdGVkQnlJcCI6IjE5Ny4yNTEuMjQwLjI0NyIsInBob25lSWQiOiI4NDU0YTYyOC0wOGYxLTRiZjctYjMyNC05M2M0YTViNzUyMTYiLCJodWJzcG90U3luY2VkIjpmYWxzZSwiaW50ZXJjb21JZCI6bnVsbCwiY2FuU2VsbCI6ZmFsc2UsImNhbkJ1eSI6ZmFsc2UsImNhbkV4Y2hhbmdlIjpmYWxzZSwiY2FuQWNjZXNzTGl0ZSI6ZmFsc2UsImNhblNlbmRQYXkiOmZhbHNlLCJjYW5SZWNlaXZlUGF5IjpmYWxzZSwiaXNQYXJ0bmVyIjpmYWxzZSwiaXNBZ2VudCI6ZmFsc2UsImlzVmVyaWZpZWQiOmZhbHNlLCJ2ZXJpZmllZEF0IjpudWxsLCJlbWFpbFZlcmlmaWVkIjpmYWxzZSwiZW1haWxWZXJpZmllZEF0IjpudWxsLCJwaG9uZVZlcmlmaWVkIjpmYWxzZSwicGhvbmVWZXJpZmllZEF0IjpudWxsLCJhcHBGbG93Ijoic2F2aW5nc190b19pbnZlc3QiLCJhcHBQbGF0Zm9ybSI6ImFuZHJvaWQiLCJjdXN0b21lclR5cGUiOnsiZGF0ZV9jcmVhdGlvbiI6MTYxMzM5NTU1MzE2MywiZGF0ZV91cGRhdGUiOjE2MTMzOTU1NTMxNjMsImlkIjozLCJkZXNjcmlwdGlvbiI6ImFkbWluIiwiaXNEZWZhdWx0IjpmYWxzZSwibWF4UGF5bWVudFNldHRpbmdzIjoxfSwiY291bnRyeSI6ODUsInN0YXR1cyI6eyJkYXRlX2NyZWF0aW9uIjoxNjEzMzk1NTUzMjAyLCJkYXRlX3VwZGF0ZSI6MTYxMzM5NTU1MzIwMiwiaWQiOjMsImRlc2NyaXB0aW9uIjoiY29uZmlybWVkIiwiYWNjb3VudElzT3BlbiI6dHJ1ZSwiaXNEZWZhdWx0IjpmYWxzZX0sImxhYmVsIjoxLCJkZXRhaWxzIjp7ImRhdGVfY3JlYXRpb24iOjE2ODY3NTc3OTgxNzYsImRhdGVfdXBkYXRlIjoxNjg2NzU3Nzk4MTc2LCJpZCI6MTM4NjE0LCJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsImdlbmRlciI6IiIsImVtYWlsQWRkcmVzcyI6ImVqYXJham9lbGxlQGdtYWlsLmNvbSIsImRhdGVfb2ZfYmlydGgiOm51bGwsImlkZW50aWZpY2F0aW9uIjpudWxsLCJwcmVmZXJyZWRMYW5ndWFnZSI6ImVuIiwiaW5BcHBOb3RpZmljYXRpb25zIjp0cnVlLCJhcHBTY3JlZW5zaG90cyI6ZmFsc2UsIm1vb25wYXlDdXN0b21lcklkIjpudWxsLCJkZXRhaWxzIjp7fSwiYWRkcmVzcyI6IiIsImNpdHkiOiIiLCJ6aXBDb2RlIjoiIiwiY3VzdG9tZXIiOjEzOTAzMSwicHJlZmVycmVkRmlhdEN1cnJlbmN5Ijo2MSwiY291bnRyeU9mQmlydGgiOm51bGwsImNvdW50cnlPZlJlc2lkZW5jZSI6bnVsbH0sInJlZmVycmVyIjpudWxsLCJtYW5hZ2VyIjpudWxsLCJjcmVhdGVkQnkiOm51bGwsImxveWFsdHlMZXZlbCI6bnVsbCwidG9rZW5LZXkiOiIxMjZ3NmQxM3F2dmxxY2gzbm1nIn0sImlhdCI6MTcwMjk5ODEwNSwiZXhwIjoxNzAzNjAyOTA1LCJhdWQiOiJlamFyYS5pbyIsImlzcyI6ImVqYXJhLmlvIn0.CkPlZhhweqisUwOWHmpjd5GISiII_1MHaYHQHZkLzgY";
    }

    return '';
  }
  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/sign-in']);
  }
}
