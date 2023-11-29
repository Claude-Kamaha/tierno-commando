import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient,
    private router: Router) { }


  login(payload: any): Observable<any> {
    return this.http.post(`/api/v1/auth/login`, payload);
  }
}
