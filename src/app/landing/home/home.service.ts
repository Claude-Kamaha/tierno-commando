import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient
  ) { }

  getMyReferrals(): Observable<any> {
    return this.http.get<any>('/v1/customer/referred-friends');
  }

  getCountries(): Observable<any> {
    return this.http.get<any>('/v1/utils/countries');
  }

  createClient(payload: any) {
    return this.http.post('/v1/agent/create-account', payload);
  }



}
